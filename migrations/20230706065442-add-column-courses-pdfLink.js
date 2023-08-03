"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Courses", "pdfLink", {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Courses", "pdfLink");
  },
};
