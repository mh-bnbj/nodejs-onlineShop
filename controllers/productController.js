const Category = require('../models/Category')
const Product = require('../models/Product')

const productController = async (req, res) => {
    const categories = await Category.findAll()
    const product = await Product.findOne({
        where: {
            id: Number(req.params.id),
        },
    })
    const prevProduct = await Product.findOne({
        where: {
            id: Number(req.params.id) - 1,
        },
    })
    const nextProduct = await Product.findOne({
        where: {
            id: Number(req.params.id) + 1,
        },
    })
    res.render('product', {
        categories: categories.map((category) => category.name),
        Product: product,
        prevProductEnabled: !!prevProduct,
        nextProductEnabled: !!nextProduct,
        activeCategoryId: null,
        user: req.user,
    })
}

module.exports = productController
