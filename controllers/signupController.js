const { validationResult } = require('express-validator')
const User = require('../models/User')
const Basket = require('../models/Basket')
const sendMail = require('../utils/sendMail')
const ejs = require('ejs')
const path = require('path')

const get = (req, res) => {
    res.render('signup', {
        flash: req.flash(),
        errors: [],
    })
}
const post = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('signup', {
            flash: req.flash(),
            errors: errors.array(),
        })
        return
    }

    const existanceUser = await User.findOne({
        where: {
            email: req.body.email,
        },
    })
    if (existanceUser) {
        req.flash('warning', 'This user already exists')
        res.render('signup', {
            flash: req.flash(),
            errors: [],
        })
        return
    }

    const created_user = await User.create({
        admin: req.body.admin ? 1 : 0,
        name: req.body.name,
        email: req.body.email,
        password: await User.encryptPassword(req.body.password),
    })
    await Basket.create({
        user_id: created_user.id,
    })

    const html = await ejs.renderFile(path.join(__dirname, '../views/mail/auth.ejs'), {
        title: 'Welcome to online store',
        description: 'You have successfully registered in mohamadhasan Online Store',
        link: null,
    })

    await sendMail({
        to: req.body.email,
        subject: 'Welcome to Online Store',
        html: html,
    })

    res.render('signup', {
        flash: req.flash(),
        errors: [],
    })
}

module.exports = {
    get,
    post,
}
