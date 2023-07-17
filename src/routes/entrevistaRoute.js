const express = require('express')
const entrevistaRoute = express.Router()

const EntrevistaController = require('../controller/entrevistaController')

entrevistaRoute.post('/entrevista', EntrevistaController.store)

module.exports = entrevistaRoute