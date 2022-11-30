const express = require("express");
const app = express();
const port = 3000;
const connect = require("./schemas");
connect();
const indexRouter = require("./routes");

app.use(express.json());

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
