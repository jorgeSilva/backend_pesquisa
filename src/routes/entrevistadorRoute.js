const express = require('express')
const entrevistadorRoute = express.Router()

const EntrevistadorController = require('../controller/entrevistadorController')
const UserMiddleware = require('../middleware/UserMiddleware')

entrevistadorRoute.post('/entrevistador', EntrevistadorController.store)
entrevistadorRoute.post('/entrevistador/login', EntrevistadorController.login)
entrevistadorRoute.get('/entrevistador/:_id', UserMiddleware, EntrevistadorController.index)

module.exports = entrevistadorRoute