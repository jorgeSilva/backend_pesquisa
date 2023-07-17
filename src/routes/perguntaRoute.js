const express = require('express')
const perguntaRoute = express.Router()

const PerguntaController = require('../controller/perguntaController')

perguntaRoute.post('/pergunta', PerguntaController.store)
perguntaRoute.get('/pergunta/:fkCandidato', PerguntaController.index)

module.exports = perguntaRoute