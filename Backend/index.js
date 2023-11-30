/**
 * ctrl+c untuk stop running server
 *
 * npx nodemon index.js
 */

const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const port = 3000;

const authRouter = require("./src/routes/general/auth");
const dataRouter = require("./src/routes/general/data");
const taskRouter = require("./src/routes/general/task");
const taskTypeRouter = require("./src/routes/general/task_type");
const userRouter = require("./src/routes/general/user");
const chatRouter = require("./src/routes/general/chat");
const workerRouter = require('./src/routes/worker')

const database = require("./src/databases/connection");
const { User, Task, Task_Type, Data, Chat } = require("./src/models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
    exposedHeaders: "Authorization"
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/data", dataRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/task_type", taskTypeRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/worker", workerRouter);

// app.use(
//   "/api/v1/contohMiddleware",
//   // [middleware.verifyJWT, middleware.checkRoles("admin")],
//   contohMiddlewareRouter
// );

const initApp = async () => {
  console.log("Mencoba konek");
  try {
    console.log("Berhasil konek");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  } catch (error) {
    console.error("Gagal konek", error);
  }
};

initApp();
