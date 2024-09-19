CREATE DATABASE  IF NOT EXISTS `electrozone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `electrozone`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: electrozone
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `seller`
--

DROP TABLE IF EXISTS `seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_on` date DEFAULT NULL,
  `updated_on` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `bank_account_no` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gst_no` varchar(255) DEFAULT NULL,
  `ifsc_number` varchar(255) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_no` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_85g26aoyfs7kyeiao7v81kqkw` (`bank_account_no`),
  UNIQUE KEY `UK_crgbovyy4gvgsum2yyb3fbfn7` (`email`),
  UNIQUE KEY `UK_gsnhr9xlww0bsb31xq77m6s7c` (`gst_no`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller`
--

LOCK TABLES `seller` WRITE;
/*!40000 ALTER TABLE `seller` DISABLE KEYS */;
INSERT INTO `seller` VALUES (1,'2024-08-07','2024-08-07 16:09:20.087429','string','string','string','string','789456123333789456123333','string',_binary '\0','string','string','789456123333',NULL),(3,'2024-08-07','2024-08-07 16:11:34.001476','Sunbeam Pune','789456123','Mumbai','string1','5345655912345665','123456789',_binary '','mad','string','1234567899',NULL),(4,'2024-08-14','2024-08-14 02:07:53.612322','MAHARASHTRA BANK, Phase 1, Shivaji Chowk, Hinjewadi, Pune','654899564','MAHARASHTRA BANK','chetan@gmail.com','123456789123456','MHB897456135',_binary '','Chetan','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','7768862279','SELLER'),(5,'2024-08-14','2024-08-14 02:10:30.054218','SBI Office, Phase 2, Opposite Sunbeam, Hinjewadi, Pune','946512367','State Bank of India','om@gmail.com','123456789123452','SBI2024814',_binary '','Om','60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752','9455667894','SELLER'),(6,'2024-08-14','2024-08-14 02:12:33.367149','BOB, Phase 3, Quandrant circle, Hinjewadi, Pune','321456894','Bank of Badoda','asmita@gmail.com','923456759123452','BOB321589',_binary '','Asmita','fd61a03af4f77d870fc21e05e7e80678095c92d808cfb3b5c279ee04c74aca13','9876543213','SELLER');
/*!40000 ALTER TABLE `seller` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-14 16:24:16
