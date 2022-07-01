const mongoose = require('mongoose')

const HoneSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
})

const HomeModel = mongoose.model('Home', HoneSchema)

module.exports = HomeModel