require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
const connection = require("./config/database");
require("./mongo_models/lessons.models");

const uri = process.env.DB_STRING;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
  mongoUrl: uri,
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(
  session({
    secret: "it is secret and now",
    cookie: {
      maxAge: 100 * 60 * 24 * 60 * 60, // 1 week
    },
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
);

const lessons = require("./routes/lessons.routes");
const question = require("./routes/question.routes");
// 
app.use("/lessons",lessons);
app.use("/questions",question);



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//
