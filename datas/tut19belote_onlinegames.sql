-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 23 juin 2020 à 07:30
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
-- Base de données :  `tut19belote_onlinegames`
--

-- --------------------------------------------------------

--
-- Structure de la table `bataille`
--

DROP TABLE IF EXISTS `bataille`;
CREATE TABLE IF NOT EXISTS `bataille` (
  `idB` int(11) NOT NULL,
  `nom` text NOT NULL,
  `J1` text NOT NULL,
  `J1Paquet` text NOT NULL,
  `J1Status` tinyint(1) NOT NULL DEFAULT '0',
  `J2` text NOT NULL,
  `J2Paquet` text NOT NULL,
  `J2Status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idB`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `belote`
--

DROP TABLE IF EXISTS `belote`;
CREATE TABLE IF NOT EXISTS `belote` (
  `idB` int(11) NOT NULL AUTO_INCREMENT,
  `nom` text NOT NULL,
  `team1` text NOT NULL,
  `team2` text NOT NULL,
  `reserve` text NOT NULL,
  `J1` text NOT NULL,
  `J1Paquet` text NOT NULL,
  `J1Status` tinyint(1) NOT NULL DEFAULT '0',
  `J2` text NOT NULL,
  `J2Paquet` text NOT NULL,
  `J2Status` tinyint(1) NOT NULL DEFAULT '0',
  `J3` text NOT NULL,
  `J3Paquet` text NOT NULL,
  `J3Status` tinyint(1) NOT NULL DEFAULT '0',
  `J4` text NOT NULL,
  `J4Paquet` text NOT NULL,
  `J4Status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idB`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `belote`
--

INSERT INTO `belote` (`idB`, `nom`, `team1`, `team2`, `reserve`, `J1`, `J1Paquet`, `J1Status`, `J2`, `J2Paquet`, `J2Status`, `J3`, `J3Paquet`, `J3Status`, `J4`, `J4Paquet`, `J4Status`) VALUES
(1, '852ml', 'maxx', '', '', 'maxx', '', 0, '', '', 0, '', '', 0, '', '', 0);

-- --------------------------------------------------------

--
-- Structure de la table `jeux`
--

DROP TABLE IF EXISTS `jeux`;
CREATE TABLE IF NOT EXISTS `jeux` (
  `idgame` int(11) NOT NULL AUTO_INCREMENT,
  `joueurs` text NOT NULL,
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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `lobby`
--

INSERT INTO `lobby` (`id`, `joueurs`, `jeu`, `nom`) VALUES
(1, '', 'belote', '852ml');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `sess_id` varchar(64) NOT NULL,
  `user` text NOT NULL,
  `access` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `pass`, `mail`) VALUES
(1, 'maxx', '8ffc4674e44d1dffafe02b58603a9621', 'maxx@maxx.maxx'),
(2, 'Billy', '08f90c1a417155361a5c4b8d297e0d78', 'billydebilus@gmail.com'),
(3, 'non', '14b8f0494c6f1460c3720d0ce692dbca', 'non@non.non'),
(4, 'a', '0cc175b9c0f1b6a831c399e269772661', 'a@a.a'),
(5, 'Thierry', '0cc175b9c0f1b6a831c399e269772661', 'a.@a'),
(6, 'xxam', 'abe75aff924eae71056db26aed7b0a61', 'a@a.a');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
