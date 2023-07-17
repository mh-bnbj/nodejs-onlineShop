const { DataTypes } = require('sequelize')
const db = require('../configs/db')

const Category = db.define(
    'category',
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: false,
        tableName: 'category',
    }
)

module.exports = Category
