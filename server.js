//configuring the dotenv file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const createError = require("http-errors");
const userRouter = require("./Routes/UserRouter");

const app = express();
const port = process.env.PORT || 8080;

// Enabled CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Databse url
const uri = process.env.MONGODB_URI;
// Connect Mongodb Database
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
//creating connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb database connection established successfully !!");
});

// Routes Configuration
app.use("/api", userRouter);

//Error Handling middlewares

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

//starting server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
