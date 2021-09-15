const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("weather", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        report: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        hour: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        month: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
}