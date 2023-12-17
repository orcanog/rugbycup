/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `rugbycup` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `rugbycup`;

CREATE TABLE IF NOT EXISTS `mainapp_event` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `start` datetime(6) NOT NULL,
    `stadium_id` bigint(20) NOT NULL,
    `team_home_id` bigint(20) DEFAULT NULL,
    `team_away_id` bigint(20) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `k_stadium_id` (`stadium_id`),
    KEY `k_team_home_id` (`team_home_id`),
    KEY `k_team_away_id` (`team_away_id`),
    CONSTRAINT `fk_stadium_id` FOREIGN KEY (`stadium_id`) REFERENCES `stadium` (`id`),
    CONSTRAINT `fk_team_home_id` FOREIGN KEY (`team_home_id`) REFERENCES `team` (`id`),
    CONSTRAINT `fk_team_away_id` FOREIGN KEY (`team_away_id`) REFERENCES `team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `mainapp_stadium` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `location` varchar(100) NOT NULL,
    `latitude` decimal(9,6) NOT NULL,
    `longitude` decimal(9,6) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `mainapp_team` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `country` varchar(100) NOT NULL,
    `country_alpha2` varchar(2) NOT NULL,
    `nickname` varchar(100) NOT NULL,
    `color_first` varchar(6) NOT NULL,
    `color_second` varchar(6) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `mainapp_ticket` (
    `id` char(36) NOT NULL,
    `event_id` bigint(20) NOT NULL,
    `category` varchar(1) NOT NULL,
    `seat` longtext NOT NULL,
    `price` int(11) NOT NULL,
    `currency` varchar(3) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `k_event_id` (`event_id`),
    CONSTRAINT `fk_event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `mainapp_newsletter` (
    `email` char(100) NOT NULL,
    `name` char(100) NOT NULL,
    `consent` boolean NOT NULL DEFAULT 0,
    PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


INSERT INTO `mainapp_team` (`id`, `country`, `country_alpha2`, `nickname`, `color_first`, `color_second`) VALUES (1, 'Angleterre', 'gb', 'XV de la Rose', 'FFFFFF', 'A71931');
INSERT INTO `mainapp_team` (`id`, `country`, `country_alpha2`, `nickname`, `color_first`, `color_second`) VALUES (2, 'Fidji', 'fj', 'The Flying Fijians', 'FFFFFF', '99B7E8');
INSERT INTO `mainapp_team` (`id`, `country`, `country_alpha2`, `nickname`, `color_first`, `color_second`) VALUES (3, 'Japon', 'jp', 'The Cherry Blossoms', 'FFFFFF', 'E70012');
INSERT INTO `mainapp_team` (`id`, `country`, `country_alpha2`, `nickname`, `color_first`, `color_second`) VALUES (4, 'Samoa', 'ws', 'Manu Samoa', '264282', '181A1B');
INSERT INTO `mainapp_team` (`id`, `country`, `country_alpha2`, `nickname`, `color_first`, `color_second`) VALUES (5, 'Australie', 'au', 'Les Wallabies', 'FAD068', '8C6505');
INSERT INTO `mainapp_team` (`id`, `country`, `country_alpha2`, `nickname`, `color_first`, `color_second`) VALUES (6, 'Tonga', 'to', 'Ikale Tahi', 'FF0000', '181A1B');
INSERT INTO `mainapp_team` (`id`, `country`, `country_alpha2`, `nickname`, `color_first`, `color_second`) VALUES (7, 'Nouvelle-Zélande', 'nz', 'All Blacks', 'FFFFFF', '000000');
INSERT INTO `mainapp_team` (`id`, `country`, `country_alpha2`, `nickname`, `color_first`, `color_second`) VALUES (8, 'Afrique du Sud', 'za', 'Les Springboks', 'FFB300', '0C3D1B');

INSERT INTO `mainapp_stadium` (`id`, `name`, `location`, `latitude`, `longitude`) VALUES (1, 'Ajinomoto Stadium', 'Tokyo', 35.664051, 139.527175);
INSERT INTO `mainapp_stadium` (`id`, `name`, `location`, `latitude`, `longitude`) VALUES (2, 'Toyota Stadium', 'Tokyo', 35.084470, 137.170923);
INSERT INTO `mainapp_stadium` (`id`, `name`, `location`, `latitude`, `longitude`) VALUES (3, 'Noevir Stadium Kobe', 'Kobe', 34.656683, 135.168941);
INSERT INTO `mainapp_stadium` (`id`, `name`, `location`, `latitude`, `longitude`) VALUES (4, 'Best Denki Stadium', 'Fukuoka', 33.585855, 130.460784);

INSERT INTO `mainapp_event` (`id`, `start`, `stadium_id`, `team_away_id`, `team_home_id`) VALUES (1, '2023-07-12 19:30:00.000000', 1, 1, 2);
INSERT INTO `mainapp_event` (`id`, `start`, `stadium_id`, `team_away_id`, `team_home_id`) VALUES (2, '2023-07-13 19:30:00.000000', 1, 3, 4);
INSERT INTO `mainapp_event` (`id`, `start`, `stadium_id`, `team_away_id`, `team_home_id`) VALUES (3, '2023-07-14 19:00:00.000000', 2, 5, 6);
INSERT INTO `mainapp_event` (`id`, `start`, `stadium_id`, `team_away_id`, `team_home_id`) VALUES (4, '2023-07-15 19:30:00.000000', 2, 7, 8);
INSERT INTO `mainapp_event` (`id`, `start`, `stadium_id`, `team_away_id`, `team_home_id`) VALUES (5, '2023-07-18 19:30:00.000000', 3, NULL, NULL);
INSERT INTO `mainapp_event` (`id`, `start`, `stadium_id`, `team_away_id`, `team_home_id`) VALUES (6, '2023-07-20 19:30:00.000000', 4, NULL, NULL);
INSERT INTO `mainapp_event` (`id`, `start`, `stadium_id`, `team_away_id`, `team_home_id`) VALUES (7, '2023-07-22 18:30:00.000000', 3, NULL, NULL);
INSERT INTO `mainapp_event` (`id`, `start`, `stadium_id`, `team_away_id`, `team_home_id`) VALUES (8, '2023-07-22 20:00:00.000000', 4, NULL, NULL);

INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('22757c35-5264-4863-b936-fda521438115', 1, 'Silver', 'free', 65, 'NZD');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('7d73929a-f6a2-4996-96c1-eb9ae2df70d3', 1, 'Platinum', 'P-51', 60, 'EUR');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('26d0206f-ff64-4182-aee9-1028d189ebd8', 2, 'Platinum', 'P-12', 8000, 'JPY');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('45d75237-f682-4189-95b8-4bd5b1634b77', 2, 'Gold', 'G-23', 80, 'NZD');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('01bf3108-e004-4722-8a85-d384cb2262ea', 3, 'Platinum', 'P-11', 60, 'EUR');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('0783f40c-1f31-4f93-aa23-63576c0e8074', 3, 'Platinum', 'P-8', 8000, 'JPY');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('f5970135-9157-49d9-81da-469cc52f41b2', 4, 'Silver', 'free', 40, 'EUR');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('1ec4e885-0268-464e-a610-6c1346245b92', 4, 'Gold', 'G-39', 6700, 'JPY');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('680c831d-c79d-4070-aeb1-7ef42081c0eb', 5, 'Platinum', 'P-15', 95, 'NZD');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('09f90c2f-82a9-42f9-a542-706409872a5d', 5, 'Silver', 'free', 65, 'NZD');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('141dce64-445c-46ef-8e3a-b7b3acb449d4', 6, 'Gold', 'G-4', 50, 'EUR');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('09c525e1-e3eb-4d15-a6a8-60bee6343e0f', 6, 'Gold', 'G-5', 50, 'EUR');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('ff17465b-8ba6-4b02-ba3d-45f8aecbaa0c', 7, 'Platinum', 'P-18', 95, 'NZD');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('3d3a09a5-ff58-48fb-8615-e8a5ef871ae0', 7, 'Gold', 'G-53', 80, 'NZD');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('de725ef3-a2e6-430b-b5eb-adb4e203b142', 8, 'Platinum', 'P-12', 8000, 'JPY');
INSERT INTO `mainapp_ticket` (`id`, `event_id`, `category`, `seat`, `price`, `currency`) VALUES ('41a9c6bc-b4f6-49ed-ab34-5aecddbf3cc5', 8, 'Platinum', 'P-51', 60, 'EUR');

INSERT INTO `mainapp_newsletter` (`email`, `name`, `consent`) VALUES ('seblebest@mail.dev', 'Sébastien CHANAL', 1);
INSERT INTO `mainapp_newsletter` (`email`, `name`, `consent`) VALUES ('guy@liguerugby.dev', 'Guy NODESS', 0);
