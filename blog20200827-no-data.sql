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

 Date: 27/08/2020 17:27:28
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
  `artDiscuss` int(11) NOT NULL DEFAULT '1' COMMENT '文章是否允许评论：1-允许；0-不允许',
  `artType` text NOT NULL COMMENT '文章所属板块：code or life',
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
  `cdate` bigint(20) NOT NULL DEFAULT '1597618819111' COMMENT '创建时间',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '分类状态, 1-可用，0-不可用',
  `categorytype` text NOT NULL COMMENT '分类所属板块：code or life',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

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
  `artURL` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论的文章链接',
  `oldId` bigint(20) DEFAULT NULL COMMENT '被回复内容的id',
  `isChecked` int(11) NOT NULL DEFAULT '0' COMMENT '评论是否审核过 1-通过；0-不通过',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `cdate` bigint(20) NOT NULL DEFAULT '1597618819110' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagname` text NOT NULL,
  `tagdesc` text NOT NULL,
  `cdate` bigint(20) NOT NULL DEFAULT '1597618819110' COMMENT '创建时间',
  `status` int(11) DEFAULT '0' COMMENT '标签状态, 1-可用，0-不可用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

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
  `cdate` bigint(20) NOT NULL DEFAULT '1597618819100' COMMENT '用户创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, 'admin', 'd42ea2921cc0ec2d02ab6951ea1834ed', '重庆崽儿', 'https://s.gravatar.com/avatar/d8065bea49aa2877ce13686772727711?s=80', 'Hello World', 1582595976253);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
