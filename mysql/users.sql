-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2026 at 04:13 PM
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
-- Database: `reactadmin`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  -- `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `id` varchar(36) NOT NULL DEFAULT (UUID()), -- this method work in MariaDB
  `account_type` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`account_type`, `country`, `username`, `email`, `image`, `password`, `first_name`, `last_name`, `phone`) VALUES
('Administrator', 'Philippines', 'admin', 'admin@gmail.com', 'http://localhost:4000/1787640105378 -- JS-profile.jpg', '$2b$10$zHpCqWGESPVeM5rEGhSL9OERV.qy2actk8kNNLP3XWbf8lSB6B3E2', 'Super', 'Admin', '123'),
('User', 'Philippines', 'Angular 16', 'angular@gmail.com', 'http://localhost:4000/1787640283087 -- Angular.png', NULL, 'Angular', '16', '09928389223'),
('User', 'Philippines', 'Solid JS', 'Solid@gmai.com', 'http://localhost:4000/1787640337551 -- Solid.jpg', NULL, 'Solid', 'JS', '9928389439'),
('User', 'Philippines', 'Vue JS ', 'vue@gmail.com', 'http://localhost:4000/1787640395976 -- Vue.png', NULL, 'Vue', 'JS', '9928389330'),
('User', 'Philippines', 'Cai Mika', 'mika@gmail.com', 'http://localhost:4000/1787640629262 -- 9.jpg', NULL, 'Mika', 'Cai', '9928389329'),
('User', 'Philippines', 'Al Celo', 'alcelo@gmail.com', 'http://localhost:4000/1787640745171 -- images.jpg', NULL, 'Al', 'Celo', '09928389922'),
('User', 'Philippines', 'Gian Mak', 'gian@gmail.com', 'http://localhost:4000/1787640792187 -- 5.jpg', NULL, 'Gian', 'Mak', '9928389329'),
('User', 'Philippines', 'Angelyn Cun', 'angelyn@gmail.com', 'http://localhost:4000/1787640929572 -- 6.jpg', NULL, 'Angelyn', 'Cun', '9928389221'),
('User', 'Philippines', 'Mike ross', 'mike@gmail.com', 'http://localhost:4000/1787640997290 -- 7.jpg', NULL, 'mike', 'ross', '09928389221'),
('User', 'Philippines', 'David Kim', 'david@gmail.com', 'http://localhost:4000/1787641074057 -- 8.jpg', NULL, 'David', 'Kim', '9928389770'),
('User', 'Philippines', 'Sai mon', 'sai@gmail.com', 'http://localhost:4000/1787641203068 -- 2.jpg', NULL, 'Sai', 'Mon', '9928389879');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
