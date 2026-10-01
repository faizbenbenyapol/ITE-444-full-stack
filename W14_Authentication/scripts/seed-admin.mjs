// สร้างผู้ใช้ admin สำหรับ login เข้าหน้า /admin (รันครั้งเดียว: node scripts/seed-admin.mjs)
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const ADMIN_NAME = "Admin";
const ADMIN_EMAIL = "admin@test.com";
const ADMIN_PASSWORD = "admin123";

const db = await mysql.createConnection({ host: "localhost", user: "root", password: "", database: "nextshop" });
const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
await db.query(
    "INSERT INTO tbl_user (name, email, password, role) VALUES (?, ?, ?, 'admin') ON DUPLICATE KEY UPDATE password = VALUES(password)",
    [ADMIN_NAME, ADMIN_EMAIL, hash]
);
console.log("seeded admin:", ADMIN_EMAIL);
await db.end();
