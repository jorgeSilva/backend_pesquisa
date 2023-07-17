const express = require('express')
const entrevistaRoute = express.Router()

const EntrevistaController = require('../controller/entrevistaController')

entrevistaRoute.post('/entrevista', EntrevistaController.store)
entrevistaRoute.get('/entrevista/:fkCandidato', EntrevistaController.index)

module.exports = entrevistaRoute