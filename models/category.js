"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Course, { foreignKey: "categoryId" });
    }

    static categoryList() {
      return Category.findAll({attributes: ["name"]});
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Category is required'
          },
          notNull: {
            msg: 'Category is required'
          }
        } 
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
