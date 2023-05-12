const dbModel = {};
const { Sequelize, DataTypes } = require("sequelize");
const config = require('../config');

dbModel.commonFields = {
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

const { host, port, database, user, password } = config.db;
dbModel.connection = new Sequelize(database, user, password, {
  host,
  port,
  dialect: "mysql",
});

dbModel.getModel = (modelName = null) => {
  if (!dbModel.models) {
    require(".");
    dbModel.models = dbModel.connection.models;
  }
  if (modelName) {
    return dbModel.models[modelName];
  }
  return dbModel.models;
};

const defineRelations = () =>  {
  const Account = dbModel.getModel("Account"); 
  const Customer = dbModel.getModel("Customer");
  const Role = dbModel.getModel("Role");
  //OneToOne
  Account.belongsTo(Customer,{
    foreignKey: {
      allowNull: false
    }
  });
  Customer.hasOne(Account);
  //OneToMany
  Account.belongsTo(Role,{
    foreignKey: {
      allowNull: false
    }
  });
  Role.hasMany(Account);
}

dbModel.synchronize = (option = { alter: true }) => {
  if (!dbModel.models) {
    require(".");
    dbModel.models = dbModel.connection.models;
  }
  defineRelations();
  dbModel.connection.sync(option);
}; 

module.exports = { ...dbModel, DataTypes };