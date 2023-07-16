const { DataTypes } = require('sequelize')
const db = require('../configs/db')
const Category = require('./Category')
const User = require('./User')
const Basket = require('./Basket')

const Product = db.define(
    'product',
    {
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            allowNull: false,
        },
        basket_id: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
    },
    {
        tableName: 'product',
        timestamps: false,
    }
)

Product.belongsTo(Category, {
    foreignKey: {
        name: 'category_id',
        allowNull: false,
    },
})
Product.belongsTo(Basket, {
    foreignKey: {
        name: 'basket_id',
    },
})
Product.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
    },
})

module.exports = Product
