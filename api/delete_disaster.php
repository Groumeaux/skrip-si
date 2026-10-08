<?php
session_start();
require_once '../config/config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$id = $_POST['id'] ?? null;

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'ID not provided']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT filename, file_path FROM disaster_photos WHERE disaster_id = ?");
    $stmt->execute([$id]);
    $photos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($photos as $photo) {
        $filePath = '../' . $photo['file_path'];
        $thumbPath = '../uploads/thumb_' . $photo['filename'];

        if (file_exists($filePath)) {
            unlink($filePath);
        }

        if (file_exists($thumbPath)) {
            unlink($thumbPath);
        }
    }

    $pdo->prepare("DELETE FROM disaster_photos WHERE disaster_id = ?")->execute([$id]);
    
    $stmt = $pdo->prepare("DELETE FROM disasters WHERE id = ?");
    $stmt->execute([$id]);

    echo json_encode(['success' => true, 'message' => 'Laporan dan file foto berhasil dihapus.']);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>