const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        req.flash('warning', 'You need to log in first')
        res.redirect('/login')
        return
    } else {
        next()
    }
}

const isNotLoggedIn = (req, res, next) => {
    if (req.user) {
        res.redirect('/')
        return
    } else {
        next()
    }
}

const checkAdmin = (req, res, next) => {
    if (!req.user || !req.user.admin) {
        req.flash('warning', 'You are not admni plz login as admin')
        res.redirect('/login')
        return
    } else {
        next()
    }
}

const checkNotAdmin = (req, res, next) => {
    if (req.user && req.user.admin) {
        req.flash('warning', 'admin only access to dashbord')
        res.redirect('/dashboard')
        return
    } else {
        next()
    }
}

module.exports = {
    isLoggedIn,
    isNotLoggedIn,
    checkAdmin,
    checkNotAdmin,
}
