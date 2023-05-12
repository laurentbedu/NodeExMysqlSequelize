const express = require("express");
const dbRouter = express.Router();
const db = require("../models/dataBase");

dbRouter.all("*", async (req, res, next) => {
  const table = req.params[0].replace(/^\/+/, '').replace(/\/+$/, '').split('/')[0];
  const models = Object.keys(db.getModel()).map(m => m.toLowerCase());
  if(models.includes(table)){
    next();
  }
  else{
     res.status(400).json({ data: null, result: false, message: "Bad request" })
  }
})

dbRouter.get("/:table", async (req, res) => {
    const { table } = req.params;
    const modelName = table.charAt(0).toUpperCase() + table.slice(1);
    const resp = await db.selectAll(modelName);
    res.status(resp?.result ? 200 : 400).json(resp);
  });
  
  dbRouter.get("/:table/:id", async (req, res) => {
    const { table, id } = req.params;
    const modelName = table.charAt(0).toUpperCase() + table.slice(1);
    const resp = await db.selectOne(modelName, id);
    res.status(resp?.result ? 200 : 400).json(resp);
  });

  dbRouter.post("/:table", async (req, res) =>  {
    const { table } = req.params;
    const modelName = table.charAt(0).toUpperCase() + table.slice(1);
    const { where } = req.body;
    const resp = await db.selectWhere(modelName, where);
    res.status(resp?.result ? 200 : 400).json(resp)
  })
  
  dbRouter.put("/:table", async (req, res) => {
    const { table } = req.params;
    const modelName = table.charAt(0).toUpperCase() + table.slice(1);
    const { body } = req;
    const resp = await db.insertOrUpdate(modelName, body);
    res.status(resp?.result ? 200 : 400).json(resp)
  });
  
  dbRouter.patch("/:table/:id", async (req, res) => {
    const { table, id } = req.params;
    const modelName = table.charAt(0).toUpperCase() + table.slice(1);
    const resp = await db.deleteOne(modelName, id);
    res.status(resp?.result ? 200 : 400).json(resp);
  });

module.exports = dbRouter;