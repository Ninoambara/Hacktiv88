'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "userName", {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    });
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Users", "userName");
  }
};
