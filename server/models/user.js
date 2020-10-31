'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
  }, 
  {
    hooks: {
      beforeCreate(user){
        user.password = bcrypt.hashSync(user.password, 8) // untuk enkripsi password
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};