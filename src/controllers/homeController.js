const Contato = require('../models/ContatoModel')

const index = async(req, res) => {
    if(req.session.user) {
        try {
            const contatoModel = new Contato
            const contatos = await contatoModel.getContatos(req.session.user._id, true)
            res.render('index', { contatos });
        } catch(error) {
            console.log(error)
            res.render('error')
        }
    }
    else {
        res.redirect('/login')
    }
}

module.exports = {
    index,
}