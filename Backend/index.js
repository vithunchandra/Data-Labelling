/**
 * ctrl+c untuk stop running server
 *
 * npx nodemon index.js
 */

/**
 * 
query:
get /buku?buku_id=7&nama_buku=testing

params:
get /buku/7/nama/testing

body:
POST /login	
 */

const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;
// const contohRouter = require("./src/routes/contoh");
// const bukuRouter = require("./src/routes/buku");
// const bukuRawRouter = require("./src/routes/bukuRaw");
// const bukuORMRouter = require("./src/routes/bukuORM");
// const contohRelasiRouter = require("./src/routes/contohRelasi");
// const contohValidasiRouter = require("./src/routes/contohValidasi");
// const contohAxiosRouter = require("./src/routes/contohAxios");
// const contohMiddlewareRouter = require("./src/routes/contohMiddleware");
const authRouter = require("./src/routes/auth");

const database = require("./src/databases/connection");
const { User, Task, Task_Type, Data, Chat } = require("./src/models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

// app.use("/api/v1", contohRouter);
// app.use("/api/v1/buku", bukuRouter);
// app.use("/api/v1/bukuRaw", bukuRawRouter);
// app.use("/api/v1/bukuORM", bukuORMRouter);
// app.use("/api/v1/contohRelasi", contohRelasiRouter);
// app.use("/api/v1/contohValidasi", contohValidasiRouter);
// app.use("/api/v1/contohAxios", contohAxiosRouter);
// app.use(
//   "/api/v1/contohMiddleware",
//   // [middleware.verifyJWT, middleware.checkRoles("admin")],
//   contohMiddlewareRouter
// );

const initApp = async () => {
  console.log("Mencoba konek");
  try {
    console.log("Berhasil konek");

    // await User.create({
    //   username: "andi",
    //   password: "andi123",
    //   name: "Andi",
    //   role: "worker",
    //   credibility: 100,
    //   wallet: 30000,
    // });
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  } catch (error) {
    console.error("Gagal konek", error);
  }
};

initApp();
