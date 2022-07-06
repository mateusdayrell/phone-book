const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')     // store session data in the session cookie
const flash = require('connect-flash')         // flash messages
const MongoStore = require('connect-mongo')    // store session data in mongodb
const mongoose = require('mongoose')           // MONGODB
const helmet = require('helmet')
const csrf = require('csurf')

const routes = require('./routes')
const { globalMiddleware, handleCsrfError, csrfMiddleware } = require('./src/middlewares/middleware')
require('dotenv').config()

app.use(express.urlencoded({ extended: true }))             // for parsing forms to the apllication
app.use(express.json())                                     // for parsing JSON data to the application
 app.use(express.static(path.resolve(__dirname, 'public'))) // for serving static files (img, js, css) to the application
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

app.use(helmet({
    contentSecurityPolicy: false
})) // Helmet helps you secure your Express apps by setting various HTTP headers.

// CONNECTING TO DATABASE MONGODB
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('🍃 MongoDB connected')
        app.emit('connected')
    })
    .catch(err => console.log(err))

//SESSION
const sessiopnOptions = session({
    secret: 'secret',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10, // 10 minutes
        httpOnly: true,    
    }
})
app.use(sessiopnOptions)
app.use(flash())

//VIEWS
app.set('views', path.resolve(__dirname, 'src', 'views')) // set the views directory
app.set('view engine', 'ejs')

//ROUTES
app.use(csrf())
app.use(globalMiddleware) //middleware for all routes
app.use(handleCsrfError)
app.use(csrfMiddleware)
app.use(routes)

app.on('connected', () => {
    app.listen(3000, () => {
        console.log('🚀 NodeJS server launched on http://localhost:3000/')
    })
})