const Product = require('../models/Product')

const purchaseController = async (req, res) => {
    const products = await Product.findAll({
        where: {
            user_id: req.user.id,
        },
    })

    var final_price = 0
    products.forEach((product) => {
        final_price += parseFloat(product.price)
    })

    res.render('history', {
        products: products,
        final_price: final_price,
    })
}

module.exports = purchaseController
