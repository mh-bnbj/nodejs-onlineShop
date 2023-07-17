const { format } = require('date-fns')
const { Sequelize } = require('sequelize')
const Basket = require('../models/Basket')
const Category = require('../models/Category')
const Product = require('../models/Product')

const get = async (req, res) => {
    const basket = await Basket.findOne({
        where: {
            user_id: req.user.id,
        },
    })
    const categories = await Category.findAll()
    const activePageId = Number(req.query.page) || 1
    const offset = (Number(req.query.page) - 1) * 11 || 0
    const counts = await Product.count({
        where: {
            basket_id: basket.id,
            user_id: null,
        },
    })
    const final_price = await Product.findAll({
        where: {
            basket_id: basket.id,
            user_id: null,
        },
        attributes: [[Sequelize.fn('sum', Sequelize.col('price')), 'final_price']],
        raw: true,
    })

    const showProducts = await Product.findAll({
        where: {
            basket_id: basket.id,
            user_id: null,
        },
        limit: 11,
        offset,
    })
    res.render('basket', {
        categories: categories.map((category) => category.name),
        products: showProducts,
        activeCategoryId: null,
        counts,
        activePageId,
        user: req.user,
        final_price: final_price[0].final_price,
    })
}
const post = async (req, res) => {
    const basket = await Basket.findOne({
        where: {
            user_id: Number(req.user.id),
        },
    })
    console.log('basket', basket)
    await Product.update(
        {
            basket_id: basket.id,
        },
        {
            where: { id: Number(req.query.pid) },
        }
    )
    res.redirect(`/product/${req.query.pid}`)
}

module.exports = {
    get,
    post,
}
