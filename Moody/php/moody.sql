-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 07 mai 2024 à 04:32
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `moody`
--

-- --------------------------------------------------------

--
-- Structure de la table `activite`
--

CREATE TABLE `activite` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `activite`
--

INSERT INTO `activite` (`id`, `name`) VALUES
(5, 'STUDYING'),
(6, 'DANCING'),
(7, 'TRAINING'),
(8, 'DRIVING'),
(9, 'WALKING'),
(10, 'CHILLING'),
(11, 'PLAYING'),
(12, 'READING'),
(13, 'PAINTING');

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` varchar(255) NOT NULL,
  `admin_email` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `admin_email`, `pwd`) VALUES
('', 'admin', 'admin2003');

-- --------------------------------------------------------

--
-- Structure de la table `artiste`
--

CREATE TABLE `artiste` (
  `username` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `nb_abonne` int(11) NOT NULL,
  `nb_song` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `artiste`
--

INSERT INTO `artiste` (`username`, `nickname`, `nb_abonne`, `nb_song`) VALUES
('Abel', 'the weeknd', 0, 0),
('alaa', 'A.L.A', 1000025, 3),
('alix', 'samara', 0, 0),
('billieeilish', 'billie eilish', 0, 0),
('FRo', 'Frank Ocean', 0, 0),
('hamza', 'MC hamza', 0, 0),
('hwas', 'sel3a', 50, 852),
('lalisa', 'BLACKPINK', 0, 0),
('lmh', 'MC lmh', 0, 0),
('shiro', 'MC shiro', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

CREATE TABLE `avis` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `rate` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `avis`
--

INSERT INTO `avis` (`id`, `username`, `rate`, `message`) VALUES
(2, 'hamza', '3', 'test'),
(5, 'GUEST', '5', 'Moody is the best website ever , you can listen what ever you want without any pub for free'),
(6, 'GUEST', '5', 'This website is the best version of spotify i really like <3'),
(7, 'GUEST', '4', 'Explore Moody, your free, ad-free music paradise! Listen to anything you want, anytime—no catches!');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `name`) VALUES
(3, 'POP'),
(4, 'K-POP'),
(5, 'DRILL'),
(6, 'CLASSIC'),
(7, 'JAZZ'),
(8, 'ROCK'),
(9, 'HIP-HOP'),
(10, 'METAL'),
(11, 'COUNTRY');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `pdp` varchar(255) NOT NULL,
  `gender` char(1) NOT NULL,
  `codec` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`username`, `name`, `last_name`, `email`, `pwd`, `pdp`, `gender`, `codec`) VALUES
('Abel', 'Makkonen', 'Tesfaye', 'the.weeknd@gmail.com', 'Abel2003', '../src/assets/img/weeknd.jpg', 'H', NULL),
('alaa', 'ala', 'zahrouni', 'ALA@gmail.com', 'ZZH5.ALA', '../src/assets/img/ala.jpeg', 'H', NULL),
('billieeilish', 'Billie', 'Eilish', 'BILLIEEILISH@UMGSTORES.tn', 'BILLIEEILISH', '../src/assets/ProfileImages/billieeilish.jpg', 'F', NULL),
('FRo', 'Frank', 'Ocean', 'FrankOcean@gmail.com', 'Mejri2003.', '../src/assets/ProfileImages/FRo.jpg', 'H', NULL),
('hamza', 'ham', 'za', 'hamzajwi@gmail.com', 'Mejri2003.', '../src/assets/img/default_profile_image.jpg', 'H', NULL),
('hwas', 'houssem', 'marzouk', 'houssem.marzouk.x@gmail.com', 'hwas2003.', '../src/assets/ProfileImages/hwas.jpg', 'H', NULL),
('lalisa', 'lisa', 'qui', 'lalisa@gmail.com', 'Mejri2003.', '../src/assets/ProfileImages/lalisa.jpg', 'F', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(300) NOT NULL,
  `description` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`id`, `username`, `email`, `subject`, `description`) VALUES
(1, 'hwas', 'houssem.marzouk.x@gmail.com', 'ye5dem', 'eyy o lee? ');

-- --------------------------------------------------------

--
-- Structure de la table `favoris`
--

CREATE TABLE `favoris` (
  `id` int(11) NOT NULL,
  `id_song` int(11) NOT NULL,
  `id_c` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `favoris`
--

INSERT INTO `favoris` (`id`, `id_song`, `id_c`) VALUES
(1, 41, 'hwas'),
(2, 44, 'Abel'),
(3, 47, 'Abel'),
(4, 40, 'Abel'),
(5, 41, 'Abel'),
(6, 44, 'billieeilish'),
(7, 43, 'lalisa'),
(8, 58, 'hamza'),
(9, 46, 'hamza');

-- --------------------------------------------------------

--
-- Structure de la table `follow`
--

CREATE TABLE `follow` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `id_Artiste` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `follow`
--

INSERT INTO `follow` (`id`, `username`, `id_Artiste`) VALUES
(1, 'elking', 'hwas'),
(2, 'elking', 'alaa'),
(3, 'hwas', 'alaa'),
(5, 'hwas', 'alix'),
(21, 'shiro', 'Abel'),
(22, 'hwas', 'Abel'),
(23, 'hwas', 'billieeilish'),
(24, 'lalisa', 'Abel'),
(25, 'hamza', 'lalisa');

-- --------------------------------------------------------

--
-- Structure de la table `mood`
--

CREATE TABLE `mood` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `mood`
--

INSERT INTO `mood` (`id`, `name`) VALUES
(2, 'SAD'),
(3, 'HAPPY'),
(4, 'ANGRY'),
(5, 'MOTIVATED'),
(6, 'CALM'),
(7, 'ROMANTIC'),
(8, 'RELAXED'),
(9, 'CONFIDENT'),
(10, 'NOSTALGIC');

-- --------------------------------------------------------

--
-- Structure de la table `song`
--

CREATE TABLE `song` (
  `id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `id_artist` varchar(255) NOT NULL,
  `cover` varchar(255) NOT NULL,
  `id_mood` int(11) NOT NULL,
  `id_tempo` int(11) NOT NULL,
  `id_activity` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `song`
