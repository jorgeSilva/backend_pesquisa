const express = require('express')
const admRoute = express.Router()

const AdministradorController = require('../controller/administradorController')
const UserMiddleware = require('../middleware/UserMiddleware')

admRoute.post('/adm', AdministradorController.store)
admRoute.post('/adm/login', AdministradorController.login)
admRoute.get('/adm/:_id', UserMiddleware, AdministradorController.index)

module.exports = admRoute