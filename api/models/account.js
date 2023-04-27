const { DataTypes, connection, commonFields } = require("./dataBase");

const Account = connection.define(
  "Account",
  {
    ...commonFields,
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Account",
    paranoid: true,
  }
);

module.exports = Account;
