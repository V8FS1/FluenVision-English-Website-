-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 06, 2024 at 04:23 PM
-- Server version: 10.5.20-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `DatabasePhp`
--

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `quizName` varchar(255) NOT NULL,
  `point` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `userId`, `quizName`, `point`, `level`) VALUES
(1, 1, 'Listening', '50', 'A1'),
(2, 14, 'Listening', '17', 'A1'),
(3, 16, 'Listening', '50', 'A1'),
(4, 16, 'Reading', '67', 'A1'),
(5, 0, 'Vocabulary', '38', 'A1 - A2'),
(6, 16, 'Vocabulary', '38', 'A1 - A2'),
(7, 16, 'Writing', '50', 'A1'),
(8, 16, 'Speaking', '67', 'A1'),
(9, 19, 'Listening', '17', 'A1'),
(10, 19, 'Grammer', '30', 'B2'),
(11, 1, 'Reading', '50', 'A1'),
(12, 1, 'Grammer', '0', 'B2'),
(13, 1, 'Writing', '17', 'A1'),
(14, 1, 'Speaking', '33', 'A1'),
(15, 33, 'Listening', '100', 'A1'),
(16, 33, 'Reading', '50', 'A1'),
(17, 19, 'Speaking', '17', 'A1'),
(18, 19, 'Reading', '0', 'A1'),
(19, 38, 'Reading', '67', 'A1'),
(20, 29, 'Grammer', '0', 'B2'),
(21, 41, 'Grammer', '0', 'B2'),
(22, 41, 'Listening', '67', 'A1'),
(23, 32, 'Grammer', '0', 'B2');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`) VALUES
(1, 'majeed@gmail.com', 'Majeed_Albeerawi', 123123),
(19, 'timi@gmail.com', 'timi', 123456789),
(28, 'abdo@gmail.com', 'abdo', 123456),
(29, 'moha@gmail.com', 'mohanad1', 123123),
(30, 'moha@gmail.com', 'mohanad1', 123123),
(31, 'moha@gmail.com', 'mohanad', 123456),
(32, 'moh@gmail.com', 'mohanad', 123456),
(33, 'mm10@gmail.com', 'majeed1', 1234567),
(34, 'nz.202@gmail.com', 'NZZZ', 12345678),
(35, 'NZZ202@gmail.com', 'MNZ', 1234567),
(36, 'faisalslama@gmail.com', 'faisalsalama', 123456),
(37, 'saim@gmail.com', 'salim', 111111),
(38, 'sa@gmail.com', 'sa', 222222),
(41, 'faisal@gmail.com', 'f', 123456),
(42, 'fares@gmail.com', 'fares', 123456),
(43, 'faresgmail.com', 'fares', 123456),
(44, 'FFF@GMAIL.COM', 'aaa', 123456),
(45, 'FFF1@GMAIL.COM', 'FF', 123456),
(46, 'suleimn@gmail.com', 'ssss', 222222),
(47, 'q@gmail.com', 'qqq', 111111),
(48, 'gg@gmail.com', 'Momo', 123457),
(49, 'koko@gmail.com', 'koko', 123456);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
