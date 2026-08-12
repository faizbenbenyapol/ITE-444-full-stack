const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_demo",
});
 
db.connect((error) => {
  if (error) {
    console.log("Database connection failed:", error);
    return;
  }
 
  console.log("MySQL connected");
});
 
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
 
  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "ไม่สามารถโหลดข้อมูลได้",
      });
    }
 
    res.json(results);
  });
});
 
app.listen(3001, () => {
  console.log("API running at http://localhost:3001");
});