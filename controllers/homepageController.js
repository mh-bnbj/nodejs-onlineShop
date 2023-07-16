const Category = require('../models/Category')
const Product = require('../models/Product')

const homepageController = async (req, res) => {
    const categories = await Category.findAll()
    const activePageId = Number(req.query.page) || 1
    const offset = (Number(req.query.page) - 1) * 11 || 0
    const counts = await Product.count({
        where: {
            user_id: null,
        },
    })
    const products = await Product.findAll({
        where: {
            user_id: null,
        },
        limit: 11,
        offset,
        order: [['created_date', 'DESC']],
        include: Category,
    })

    res.render('index', {
        categories: categories.map((category) => category.name),
        products: products,
        activeCategoryId: null,
        counts,
        activePageId,
        user: req.user,
    })
}

module.exports = homepageController
