const express = require('express')
const adminUsercontrollers = require('../Controllers/adminUser.controllers')
const adminAgencycontrollers = require('../Controllers/adminAgency.controllers')
const adminHotelcontrollers = require('../Controllers/adminHotel.controllers')
const adminCampcontrollers = require('../Controllers/adminCamp.controllers')

const adminRoute = express.Router()

// User page
adminRoute.get('/userdata',adminUsercontrollers.userdata)
adminRoute.patch('/userupdate',adminUsercontrollers.userupdate)

// Admin Login
adminRoute.post('/signupadmin',adminUsercontrollers.adminsignup)
adminRoute.get('/loginadmin',adminUsercontrollers.adminlogin)


// Travel Agency Page 
adminRoute.get('/agencydata',adminAgencycontrollers.agencydata)
adminRoute.patch('/agencyupdate',adminAgencycontrollers.able)
// travel packages
adminRoute.get('/agency/display',adminAgencycontrollers.display)
adminRoute.patch('/agency/packageupdate',adminAgencycontrollers.packageupdate)


//  Hotel Page
adminRoute.get('/hoteldata',adminHotelcontrollers.mangmentdata)
adminRoute.patch('/hotelupdate',adminHotelcontrollers.able)
// hotel packages
adminRoute.get('/hotel/display',adminHotelcontrollers.display)
adminRoute.patch('/hotel/packageupdate',adminHotelcontrollers.packageupdate)
adminRoute.get('/hotel/Chart',adminHotelcontrollers.Chart)




// Camp Oraganization Page
adminRoute.get('/campdata',adminCampcontrollers.campdata)
adminRoute.patch('/camp/able',adminCampcontrollers.able)
// Camp Package
adminRoute.get('/camp/display',adminCampcontrollers.display)
adminRoute.patch('/camp/packageupdate',adminCampcontrollers.packageupdate)
adminRoute.get('/camp/Chart',adminCampcontrollers.Chart)




module.exports= adminRoute