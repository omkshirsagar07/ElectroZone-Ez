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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_on` date DEFAULT NULL,
  `updated_on` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'2024-08-07','2024-08-12 19:56:12.623428','Immerse yourself in superior sound with our stylish headphones. Enjoy crystal-clear audio, a comfortable fit, and noise-canceling technology for an unparalleled listening experience, whether you\'re on the go or relaxing at home','images/headphones.svg',_binary '','Headset'),(2,'2024-08-12','2024-08-12 19:55:17.933470','Unleash your productivity with our cutting-edge laptops. Combining powerful performance, sleek design, and long-lasting battery life, they are perfect for work, study, or entertainment?anytime, anywhere.','images/laptop.svg',_binary '','Laptop'),(3,'2024-08-12','2024-08-12 18:01:27.166333','Stay connected in style with our latest mobile phones. Offering powerful performance, stunning displays, and advanced cameras, they keep you ahead in work, play, and everything in between.','images/phone.svg',_binary '','Phone'),(4,'2024-08-13','2024-08-14 02:25:27.441559','Transform laundry day with our stylish, energy-efficient washing machines. Combining cutting-edge technology with sleek design, they offer reliable performance and effortless cleaning to fit your modern lifestyle','images/Washer.svg',_binary '','Washer'),(5,'2024-08-13','2024-08-13 23:09:01.916580','Elevate your entertainment with our premium TVs. Featuring stunning 4K clarity, vibrant colors, and sleek designs, they deliver immersive viewing experiences that transform any room into a cinematic haven.','images/TV.svg',_binary '','Televison'),(6,'2024-08-13','2024-08-13 23:11:24.525341','Keep your food fresh and organized with our modern refrigerators. With advanced cooling technology, spacious interiors, and sleek designs, they offer optimal performance and style for your kitchen','images/refrigerator.svg',_binary '','Fridge'),(7,'2024-08-13','2024-08-13 23:12:33.791754','Enhance your audio experience with our top-quality speakers. Delivering rich sound, powerful bass, and sleek design, they bring music and entertainment to life with crystal-clear clarity and immersive depth.','images/speaker.svg',_binary '','Speaker'),(8,'2024-08-13','2024-08-13 23:16:55.456528','Elevate your grooming routine with our premium products. Designed for precision and comfort, they offer exceptional performance to keep you looking sharp and feeling confident every day.','images/hairdryer.svg',_binary '','Grooming'),(9,'2024-08-14','2024-08-14 02:22:21.921728','Stay cool and comfortable with our energy-efficient air conditioners. Designed for powerful cooling and quiet operation, they bring the perfect climate to your space, no matter how hot it gets outside','images/ac.svg',_binary '','AC'),(10,'2024-08-14','2024-08-14 02:23:35.636136','Discover the perfect blend of style and precision with our exquisite watches. Designed with elegance and accuracy in mind, they are the ultimate accessory to enhance your look and keep you on time.','images/watch.svg',_binary '','Watch'),(11,'2024-08-14','2024-08-14 02:24:54.825258','Capture every moment in stunning detail with our high-performance cameras. Whether you\'re a pro or a hobbyist, enjoy advanced features, sharp image quality, and sleek design for perfect shots every time','images/camera.svg',_binary '','Camera');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-14 16:24:15
