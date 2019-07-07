/*
 Navicat Premium Data Transfer

 Source Server         : blog-112.74.191.84
 Source Server Type    : MySQL
 Source Server Version : 50560
 Source Host           : 112.74.191.84:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 50560
 File Encoding         : 65001

 Date: 07/07/2019 08:49:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` bigint(13) NOT NULL,
  `artTitle` text NOT NULL,
  `abstract` text NOT NULL,
  `category` text NOT NULL,
  `tag` text NOT NULL,
  `thumbnail` text,
  `content` text NOT NULL,
  `cdate` bigint(13) NOT NULL,
  `pv` int(225) NOT NULL DEFAULT '0',
  `discuss` int(11) NOT NULL DEFAULT '0',
  `status` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` text NOT NULL,
  `categorydesc` text NOT NULL,
  `cdate` bigint(13) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artId` bigint(13) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_uname` text CHARACTER SET utf8 NOT NULL,
  `from_uemail` text CHARACTER SET utf8 NOT NULL,
  `from_uavatar` text CHARACTER SET utf8 NOT NULL,
  `to_uname` text CHARACTER SET utf8,
  `to_uavatar` text CHARACTER SET utf8,
  `to_uemail` text CHARACTER SET utf8,
  `cdate` bigint(13) NOT NULL,
  `from_uweb` text CHARACTER SET utf8,
  `to_uweb` text CHARACTER SET utf8,
  `oldContent` text COLLATE utf8mb4_unicode_ci,
  `oldCdate` bigint(13) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for link
-- ----------------------------
DROP TABLE IF EXISTS `link`;
CREATE TABLE `link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `siteName` text NOT NULL,
  `siteUrl` text NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  `cdate` bigint(13) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagname` text NOT NULL,
  `tagdesc` text NOT NULL,
  `cdate` bigint(13) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `nickname` text,
  `avatar` text,
  `signature` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
