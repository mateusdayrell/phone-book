const express = require('express')
const route = express.Router()

const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const userController = require('./src/controllers/userController')

// HOME
route.get('/', homeController.index)
route.post('/', homeController.store)

// LOGIN
route.get('/login/', loginController.index)
route.post('/login/', loginController.login)
route.get('/logout/', loginController.logout)

// REGISTER
route.get('/register/', userController.create)
route.post('/register/', userController.store)

module.exports = route