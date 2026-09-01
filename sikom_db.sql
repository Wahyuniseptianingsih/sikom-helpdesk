-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Waktu pembuatan: 01 Sep 2026 pada 13.49
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sikom_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `assets`
--

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `kode_aset` varchar(50) DEFAULT NULL,
  `nama_alat` varchar(100) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `merk` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `no_seri` varchar(100) DEFAULT NULL,
  `thn_beli` year(4) DEFAULT NULL,
  `status_barang` enum('baik','rusak ringan','rusak berat') DEFAULT 'baik',
  `lokasi_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `assets`
--

INSERT INTO `assets` (`id`, `kode_aset`, `nama_alat`, `kategori_id`, `merk`, `model`, `no_seri`, `thn_beli`, `status_barang`, `lokasi_id`, `user_id`) VALUES
(1, 'AST-001', 'Printer Epson L120', 2, 'Epson', 'L120', 'SN123456', '2022', 'baik', 1, 3),
(2, 'AST-002', 'Laptop Lenovo', 1, 'Lenovo', 'ThinkPad', 'SN999', '2023', 'baik', 2, 3),
(3, 'AST-003', 'Komputer PC Rakitan', 1, 'Accer', '', '', '0000', 'baik', 1, NULL),
(4, 'ADH-765', 'Laptop Asus VivoBook', 1, 'Asus', '', '', '0000', 'baik', 2, NULL),
(5, 'KJH-446', 'Laptop Lenovo ThinkPad', 1, 'Lenovo', '', '', '2022', 'baik', 3, NULL),
(6, 'KJG-009', 'Monitor LED 19 inch', 1, 'Accer', '', '', '0000', 'baik', 1, NULL),
(7, 'KNG-456', 'Printer Epson L3110', 2, 'Epson', '', '', '0000', 'baik', 2, NULL),
(8, 'KGR-557', 'Scanner Dokumen', 2, '', '', '', '0000', 'baik', 1, NULL),
(10, 'HFT-087', 'Access Point Wifi', 3, '', '', '', '2026', 'baik', 2, NULL),
(11, 'OJG-775', 'Telepon Kantor', 5, 'Accer', '', '', '0000', 'baik', 3, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori_aset`
--

CREATE TABLE `kategori_aset` (
  `id` int(11) NOT NULL,
  `kategori` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kategori_aset`
--

INSERT INTO `kategori_aset` (`id`, `kategori`) VALUES
(1, 'Komputer'),
(2, 'Printer'),
(3, 'Jaringan'),
(4, 'Elektronik Lain'),
(5, 'Peralatan Kantor');

-- --------------------------------------------------------

--
-- Struktur dari tabel `lokasi`
--

CREATE TABLE `lokasi` (
  `id` int(11) NOT NULL,
  `nama_lokasi` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `lokasi`
--

INSERT INTO `lokasi` (`id`, `nama_lokasi`) VALUES
(1, 'Lab 1'),
(2, 'Lab 2'),
(3, 'Ruang Admin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `maintenance_log`
--

CREATE TABLE `maintenance_log` (
  `id` int(11) NOT NULL,
  `asset_id` int(11) DEFAULT NULL,
  `tgl` date DEFAULT NULL,
  `keterangan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `maintenance_log`
--

INSERT INTO `maintenance_log` (`id`, `asset_id`, `tgl`, `keterangan`) VALUES
(1, 1, '2026-09-01', 'ganti tinta printer');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'admin'),
(2, 'teknisi'),
(3, 'pegawai');

-- --------------------------------------------------------

--
-- Struktur dari tabel `spare_part`
--

CREATE TABLE `spare_part` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) DEFAULT NULL,
  `nama_part` varchar(100) DEFAULT NULL,
  `qty` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `spare_part`
--

