"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, { foreignKey: "userId" });
    }
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
  Profile.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Firstname is required",
          },
          notNull: {
            msg: "Firstname is required",
          },
          isAlphanumeric: {
            msg: "Firstname must be Alphabet",
          },
        },
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Lastname is required",
          },
          notNull: {
            msg: "Lastname is required",
          },
          isAlpha: {
            msg: "Lastname must be Alphabet",
          },
        },
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Gender is required",
          },
          notNull: {
            msg: "Gender is required",
          },
          isIn: {
            args: [["Male", "Female"]],
            msg: "Gender must be Male or Female",
          },
        },
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
