const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

const UserModel = mongoose.model('User', UserSchema)

class User {
    constructor(body) {
        this.body = body
        this.errors = []
        this.user = null
    }

    async register() {
        this.validate()
        if(this.errors.length > 0) return

        await this.exists()        
        if(this.errors.length > 0) return

        try{
            // Encrypt password
            const salt = await bcrypt.genSaltSync()
            this.body.password = await bcrypt.hashSync(this.body.password, salt)
            // Save user
            this.user = await UserModel.create(this.body)
        } catch(err) {
            this.errors.push(err.message)
        }
    }

    validate() {
        this.cleanUp()
        if(!validator.isLength(this.body.name, {min: 2, max: 30})) {
            this.errors.push('O nome deve ter entre 2 and 30 caracteres')
        }
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('O email não é válido')
        }
        if(!validator.isLength(this.body.password, {min: 8, max: 30})) {
            this.errors.push('A senha deve ter entre 8 and 30 caracteres')
        }
    }

    async exists() {
        const user = await UserModel.findOne({email: this.body.email})
        if(user) this.errors.push('O email já está cadastrado')
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }
        this.body = {
            name: this.body.name,
            email: this.body.email,
            password: this.body.password,
        }
    }
}

module.exports = User