/**
 * usefull for report and for machine learning we need clicks and or watching hours data 
 * mysql or perhaps sqllite
 * user score data table and question table
 */
require("dotenv").config();
const mysql = require("mysql");

console.log(process.env.MY_SQL_USERNAME, process.env.MY_SQL_PASSWORD);
var con = mysql.createConnection({
  host: "localhost",
  user: String(process.env.MY_SQL_USERNAME),
  password: String(process.env.MY_SQL_PASSWORD),
});

// Connected with mylocal mysql server 
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE courses_mysqldb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  con.query("CREATE TABLE course_weeks (week_number int char 10, lesson_number int char 10")
});
