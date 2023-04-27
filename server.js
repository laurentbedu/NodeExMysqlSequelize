const express = require("express");
const app = express();

const Db = require("./api/models/dataBase");
Db.synchronize();
console.log("Liste des modèles : ", Db.getModel());

app.get("*", (req, res) => {
  res.status(200).json("Ok");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("models");
});
