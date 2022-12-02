const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  mongoose
    .connect(process.env.mongomongo)
    .then(console.log("몽고디비 연결 성공"))
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
