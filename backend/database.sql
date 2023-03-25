CREATE TABLE `categorie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categories` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(45) NOT NULL,
  `image` blob,
  `adresse` varchar(45) NOT NULL,
  `site` varchar(45) DEFAULT NULL,
  `date` date NOT NULL,
  `description` longtext NOT NULL,
  `categorie_id` int NOT NULL,
  PRIMARY KEY (`id`,`categorie_id`),
  KEY `fk_events_categorie_idx` (`categorie_id`),
  CONSTRAINT `fk_events_categorie` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM medieval.events;