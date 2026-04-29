const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_university"
});

connection.connect((err) => {
  if (err) {
    console.log("CONNESSINE FALLITA");
    return;
  }

  console.log("Connesso");
});

module.exports = connection;