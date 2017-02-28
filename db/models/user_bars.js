'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_Bars = sequelize.define('User_Bars', {
    user_id: DataTypes.INTEGER,
    bar_name: DataTypes.STRING(128),
    bar_address: DataTypes.STRING(128)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User_Bars;
};