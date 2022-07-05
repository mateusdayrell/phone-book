const mongoose = require('mongoose')
validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    phone: {type: String, required: false, default: ''},
    created_at: {type: Date, default: Date.now},
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

// Using constructor function, prototypes
class Contato {
    constructor(body) {
        this.body = body
        this.errors = []
        this.contato = null
    }

    async register() {
        this.validate()
        if(this.errors.length > 0) return

        await this.exists()
        if(this.errors.length > 0) return
        try{
            // Save contato
            this.contato = await ContatoModel.create(this.body)
        } catch(err) {
            this.errors.push(err.message)
        }
    }

    async update(id) {
        if(typeof id !== 'string') return
        this.validate()
        if(this.errors.length > 0) return
        try {
            const contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
            if(!contato) {
                this.errors.push('Contato não encontrado')
                return
            }
            this.contato = contato    
        } catch (err) {
            this.errors.push(err.message)
        }
    }

    async delete(id) {
        if(typeof id !== 'string') return
        try {
            const contato = await ContatoModel.findOneAndDelete({_id: id})
            return contato
        } catch (err) {
            this.errors.push(err.message)
        }
    }


    validate() {
        this.cleanUp()
        if(!this.body.name){
            this.errors.push('Nome é um campo obrigatório')
        }
        if(!this.body.email && !this.body.phone){
            this.errors.push('Pelo menos um contato deve ser enviado: e-mail ou telefone')
        }
        if(this.body.name && !validator.isLength(this.body.name, {min: 2, max: 30})) {
            this.errors.push('O nome deve ter entre 2 e 30 caracteres')
        }
        if(this.body.lastName && !validator.isLength(this.body.lastName, {min: 2, max: 30})) {
            this.errors.push('O sobrenome deve ter entre 2 e 30 caracteres')
        }
        if(this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('O email é inválido')
        }
        if(this.body.phone && !validator.isLength(this.body.phone, {min: 8, max: 15})) {
            this.errors.push('O telefone deve ter entre 8 e 15 caracteres')
        }
    }

    cleanUp() {
        for(let field in this.body) {
            this.body[field] = validator.trim(this.body[field])
        }
    }

    async exists() {
        try{
            const contato = await ContatoModel.findOne({name: this.body.name})
            if(contato) {
                this.errors.push('Nome de contato já cadastrado')
            }
        } catch(err) {
            this.errors.push(err.message)
        }
    }

    async getContatos(id) {
        try{
            if(id) {
                if (typeof id !== 'string') return

                const contato = await ContatoModel.findById(id)
                if (!contato) this.errors.push('Contato não encontrado')

                return contato
            } else {
                const contatos = await ContatoModel.find().sort({created_at: 1})
                return contatos
            }            
        } catch(err) {
            this.errors.push(err.message)
        }
    }
}

module.exports = Contato