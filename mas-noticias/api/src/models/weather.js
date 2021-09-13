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
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
}