const Basket = require('../models/Basket')
const Product = require('../models/Product')

const purchaseController = async (req, res) => {
    const basket = await Basket.findOne({
        where: {
            user_id: Number(req.user.id),
        },
    })

    const products = await Product.findAll({
        where: {
            basket_id: basket.id,
            user_id: null,
        },
    })

    var final_price = 0
    products.forEach((product) => {
        final_price += parseFloat(product.price)
    })

    await Product.update(
        { basket_id: null, user_id: req.user.id },
        {
            where: {
                basket_id: basket.id,
                user_id: null,
            },
        }
    )

    res.render('purchase', {
        products: products,
        final_price: final_price,
    })
}

module.exports = purchaseController
