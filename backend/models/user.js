'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Posts }) {
      // define association here
      this.hasMany(Posts, {foreignKey: 'UserId'});
    }
  }
  Users.init({
    userName: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Users',
  });
  return Users;
};