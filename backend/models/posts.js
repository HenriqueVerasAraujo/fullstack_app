'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Comments, Likes }) {
      // define association here
      this.belongsTo(Users, { foreignKey: 'UserId' });
      this.hasMany(Comments, { foreignKey: 'PostId' });
      this.hasMany(Likes, { foreignKey: 'PostId' });
    }
  }
  Posts.init({
    postText: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    userName: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Posts',
  });
  return Posts;
};