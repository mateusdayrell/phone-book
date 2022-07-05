const { async } = require('regenerator-runtime')
const Contato = require('../models/ContatoModel')

const index = (req, res) => {
    res.render('index')
}

const create = (req, res) => {
    res.render('contato', { contato: {} })
}

const store = async (req, res) => {
    try {
        const contato = new Contato(req.body)
        await contato.register()

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/contato/create'))
            return
        }

        req.flash('success', 'Contato cadastrado com sucesso.')
        req.session.save(() => res.redirect(`/contato/edit/${contato.contato._id}`))
    } catch (error) {
        console.log(error)
        return res.render('error')
    }
}

const edit = async(req, res) => {
    if(!req.params.id) res.render('error')
    try {
        let contato = new Contato()
        contato = await contato.getById(req.params.id)
        if(!contato) return res.render('error')
        res.render('contato', { contato })

    } catch (error) {
        console.log(error)
        res.render('error')
    }
}

const update = (req, res) => {}

module.exports = {
    index,
    create,
    store,
    edit,
    update
}