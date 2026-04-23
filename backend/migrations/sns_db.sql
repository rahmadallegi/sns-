-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: sns_db
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `about_cards`
--

DROP TABLE IF EXISTS `about_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `about_cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `about_cards`
--

LOCK TABLES `about_cards` WRITE;
/*!40000 ALTER TABLE `about_cards` DISABLE KEYS */;
INSERT INTO `about_cards` VALUES (1,'MISSION','SNS aims to lead in the MENA region in Construction, Operations & Maintenance, Support Services, and Waste Management, delivering top customer satisfaction through innovation, safety, and sustainability.'),(2,'VISION','To lead in Construction, Operations & Maintenance, and Waste Management, delivering high standards and customer satisfaction, while leveraging advanced technologies to be a trusted national and international partner.'),(3,'VALUES','Since its inception, SNS has been built on strong principles, guided by transparency, integrity, sustainability, and innovation. Teamwork, social responsibility, and the highest safety standards remain at the core of everything we do.');
/*!40000 ALTER TABLE `about_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (2,'admin@example.com','$2b$10$wTFvopHnHmT9HNlL6/Cb1.NEKduVA99/bQP/YdB39zdqpV460LfgO','Admin','2026-03-16 21:59:05');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificates`
--

DROP TABLE IF EXISTS `certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificates`
--

LOCK TABLES `certificates` WRITE;
/*!40000 ALTER TABLE `certificates` DISABLE KEYS */;
INSERT INTO `certificates` VALUES (1,'Command Control and Tactical','certificates/cert-1.jpg'),(2,'166th Area Support Group','certificates/cert-2.jpg'),(3,'Task Force Mountain','certificates/cert-3.jpg'),(4,'16th Engineering Brigade','certificates/cert-4.jpg'),(5,'BAE Systems','certificates/cert-5.jpg');
/*!40000 ALTER TABLE `certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'SEAPA - Saudi Ports Authority','/images/clients/seapa.png','2026-03-16 22:29:36','2026-03-16 22:29:36'),(2,'RSNF - Royal Saudi Navy','/images/clients/rsnf.png','2026-03-16 22:29:36','2026-03-17 22:36:28'),(3,'Ministry of Water & Electricity','/images/clients/mwe.png','2026-03-16 22:29:36','2026-03-16 22:54:34'),(4,'GACA - General Authority of Civil Aviation','/images/clients/gaca.png','2026-03-16 22:29:36','2026-03-17 22:36:28'),(5,'USMTM - US Military Trng. Mission','/images/clients/usmtm.png','2026-03-16 22:29:36','2026-03-17 22:36:28'),(6,'King Abdulaziz International Airport','/images/clients/kaia.png','2026-03-16 22:29:36','2026-03-16 22:53:36'),(7,'MCI - Ministry of Culture & Information','/images/clients/mci.png','2026-03-16 23:04:49','2026-03-16 23:04:49'),(8,'King Khalid International Airport','/images/clients/kkia.png','2026-03-16 23:07:46','2026-03-16 23:07:46'),(9,'King Fahad International Airport','/images/clients/kfia.png','2026-03-16 23:09:11','2026-03-16 23:09:11'),(10,'PSAB - Prince Sultan Airbase AlKharj','/images/clients/psab.png','2026-03-16 23:10:45','2026-03-16 23:10:45'),(11,'SBA- Saudi Broadcasting Authority','/images/clients/sba.jpg','2026-03-16 23:12:30','2026-03-16 23:12:56'),(12,'MEWA - Ministry of Environment','/images/clients/mewa.jpg','2026-03-16 23:15:19','2026-03-16 23:15:19'),(13,'Royal commission Yanbu','/images/clients/royalcom.png','2026-03-16 23:17:05','2026-03-16 23:17:05');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compliance`
--

DROP TABLE IF EXISTS `compliance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compliance` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_compliance_display_order` (`display_order`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compliance`
--

LOCK TABLES `compliance` WRITE;
/*!40000 ALTER TABLE `compliance` DISABLE KEYS */;
INSERT INTO `compliance` VALUES (1,'Corporate Social Responsibility (CSR)','SNS belives and acts socially responsible. It has reorganized its business goal post to not only benefit in business but also help society.\nTo foster its social goals it has ensured that it:\n- Has improveed upon local hiring to boost Saudization\n- Hiring more Saudi women into workforce\n- Not just hiring for labor law but offer more incentives and special OJT to develop a productive Saudi population\n- Allow college students to be trained at office campus to support their projects','compliance/csr.png',1,'2026-03-16 22:30:16','2026-03-18 23:06:31'),(2,'Sustainability','It is a twin edged sword for our business. What our Waste Management stands for is a symbol of Sustainability.\nSNS employs following methodologies for protecting environment:\n- Reduce Waste\n- Recycle\n- We ensure to maximize recyclable content in our procurement\n- We minimize single use materials/tools/equipment to reduce waste\n- We maintain separate components and materials for recyclable process\n- Employee awareness and training on sustainable methods is part of new recruitment training','compliance/sustainability.png',2,'2026-03-16 22:30:16','2026-03-18 23:06:31'),(3,'Health Safety Environment (HSE)','SNS belives its employees are true assets. It has put effort to ensure people safety comes first. It performs regular auditing to stay health and safety compliant. It also has a Health Safety Environment (HSE) plan ready in place. The company has produced Health Safety Environment Manual.','compliance/hse.png',3,'2026-03-16 22:30:16','2026-03-18 22:41:50'),(4,'KPIs','SNS evaluates its progress according to core KPIs:\n- Customer Satisfaction\n- Internal Process Quality\n- Employee Satisfaction\n- Financial Performance Index','compliance/kpi.png',0,'2026-03-18 22:43:30','2026-03-18 22:43:30'),(5,'Quality Control','Saudi Naval Support Company is committed to establishing effective plans to deliver quality in its key business activities and meet its obligations to its customers and other stakeholders. In line with the standard, it is essential that our quality objectives are consistent with our policies, measurable where practicable, communicated effectively within the organization (and outside where appropriate) and updated as part of the QMS management review process. Objectives will be based on a clear understanding of our requirements, including those from interested parties, and will take into account the results of and risk and opportunity assessments carried out at various levels within the organization.','compliance/quality-control.png',0,'2026-03-18 22:45:44','2026-03-18 22:45:44'),(6,'Ethics','As part of our commitment, the organisation has established a Quality Management System (QMS) which complies with the requirements of the ISO9001 international standard for quality management systems and will be seeking certification to this standard in the near future.\nEthics and integrity is always born in mind. We source material only from suppliers who have impeccable human rights and compliance records, and we ensure that our supply chain is of high integrity and we monitor our entire operation for compliance with our Code.\nOur core values at Saudi Naval Support Company (SNS) are:\n- Honesty\n- Integrity\n- Trustworthiness\n- Respect for others\n- Responsibility\n- Accountability\n- Reliability\n- Obedience to the law\nOur commitment to integrity begins with complying with laws, rules and regulations. We understand and comply with the legal requirements and commercial practices of lawful business.\nWe are committed to adhere to every valid and binding contractual agreement that we conclude, and we do not abuse our rights. We are committed to meet current requirements without compromising the needs of future generations. To this, we combine economic, environmental and social factors in our operation and our business decisions.','compliance/ethics.png',0,'2026-03-18 22:49:28','2026-03-18 22:49:28');
/*!40000 ALTER TABLE `compliance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` int NOT NULL DEFAULT '1',
  `address` varchar(255) DEFAULT NULL,
  `phone1` varchar(50) DEFAULT NULL,
  `phone2` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'Bldg. No.13,\nMohammad Bin Dakheel Street,\nAl Aqiq District, Riyadh, Saudi Arabia','+966 (0)11-482-7933','+966 (0)11-294-3200','sns@snscl.com','+966 (011-492-8079)');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_service_images`
--

DROP TABLE IF EXISTS `core_service_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_service_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(500) DEFAULT NULL,
  `service_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id_idx` (`service_id`),
  CONSTRAINT `service_id` FOREIGN KEY (`service_id`) REFERENCES `core_services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_service_images`
--

LOCK TABLES `core_service_images` WRITE;
/*!40000 ALTER TABLE `core_service_images` DISABLE KEYS */;
INSERT INTO `core_service_images` VALUES (1,'services/construction/marine-tower.jpg',1),(5,'services/parking/main.jpg',5),(6,'services/oandm/main.jpg',2),(7,'services/support/3.jpg',7),(8,'services/telecom/2.jpg',3),(9,'services/waste/1.jpg',4);
/*!40000 ALTER TABLE `core_service_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_services`
--

DROP TABLE IF EXISTS `core_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_services`
--

LOCK TABLES `core_services` WRITE;
/*!40000 ALTER TABLE `core_services` DISABLE KEYS */;
INSERT INTO `core_services` VALUES (1,'Construction','SNS provides full construction services from design to project execution.'),(2,'Easability Management & Maintenance Operations','SNS is a market leader in operations and maintenance in KSA.'),(3,'Telecom & Electronics','SNS handles design, integration, and commissioning of telecom and electronics projects.'),(4,'Waste Management','SNS aims to enable sustainable waste management for a better future.'),(5,'Parking Management','SNS has established itself in the parking management sector and become a key business unit of the company.'),(7,'Support Services','Our special services for contract management processes related to different market fields.');
/*!40000 ALTER TABLE `core_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Construction Team','Coordinates field teams and monitors construction progress to ensure timely delivery.',NULL),(2,'Operations & Maintenance Department','Manages daily operational activities and ensures workflow efficiency.',NULL),(3,'Telecom & Electronics Department','Manages electronic installations and ensures optimal system performance.',NULL),(4,'Fleet & Logistics Department','Oversees vehicle operations and ensures efficient resource allocation.',NULL);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `governance_sections`
--

DROP TABLE IF EXISTS `governance_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `governance_sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key_name` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `governance_sections`
--

LOCK TABLES `governance_sections` WRITE;
/*!40000 ALTER TABLE `governance_sections` DISABLE KEYS */;
INSERT INTO `governance_sections` VALUES (1,'governance_structure','Governance Structure','who-we-are/new-governance-structure-thumb.jpg'),(2,'organizational_chart','Organizational Chart','who-we-are/new-organizational-structure-thumb.jpg');
/*!40000 ALTER TABLE `governance_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text,
  `status` enum('unread','read','replied') DEFAULT 'unread',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (4,'Aziza Dalleji','aziza@gmail.com','+1-816-127-4257','Test','This is test message','read','2026-03-07 22:23:20'),(7,'Aziza','azizaskz2010@gmail.com','+1-816-127-4257','Test','wxcvbn,;','read','2026-03-28 15:53:23'),(8,'test','test@gmail.com','123456','Test','test','read','2026-03-29 21:17:19');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_images`
--

DROP TABLE IF EXISTS `project_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_project_images_project` (`project_id`),
  CONSTRAINT `fk_project_images_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_images`
--

LOCK TABLES `project_images` WRITE;
/*!40000 ALTER TABLE `project_images` DISABLE KEYS */;
INSERT INTO `project_images` VALUES (1,5,'services/construction/main.jpg',0),(2,5,'services/construction/1.jpg',0),(3,5,'services/construction/2.jpg',0),(4,4,'projects/construction/steel-thumb1.jpg',0),(5,4,'projects/construction/steel-thumb2.jpg',0),(6,4,'projects/construction/steel-thumb3.jpg',0),(7,6,'projects/construction/fence1thumb.jpeg',0),(8,6,'projects/construction/fence2thumb.jpeg',0),(9,6,'projects/construction/fence3thumb.jpg',0),(10,7,'projects/construction/roads-thumb1.jpg',0),(11,7,'projects/construction/roads-thumb2.jpg',0),(12,7,'projects/construction/roads-thumb3.jpg',0),(13,12,'projects/construction/alaqiq-thumb1.jpeg',0),(14,12,'projects/construction/alaqiq-thumb2.jpeg',0),(15,12,'projects/construction/alaqiq-thumb3.jpeg',0),(16,13,'projects/construction/alnamas-thumb-1.jpg',0),(17,13,'projects/construction/alnamas-thumb-2.jpg',0),(18,13,'projects/construction/alnamas-thumb-3.jpg',0),(19,14,'projects/construction/farsan-thumb1.jpg',0),(20,14,'projects/construction/farsan-thumb2.jpg',0),(21,14,'projects/construction/farsan-thumb3.jpg',0),(22,15,'projects/construction/abhapump-thumb1.jpg',0),(23,15,'projects/construction/abhapump-thumb2.jpg',0),(24,15,'projects/construction/abhapump-thumb3.jpg',0),(25,16,'projects/oandm/duba-thumb1.jpg',0),(26,16,'projects/oandm/duba-thumb2.jpg',0),(27,16,'projects/oandm/duba-thumb3.jpg',0),(28,17,'projects/oandm/water-purification-thumb1.jpeg',0),(29,17,'projects/oandm/water-purification-thumb2.jpeg',0),(30,17,'projects/oandm/water-purification-thumb3.jpeg',0),(31,21,'projects/parking/kafd-thumb1.jpg',0),(32,21,'projects/parking/kafd-thumb2.jpg',0),(33,21,'projects/parking/kafd-thumb3.jpg',0),(34,22,'projects/parking/t5-thumb1.jpg',0),(35,22,'projects/parking/t5-thumb2.jpg',0),(36,22,'projects/parking/t5-thumb3.jpeg',0),(37,18,'projects/support/yanbulife-thumb1.jpeg',0),(38,18,'projects/support/yanbulife-thumb2.jpeg',0),(39,18,'projects/support/yanbulife-thumb3.jpeg',0),(40,19,'projects/construction/fence1thumb.jpeg',0),(41,19,'projects/construction/fence2thumb.jpeg',0),(42,19,'projects/construction/fence3thumb.jpg',0),(43,20,'projects/telecom/avdgs-thumb1.jpg',0),(44,20,'projects/telecom/avdgs-thumb2.jpg',0),(45,20,'projects/telecom/avdgs-thumb3.jpg',0),(46,8,'projects/waste/hazardous-removal-thumb1.jpg',0),(47,8,'projects/waste/hazardous-removal-thumb2.jpg',0),(48,8,'projects/waste/hazardous-removal-thumb3.jpg',0),(49,9,'projects/waste/sewage-removal-thumb1.jpg',0),(50,9,'projects/waste/sewage-removal-thumb2.jpg',0),(51,9,'projects/waste/sewage-removal-thumb3.jpg',0),(52,10,'projects/construction/farsan-thumb1.jpg',0),(53,10,'projects/construction/farsan-thumb2.jpg',0),(54,10,'projects/construction/farsan-thumb3.jpg',0),(55,11,'projects/construction/alnamas-thumb-1.jpg',0),(56,11,'projects/construction/alnamas-thumb-2.jpg',0),(57,11,'projects/construction/alnamas-thumb-3.jpg',0);
/*!40000 ALTER TABLE `project_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `detail` text,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'recent','Alaqiq Sewage Plant Capacity: 12,500 cu m/day',NULL,'services/construction/3.jpg'),(2,'recent','Advance Visual Docking Guidance System',NULL,'services/telecom/2.jpg'),(3,'recent','Sewage Removal Service - PSAB Al Kharj',NULL,'services/waste/1.jpg'),(4,'construction','Steeel Structure - Hangar Construction, General Intelligence, Sharoora, Najran','25,000 m2 (concrete works, steel supply & erection, complete finishing works and general site works)',NULL),(5,'construction','Marine Tower - Ras Al Khair (SEAPA)','Height: 108m',NULL),(6,'construction','Jeddah Fence','GACA',NULL),(7,'construction','Roads construction, PSAB AlKharj','Length: 100,000 sq m',NULL),(8,'waste','Hazardous Waste Removal','PSAB Al Kharj',NULL),(9,'waste','Sewage Removal Service','PSAB Al Kharj',NULL),(10,'waste','Farsan Island Sewage Plant','Capacity: 3,500 cu m/day',NULL),(11,'waste','Alnamas Sewage Plant - Asir','Capacity: 17,500 cu m/day',NULL),(12,'construction','Alaqiq sewage plant','Capacity: 12,500 cu m/day',NULL),(13,'construction','Alnamas sewage plant - Asir','Capacity: 17,500 cu m/day',NULL),(14,'construction','Farsan Island sewage plant','Capacity: 3500 cu m/day',NULL),(15,'construction','Abha Khamis Mushayat pump station','Capacity: 12,500 cu m/day',NULL),(16,'easability','Duba MW Radio Station',NULL,NULL),(17,'easability','Water Purification Plant','PSAB Al Kharj',NULL),(18,'support','Life Support','US Army Camp Yanbu ',NULL),(19,'support','Jeddah Fence','GACA',NULL),(20,'telecom','Advance Visual Docking Guidnace System',NULL,NULL),(21,'parking','KAFD Car Parking',NULL,NULL),(22,'parking','T5 Car Parking',NULL,NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_features`
--

DROP TABLE IF EXISTS `service_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_features` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `service_id` int unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `detail` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_service_features_service_id` (`service_id`),
  CONSTRAINT `fk_service_features_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_features`
--

LOCK TABLES `service_features` WRITE;
/*!40000 ALTER TABLE `service_features` DISABLE KEYS */;
INSERT INTO `service_features` VALUES (1,1,'Steel Structure','Mobile construction platforms enabling rapid assembly and disassembly, ideal for defense installations.'),(2,1,'Civil Services','End-to-end civil works from design and planning to execution for commercial, military and government facilities.'),(3,1,'Electromechanical','Electrical and electromechanical contracting for complex, large-scale projects across the Kingdom.'),(4,1,'Wastewater & Sewage Plants','Turnkey design and construction of wastewater treatment plants and sewage pumping stations.'),(5,2,'Plant Side Management','Comprehensive operations oversight, planning and scheduling for critical facilities.'),(6,2,'Preventive & Predictive Maintenance','Structured maintenance programs to maximize uptime and asset life.'),(7,2,'Safety Programs','Professional safety management and supervision of all maintenance activities.'),(8,3,'Basic Life Support','Portable housing, sanitary facilities, drinking water, bedding and essential services for deployed defense forces.'),(9,3,'Catering','Specialized catering services focused on health and safety of defense personnel.'),(10,3,'Logistics & Equipment','Seconded personnel, logistics support, materials/tools supply and heavy equipment rental.'),(11,4,'Low Current Systems','Design and integration of CCTV, access control and related low current systems.'),(12,4,'Perimeter Security','Intrusion detection and perimeter surveillance solutions.'),(13,4,'VTMIS','Maritime Vessel Traffic Management Information Systems (VTMIS) including radars, AIS, VHF, GIS and sensors.'),(14,4,'Airport Systems','Airport guidance, operations and information systems such as A-VDGS, GOS and FIS.'),(15,5,'End-to-End Delivery','From construction of parking facilities to complete operations and management.'),(16,5,'Public Sector Expertise','Experience with major public clients like GACA, SAR and KAFD.'),(17,6,'Hazardous & Medical Waste','Safe and compliant disposal of hazardous and medical waste.'),(18,6,'Sewage Evacuation','Efficient sewage evacuation solutions for municipalities and facilities.'),(19,6,'Treatment Plant Construction','Design and construction of wastewater treatment plants with long-term O&M capabilities.');
/*!40000 ALTER TABLE `service_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_images`
--

DROP TABLE IF EXISTS `service_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_images` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `service_id` int unsigned NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_service_images_service_id` (`service_id`),
  CONSTRAINT `fk_service_images_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_images`
--

LOCK TABLES `service_images` WRITE;
/*!40000 ALTER TABLE `service_images` DISABLE KEYS */;
INSERT INTO `service_images` VALUES (1,1,'/images/services/construction/1.jpg'),(2,1,'/images/services/construction/2.jpg'),(3,1,'/images/services/construction/3.jpg'),(4,2,'/images/services/oandm/1.jpg'),(5,2,'/images/services/oandm/2.jpg'),(6,3,'/images/services/support/1.jpg'),(7,3,'/images/services/support/2.jpg'),(8,4,'/images/services/telecom/1.jpg'),(9,4,'/images/services/telecom/2.jpg'),(10,5,'/images/services/parking/1.jpg'),(11,5,'/images/services/parking/2.jpg'),(14,1,'/images/services/construction/4.jpg'),(16,2,'/images/services/oandm/1.jpg'),(17,2,'/images/services/oandm/2.jpg');
/*!40000 ALTER TABLE `service_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `long_description` text,
  `image` varchar(255) DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'CONSTRUCTION','SNS Construction','SNS offers a complete range of construction services from design stage thru the execution of projects such as:','Steel Structure: SNS offers the mobile construction platform to its clients. Steel structure is the most viable solution for those clients who prefer to have quick assembly and disasembly of structures. The defence insititutions are a good condidate for it..\nCivil Services: SNS offers a wide range of civil services. That includes designing, planning, consulting, and execution. Example: Commercial Centers, Urban Development, Military facilities, Office complexes, Government buildings, Commercial Towers, and Monitoring and Control towers of sea ports and airports.\nElectrical & Electromechanical Constrcution Services: Throughout the SNS experience, which extends over three decades, we have executed wide variety of prestigious projects and consequently become one of the leading both in electrical and electromechanical contractors in Saudi Arabia.\nWaste Water Treatment & Sewage plant Construction: SNS provides turnkey projects of all waste water treatment & sewage for clients. SNS is also involved in the provision of plants construction for water treatment plants and sewage pumping stations which effectively placed SNS in the position to provide the total solution for M&E Systems in municipal Water Supply Scheme from design, supply, install, testing and commissioning of M&E Systems down to operation and maintenance of the plants.','/images/services/construction/main.jpg',1),(2,'EASABILITY MANAGEMENT & O&M','SNS Easability Management & Maintenance Operations','SNS is a market leader in Operations and Maintenance, providing plant-side management, planning and scheduling, preventive and predictive maintenance, safety programs and integrated supply with craft supervision.','Our market-leading position is built on knowledge sharing over three decades across diversified services. This experience enables us to consistently achieve excellence in operations and maintenance for complex facilities and critical infrastructure.','/images/services/oandm/main.jpg',2),(3,'SUPPORT SERVICES','SNS Support Services','Support is our special service for contract management processes across different market fields, with over 30 years of track record serving mainly USA and UK defense organizations.','Basic Life Support: Lifeline service for defense clients without permanent bases in Saudi Arabia, including portable housing, toilets, drinking water, beds and other essentials.\nCatering: Independent support service providing safe, reliable catering for defense personnel.\nAdditional Support Services: seconded personnel, logistics support, materials and tools supply, heavy equipment rental (trucks, bulldozers, excavators, etc.).','/images/services/support/main.jpg',3),(4,'TELECOM & ELECTRONICS','SNS Telecom & Electronics','SNS delivers high-quality design, provision, installation, integration and commissioning of telecommunications and electronics projects, as well as upgrades to existing systems.','We provide complete technical support including human resources, labor, materials, and all necessary equipment and tools for diverse telecom projects.\nIntegration services include:\n- Low current systems (CCTV, access control, etc.)\n- Intrusion and perimeter detection systems\n- Maritime Vessel Traffic Management Information Systems (VTMIS)\n- Airport systems such as A-VDGS, GOS, FIS and others.','/images/services/telecom/main.jpg',4),(5,'PARKING MANAGEMENT','SNS Parking Management','Over years, SNS through its persistent effort and skilled manpower, has managed to created a niche space in the parking management space. Its experience with major public sector clients like GACA, SAR and KAFD has given it an edge over its competitiors.','Using its contruction arm, SNS not only manages parking but can provide comprhensive service from building parking space to its complete management and day to day operations.','/images/services/parking/main.jpg',5),(6,'WASTE MANAGEMENT','SNS Waste Management','SNS is committed to sustainable waste management to help preserve the planet for future generations in a sector of major importance in Saudi Arabia.','SNS has achieved progress in critical areas such as:\n- Hazardous and medical waste disposal\n- Sewage evacuation\n- Wastewater treatment plant construction\nThese capabilities position SNS as a strong partner for comprehensive, sustainable waste management solutions.','/images/services/waste/main.jpg',6);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,'CEO','Chief Executive Officer','team/ceo.jpg'),(2,'Operations Manager','Operations Manager',NULL),(3,'Technical Director','Technical Director',NULL),(4,'Telecom & Electronics Manager','Telecom & Electronics Manager',NULL);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `who_we_are`
--

DROP TABLE IF EXISTS `who_we_are`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `who_we_are` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `key_section` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `short_description` text,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_section_UNIQUE` (`key_section`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `who_we_are`
--

LOCK TABLES `who_we_are` WRITE;
/*!40000 ALTER TABLE `who_we_are` DISABLE KEYS */;
INSERT INTO `who_we_are` VALUES (1,'overview','Who We Are','With more than 30 years of experience in delivering highly complex projects, we operate with the highest levels of quality, safety and technical expertise, integrate with clients and local supply chains.\n\nSNS is among the most diversified companies in the Kingdom and have expanded to meet the different challenges and requirements of clients, and since then have been a leading player of executing projects in the fields of construction, operations and maintenance, professional support services, and telecommunications and electronics in the Kingdom, fulfilling national and public missions alongside their commercial activity.\n\nToday SNS is involved in large-scale projects in the Kingdom and abroad, and have proven achievements in the international project development, SNS clients are more than projects, our reputation hinges on the continued satisfaction of each one according to the wide range of market fields SNS specifying itself within that include areas of technologies focused over engineering projects execution.','',NULL,1),(2,'vision','Vision',NULL,'To be a leading firm in the Construction, Operations & Maintenance and Waste Management sector while maintaining international standards to provide the highest levels of customer satisfaction.\n\nSNS aims to use the latest technology tools and bring creative ideas to become a national and international partner to customers who seek real value from their services.',NULL,2),(3,'mission','Mission',NULL,'To be a leading company in the MENA region for:\na) Construction\nb) Operations & Maintenance\nc) Support Services\nd) Waste Management\n\n- Maximize customer satisfaction through process improvements\n- Adopt state-of-the-art technology tools and improve productivity and cost effectiveness\n- Employ latest safety measures and make zero accidents company\n- Use green methods and technologies to have reduced environmental impact',NULL,3),(4,'values','Values',NULL,'Since its inception, SNS\'s culture has thrived on strong principles. From generation to generation, the torch has been passed down and carried by the hands of our leaders and workforce. Today, our core values remain our company\'s cornerstone.\n- Transparency\n- Integrity\n- Environmentally friendly materials to achieve sustainable development\n- Creativity and innovation\n- Work team\n- Company social responsibility (CSR)\n- Maintain highest standard of safety and security',NULL,4),(5,'strategy','Strategy',NULL,'The company believes that our future depends on how we care for our planet. It has kept planet sustainability at the core of its strategy:\n- Expansion with biodiversity inclusiveness\n- Promoting green projects\n- Capitalize waste management experience to acquire green projects\n- Utilize airports management experience to improve opportunities',NULL,5);
/*!40000 ALTER TABLE `who_we_are` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-29 23:02:24
