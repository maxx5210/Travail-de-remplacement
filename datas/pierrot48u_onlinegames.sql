-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 10 juin 2020 à 14:02
-- Version du serveur :  8.0.18
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pierrot48u_onlinegames`
--

-- --------------------------------------------------------

--
-- Structure de la table `jeux`
--

DROP TABLE IF EXISTS `jeux`;
CREATE TABLE IF NOT EXISTS `jeux` (
  `idgame` int(11) NOT NULL AUTO_INCREMENT,
  `joueurs` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `jeu` text NOT NULL,
  `nom` text NOT NULL,
  PRIMARY KEY (`idgame`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `lobby`
--

DROP TABLE IF EXISTS `lobby`;
CREATE TABLE IF NOT EXISTS `lobby` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `joueurs` text NOT NULL,
  `jeu` text NOT NULL,
  `nom` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `sess_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user` text NOT NULL,
  `access` timestamp NOT NULL,
  `data` text NOT NULL,
  PRIMARY KEY (`sess_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `pass` text NOT NULL,
  `mail` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
