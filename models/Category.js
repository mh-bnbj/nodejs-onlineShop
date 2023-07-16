const { DataTypes } = require('sequelize')
const db = require('../configs/db')

const Category = db.define(
    'category',
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'category',
    }
)

module.exports = Category
