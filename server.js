const express = require("express");
const app = express();

const config = require("./api/config");
const Sequelize = require("sequelize");
const { host, port, database, user, password } = config.db;
const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((error) => {
    console.error("Connection failed : ", error);
  });

app.get("*", (req, res) => {
  res.status(200).json("Ok");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
