const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("report", {

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
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        footer3: {
            type: DataTypes.STRING,
            allowNull: true
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