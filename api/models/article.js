const { DataTypes, connection, commonFields } = require("./dbModel");

const Article = connection.define(
  "Article",
  {
    ...commonFields,
    title : {
      type: DataTypes.STRING
    },
    content : {
      type: DataTypes.STRING
    }
  },
  {
    tableName: "Article",
    paranoid: true,
  }
);

module.exports = Article;
