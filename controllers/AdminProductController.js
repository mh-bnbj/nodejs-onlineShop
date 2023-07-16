const Category = require('../models/Category')
const Product = require('../models/Product')

const get = async (req, res) => {
    const categories = await Category.findAll()
    res.render('post/create', {
        flash: req.flash(),
        errors: [],
        categories,
    })
}
const post = async (req, res) => {
    await Product.create({
        name: req.body.name,
        price: parseFloat(req.body.price),
        image: `http://localhost:4000/uploads/${req.file.filename}`,
        created_date: new Date(),
        category_id: req.body.category_id,
    })
    res.redirect('/dashboard')
}

module.exports = {
    get,
    post,
}
