const Contato = require('../models/ContatoModel')

const index = async(req, res) => {
    const contatoModel = new Contato
    const contatos = await contatoModel.getContatos(req.session.user._id, true)
    res.render('index', { contatos });
}

module.exports = {
    index,
}