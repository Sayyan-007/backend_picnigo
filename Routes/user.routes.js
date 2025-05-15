const express = require('express')
const userControllers = require('../Controllers/user.controllers')

const userRoute = express.Router()

userRoute.post('/signup',userControllers.signup)
userRoute.get('/login',userControllers.login)
userRoute.get('/travelpackages/display',userControllers.traveldisplay)
userRoute.get('/hotelpackages/display',userControllers.hoteldisplay)
userRoute.get('/camppackages/display',userControllers.campdisplay)


module.exports = userRoute