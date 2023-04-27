const { DataTypes, connection, commonFields } = require("./dataBase");

const Role = connection.define(
  "Role",
  {
    ...commonFields,
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "Role",
    paranoid: true,
  }
);

module.exports = Role;
