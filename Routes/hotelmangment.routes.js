const express = require('express')
const hotelMangmentControllers = require('../Controllers/hotelmangment.controller')

const hotelmangmentRoute = express.Router()


hotelmangmentRoute.post('/signup',hotelMangmentControllers.signup)
hotelmangmentRoute.get('/login',hotelMangmentControllers.login)
hotelmangmentRoute.get('/count',hotelMangmentControllers.Count)

module.exports= hotelmangmentRoute