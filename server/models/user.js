'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg:  "Email is required!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          args:true,
          msg: "Password is required!"
        }
      } 
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "First name is required field"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          args: true,
          msg: "Last name is required field"
        }
      }
    }
  }, 
  {
    hooks: {
      beforeCreate(user){
        user.password = hashPassword(user.password, 8) // untuk enkripsi password
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};