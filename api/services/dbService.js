const dbService = {};
const dbModel = require("../models/dbModel");

dbService.selectAll = async (modelName) => {
  try {
    const rows = await dbModel.getModel(modelName)?.findAll();
    return { data: rows, result: true, message: "OK" };
  } catch (err) {
    return { data: null, result: false, message: err };
  }
};

dbService.selectOne = async (modelName, id) => {
  try {
    const row = await dbModel.getModel(modelName)?.findByPk(id);
    return { data: row, result: true, message: "OK" };
  } catch (err) {
    return { data: null, result: false, message: err };
  }
};

dbService.selectWhere = async (modelName, where = null) => {
  if (!where) {
    where = { 1: 1 };
  }
  try {
    const rows = await dbModel.getModel(modelName)?.findAll({ where });
    return { data: rows, result: true, message: "OK" };
  } catch (err) {
    return { data: null, result: false, message: err };
  }
};

dbService.insertOrUpdate = async (modelName, json) => {
  if (!Array.isArray(json)) {
    json = [json];
  }
  const fields = Object.keys(dbModel.getModel(modelName).rawAttributes);
  const rows = await dbModel.getModel(modelName)?.bulkCreate(json, {
    updateOnDuplicate: fields,
    individualHooks: true,
  });
  return { data: rows, result: true, message: "OK" };
};

dbService.deleteOne = async (modelName, id) => {
  //soft delete
  const exists = await dbModel.getModel(modelName)?.destroy({ where: { id } });
  return { data: exists, result: true, message: "OK" };
};

module.exports = dbService;
