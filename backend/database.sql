-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema medieval
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema medieval
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `medieval` ;
USE `medieval` ;

-- -----------------------------------------------------
-- Table `medieval`.`categorie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medieval`.`categorie` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categories` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `medieval`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medieval`.`events` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titre` VARCHAR(45) NOT NULL,
  `image` BLOB NOT NULL,
  `adresse` VARCHAR(45) NOT NULL,
  `site` VARCHAR(45) NULL,
  `date` DATE NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `categorie_id` INT NOT NULL,
  PRIMARY KEY (`id`, `categorie_id`),
  INDEX `fk_events_categorie_idx` (`categorie_id` ASC) VISIBLE,
  CONSTRAINT `fk_events_categorie`
    FOREIGN KEY (`categorie_id`)
    REFERENCES `medieval`.`categorie` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
