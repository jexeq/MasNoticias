const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("videoreport", {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title1: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        title2: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        video: {
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
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priority: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM("pendiente", "publicado", "oculto"),
            defaultValue: "pendiente"
        }

    });
}