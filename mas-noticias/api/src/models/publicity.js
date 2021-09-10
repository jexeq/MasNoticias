const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("publicity", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false
        },
        init: {
            type: DataTypes.STRING,
            allowNull: false
        },
        end: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priority: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}