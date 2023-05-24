-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema medieval
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema medieval
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `medieval` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `medieval` ;

-- -----------------------------------------------------
-- Table `medieval`.`categorie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medieval`.`categorie` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cat_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `medieval`.`user_favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medieval`.`user_favorites` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `event_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unique_user_event` (`event_id` ASC, `user_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 64
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `medieval`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medieval`.`events` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `address` VARCHAR(255) NOT NULL,
  `site` VARCHAR(255) NULL DEFAULT NULL,
  `date` DATE NOT NULL,
  `description` LONGTEXT NOT NULL,
  `categorie_id` INT NOT NULL,
  `user_favorites_id` INT NOT NULL,
  PRIMARY KEY (`id`, `categorie_id`),
  INDEX `fk_events_categorie_idx` (`categorie_id` ASC) VISIBLE,
  INDEX `fk_events_user_favorites1_idx` (`user_favorites_id` ASC) VISIBLE,
  CONSTRAINT `fk_events_categorie`
    FOREIGN KEY (`categorie_id`)
    REFERENCES `medieval`.`categorie` (`id`),
  CONSTRAINT `fk_events_user_favorites1`
    FOREIGN KEY (`user_favorites_id`)
    REFERENCES `medieval`.`user_favorites` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `medieval`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medieval`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'user') NOT NULL,
  `avatar` VARCHAR(255) NULL DEFAULT NULL,
  `events_id` INT NOT NULL,
  `events_categorie_id` INT NOT NULL,
  `user_favorites_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_events1_idx` (`events_id` ASC, `events_categorie_id` ASC) VISIBLE,
  INDEX `fk_users_user_favorites1_idx` (`user_favorites_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_events1`
    FOREIGN KEY (`events_id` , `events_categorie_id`)
    REFERENCES `medieval`.`events` (`id` , `categorie_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_user_favorites1`
    FOREIGN KEY (`user_favorites_id`)
    REFERENCES `medieval`.`user_favorites` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
