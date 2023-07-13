const express = require('express')
const entrevistadorRoute = express.Router()

const EntrevistadorController = require('../controller/entrevistadorController')

entrevistadorRoute.post('/entrevistador', EntrevistadorController.store)
entrevistadorRoute.post('/entrevistador/login', EntrevistadorController.login)

module.exports = entrevistadorRoute