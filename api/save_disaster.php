<?php
session_start();
require_once '../config/config.php';

if (!function_exists('create_thumbnail')) {
    function create_thumbnail($originalPath, $thumbPath, $maxWidth = 150, $maxHeight = 150) {
        list($origWidth, $origHeight, $type) = @getimagesize($originalPath);
        if (!$origWidth || !$origHeight) return false;
        
        if ($type !== IMAGETYPE_JPEG) return false;

        $ratio = min($maxWidth / $origWidth, $maxHeight / $origHeight);
        $thumbWidth = (int)($origWidth * $ratio);
        $thumbHeight = (int)($origHeight * $ratio);
        
        $thumbImage = imagecreatetruecolor($thumbWidth, $thumbHeight);
        $sourceImage = @imagecreatefromjpeg($originalPath);
        
        if (!$sourceImage) return false;
        
        imagecopyresampled($thumbImage, $sourceImage, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $origWidth, $origHeight);
        
        $success = imagejpeg($thumbImage, $thumbPath, 90);
        
        imagedestroy($sourceImage);
        imagedestroy($thumbImage);
        return $success;
    }
}

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$kategoriLaporan = trim($_POST['kategoriLaporan'] ?? 'bencana');

$lokasi = trim($_POST['lokasi'] ?? '');
$disasterDate = trim($_POST['disasterDate'] ?? '');
$userId = $_SESSION['user_id'];
$status = ($_SESSION['role'] === 'head') ? 'approved' : 'pending';
$validated_at = ($_SESSION['role'] === 'head') ? date('Y-m-d H:i:s') : null;

$jenisBencana = '';
$keterangan = null;
$jiwaTerdampak = 0;
$kkTerdampak = 0;
$tingkatKerusakan = 'Ringan';

if (empty($lokasi) || empty($disasterDate)) {
    echo json_encode(['success' => false, 'message' => 'Lokasi dan Tanggal wajib diisi']);
    exit;
}

if ($kategoriLaporan === 'bencana') {
    $jenisBencana = trim($_POST['jenisBencana'] ?? '');
    $jiwaTerdampak = (int)($_POST['jiwaTerdampak'] ?? 0);
    $kkTerdampak = (int)($_POST['kkTerdampak'] ?? 0);
    $tingkatKerusakan = trim($_POST['tingkatKerusakan'] ?? 'Ringan');
    
    if (empty($jenisBencana)) {
        echo json_encode(['success' => false, 'message' => 'Jenis Bencana wajib diisi untuk kategori ini']);
        exit;
    }

} else if ($kategoriLaporan === 'insiden') {
    $jenisBencana = trim($_POST['jenisInsiden'] ?? ''); 
    $keterangan = trim($_POST['keteranganInsiden'] ?? null);
    
    $jiwaTerdampak = 0;
    $kkTerdampak = 0;
    $tingkatKerusakan = 'Ringan';
    
    if (empty($jenisBencana)) {
        echo json_encode(['success' => false, 'message' => 'Jenis Insiden wajib diisi untuk kategori ini']);
        exit;
    }
}

$uploadedPhotos = [];
$uploadErrors = [];

$fsUploadDir = '../uploads/'; 

$dbUploadDir = 'uploads/';

if (!is_dir($fsUploadDir)) {
    mkdir($fsUploadDir, 0755, true);
}

if (isset($_FILES['photos']) && is_array($_FILES['photos']['name'])) {
    $maxFileSize = 5 * 1024 * 1024;

    foreach ($_FILES['photos']['name'] as $key => $filename) {
        if (empty($filename)) continue;
        
        $fileTmp = $_FILES['photos']['tmp_name'][$key];
        $fileError = $_FILES['photos']['error'][$key];
        
        if ($fileError !== UPLOAD_ERR_OK) {
            $uploadErrors[] = "File $filename gagal diupload (Error Code: $fileError)";
            continue;
        }
        
        $fileSize = @filesize($fileTmp);
        if ($fileSize === false || $fileSize > $maxFileSize) {
            $uploadErrors[] = "File $filename terlalu besar (Max 5MB)";
            continue;
        }

        $fileType = @mime_content_type($fileTmp);
        $fileExtension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        
        $isValidType = false;
        if (($fileType === 'image/jpeg' || $fileType === 'image/jpg') && 
            ($fileExtension === 'jpg' || $fileExtension === 'jpeg')) {
            $isValidType = true;
        }

        if (!$isValidType) {
            $uploadErrors[] = "File $filename ditolak (Hanya format JPG/JPEG yang diperbolehkan).";
            continue;
        }

        $uniqueFilename = uniqid('disaster_', true) . '.jpg';
        
        $filePath = $fsUploadDir . $uniqueFilename; 

        if (move_uploaded_file($fileTmp, $filePath)) {
            $thumbFilename = 'thumb_' . $uniqueFilename;
            
            $thumbPath = $fsUploadDir . $thumbFilename;
            
            create_thumbnail($filePath, $thumbPath);

            $uploadedPhotos[] = [
                'filename' => $uniqueFilename,
                'original_filename' => $filename,
                'file_path' => $dbUploadDir . $uniqueFilename 
            ];
        } else {
             $uploadErrors[] = "Gagal memindahkan file $filename ke folder uploads.";
        }
    }
}

try {
    $pdo->beginTransaction();

    $sql = "INSERT INTO disasters (
                jenisBencana, lokasi, jiwaTerdampak, kkTerdampak, tingkatKerusakan, keterangan, 
                disaster_date, status, submitted_by, validated_at, kategori_laporan
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $jenisBencana,
        $lokasi,
        $jiwaTerdampak,
        $kkTerdampak,
        $tingkatKerusakan,
        $keterangan,
        $disasterDate,
        $status,
        $userId,
        $validated_at,
        $kategoriLaporan
    ]);
    $disasterId = $pdo->lastInsertId();

    if (!empty($uploadedPhotos)) {
        $photoStmt = $pdo->prepare("INSERT INTO disaster_photos (disaster_id, filename, original_filename, file_path) VALUES (?, ?, ?, ?)");
        foreach ($uploadedPhotos as $photo) {
            $photoStmt->execute([$disasterId, $photo['filename'], $photo['original_filename'], $photo['file_path']]);
        }
    }

    $pdo->commit();

    $message = 'Laporan berhasil disimpan.';
    if (count($uploadedPhotos) > 0) {
        $message .= ' (' . count($uploadedPhotos) . ' foto berhasil diupload)';
    }
    
    if (count($uploadErrors) > 0) {
        $message .= "\n\nPERINGATAN: Beberapa file dilewati:\n- " . implode("\n- ", $uploadErrors);
    }

    echo json_encode(['success' => true, 'message' => $message]);

} catch (PDOException $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>