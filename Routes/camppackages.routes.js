const express = require('express')
const camppackagecontrollers = require('../Controllers/camppacakge.controllers')
const { CampOrganizationAuth } = require('../Middleware/CamporganizationAuth')

const CampPackageRoute = express.Router()

CampPackageRoute.post('/create',camppackagecontrollers.create)
CampPackageRoute.get('/display',camppackagecontrollers.display)
CampPackageRoute.patch('/able',camppackagecontrollers.able)
CampPackageRoute.patch('/update',CampOrganizationAuth,camppackagecontrollers.update)

module.exports=CampPackageRoute
