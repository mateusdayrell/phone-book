const User = require('../models/UserModel')

const create = (req, res) => {
    res.render('register')
}

const store = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.register()

        if(user.errors.length > 0) {
            req.flash('errors', user.errors)
            req.session.save(() => res.redirect('/register'))
            return
        }

        req.flash('success', 'Usuário criado com sucesso.')
        req.session.save(() => res.redirect('/register'))

    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}

module.exports = {
    create,
    store,
}