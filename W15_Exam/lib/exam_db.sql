-- ตารางฝึกซ้อม (import ใน phpMyAdmin หรือ: /opt/lampp/bin/mysql -uroot < lib/exam_db.sql)
-- วันสอบ: ลบตารางนี้ทิ้ง แล้วใส่ตารางที่อาจารย์ให้แทน
CREATE DATABASE IF NOT EXISTS `exam_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `exam_db`;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products` (`name`, `price`, `img_url`, `description`, `stock`) VALUES
('Notebook', 25900.00, 'https://picsum.photos/id/0/400/300', 'โน้ตบุ๊กสำหรับทำงาน', 10),
('Mouse', 590.00, 'https://picsum.photos/id/1/400/300', 'เมาส์ไร้สาย', 50),
('Keyboard', 1290.00, 'https://picsum.photos/id/2/400/300', 'คีย์บอร์ด Mechanical', 30),
('Monitor', 5900.00, 'https://picsum.photos/id/3/400/300', 'จอ 27 นิ้ว', 15);
