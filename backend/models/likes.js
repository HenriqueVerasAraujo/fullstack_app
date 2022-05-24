'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Posts, Users }) {
      // define association here
      this.belongsTo(Posts, {foreignKey: 'PostId'});
      this.belongsTo(Users, {foreignKey: 'UserId'});
    }
  }
  Likes.init({
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Likes',
  });
  return Likes;
};