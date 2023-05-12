const { DataTypes, connection, commonFields } = require("./dbModel");

const Customer = connection.define(
  "Customer",
  {
    ...commonFields,
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Customer",
    paranoid: true,
  }
);

module.exports = Customer;
