-- phpMyAdmin SQL Dump
-- version 3.3.9.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 12, 2011 at 08:32 PM
-- Server version: 5.0.92
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `villem_mobile`
--

-- --------------------------------------------------------

--
-- Table structure for table `commands`
--

CREATE TABLE IF NOT EXISTS `commands` (
  `command` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `commands`
--


-- --------------------------------------------------------

--
-- Table structure for table `presentations`
--

CREATE TABLE IF NOT EXISTS `presentations` (
  `id` int(11) NOT NULL default '0',
  `presentation` varchar(30) default NULL,
  `numOfSlides` int(11) NOT NULL,
  `load` varchar(10) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `presentations`
--

INSERT INTO `presentations` (`id`, `presentation`, `numOfSlides`, `load`) VALUES
(1, 'Google Security', 12, 'yes'),
(2, 'Starbucks Promotional', 0, 'no');

-- --------------------------------------------------------

--
-- Table structure for table `slides`
--

CREATE TABLE IF NOT EXISTS `slides` (
  `slideNum` int(11) default NULL,
  `title` varchar(30) default NULL,
  `location` varchar(100) default NULL,
  `presentation` varchar(30) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `slides`
--

INSERT INTO `slides` (`slideNum`, `title`, `location`, `presentation`) VALUES
(1, 'intro', 'slides/01.xml', 'Google Security'),
(2, 'web2', 'slides/02.xml', 'Google Security'),
(3, 'web3', 'slides/03.xml', 'Google Security'),
(4, 'web4', 'slides/04.xml', 'Google Security'),
(5, 'web5', 'slides/05.xml', 'Google Security'),
(6, 'web6', 'slides/06.xml', 'Google Security'),
(7, 'web7', 'slides/07.xml', 'Google Security'),
(8, 'web8', 'slides/08.xml', 'Google Security'),
(9, 'web9', 'slides/09.xml', 'Google Security'),
(10, 'web10', 'slides/10.xml', 'Google Security'),
(11, 'web11', 'slides/11.xml', 'Google Security'),
(12, 'web12', 'slides/12.xml', 'Google Security');

-- --------------------------------------------------------

--
-- Table structure for table `user_ids`
--

CREATE TABLE IF NOT EXISTS `user_ids` (
  `user` varchar(25) NOT NULL,
  `phone_code` varchar(5) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_ids`
--

INSERT INTO `user_ids` (`user`, `phone_code`) VALUES
('villem', 'test');
