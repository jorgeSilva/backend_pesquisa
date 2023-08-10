const express = require('express')
const perguntaRoute = express.Router()

const PerguntaController = require('../controller/perguntaController')
const UserMiddleware = require('../middleware/UserMiddleware')

perguntaRoute.post('/pergunta', PerguntaController.store)
perguntaRoute.get('/pergunta/:fkCandidato', UserMiddleware,  PerguntaController.index)

module.exports = perguntaRoute