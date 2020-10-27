'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Todos","UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    })
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Todos","UserId")
  }
};