INSERT INTO `spare_part` (`id`, `ticket_id`, `nama_part`, `qty`) VALUES
(3, 2, 'kabel power', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `judul` varchar(150) DEFAULT NULL,
  `kategori` varchar(50) DEFAULT NULL,
  `prioritas` enum('low','medium','high') DEFAULT 'medium',
  `deskripsi` text DEFAULT NULL,
  `status` varchar(30) DEFAULT 'open',
  `asset_id` int(11) DEFAULT NULL,
  `pelapor_id` int(11) DEFAULT NULL,
  `teknisi_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tickets`
--

INSERT INTO `tickets` (`id`, `judul`, `kategori`, `prioritas`, `deskripsi`, `status`, `asset_id`, `pelapor_id`, `teknisi_id`, `created_at`) VALUES
(2, 'Printer rusak', 'hardware', 'high', 'Nggak bisa nge-print', 'diproses', NULL, 3, 2, '2026-09-01 05:50:49'),
(3, 'keyboard mati', 'hardware', 'medium', 'keyboard mati', 'diproses', NULL, 3, 2, '2026-09-01 16:59:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ticket_log`
--

CREATE TABLE `ticket_log` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) DEFAULT NULL,
  `diagnosis` text DEFAULT NULL,
  `tindakan` text DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp(),
  `teknisi_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `ticket_log`
--

INSERT INTO `ticket_log` (`id`, `ticket_id`, `diagnosis`, `tindakan`, `status`, `updated_at`, `teknisi_id`) VALUES
(1, 2, 'kabel power kendor', 'dikencengin', 'diproses', '2026-09-01 06:03:07', 2),
(2, 3, 'komponen ada yang mati', 'ganti komponen baru', 'selesai', '2026-09-01 17:05:49', 2),
(3, 2, 'listrik tidak masuk ke mesin', 'bongkar dan ganti komponen', 'selesai', '2026-09-01 17:06:29', 2),
(4, 3, 'mati lagi', 'ganti ulang', 'diproses', '2026-09-01 17:30:47', 2),
(5, 2, '', '', 'diproses', '2026-09-01 17:52:37', 2),
(6, 2, '', '', 'diproses', '2026-09-01 17:53:53', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `pass`, `role_id`) VALUES
(1, 'Wahyuni', 'admin@sikom.com', '$2b$10$FOsIlbsiWfD6nlH8PEDyKORnvKm7YY3ZvoHqhpEefJWWAM16TOBQy', 1),
(2, 'Teknisi1', 'teknisi@sikom.com', '$2b$10$oV6qHnJ4N4U/yxWGEX/g9OUT20LUTYVLaTRmyIDet1uuHp62Srkem', 2),
(3, 'Pegawai1', 'pegawai@sikom.com', '$2b$10$VGu2JA4JA48GY.7evfhx3Og9GfUI3kRXfEAq8t90U9duETUvRim1O', 3),
(5, 'Test User', 'test@sikom.com', '$2b$10$KfuKX/PmepylVzmSd/t17.F1qbtzkQJ.32.nK1479Jhuiheix3I8G', 3),
(6, 'teknisi 2', 'teknisi2@gmail.com', '$2b$10$3FwRC5qKdUZmcuZwiwlaxOuEdqhyfp4Kx19dOBFpiVg.sjxS.7CSO', 2);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kode_aset` (`kode_aset`),
  ADD KEY `kategori_id` (`kategori_id`),
  ADD KEY `lokasi_id` (`lokasi_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `kategori_aset`
--
ALTER TABLE `kategori_aset`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `lokasi`
--
ALTER TABLE `lokasi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `maintenance_log`
--
ALTER TABLE `maintenance_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `asset_id` (`asset_id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `spare_part`
--
ALTER TABLE `spare_part`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_id` (`ticket_id`);

--
-- Indeks untuk tabel `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `asset_id` (`asset_id`),
  ADD KEY `pelapor_id` (`pelapor_id`),
  ADD KEY `teknisi_id` (`teknisi_id`);

--
-- Indeks untuk tabel `ticket_log`
--
ALTER TABLE `ticket_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_id` (`ticket_id`),
  ADD KEY `teknisi_id` (`teknisi_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `kategori_aset`
--
ALTER TABLE `kategori_aset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `lokasi`
--
ALTER TABLE `lokasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `maintenance_log`
--
ALTER TABLE `maintenance_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `spare_part`
--
ALTER TABLE `spare_part`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `ticket_log`
--
ALTER TABLE `ticket_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_aset` (`id`),
  ADD CONSTRAINT `assets_ibfk_2` FOREIGN KEY (`lokasi_id`) REFERENCES `lokasi` (`id`),
  ADD CONSTRAINT `assets_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `maintenance_log`
--
ALTER TABLE `maintenance_log`
  ADD CONSTRAINT `maintenance_log_ibfk_1` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`);

--
-- Ketidakleluasaan untuk tabel `spare_part`
--
ALTER TABLE `spare_part`
  ADD CONSTRAINT `spare_part_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`);

--
-- Ketidakleluasaan untuk tabel `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`pelapor_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`teknisi_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `ticket_log`
--
ALTER TABLE `ticket_log`
  ADD CONSTRAINT `ticket_log_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  ADD CONSTRAINT `ticket_log_ibfk_2` FOREIGN KEY (`teknisi_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
