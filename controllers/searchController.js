const { Op } = require('sequelize')
const Category = require('../models/Category')
const Product = require('../models/Product')

const searchController = async (req, res) => {
    const categories = await Category.findAll()
    const activePageId = Number(req.query.page) || 1
    const offset = (Number(req.query.page) - 1) * 11 || 0
    const counts = await Product.count({
        where: {
            name: {
                [Op.like]: `%${req.query.q}%`,
            },
            user_id: null,
        },
    })
    const products = await Product.findAll({
        where: {
            title: {
                [Op.like]: `%${req.query.q}%`,
            },
            user_id: null,
        },
        limit: 11,
        offset,
        order: [['created_date', 'DESC']],
    })
    res.render('search', {
        categories: categories.map((category) => category.name),
        products: products,
        activeCategoryId: null,
        counts,
        activePageId,
        user: req.user,
    })
}

module.exports = searchController
