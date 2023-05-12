const { DataTypes, connection, commonFields } = require("./dbModel");

const Role = connection.define(
  "Role",
  {
    ...commonFields,
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    }
  },
  {
    tableName: "Role",
    paranoid: true,
  }
);

module.exports = Role;
