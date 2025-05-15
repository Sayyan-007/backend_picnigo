const express = require('express')
const HotelPackageController = require('../Controllers/hotelPackage.controller')
const { HotelMangmentAuth } = require('../Middleware/HotelMangmentAuth')

const HotelPackageRoute = express.Router()

HotelPackageRoute.post('/create',HotelPackageController.create)
HotelPackageRoute.get('/display',HotelMangmentAuth,HotelPackageController.display)
HotelPackageRoute.patch('/able',HotelPackageController.able)
HotelPackageRoute.patch('/update',HotelMangmentAuth,HotelPackageController.update)

module.exports=HotelPackageRoute
