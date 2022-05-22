module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    Users.associate = (models) => {
        Users.hasMany(models.Posts, {
            onDelete: 'cascade',
        })
    }
    return Users;
};