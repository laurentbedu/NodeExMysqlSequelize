const Db = {};
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config");

const { host, port, database, user, password } = config.db;
Db.connection = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "mysql",
});

Db.commonFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  createdBy: {
    type: DataTypes.INTEGER,
  },
  updatedBy: {
    type: DataTypes.INTEGER,
  },
  deletedBy: {
    type: DataTypes.INTEGER,
  },
};

Db.getModel = (modelName = null) => {
  if (!Db.models) {
    require(".");
    Db.models = Db.connection.models;
  }
  if (modelName) {
    return Db.models[modelName];
  }
  return Db.models;
};

Db.synchronize = (option = { alter: true }) => {
  if (!Db.models) {
    require(".");
    Db.models = Db.connection.models;
  }
  Db.connection.sync(option);
};

Db.selectAll = async (modelName) => {
  try {
    const rows = await Db.getModel(modelName)?.findAll();
    return { data: rows, result: true, message: "OK" };
  } catch (err) {
    return { data: null, result: false, message: err };
  }
}

Db.selectOne = async (modelName, id) => {
  try {
    const row = await Db.getModel(modelName)?.findByPk(id);
    return { data: row, result: true, message: "OK" };
  } catch (err) {
    return { data: null, result: false, message: err };
  }
}

Db.selectWhere = async (modelName, where = null) => {
  if(!where){
    where = {"1": 1}
  }
  try {
    const rows = await Db.getModel(modelName)?.findAll({where});
    return { data: rows, result: true, message: "OK" };
  } catch (err) {
    return { data: null, result: false, message: err };
  }
}

Db.insertOrUpdate = async (modelName, json) => {
  if(!Array.isArray(json)){
    json = [json];
  }
  const fields = Object.keys(Db.getModel(modelName).rawAttributes);
  const rows = await Db.getModel(modelName)?.bulkCreate(
    json,
    {
      updateOnDuplicate: fields,
      individualHooks: true
    }
  );
  return { data: rows, result: true, message: "OK" };
}

Db.deleteOne = async (modelName, id) => {//soft delete
  const exists =  await Db.getModel(modelName)?.destroy({where:{id}});
  return { data: exists, result: true, message: "OK" };;
}

module.exports = { ...Db, DataTypes };