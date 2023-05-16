const { DataTypes, connection, commonFields } = require("./dbModel");

const Tag = connection.define(
  "Tag",
  {
    ...commonFields,
    label: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: "Tag",
    paranoid: true,
  }
);

module.exports = Tag;
