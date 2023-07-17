const Category = require('../models/Category')

const get = async (req, res) => {
    res.render('post/createCategory', {
        flash: req.flash(),
        errors: [],
    })
}
const post = async (req, res) => {
    await Category.create({
        name: req.body.name,
    })
    res.redirect('/dashboard')
}

module.exports = {
    get,
    post,
}
