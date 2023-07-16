const Category = require('../models/Category')
const Product = require('../models/Product')

const categoryController = async (req, res) => {
    const categories = await Category.findAll()
    const activePageId = Number(req.query.page) || 1
    const offset = (Number(req.query.page) - 1) * 11 || 0
    const counts = await Product.count({
        where: {
            category_id: Number(req.params.id) + 1,
            user_id: null,
        },
    })
    const products = await Product.findAll({
        where: {
            category_id: Number(req.params.id) + 1,
            user_id: null,
        },
        limit: 11,
        offset,
        include: Category,
    })
    res.render('index', {
        categories: categories.map((category) => category.name),
        products: products,
        activeCategoryId: Number(req.params.id),
        counts,
        activePageId,
        user: req.user,
    })
}

module.exports = categoryController
