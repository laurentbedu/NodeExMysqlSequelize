const express = require("express");
const app = express();
app.use(express.json());

const dbModel = require('./api/models/dbModel');
dbModel.synchronize(); 

const dbRouter = require('./api/routers/dbRouter');
app.use(dbRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("models");
});
