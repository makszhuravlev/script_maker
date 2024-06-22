-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 88.84.211.248    Database: scripts
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.24.04.1

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
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Login` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `position` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Admin','Admin','Admin');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scripts_json`
--

DROP TABLE IF EXISTS `scripts_json`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scripts_json` (
  `id` int NOT NULL AUTO_INCREMENT,
  `json` longtext NOT NULL,
  `name` varchar(45) NOT NULL,
  `purpose` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scripts_json`
--

LOCK TABLES `scripts_json` WRITE;
/*!40000 ALTER TABLE `scripts_json` DISABLE KEYS */;
INSERT INTO `scripts_json` VALUES (2,'{steve}','jobs','asdasd'),(3,'{\"nodes\":[{\"id\":\"2\",\"type\":\"custom\",\"position\":{\"x\":551.203125,\"y\":234},\"data\":{\"label\":\"Фраза менеджера\",\"description\":\"\",\"dynamicFields\":\"\"}},{\"id\":\"3\",\"type\":\"default\",\"position\":{\"x\":750.203125,\"y\":413},\"data\":{\"label\":\"Фраза клиента\",\"description\":\"\",\"dynamicFields\":\"\"}}],\"edges\":[{\"id\":\"vueflow__edge-2b-3\",\"type\":\"default\",\"source\":\"2\",\"target\":\"3\",\"sourceHandle\":\"b\",\"targetHandle\":null,\"data\":{},\"label\":\"\",\"sourceX\":687.203125,\"sourceY\":274,\"targetX\":875.203125,\"targetY\":410}],\"position\":[0,0],\"zoom\":1,\"viewport\":{\"x\":0,\"y\":0,\"zoom\":1}}','jobs1','asdasd'),(4,'{Hessllo}','jobs2','asdasd'),(5,'{\"nodes\":[{\"id\":\"12711\",\"type\":\"default\",\"position\":{\"x\":9.663747212925841,\"y\":-357.5148791070063},\"data\":{\"label\":\"Фраза клиента\",\"description\":\"\",\"dynamicFields\":\"\"}},{\"id\":\"12712\",\"type\":\"custom\",\"position\":{\"x\":-204.43430267287067,\"y\":-230.96464095502338},\"data\":{\"label\":\"Фраза менеджера\",\"description\":\"\",\"dynamicFields\":\"\"}},{\"id\":\"12713\",\"type\":\"default\",\"position\":{\"x\":-196.58987661716844,\"y\":-127.13081780250437},\"data\":{\"label\":\"Фраза клиента\",\"description\":\"\",\"dynamicFields\":\"\"}},{\"id\":\"12714\",\"type\":\"custom\",\"position\":{\"x\":339.7382778938004,\"y\":-232.2480668525863},\"data\":{\"label\":\"Фраза менеджера\",\"description\":\"\",\"dynamicFields\":\"\"}},{\"id\":\"127141\",\"type\":\"default\",\"position\":{\"x\":166.39679573522062,\"y\":-331.0298276746216},\"data\":{\"label\":\"Фраза клиента\",\"description\":\"\",\"dynamicFields\":\"\"}},{\"id\":\"127142\",\"type\":\"custom\",\"position\":{\"x\":67.19075642852806,\"y\":-232.2480668525863},\"data\":{\"label\":\"Фраза менеджера\",\"description\":\"\",\"dynamicFields\":\"\"}},{\"id\":\"127143\",\"type\":\"default\",\"position\":{\"x\":259.4705660557554,\"y\":-357.5148791070063},\"data\":{\"label\":\"Фраза клиента\",\"description\":\"\",\"dynamicFields\":\"\"}},{\"id\":\"127144\",\"type\":\"default\",\"position\":{\"x\":-239.15944892301974,\"y\":461.93842549136497},\"data\":{\"label\":\"Фраза клиента\",\"description\":\"\",\"dynamicFields\":\"\"}},{\"id\":\"127145\",\"type\":\"default\",\"position\":{\"x\":-846.2646746602791,\"y\":1129.6393291469933},\"data\":{\"label\":\"Фраза клиента\",\"description\":\"\",\"dynamicFields\":\"\"}},{\"id\":\"127146\",\"type\":\"custom\",\"position\":{\"x\":326.83553860562336,\"y\":-542.1717161449579},\"data\":{\"label\":\"Фраза менеджера\",\"description\":\"\",\"dynamicFields\":\"\"}},{\"id\":\"127147\",\"type\":\"default\",\"position\":{\"x\":339.05940849749334,\"y\":-507.53741811799324},\"data\":{\"label\":\"Фраза клиента\",\"description\":\"\",\"dynamicFields\":\"\"}}],\"edges\":[{\"id\":\"vueflow__edge-127141-12712a\",\"type\":\"default\",\"source\":\"127141\",\"target\":\"12712\",\"sourceHandle\":null,\"targetHandle\":\"a\",\"data\":{},\"label\":\"\",\"sourceX\":291.396751667613,\"sourceY\":-292.02984883735064,\"targetX\":-68.43436498918044,\"targetY\":-234.9646521223267},{\"id\":\"vueflow__edge-12711-127142a\",\"type\":\"default\",\"source\":\"12711\",\"target\":\"127142\",\"sourceHandle\":null,\"targetHandle\":\"a\",\"data\":{},\"label\":\"\",\"sourceX\":134.66362481126026,\"sourceY\":-318.5148806862209,\"targetX\":203.1906941122183,\"targetY\":-236.24805843637512},{\"id\":\"vueflow__edge-127143-12714a\",\"type\":\"default\",\"source\":\"127143\",\"target\":\"12714\",\"sourceHandle\":null,\"targetHandle\":\"a\",\"data\":{},\"label\":\"\",\"sourceX\":384.47052198814777,\"sourceY\":-318.5149002697354,\"targetX\":475.7382155774906,\"targetY\":-236.2480780198896},{\"id\":\"vueflow__edge-12712b-12713\",\"type\":\"default\",\"source\":\"12712\",\"target\":\"12713\",\"sourceHandle\":\"b\",\"targetHandle\":null,\"data\":{},\"label\":\"\",\"sourceX\":-68.43436498918044,\"sourceY\":-190.9646495341694,\"targetX\":-71.589999018834,\"targetY\":-130.1308163862246},{\"id\":\"vueflow__edge-127142b-127144\",\"type\":\"default\",\"source\":\"127142\",\"target\":\"127144\",\"sourceHandle\":\"b\",\"targetHandle\":null,\"data\":{},\"label\":\"\",\"sourceX\":203.1906941122183,\"sourceY\":-192.2480950152468,\"targetX\":-114.15949299062737,\"targetY\":458.9384269076447},{\"id\":\"vueflow__edge-12714b-127145\",\"type\":\"default\",\"source\":\"12714\",\"target\":\"127145\",\"sourceHandle\":\"b\",\"targetHandle\":null,\"data\":{},\"label\":\"\",\"sourceX\":475.7382155774906,\"sourceY\":-192.2480950152468,\"targetX\":-721.2650002732273,\"targetY\":1126.6393366082987},{\"id\":\"vueflow__edge-127146b-127147\",\"type\":\"default\",\"source\":\"127146\",\"target\":\"127147\",\"sourceHandle\":\"b\",\"targetHandle\":null,\"data\":{},\"label\":\"\",\"sourceX\":462.8355055311474,\"sourceY\":-502.17172793112223,\"targetX\":464.0593367300188,\"targetY\":-510.5374286706292}],\"position\":[430.5801673046453,587.2639029201936],\"zoom\":2,\"viewport\":{\"x\":430.5801673046453,\"y\":587.2639029201936,\"zoom\":2}}','jobs3','asdasd'),(6,'s','s','s'),(7,'s','s','s'),(8,'d','d','d'),(9,'f','f','f'),(10,'x','x','x'),(11,'v','v','v');
/*!40000 ALTER TABLE `scripts_json` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-22 14:48:38
