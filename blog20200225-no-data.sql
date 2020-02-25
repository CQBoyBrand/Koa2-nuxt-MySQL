/*
 Navicat Premium Data Transfer

 Source Server         : blog-112.74.191.84
 Source Server Type    : MySQL
 Source Server Version : 50564
 Source Host           : 112.74.191.84:3306
 Source Schema         : blog

 Target Server Type    : MySQL
 Target Server Version : 50564
 File Encoding         : 65001

 Date: 25/02/2020 14:43:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` bigint(20) NOT NULL COMMENT '文章id',
  `artTitle` text NOT NULL,
  `abstract` text NOT NULL,
  `category` text NOT NULL,
  `tag` text NOT NULL,
  `thumbnail` text,
  `content` text NOT NULL,
  `cdate` bigint(20) NOT NULL COMMENT '文章发布时间',
  `pv` int(11) NOT NULL DEFAULT '0' COMMENT '文章浏览量',
  `discuss` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '文章状态：1-公开；0-未公开',
  `editdate` bigint(20) NOT NULL COMMENT '文章修改时间',
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
  `cdate` bigint(20) NOT NULL DEFAULT '1582612530978' COMMENT '创建时间',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '分类状态, 1-可用，0-不可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artId` bigint(20) NOT NULL COMMENT '文章id',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_uname` text CHARACTER SET utf8 NOT NULL,
  `from_uemail` text CHARACTER SET utf8 NOT NULL,
  `from_uavatar` text CHARACTER SET utf8 NOT NULL,
  `to_uname` text CHARACTER SET utf8,
  `to_uavatar` text CHARACTER SET utf8,
  `to_uemail` text CHARACTER SET utf8,
  `cdate` bigint(20) NOT NULL COMMENT '评论回复时间',
  `from_uweb` text CHARACTER SET utf8,
  `to_uweb` text CHARACTER SET utf8,
  `oldContent` text COLLATE utf8mb4_unicode_ci,
  `oldCdate` bigint(20) DEFAULT NULL COMMENT '被回复的内容的回复时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discussStatus` int(11) NOT NULL DEFAULT '1',
  `icp` text NOT NULL,
  `psr` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for link
-- ----------------------------
DROP TABLE IF EXISTS `link`;
CREATE TABLE `link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `siteName` text NOT NULL,
  `siteUrl` text NOT NULL,
  `status` int(11) DEFAULT '0' COMMENT '链接状态, 1-可用，0-不可用',
  `cdate` bigint(20) NOT NULL DEFAULT '1582612530977' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagname` text NOT NULL,
  `tagdesc` text NOT NULL,
  `cdate` bigint(20) NOT NULL DEFAULT '1582612530977' COMMENT '创建时间',
  `status` int(11) DEFAULT '0' COMMENT '标签状态, 1-可用，0-不可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户 id',
  `username` text NOT NULL,
  `password` text NOT NULL,
  `nickname` text,
  `avatar` text,
  `signature` text,
  `cdate` bigint(20) NOT NULL DEFAULT '1582612530953' COMMENT '用户创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
