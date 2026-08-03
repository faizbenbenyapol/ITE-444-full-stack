const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

// Database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'workshop_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});

// 1. GET - แสดงข้อมูลรถทั้งหมด
app.get('/cars', (req, res) => {
  db.query('SELECT * FROM tbl_cars', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// 2. POST - เพิ่มข้อมูลรถ
app.post('/cars', (req, res) => {
  const { brand, model, year, price, color } = req.body;
  const sql = 'INSERT INTO tbl_cars (brand, model, year, price, color) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [brand, model, year, price, color], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Car added successfully', id: result.insertId });
  });
});

// 3. PUT - แก้ไขข้อมูลรถตาม ID
app.put('/cars/:id', (req, res) => {
  const { id } = req.params;
  const { brand, model, year, price, color } = req.body;
  const sql = 'UPDATE tbl_cars SET brand=?, model=?, year=?, price=?, color=? WHERE id=?';
  db.query(sql, [brand, model, year, price, color, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Car updated successfully' });
  });
});

// 4. DELETE - ลบข้อมูลรถตาม ID
app.delete('/cars/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tbl_cars WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Car deleted successfully' });
  });
});

app.listen(3000, () => console.log('Server Running on port 3000...'));