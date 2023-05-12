const express = require("express");
const dbRouter = express.Router();
const dbModel = require('../models/dbModel');
const dbService = require("../services/dbService");

dbRouter.all("*", async (req, res, next) => {
  const table = req.params[0].replace(/^\/+/, '').replace(/\/+$/, '').split('/')[0];
  const models = Object.keys(dbModel.getModel()).map(m => m.toLowerCase());
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
    const resp = await dbService.selectAll(modelName);
    res.status(resp?.result ? 200 : 400).json(resp);
  });
  
  dbRouter.get("/:table/:id", async (req, res) => {
    const { table, id } = req.params;
    const modelName = table.charAt(0).toUpperCase() + table.slice(1);
    const resp = await dbService.selectOne(modelName, id);
    res.status(resp?.result ? 200 : 400).json(resp);
  });

  dbRouter.post("/:table", async (req, res) =>  {
    const { table } = req.params;
    const modelName = table.charAt(0).toUpperCase() + table.slice(1);
    const { where } = req.body;
    const resp = await dbService.selectWhere(modelName, where);
    res.status(resp?.result ? 200 : 400).json(resp)
  })
  
  dbRouter.put("/:table", async (req, res) => {
    const { table } = req.params;
    const modelName = table.charAt(0).toUpperCase() + table.slice(1);
    const { body } = req;
    const resp = await dbService.insertOrUpdate(modelName, body);
    res.status(resp?.result ? 200 : 400).json(resp)
  });
  
  dbRouter.patch("/:table/:id", async (req, res) => {
    const { table, id } = req.params;
    const modelName = table.charAt(0).toUpperCase() + table.slice(1);
    const resp = await dbService.deleteOne(modelName, id);
    res.status(resp?.result ? 200 : 400).json(resp);
  });

module.exports = dbRouter;