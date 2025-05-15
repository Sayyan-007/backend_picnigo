const express = require('express')
const campOrganizationControllers = require('../Controllers/camporganization.controller')

const campOrganizationRoute = express.Router()


campOrganizationRoute.post('/signup',campOrganizationControllers.signup)
campOrganizationRoute.get('/login',campOrganizationControllers.login)
campOrganizationRoute.get('/count',campOrganizationControllers.Count)

module.exports= campOrganizationRoute