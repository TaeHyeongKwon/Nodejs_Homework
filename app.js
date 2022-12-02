const express = require("express");
const app = express();
const port = 3000;
const connect = require("./schemas");
const morgan = require("morgan");
connect();

const indexRouter = require("./routes");

app.use(express.json());
app.use(morgan("combined"));
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
