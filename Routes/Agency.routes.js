const express = require('express')
const agencyControllers = require('../Controllers/agency.controllers')
const { TravelAgencyAuth } = require('../Middleware/TravelagencyAuth')

const AgencyRoute = express.Router()

// login page
AgencyRoute.post('/signup',agencyControllers.signup)
AgencyRoute.get('/login',agencyControllers.login)
AgencyRoute.get('/count',agencyControllers.Count)
AgencyRoute.patch('/update',TravelAgencyAuth,agencyControllers.update)


module.exports= AgencyRoute