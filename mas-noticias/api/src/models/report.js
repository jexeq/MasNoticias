const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("report", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        footer1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paragraph1: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        footer2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        paragraph2: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        paragraph3: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        photo3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        footer3: {
            type: DataTypes.STRING,
            allowNull: true
        },

    });
}