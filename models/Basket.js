const { DataTypes } = require('sequelize')
const db = require('../configs/db')
const User = require('./User')

const Basket = db.define(
    'basket',
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        timestamps: false,
        tableName: 'basket',
    }
)
Basket.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
    },
})

module.exports = Basket
