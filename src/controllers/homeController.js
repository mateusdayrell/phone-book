const HomeModel = require('../models/HomeModel')

// HomeModel.find()  
//     .then(data => {console.log(data)})
//     .catch(err => console.log(err))

const index = (req, res) => {
    res.render('index', {
        title: 'Home',
        numbers: [1, 2, 3, 4, 5]
    });
}

const store = (req, res) => {
    res.send(req.body)
    return
}

module.exports = {
    index,
    store
}