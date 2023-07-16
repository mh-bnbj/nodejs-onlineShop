-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema onlinestoredb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema onlinestoredb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `onlinestoredb` DEFAULT CHARACTER SET utf8mb3 ;
USE `onlinestoredb` ;

-- -----------------------------------------------------
-- Table `onlinestoredb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onlinestoredb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `admin` INT NOT NULL,
  `name` VARCHAR(127) NOT NULL,
  `email` VARCHAR(127) NOT NULL,
  `password` VARCHAR(127) NOT NULL,
  `token` VARCHAR(127) NULL DEFAULT '-',
  `token_used` INT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `onlinestoredb`.`basket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onlinestoredb`.`basket` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_basket_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_basket_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `onlinestoredb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `onlinestoredb`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onlinestoredb`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(127) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `onlinestoredb`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onlinestoredb`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(127) NOT NULL,
  `price` DOUBLE NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT NULL,
  `created_date` DATETIME NOT NULL,
  `category_id` INT NOT NULL,
  `basket_id` INT NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `category_id`),
  INDEX `fk_product_category_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_product_basket1_idx` (`basket_id` ASC) VISIBLE,
  INDEX `fk_product_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_basket1`
    FOREIGN KEY (`basket_id`)
    REFERENCES `onlinestoredb`.`basket` (`id`),
  CONSTRAINT `fk_product_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `onlinestoredb`.`category` (`id`),
  CONSTRAINT `fk_product_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `onlinestoredb`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
