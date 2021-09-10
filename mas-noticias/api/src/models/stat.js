const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("stat", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        comments: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
}