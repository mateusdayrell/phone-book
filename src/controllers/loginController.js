const User = require('../models/UserModel')

const index = (req, res) => {
    res.render('login')
}

const auth = (req, res) => {
    const user = new User(req.body)
}

module.exports = {
    index,
    auth,
}