-- MySQL dump 10.15  Distrib 10.0.38-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: tut19belote_onlinegames
-- ------------------------------------------------------
-- Server version	10.0.38-MariaDB-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `tut19belote_onlinegames`
--


--
-- Table structure for table `bataille`
--

DROP TABLE IF EXISTS `bataille`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bataille` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bataille`
--

LOCK TABLES `bataille` WRITE;
/*!40000 ALTER TABLE `bataille` DISABLE KEYS */;
INSERT INTO `bataille` VALUES (1,'Nghangha','Billy','',1,'','',1),(2,'BILLY !','Billy','Kingspades,3clubs,Kinghearts,4clubs,6hearts,5spades,1clubs,Jackhearts,6diamonds,5hearts,10spades,5clubs,Queendiamonds,Jackspades,9hearts,3spades,3diamonds,2spades,Jackdiamonds,10hearts,2diamonds,Kingdiamonds,6clubs,4hearts,9spades,5diamonds',0,'maxx','1hearts,4spades,8diamonds,1spades,10diamonds,7clubs,Queenhearts,3hearts,7spades,4diamonds,2hearts,8clubs,1diamonds,Jackclubs,10clubs,Queenspades,7diamonds,8hearts,7hearts,Queenclubs,9diamonds,Kingclubs,2clubs,8spades,6spades,9clubs',0);
/*!40000 ALTER TABLE `bataille` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `belote`
--

DROP TABLE IF EXISTS `belote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `belote` (
  `idB` int(11) NOT NULL AUTO_INCREMENT,
  `nom` text NOT NULL,
  `J1` text NOT NULL,
  `J1Paquet` text NOT NULL,
  `J1Status` text NOT NULL,
  `J2` text NOT NULL,
  `J2Paquet` text NOT NULL,
  `J2Status` text NOT NULL,
  `J3` text NOT NULL,
  `J3Paquet` text NOT NULL,
  `J3Status` text NOT NULL,
  `J4` text NOT NULL,
  `J4Paquet` text NOT NULL,
  `J4Status` text NOT NULL,
  PRIMARY KEY (`idB`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `belote`
--

LOCK TABLES `belote` WRITE;
/*!40000 ALTER TABLE `belote` DISABLE KEYS */;
/*!40000 ALTER TABLE `belote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jeux`
--

DROP TABLE IF EXISTS `jeux`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jeux` (
  `idgame` int(11) NOT NULL AUTO_INCREMENT,
  `joueurs` text NOT NULL,
  `jeu` text NOT NULL,
  `nom` text NOT NULL,
  PRIMARY KEY (`idgame`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeux`
--

LOCK TABLES `jeux` WRITE;
/*!40000 ALTER TABLE `jeux` DISABLE KEYS */;
/*!40000 ALTER TABLE `jeux` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lobby`
--

DROP TABLE IF EXISTS `lobby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lobby` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `joueurs` text NOT NULL,
  `jeu` text NOT NULL,
  `nom` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lobby`
--

LOCK TABLES `lobby` WRITE;
/*!40000 ALTER TABLE `lobby` DISABLE KEYS */;
INSERT INTO `lobby` VALUES (1,'','bataille','Nghangha');
/*!40000 ALTER TABLE `lobby` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `sess_id` varchar(64) NOT NULL,
  `user` text NOT NULL,
  `access` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `data` text NOT NULL,
  PRIMARY KEY (`sess_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('6291bd3lo1vb26imhro2hpjfsa','maxx','2020-06-18 12:22:29','user|s:4:\"maxx\";gid|s:1:\"2\";game|s:8:\"bataille\";'),('8tastlpk2catkfmlbh4utp3bvn','Billy','2020-06-18 12:22:25','user|s:5:\"Billy\";game|s:8:\"bataille\";gid|s:1:\"2\";');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `pass` text NOT NULL,
  `mail` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'maxx','8ffc4674e44d1dffafe02b58603a9621','maxx@maxx.maxx'),(2,'Billy','08f90c1a417155361a5c4b8d297e0d78','billydebilus@gmail.com'),(3,'non','14b8f0494c6f1460c3720d0ce692dbca','non@non.non'),(4,'a','0cc175b9c0f1b6a831c399e269772661','a@a.a'),(5,'Thierry','0cc175b9c0f1b6a831c399e269772661','a.@a');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-18 16:22:30

