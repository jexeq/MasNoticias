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
        shares: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
}