--

INSERT INTO `song` (`id`, `url`, `name`, `id_artist`, `cover`, `id_mood`, `id_tempo`, `id_activity`, `id_category`, `date`) VALUES
(40, '../src/assets/SongsSrc/AfterHours.mp3', 'After Hours', 'Abel', '../src/assets/CoversSrc/AfterHours.jpg', 2, 6, 10, 3, '2024-04-27'),
(41, '../src/assets/SongsSrc/SaveYourTears.mp3', 'Save Your Tears', 'Abel', '../src/assets/CoversSrc/SaveYourTears.jpg', 2, 5, 10, 3, '2024-04-27'),
(43, '../src/assets/SongsSrc/BlindingLights.mp3', 'Blinding Lights', 'Abel', '../src/assets/CoversSrc/BlindingLights.jpg', 3, 3, 6, 3, '2024-04-27'),
(44, '../src/assets/SongsSrc/Starboy.mp3', 'Starboy', 'Abel', '../src/assets/CoversSrc/Starboy.png', 3, 3, 10, 3, '2024-04-27'),
(45, '../src/assets/SongsSrc/OneOfTheGirls.mp3', 'One Of The Girls', 'Abel', '../src/assets/CoversSrc/OneOfTheGirls.jpg', 7, 6, 10, 3, '2024-04-27'),
(46, '../src/assets/SongsSrc/HouseOfBalloons.mp3', 'House Of Balloons', 'Abel', '../src/assets/CoversSrc/HouseOfBalloons.png', 3, 6, 10, 3, '2024-04-27'),
(47, '../src/assets/SongsSrc/CallOutMyName.mp3', 'Call Out My Name', 'Abel', '../src/assets/CoversSrc/CallOutMyName.jpg', 7, 5, 10, 3, '2024-04-27'),
(50, '../src/assets/SongsSrc/Lovely.mp3', 'Lovely', 'billieeilish', '../src/assets/CoversSrc/Lovely.jpg', 2, 5, 10, 3, '2024-04-29'),
(51, '../src/assets/SongsSrc/everythingiwanted.mp3', 'everything i wanted', 'billieeilish', '../src/assets/CoversSrc/everythingiwanted.jpg', 2, 5, 10, 3, '2024-04-29'),
(52, '../src/assets/SongsSrc/Locket.mp3', 'Locket ', 'billieeilish', '../src/assets/CoversSrc/Locket.jpeg', 2, 6, 10, 3, '2024-04-29'),
(53, '../src/assets/SongsSrc/OceanEyes.mp3', 'Ocean Eyes', 'billieeilish', '../src/assets/CoversSrc/OceanEyes.jpg', 2, 6, 10, 3, '2024-04-29'),
(54, '../src/assets/SongsSrc/HappierThanEver.mp3', 'Happier Than Ever', 'billieeilish', '../src/assets/CoversSrc/HappierThanEver.webp', 2, 6, 10, 3, '2024-04-29'),
(55, '../src/assets/SongsSrc/whenthepartysover.mp3', 'when the partys over', 'billieeilish', '../src/assets/CoversSrc/whenthepartysover.jpg', 2, 6, 10, 3, '2024-04-29'),
(56, '../src/assets/SongsSrc/ShutDown.mp3', 'Shut Down', 'lalisa', '../src/assets/CoversSrc/ShutDown.jpg', 3, 3, 6, 4, '2024-04-30'),
(57, '../src/assets/SongsSrc/PinkVenom.mp3', 'Pink Venom', 'lalisa', '../src/assets/CoversSrc/PinkVenom.jpg', 3, 6, 6, 4, '2024-04-30'),
(58, '../src/assets/SongsSrc/HowYouLikeThat.mp3', 'How You Like That', 'lalisa', '../src/assets/CoversSrc/HowYouLikeThat.png', 3, 6, 6, 4, '2024-04-30'),
(59, '../src/assets/SongsSrc/KillThisLove.mp3', 'Kill This Love', 'lalisa', '../src/assets/CoversSrc/KillThisLove.jpg', 3, 6, 6, 4, '2024-04-30'),
(60, '../src/assets/SongsSrc/LALISA.mp3', 'LALISA', 'lalisa', '../src/assets/CoversSrc/LALISA.jpg', 3, 6, 6, 4, '2024-04-30'),
(61, '../src/assets/SongsSrc/PinkandWhite.mp3', 'Pink and White', 'FRo', '../src/assets/CoversSrc/PinkandWhite.jpg', 7, 6, 10, 3, '2024-04-30');

