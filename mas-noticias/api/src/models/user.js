const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {

    sequelize.define("user", {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("sudo","admin","editor", "guest"),
            defaultValue: "guest"
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
}