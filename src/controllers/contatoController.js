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
        const contato = new Contato(req.body, req.session.user._id)
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
        console.log('Entrou')
        contato = await contato.getContatos(req.params.id)
        if(!contato) return res.render('error')
        res.render('contato', { contato })

    } catch (error) {
        console.log(error)
        res.render('error')
    }
}

const update = async (req, res) => {
    if(!req.params.id) res.render('error')
    try {
        const contato = new Contato(req.body)
        await contato.update(req.params.id)

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect(`/contato/edit/${contato.contato._id}`))
            return
        }

        req.flash('success', 'Contato atualizado com sucesso.')
        req.session.save(() => res.redirect(`/contato/edit/${contato.contato._id}`))
    } catch (error) {
        console.log(error)
        res.render('error')
    }
};

const destroy = async(req, res) => {
    if(!req.params.id) res.render('error')
    try {
        let contato = new Contato()
        contato = await contato.delete(req.params.id)
        
        if(!contato) {
            req.flash('errors', contato.errors)
            req.session.save(() => res.redirect('/'))
            return
        }
        req.flash('success', 'Contato apagado com sucesso.')
        req.session.save(() => res.redirect('/'))
    } catch (error) {
        console.log(error)
        res.render('error')
    }
};

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy
}