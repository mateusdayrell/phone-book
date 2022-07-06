const User = require('../models/UserModel')

const index = (req, res) => {
    if(req.session.user) return res.redirect('/')
    return res.render('login')
}

const login = async (req, res) => {
    try {
        const login = new User(req.body)
        await login.authenticate()
        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => res.redirect('/login'))
            return
        }
        
        req.session.user = login.user //create a session for the user
        req.session.save(() => res.redirect('/'))

    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}

const logout = (req, res) => {
    req.session.destroy(() => res.redirect('/login'))
}

module.exports = {
    index,
    login,
    logout,
}