"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: "userId" });
      User.belongsToMany(models.Course, {
        through: "UserCourses",
        foreignKey: "userId",
      });
      // User.hasMany(models.UserCourse, { foreignKey: "courseId" });
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Username is required",
          },
          notNull: {
            msg: "Username is required",
          },
          isAlphanumeric: {
            msg: "Username must be Alphanumeric",
          },
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Email is wrong",
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: {
            msg: "Password is required",
          },
          len: {
            args: [8, 20],
            msg: "Minimum length password is 8 and maximum is 20",
          },
        },
      },

      role: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeSave((user, options) => {
    if (user.role !== "admin" || user.role !== null) {
      user.role = "user";
    }
    user.password = bcrypt.hashSync(user.password, salt);
  });

  return User;
};
