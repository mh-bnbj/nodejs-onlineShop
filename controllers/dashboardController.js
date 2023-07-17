const { format } = require('date-fns')
const Category = require('../models/Category')
const Product = require('../models/Product')

const dashboardController = async (req, res) => {
    const categories = await Category.findAll()
    const activePageId = Number(req.query.page) || 1
    const offset = (Number(req.query.page) - 1) * 11 || 0
    const counts = await Product.count()
    const products = await Product.findAll({
        limit: 11,
        offset,
        order: [['created_date', 'DESC']],
    })
    res.render('dashboard', {
        categories: categories.map((category) => category.name),
        products: products,
        activeCategoryId: null,
        counts,
        activePageId,
        user: req.user,
    })
}

module.exports = dashboardController
