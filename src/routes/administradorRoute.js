const express = require('express')
const admRoute = express.Router()

const AdministradorController = require('../controller/administradorController')

admRoute.post('/adm', AdministradorController.store)

module.exports = admRoute