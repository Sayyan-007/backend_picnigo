const express = require('express')
const TourismPackageController = require('../Controllers/tourismPackages.controllers')
const { TravelAgencyAuth } = require('../Middleware/TravelagencyAuth')

const TourismPackageRoute = express.Router()

TourismPackageRoute.post('/create',TourismPackageController.create)
TourismPackageRoute.get('/display',TravelAgencyAuth,TourismPackageController.display)
TourismPackageRoute.patch('/update',TravelAgencyAuth,TourismPackageController.update)
TourismPackageRoute.patch('/able',TourismPackageController.able)


module.exports=TourismPackageRoute
