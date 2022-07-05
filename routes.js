const express = require('express')
const route = express.Router()

const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const userController = require('./src/controllers/userController')
const contatoController = require('./src/controllers/contatoController')

const { requiredLogin } = require('./src/middlewares/middleware')


// HOME
route.get('/', homeController.index)
route.post('/', homeController.store)

// CONTATO
route.get('/', contatoController.index)
route.get('/contato/create', requiredLogin, contatoController.create)
route.post('/contato/store', requiredLogin, contatoController.store)
route.get('/contato/edit/:id', requiredLogin, contatoController.edit)
route.put('/contato/edit/:id', requiredLogin, contatoController.update)

// LOGIN
route.get('/login/', loginController.index)
route.post('/login/', loginController.login)
route.get('/logout/', loginController.logout)

// REGISTER
route.get('/register/', userController.create)
route.post('/register/', userController.store)

module.exports = route