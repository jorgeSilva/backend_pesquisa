const express = require('express')
const entrevistaRoute = express.Router()

const EntrevistaController = require('../controller/entrevistaController')

entrevistaRoute.post('/entrevista', EntrevistaController.store)
entrevistaRoute.get('/entrevista/:fkCandidato', EntrevistaController.index)
entrevistaRoute.get('/entrevista/pergunta/:fkCandidato', EntrevistaController.referentePergunta)

module.exports = entrevistaRoute