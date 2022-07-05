const Contato = require('../models/ContatoModel')

const index = async(req, res) => {
    let contatos = new Contato
    contatos = await contatos.getContatos()
    res.render('index', { contatos });
}

module.exports = {
    index,
}