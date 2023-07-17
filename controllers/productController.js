const Basket = require('../models/Basket')
const Category = require('../models/Category')
const Product = require('../models/Product')

const productController = async (req, res) => {
    const categories = await Category.findAll()
    var user_basket = null
    if (req.user) {
        user_basket = await Basket.findOne({
            where: {
                user_id: Number(req.user.id),
            },
        })
    }
    const product = await Product.findOne({
        where: {
            id: Number(req.params.id),
            user_id: null,
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
        product: product,
        prevProductEnabled: !!prevProduct,
        nextProductEnabled: !!nextProduct,
        activeCategoryId: null,
        user: req.user,
        user_basket: user_basket,
    })
}

module.exports = productController
