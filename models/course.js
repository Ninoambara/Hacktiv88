"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category, { foreignKey: "categoryId" });
      Course.belongsToMany(models.User, {
        through: "UserCourses",
        foreignKey: "courseId",
      });
    }

    static getCourseByCategory(search) {
      let options;

      if (search) {
        options = {
          attributes: ["name", "id"],
          include: {
            association: "Category",
            attributes: ["name"],
            where: { name: { [Op.iLike]: search } },
          },
        };
      } else {
        options = {
          attributes: ["name", "id"],
          include: { association: "Category", attributes: ["name"] },
        };
      }

      return Course.findAll(options);
    }
  }
  Course.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Course Name is required",
          },
          notNull: {
            msg: "Course Name is required",
          },
          isAlpha: {
            msg: "Description must be alphabet",
          },
        },
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
          notNull: {
            msg: "Description is required",
          },
          isAlpha: {
            msg: "Description must be alphabet",
          },
        },
      },

      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Duration is required",
          },
          notNull: {
            msg: "Duration is required",
          },
          isNumeric: {
            msg: "Duration must be numeric",
          },
        },
      },

      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category Id is required",
          },
          notNull: {
            msg: "Category Id is required",
          },
          isNumeric: {
            msg: "Category Id must be numeric",
          },
        },
      },

      pdfLink: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Pdf Link is required",
          },
          notNull: {
            msg: "Pdf Link is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
