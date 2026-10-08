-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2025 at 03:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `disaster_reporting`
--

-- --------------------------------------------------------

--
-- Table structure for table `disasters`
--

CREATE TABLE `disasters` (
  `id` int(11) NOT NULL,
  `jenisBencana` varchar(50) NOT NULL,
  `lokasi` varchar(100) NOT NULL,
  `disaster_date` date NOT NULL,
  `jiwaTerdampak` int(11) NOT NULL,
  `kkTerdampak` int(11) NOT NULL,
  `tingkatKerusakan` enum('Ringan','Sedang','Berat') NOT NULL,
  `keterangan` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `reject_reason` text DEFAULT NULL,
  `kategori_laporan` varchar(20) NOT NULL DEFAULT 'bencana',
  `submitted_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `validated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `disasters`
--

INSERT INTO `disasters` (`id`, `jenisBencana`, `lokasi`, `disaster_date`, `jiwaTerdampak`, `kkTerdampak`, `tingkatKerusakan`, `keterangan`, `status`, `reject_reason`, `kategori_laporan`, `submitted_by`, `created_at`, `validated_at`) VALUES
(1, 'Pohon Tumbang', 'Jln. Trans Timur Rumbia', '2024-01-18', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(2, 'Pohon Tumbang', 'Jln. Desa Leleko, Kec. Remboken', '2024-01-21', 0, 0, 'Ringan', 'Sebagian Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(3, 'Pohon Tumbang', 'Komples Stadion Maesa Sasaran', '2024-02-24', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(4, 'Pohon Tumbang', 'Komples Stadion Maesa Sasaran', '2024-04-15', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Pohon; Membahayakan Pengguna Jalan', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(5, 'Kebakaran', 'Kelurahan Wewelan, Kec. Tondano Barat', '2025-01-01', 3, 1, 'Ringan', 'Rumah Terbakar; (Kel. Gimon Pinangkaan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:09:28'),
(6, 'Pohon Tumbang', 'Desa Tonsea Lama, Kec. Tondano Utara', '2025-01-01', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 05:11:54'),
(8, 'Pohon Tumbang', 'Kelurahan Maesa Unima, Kec. Tondano Selatan', '2025-01-15', 0, 0, 'Ringan', 'Sebagian Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 05:12:45'),
(9, 'Kebakaran', 'Desa Panasen, Kec. Kakas Barat', '2025-01-17', 5, 1, 'Ringan', 'Rumah Terbakar; (Kel. Tamengkel Tikoh)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:06:35'),
(10, 'Angin Puting Beliung', 'Desa Suluan, Kec. Tombulu', '2025-01-23', 6, 2, 'Berat', '(Kel.Moningka Pangemanan.Rusak Sedang); Atap Rumah Terangkat; \r\n(Kel.Seroi Kalangi,Rusak berat)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:45:00'),
(11, 'Pohon Tumbang', 'Desa Toulimembet, Kec. Kakas', '2025-01-26', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 05:17:30'),
(12, 'Kebakaran', 'Desa Tateli Weru, Kec. Mandolang', '2025-02-05', 3, 0, 'Ringan', 'Rumah Terbakar; (Kel. Frans Sikome)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(13, 'Pohon Tumbang', 'Desa Kembuan, Kec. Tondano Utara', '2025-02-06', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 05:14:48'),
(14, 'Pohon Tumbang', 'Desa Kembuan, Kec. Tondano Utara', '2025-02-07', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 05:14:26'),
(15, 'Pohon Tumbang', 'Jln. Stadion Maesa Tondano (Kembuan), Kec. Tondano Utara', '2025-02-10', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(16, 'Pohon Tumbang', 'Desa Kolongan, Kec. Kombi', '2025-02-11', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(17, 'Pohon Tumbang', 'Desa Rerer, Kec. Kombi', '2025-02-11', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(18, 'Pohon Tumbang', 'Desa Sea, Kec. Pineleng', '2025-02-11', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 05:19:41'),
(19, 'Pohon Tumbang', 'Jln. Kiniar, Kec. Tondano Timur', '2025-02-11', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(20, 'Pohon Tumbang', 'Jln. Stadion Maesa Tondano (Kembuan), Kec. Tondano Utara', '2025-02-13', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(21, 'Pohon Tumbang', 'Kelurahan Sasaran, Kec. Tondano Barat', '2025-02-13', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; (Halaman Kantor Bupati Kabupaten Minahasa); Membahayakan Bangunan; (Bangunan Gudang Logistik KPU)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(24, 'Pohon Tumbang', 'Jln. Kasuang', '2025-02-14', 0, 0, 'Ringan', 'Hampir Menutupi Jalan; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(25, 'Pohon Tumbang', 'Kelurahan Koya, Kec. Tondano Barat', '2025-02-17', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(26, 'Angin Puting Beliung', 'Kelurahan Urongo, Kec. Tondano Selatan', '2025-02-18', 3, 1, 'Berat', 'Akibat angin kencang  sehingga mengakibatkan satu bangunan rumah roboh; (Kel. Pangemanan Mingkit)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:46:26'),
(27, 'Kebakaran Hutan', 'Desa Kolongan, Kec. Kombi', '2025-02-18', 0, 0, 'Ringan', 'Lahan Terbakar', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:51:25'),
(28, 'Pohon Tumbang', 'Jln. Stadion Maesa Tondano (Sasaran)', '2025-02-18', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Bangunan', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(29, 'Pohon Tumbang', 'Jalur DPRD Sampai Pertigaan Menuju Desa Rurukan', '2025-02-27', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(30, 'Banjir', 'Desa Tikela, Kec. Tombulu', '2025-03-01', 5, 2, 'Ringan', '(Kel.Jotam Barahama); Rumah tergenang; (Kel.SAJAB)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:08:45'),
(31, 'Pohon Tumbang', 'Kelurahan Liningaan, Kec. Tondano Timur', '2025-03-02', 0, 0, 'Ringan', 'Terjadi Hujan Deras Sehingga Mengakibatkan Pohon Tumbang Menutupi Ruas Jalan; (Ruas jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(32, 'Angin Puting Beliung', 'Jaga 7, Desa Eris, Kec. Eris', '2025-03-03', 0, 0, 'Berat', 'Akibat angin kencang  sehingga mengakibatkan satu bangunan rumah roboh; (Kel.Warouw Pandoh)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:47:04'),
(33, 'Pohon Tumbang', 'Kelurahan Sasaran, Kec. Tondano Utara', '2025-03-04', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 05:17:02'),
(34, 'Angin Puting Beliung', 'Benteng Moraya, Kelurahan Roong, Kec. Tondano Barat', '2025-03-05', 0, 0, 'Ringan', 'Atap Seng Bangunan Terangkat; (Benteng Moraya)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(35, 'Pohon Tumbang', 'Kantor DPRD, Kelurahan Liningaan, Kec. Tondano Timur', '2025-03-05', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Lokasi Kantor DPR)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 05:16:09'),
(36, 'Pohon Tumbang', 'Desa Warembungan, Kec. Pineleng', '2025-03-07', 0, 0, 'Ringan', 'Angin bertiup kencang, pohon tumbang menimpa mobil; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 05:13:40'),
(37, 'Pohon Tumbang', 'Jln. Kiniar, Kec. Tondano Timur', '2025-03-10', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(38, 'Kebakaran', 'Lingkungan I, Desa Kolongan, Kec. Kombi', '2025-03-12', 4, 1, 'Ringan', 'Rumah Terbakar; (Kel.Tumonggor Rotinsulu)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:07:59'),
(39, 'Pohon Tumbang', 'Jln. Kiniar, Kec. Tondano Timur', '2025-03-12', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(40, 'Kebakaran', 'Lingkungan III, Kelurahan Tataaran Patar, Kec. Tondano Selatan', '2025-03-13', 4, 1, 'Ringan', 'Rumah Terbakar (Tempat Kost ) Akibat Korsoleting Listrik; (Kel. Rintjab  Lalogiroth)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:08:23'),
(41, 'Pohon Tumbang', 'Jln. Tomohon Manado', '2025-03-14', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(42, 'Pohon Tumbang', 'Jln. Unima Remboken', '2025-03-15', 0, 0, 'Ringan', 'Pohon Bambu Tumbang Yang Terkangkut Di Kabel Listrik Membahayakan Pengguna Jalan; (Ruas jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(43, 'Tanah Longsor', 'Desa Kaweng, Kec. Kakas', '2025-03-16', 0, 0, 'Ringan', '1 Bangunan Rumah Rusak; (Kel.Rompas Moajow)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:52:21'),
(44, 'Tanah Longsor', 'Desa Makalelon, Kec. Kakas', '2025-03-17', 0, 0, 'Ringan', 'Akibat Hujan Sehingga Terjadi Longsor dan Menutupi Ruas Jalan; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:53:07'),
(45, 'Pohon Tumbang', 'Jln. Unima Remboken', '2025-03-18', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Ruas jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(46, 'Pohon Tumbang', 'Jln. Unima Remboken', '2025-03-19', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Ruas jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(47, 'Pohon Tumbang', 'Ruas Jln. Koya, Kelurahan Koya, Kec. Tondano Selatan', '2025-03-20', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Ruas jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 05:18:25'),
(48, 'Pohon Tumbang', 'Desa Sea I, Kec. Pineleng', '2025-03-21', 0, 0, 'Ringan', '(Kel.Ibu Jd.Beslar Jaga 3, Kel Tambokan Kaparang Jaga 1)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(49, 'Pohon Tumbang', 'Jln. Unima Remboken', '2025-03-21', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Ruas jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(50, 'Tanah Longsor', 'Jln. Desa Suluan, Desa Suluan, Kec. Tombulu', '2025-03-21', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:54:36'),
(51, 'Pohon Tumbang', 'Desa Sea, Kec. Pineleng', '2025-03-22', 0, 0, 'Ringan', 'Rumah Tertipa Pohon Tumbang; (Bangunan Pastori Gereja Bethani Gunung Horep)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(52, 'Pohon Tumbang', 'Jln. Antara Desa Suluan-Rumengkor, Kec. Tombulu', '2025-03-22', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(53, 'Pohon Tumbang', 'Desa Tombasian Bawah, Kec. Kawangkoan Barat', '2025-03-22', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 05:17:57'),
(54, 'Tanah Longsor', 'Desa Tateli Weru, Kec. Mandolang', '2025-03-22', 0, 0, 'Ringan', 'Tanah Longsor Ditepi Jalan Yang Cukup Besar; (Ruas jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:55:42'),
(55, 'Kebakaran', 'Jaga III, Kel. Kinali 1, Kec. Kawangkoan', '2025-03-23', 3, 0, 'Ringan', 'Rumah Terbakar; (Kel. Lapian Lontoh)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(56, 'Tanah Longsor', 'Desa Agotey, Kec. Mandolang', '2025-03-23', 0, 0, 'Berat', 'Jalan Tertutup dan Tiang Listrik Roboh; (Ruas jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:41:34'),
(57, 'Pohon Tumbang', 'Jln. Tataaran Patar', '2025-03-24', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Ruas jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(58, 'Pohon Tumbang', 'Jln. Desa Warembungan, Kec. Pineleng', '2025-03-25', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Dahan Pohon; Membahayakan Pengguna Jalan; (Ruas jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(59, 'Banjir', 'Kelurahan Wawalintouan, Kec. Tondano Barat', '2025-03-29', 0, 2, 'Ringan', '', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:10:13'),
(60, 'Banjir', 'Kelurahan Tounkuramber, Kec. Tondano Barat', '2025-03-29', 0, 2, 'Ringan', '(Kel. Mantiri Pangemanan); Rumah tergenang; (Kel.Pangemanan Rumeser)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(61, 'Pohon Tumbang', 'Jln. Tomohon - Manado, Desa Pineleng Satu Timur, Kec. Pineleng', '2025-03-30', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(62, 'Pohon Tumbang', 'Ling. 5, Kelurahan Koya, Kec. Tondano Selatan', '2025-03-31', 11, 0, 'Ringan', '(Girot Paat); (Tendean Palalangan); Menimpa Di Dapur Dan Pagar; (Girot  Mandang)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(63, 'Tanah Longsor', 'Desa Rerer Satu, Kec. Kombi', '2025-04-03', 0, 0, 'Ringan', 'Kerusakan Jalan; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:56:39'),
(64, 'Kebakaran', 'Jaga V, Desa Ranomerut, Kec. Eris', '2025-04-11', 1, 1, 'Ringan', 'Rumah Terbakar; (Kel. Assa Maramis)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(65, 'Pohon Tumbang', 'Kelurahan Uner, Kec. Kawangkoan Utara', '2025-04-12', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Pohon', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(67, 'Pohon Tumbang', 'Kelurahan Uner, Kec. Kawangkoan Utara', '2025-04-14', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Pohon', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 05:19:10'),
(68, 'Tanah Longsor', 'Jln. Desa Seretan Timu, Desa Seretan Timu, Kec. Lembean Timur', '2025-04-15', 0, 0, 'Ringan', 'Menutupi Sebagian Jalan; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:57:31'),
(69, 'Tanah Longsor', 'Jln. Maesa Unima, Kelurahan Maesa Unima, Kec. Tondano Selatan', '2025-04-22', 0, 0, 'Ringan', 'Membahayakan pengguna jalan; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:58:25'),
(70, 'Pohon Tumbang', 'Jln. Kiniar, Kec. Tondano Timur', '2025-04-23', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Pohon; Membahayakan Pengguna Jalan', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(71, 'Pohon Tumbang', 'Desa Tateli, Kec. Mandolang', '2025-04-24', 3, 0, 'Ringan', 'Pohon Menimpa Bangunan Rumah; (Kel. Manaung Pantidaeng)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(72, 'Angin Puting Beliung', 'Jaga 1, Desa Ranowangko Dua, Kec. Kombi', '2025-04-25', 0, 1, 'Berat', 'Bangunan Rumah Roboh; (Kel. Ibu Jd Dei Lengkong)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:47:47'),
(73, 'Banjir', 'Jaga 4, Desa Kembuan, Kec. Tondano Utara', '2025-04-26', 20, 5, 'Ringan', '(Kel Rumbayan Kalalo); (Kel.Kalalo Pakasi); (Kel.Nayoan Runtu); (Kel.Tumengkol Rumbayan); (Kel.Wenas Lumanau)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:04:38'),
(74, 'Banjir', 'Kelurahan Roong, Kec. Tondano Barat', '2025-04-26', 0, 0, 'Ringan', 'Beberapa Rumah Tergenang Air; (Kelurahan Roong, Ling V)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(75, 'Banjir', 'Ling 2, Kelurahan Sasaran, Kec. Tondano Utara', '2025-04-26', 6, 1, 'Ringan', 'Beberapa Rumah warga Tergenang Air; (Kel.Kaunang Wuntu)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:07:13'),
(76, 'Tanah Longsor', 'Desa Warembungan, Kec. Pineleng', '2025-04-26', 0, 0, 'Berat', 'Talut Roboh; (Desa Warembungan, Kec. Pineleng)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:42:13'),
(77, 'Banjir', 'Kelurahan Kiniar, Kec. Tondano Timur', '2025-04-30', 0, 0, 'Ringan', 'Beberapa Rumah warga Tergenang Air', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(78, 'Pohon Tumbang', 'Kediaman Ibu Sekda', '2025-04-30', 0, 0, 'Ringan', 'Pemotongan/Pembersihan Pohon', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(79, 'Tanah Longsor', 'Desa Kembuan, Kec. Tondano Utara', '2025-04-30', 6, 1, 'Ringan', 'Tanggul Samping Rumah Jebol; (Kel.Wajiran Wonda)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:48:31'),
(80, 'Pohon Tumbang', 'Desa Kiawa, Kec. Kawangkoan Utara', '2025-05-01', 0, 0, 'Ringan', 'Menutupi Sebagian Jalan; (Ruas Jalan)', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(81, 'Tanah Longsor', 'Kelurahan Kinali, Kec. Kawangkoan', '2025-05-01', 0, 0, 'Ringan', 'Longsor Menutupi Badan Jalan; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:58:48'),
(83, 'Tanah Longsor', 'Desa Karor, Kec. Lembean Timur', '2025-05-07', 0, 0, 'Ringan', 'Menutupi seluruh badan jalan, sehingga arus lalu lintas terganggu; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:59:31'),
(84, 'Banjir', 'Kelurahan Touluor, Kec. Tondano Timur', '2025-05-08', 575, 170, 'Ringan', '', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:23:03'),
(85, 'Tanah Longsor', 'Desa Rumengkor, Kec. Tombulu', '2025-05-08', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:59:59'),
(86, 'Tanah Longsor', 'Desa Rumengkor, Kec. Tombulu', '2025-05-09', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:00:25'),
(87, 'Banjir', 'Desa Kaweng, Kec. Kakas', '2025-05-14', 432, 169, 'Ringan', '', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:23:08'),
(88, 'Banjir', 'Desa Toulimembet, Kec. Kakas', '2025-05-14', 130, 43, 'Berat', '', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:17:08'),
(89, 'Banjir', 'Desa Tounelet, Kec. Kakas', '2025-05-14', 0, 0, 'Ringan', 'Beberapa Rumah warga Tergenang Air', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(90, 'Banjir', 'Kelurahan Kiniar, Kec. Tondano Timur', '2025-05-14', 1268, 422, 'Ringan', 'Beberapa Rumah warga Tergenang Air', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 19:19:53'),
(91, 'Tanah Longsor', 'Desa Tandengan, Kec. Eris', '2025-05-14', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:01:03'),
(92, 'Tanah Longsor', 'Desa Suluan, Kec. Tombulu', '2025-05-19', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:01:21'),
(93, 'Banjir', 'Kelurahan Roong, Kec. Tondano Barat', '2025-05-20', 411, 137, 'Berat', '', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:16:26'),
(94, 'Tanah Longsor', 'Jalan Teep Palamba, Desa Teep, Kec. Langowan Timur', '2025-05-20', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:01:57'),
(95, 'Banjir', 'Desa Leleko, Kec. Remboken', '2025-05-22', 176, 74, 'Ringan', 'Beberapa Rumah warga Tergenang Air', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:23:13'),
(96, 'Banjir', 'Jaga 1, Desa Timu, Kec. Remboken', '2025-05-22', 36, 0, 'Berat', '', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:23:44'),
(97, 'Banjir', 'Desa Talikuran, Kec. Remboken', '2025-05-22', 0, 58, 'Berat', '', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:17:17'),
(98, 'Banjir', 'Desa Timu, Kec. Remboken', '2025-05-22', 31, 5, 'Ringan', '', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:23:29'),
(99, 'Tanah Longsor', 'Jaga 6, Desa Sendangan, Kec. Kakas', '2025-05-23', 0, 3, 'Ringan', 'Longsor Menimpa 3 Rumah; (Kel.Tangka Tielung,Kel.Singka Walean , Kel.Rompas Wowiling)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:50:05'),
(100, 'Tanah Longsor', 'Jln. Makalelon - Wineru, Desa Makalelon, Kec. Kakas', '2025-05-23', 0, 0, 'Ringan', 'Sebagian Jalan Ambruk; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:02:33'),
(101, 'Tanah Longsor', 'Jaga 2, Desa Sendangan, Kec. Remboken', '2025-05-24', 0, 3, 'Berat', '(Kel. Evelin Kaligis); (Kel. Martino Kaligis); Rumah ambruk; (Kel. Roring Kaligis)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:43:50'),
(102, 'Tanah Longsor', 'Ruas Jln. Suluan - Rumengkor, Desa Suluan, Kec. Tombulu', '2025-05-24', 0, 0, 'Ringan', 'Sebagian Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:03:13'),
(103, 'Banjir', 'Desa Paslaten, Kec. Remboken', '2025-05-26', 188, 57, 'Berat', '', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:40:24'),
(104, 'Tanah Longsor', 'Jalan Desa Rerer - Kalawiran, Desa Rerer, Kec. Kombi', '2025-05-26', 0, 0, 'Ringan', 'Jalan Tertutup; (Ruas Jalan)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 05:03:52'),
(105, 'Angin Puting Beliung', 'Desa Tikela, Kec. Tombulu', '2025-06-12', 3, 0, 'Ringan', 'Atap Seng Bangunan Terangkat; (Kel.Macpal Kendage)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(106, 'Angin Puting Beliung', 'Desa Tonsewer, Kec. Tondano Barat', '2025-06-12', 0, 0, 'Ringan', 'Atap Seng Bangunan Terangkat; (Kel.Kolibu Tandayu); Atap Seng Bangunan Terangkat; (Kel.Sengkey Lahindo)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(107, 'Angin Puting Beliung', 'Desa Leilem, Kec. Sonder', '2025-06-13', 46, 12, 'Ringan', '', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 04:45:45'),
(108, 'Orang Hilang', 'Desa Kembuan, Kec. Tondano Utara', '2025-07-13', 0, 0, 'Ringan', '(Pintu Air Tonsea Lama); Korban: Leonard Semuel Worungan', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(109, 'Kebakaran', 'Jaga 1, Desa Paslaten, Kec. Kakas', '2025-08-06', 0, 2, 'Ringan', '(Kel.Kayukatui Lambey); Rumah Terbakar; (Kel. Lambey Silouw)', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(110, 'Orang Hilang', 'Desa Wulurmawutu, Kec Modoinding', '0000-00-00', 0, 0, 'Ringan', '(Danau Tondano Desa Tounelet Kec.Kakas ( Tasuka Dusun Jauh Tounelet)); Korban: Rikardo Dotulong', 'approved', NULL, 'insiden', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52'),
(111, 'Banjir', 'Kelurahan Tuutu, Kec. Tondano Barat', '2026-05-20', 204, 107, 'Berat', '(Kel.Ambat Mandey); (Kel.Angkouw Kandouw); (Kel.Angkouw Kumentas); (Kel.Angkouw Maratade); (Kel.Angkouw Parengkuan); (Kel.Angkouw Turangan); (Kel.Angkow Waraba); (Kel.Bahute Tumampas); (Kel.Benny Korengkeng); (Kel.Buang Tampi); (Kel.Dolfi Palandeng); (Kel.Dompas Kewo); (Kel.Dompas Wagey); (Kel.Jakob Rarung); (Kel.Kalengkian Moningkey); (Kel.Kaligis Parengkuan); (Kel.Karundeng Lantu); (Kel.Karwur  Pangemanan); (Kel.Karwur Lambey); (Kel.Karwur Tambariki); (Kel.Katoutje Korengkeng); (Kel.Kawet Karw', 'approved', NULL, 'bencana', 1, '2025-12-23 11:15:52', '2025-12-23 11:15:52');

-- --------------------------------------------------------

--
-- Table structure for table `disaster_photos`
--

CREATE TABLE `disaster_photos` (
  `id` int(11) NOT NULL,
  `disaster_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `original_filename` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `disaster_photos`
--

INSERT INTO `disaster_photos` (`id`, `disaster_id`, `filename`, `original_filename`, `file_path`, `uploaded_at`) VALUES
(4, 56, 'disaster_694a7feec8faa1.13002180.jpg', 'longsor agotey.jpg', 'uploads/disaster_694a7feec8faa1.13002180.jpg', '2025-12-23 11:41:34'),
(5, 76, 'disaster_694a8015c61b34.63040475.jpg', 'longsor talut roboh pineleng.jpg', 'uploads/disaster_694a8015c61b34.63040475.jpg', '2025-12-23 11:42:13'),
(6, 10, 'disaster_694a80bc4a9631.18153028.jpg', 'angin 23 jan 2.jpg', 'uploads/disaster_694a80bc4a9631.18153028.jpg', '2025-12-23 11:45:00'),
(7, 10, 'disaster_694a80bc4db279.74315152.jpg', 'angin 23 jan.jpg', 'uploads/disaster_694a80bc4db279.74315152.jpg', '2025-12-23 11:45:00'),
(8, 107, 'disaster_694a80e9d5a530.67008970.jpg', 'angin 13 juni.jpg', 'uploads/disaster_694a80e9d5a530.67008970.jpg', '2025-12-23 11:45:45'),
(9, 26, 'disaster_694a8112c393c1.83059212.jpg', 'angin 18 februari.jpg', 'uploads/disaster_694a8112c393c1.83059212.jpg', '2025-12-23 11:46:26'),
(10, 32, 'disaster_694a8138d15104.70159629.jpg', 'angin eris jaga 7.jpg', 'uploads/disaster_694a8138d15104.70159629.jpg', '2025-12-23 11:47:04'),
(11, 72, 'disaster_694a81638d9898.97852893.jpg', 'angin kombi jaga 1.jpg', 'uploads/disaster_694a81638d9898.97852893.jpg', '2025-12-23 11:47:47'),
(12, 79, 'disaster_694a818f138aa4.45778374.jpg', 'longsor tanggul jebol.jpg', 'uploads/disaster_694a818f138aa4.45778374.jpg', '2025-12-23 11:48:31'),
(13, 99, 'disaster_694a81ed648287.37650946.jpg', 'longsor jaga 6 kakas.jpg', 'uploads/disaster_694a81ed648287.37650946.jpg', '2025-12-23 11:50:05'),
(14, 27, 'disaster_694a823d2a9e14.30825390.jpg', 'karhutla.jpg', 'uploads/disaster_694a823d2a9e14.30825390.jpg', '2025-12-23 11:51:25'),
(15, 43, 'disaster_694a82755d7f28.21028430.jpg', 'longsor rompas moajow.jpg', 'uploads/disaster_694a82755d7f28.21028430.jpg', '2025-12-23 11:52:21'),
(16, 44, 'disaster_694a82a3cedaa5.68124675.jpg', 'longsor makalelon.jpg', 'uploads/disaster_694a82a3cedaa5.68124675.jpg', '2025-12-23 11:53:07'),
(17, 50, 'disaster_694a82fcc24a49.34590351.jpg', 'longsor suluan 21 maret.jpg', 'uploads/disaster_694a82fcc24a49.34590351.jpg', '2025-12-23 11:54:36'),
(18, 54, 'disaster_694a833e524022.38518932.jpg', 'longsor tateli weru.jpg', 'uploads/disaster_694a833e524022.38518932.jpg', '2025-12-23 11:55:42'),
(19, 63, 'disaster_694a83770b9d66.29393367.jpg', 'longsor rerer satu.jpg', 'uploads/disaster_694a83770b9d66.29393367.jpg', '2025-12-23 11:56:39'),
(20, 68, 'disaster_694a83abedad57.12610961.jpg', 'longsor seretan.jpg', 'uploads/disaster_694a83abedad57.12610961.jpg', '2025-12-23 11:57:31'),
(21, 69, 'disaster_694a83e1987667.91167664.jpg', 'longsor maesa unima.jpg', 'uploads/disaster_694a83e1987667.91167664.jpg', '2025-12-23 11:58:25'),
(22, 81, 'disaster_694a83f8c46b10.19111861.jpg', 'longsor kinali.jpg', 'uploads/disaster_694a83f8c46b10.19111861.jpg', '2025-12-23 11:58:48'),
(23, 83, 'disaster_694a8423203e51.17524991.jpg', 'longsor 7 mei.jpg', 'uploads/disaster_694a8423203e51.17524991.jpg', '2025-12-23 11:59:31'),
(24, 85, 'disaster_694a843f5d76c5.68442900.jpg', 'longsor rumengkor.jpg', 'uploads/disaster_694a843f5d76c5.68442900.jpg', '2025-12-23 11:59:59'),
(25, 86, 'disaster_694a8459bee0f5.76886145.jpg', 'longsor 9 mei rumengkor.jpg', 'uploads/disaster_694a8459bee0f5.76886145.jpg', '2025-12-23 12:00:25'),
(26, 91, 'disaster_694a847f1b8e49.86502190.jpg', 'longsor 14 mei.jpg', 'uploads/disaster_694a847f1b8e49.86502190.jpg', '2025-12-23 12:01:03'),
(27, 92, 'disaster_694a8491a3c073.98762517.jpg', 'longsor 19 mei.jpg', 'uploads/disaster_694a8491a3c073.98762517.jpg', '2025-12-23 12:01:21'),
(28, 94, 'disaster_694a84b5a66562.88010358.jpg', 'longsor langowan timur.jpg', 'uploads/disaster_694a84b5a66562.88010358.jpg', '2025-12-23 12:01:57'),
(29, 100, 'disaster_694a84d96a45c3.30921309.jpg', 'longsor makalelon wineru.jpg', 'uploads/disaster_694a84d96a45c3.30921309.jpg', '2025-12-23 12:02:33'),
(30, 102, 'disaster_694a8501252133.44539716.jpg', 'longsor suluan rumengkor.jpg', 'uploads/disaster_694a8501252133.44539716.jpg', '2025-12-23 12:03:13'),
(31, 104, 'disaster_694a85280a2ac5.08682933.jpg', 'longsor 26 mei.jpg', 'uploads/disaster_694a85280a2ac5.08682933.jpg', '2025-12-23 12:03:52'),
(32, 9, 'disaster_694a85cb2e12b4.08641438.jpg', 'kebakaran 17 jan.jpg', 'uploads/disaster_694a85cb2e12b4.08641438.jpg', '2025-12-23 12:06:35'),
(33, 38, 'disaster_694a861f40c4b5.51978868.jpg', 'kebakaran rotinsulu.jpg', 'uploads/disaster_694a861f40c4b5.51978868.jpg', '2025-12-23 12:07:59'),
(34, 40, 'disaster_694a863716d300.93064895.jpg', 'kebakaran patar.jpg', 'uploads/disaster_694a863716d300.93064895.jpg', '2025-12-23 12:08:23'),
(35, 5, 'disaster_694a8678d69a58.15054290.jpg', 'kebakaran gimon.jpg', 'uploads/disaster_694a8678d69a58.15054290.jpg', '2025-12-23 12:09:28'),
(36, 59, 'disaster_694a86a57bf936.06387352.jpg', 'banjir rahmanti wawalintouan.jpg', 'uploads/disaster_694a86a57bf936.06387352.jpg', '2025-12-23 12:10:13'),
(37, 6, 'disaster_694a870a3fc6f9.91048255.jpg', 'pohon 1 jan.jpg', 'uploads/disaster_694a870a3fc6f9.91048255.jpg', '2025-12-23 12:11:54'),
(39, 8, 'disaster_694a873de0fa02.97669228.jpg', 'pohon 15 jan.jpg', 'uploads/disaster_694a873de0fa02.97669228.jpg', '2025-12-23 12:12:45'),
(40, 36, 'disaster_694a8774a252d2.84035063.jpg', 'pohon 3 maret.jpg', 'uploads/disaster_694a8774a252d2.84035063.jpg', '2025-12-23 12:13:40'),
(41, 14, 'disaster_694a87a22d1f39.14200735.jpg', 'pohon 7 feb.jpg', 'uploads/disaster_694a87a22d1f39.14200735.jpg', '2025-12-23 12:14:26'),
(42, 13, 'disaster_694a87b8dbb994.76239225.jpg', 'pohon 6 feb.jpg', 'uploads/disaster_694a87b8dbb994.76239225.jpg', '2025-12-23 12:14:48'),
(43, 35, 'disaster_694a88093b06e9.92755657.jpg', 'pohon 5 maret.jpg', 'uploads/disaster_694a88093b06e9.92755657.jpg', '2025-12-23 12:16:09'),
(44, 33, 'disaster_694a883e95a166.23218661.jpg', 'pohon 4 maret.jpg', 'uploads/disaster_694a883e95a166.23218661.jpg', '2025-12-23 12:17:02'),
(45, 11, 'disaster_694a885a708bc7.95116276.jpg', 'pohon 26 jan.jpg', 'uploads/disaster_694a885a708bc7.95116276.jpg', '2025-12-23 12:17:30'),
(46, 53, 'disaster_694a887506ff15.51555933.jpg', 'pohon 22 maret.jpg', 'uploads/disaster_694a887506ff15.51555933.jpg', '2025-12-23 12:17:57'),
(47, 47, 'disaster_694a889193ea91.77835397.jpg', 'pohon 20 maret.jpg', 'uploads/disaster_694a889193ea91.77835397.jpg', '2025-12-23 12:18:25'),
(48, 67, 'disaster_694a88beae2901.72895649.jpg', 'pohon 14 april.jpg', 'uploads/disaster_694a88beae2901.72895649.jpg', '2025-12-23 12:19:10'),
(49, 18, 'disaster_694a88ddbde7a8.18640877.jpg', 'pohon 22 maret pineleng.jpg', 'uploads/disaster_694a88ddbde7a8.18640877.jpg', '2025-12-23 12:19:41');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','head') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`) VALUES
(1, 'Staff', 'password123', 'user', '2025-10-21 05:36:48'),
(2, 'Kaban', 'password123', 'head', '2025-10-21 05:36:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `disasters`
--
ALTER TABLE `disasters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `submitted_by` (`submitted_by`);

--
-- Indexes for table `disaster_photos`
--
ALTER TABLE `disaster_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `disaster_id` (`disaster_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `disasters`
--
ALTER TABLE `disasters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `disaster_photos`
--
ALTER TABLE `disaster_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `disasters`
--
ALTER TABLE `disasters`
  ADD CONSTRAINT `disasters_ibfk_1` FOREIGN KEY (`submitted_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `disaster_photos`
--
ALTER TABLE `disaster_photos`
  ADD CONSTRAINT `disaster_photos_ibfk_1` FOREIGN KEY (`disaster_id`) REFERENCES `disasters` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