-- --------------------------------------------------------

--
-- Structure de la table `tempo`
--

CREATE TABLE `tempo` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tempo`
--

INSERT INTO `tempo` (`id`, `name`) VALUES
(3, 'FAST'),
(4, 'MODERATE'),
(5, 'SLOW'),
(6, 'VARIED');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activite`
--
ALTER TABLE `activite`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`,`admin_email`),
  ADD KEY `admin_email` (`admin_email`,`id`);

--
-- Index pour la table `artiste`
--
ALTER TABLE `artiste`
  ADD PRIMARY KEY (`username`,`nickname`);

--
-- Index pour la table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`username`),
  ADD KEY `email` (`email`);

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- Index pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_c` (`id_c`),
  ADD KEY `id_song` (`id_song`);

--
-- Index pour la table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follow_ibfk_1` (`id_Artiste`);

--
-- Index pour la table `mood`
--
ALTER TABLE `mood`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `url` (`url`),
  ADD KEY `id_activity` (`id_activity`),
  ADD KEY `id_artist` (`id_artist`),
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_mood` (`id_mood`),
  ADD KEY `id_tempo` (`id_tempo`);

--
-- Index pour la table `tempo`
--
ALTER TABLE `tempo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activite`
--
ALTER TABLE `activite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `avis`
--
ALTER TABLE `avis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `favoris`
--
ALTER TABLE `favoris`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `mood`
--
ALTER TABLE `mood`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `song`
--
ALTER TABLE `song`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT pour la table `tempo`
--
ALTER TABLE `tempo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`username`) REFERENCES `client` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD CONSTRAINT `favoris_ibfk_1` FOREIGN KEY (`id_c`) REFERENCES `client` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favoris_ibfk_2` FOREIGN KEY (`id_song`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`id_Artiste`) REFERENCES `artiste` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `song_ibfk_1` FOREIGN KEY (`id_activity`) REFERENCES `activite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `song_ibfk_2` FOREIGN KEY (`id_artist`) REFERENCES `artiste` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `song_ibfk_3` FOREIGN KEY (`id_category`) REFERENCES `categorie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `song_ibfk_4` FOREIGN KEY (`id_mood`) REFERENCES `mood` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `song_ibfk_5` FOREIGN KEY (`id_tempo`) REFERENCES `tempo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
