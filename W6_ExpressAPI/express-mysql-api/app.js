const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//conect to database
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "workshop_db",
});
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});
//end connect to database

//api get all data
app.get("/products", (req, res) => {
  db.query("SELECT * FROM tbl_product", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
});
//end api

//api insert data
app.post("/products", (req, res) => {
  const { name, price, stock } = req.body;
  db.query(
    "INSERT INTO tbl_product(name,price,stock)VALUES(?,?,?)",
    [name, price, stock],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "Insert Success",
      });
    },
  );
});
//end api insert data

//put api update data
app.put("/products/:id", (req, res) => {
  const { name, price, stock } = req.body;
  db.query(
    "UPDATE tbl_product SET name=?,price=?,stock=? WHERE id=?",
    [name, price, stock, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "Update Success",
      });
    },
  );
});
//end put api update data

//delete api
app.delete("/products/:id", (req, res) => {
  db.query(
    "DELETE FROM tbl_product WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "Delete Success",
      });
    },
  );
});
//end delete api

app.listen(3000, () => {
  console.log("Server Running...");
});
