exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user || null
    next()
}

exports.handleCsrfError = (err, req, res, next) => {
    if (err) return res.render('error')
    next()
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.requiredLogin = (req, res, next) => {
    if (req.session.user) return next()
    req.flash('errors', 'Você precisa estar logado para acessar essa página.')
    return res.redirect('/login')
}