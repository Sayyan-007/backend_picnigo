const express = require('express')

const booknowTouristControllers = require('../Controllers/booknowagency.controller')

const booknowTouristRoute = express.Router()

booknowTouristRoute.post('/agency/create',booknowTouristControllers.create)
booknowTouristRoute.get('/agency/display',booknowTouristControllers.display)

module.exports = booknowTouristRoute    