const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const db = require("./models/Connector");
const response = require("./Response")

app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "Pemasok", "Daftar pemasok", res);
});

app.post("/pemasok", (req, res) => {
  const {kodePemasok, namaPemasok, alamatPemasok, teleponPemasok } = req.body;

  const sql = `INSERT INTO pemasok (kodePemasok, namaPemasok, alamatPemasok, teleponPemasok) VALUES ('${kodePemasok}', '${namaPemasok}', '${alamatPemasok}', '${teleponPemasok}')`;

  db.query(sql, (err, fields) => {
    if (err) response(500, "invalid", "error", res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, "POST data succesfully", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
