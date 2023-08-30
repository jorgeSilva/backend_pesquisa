const express = require('express')
const entrevistaRoute = express.Router()

const EntrevistaController = require('../controller/entrevistaController')

entrevistaRoute.post('/entrevista', EntrevistaController.store)

entrevistaRoute.get('/entrevista/:fkCandidato', EntrevistaController.index)
entrevistaRoute.get('/entrevista/pergunta/:fkCandidato/:pergunta', EntrevistaController.referentePergunta)
entrevistaRoute.get('/entrevista/entrevistador/:fkCandidato', EntrevistaController.referenteEntrevistador)
entrevistaRoute.get('/entrevista/entrevistado/:fkCandidato', EntrevistaController.referenteEntrevistado)

entrevistaRoute.get('/entrevista/resposta/:fkCandidato/:pergunta/:resposta', EntrevistaController.referentePerguntaResposta)

entrevistaRoute.get('/entrevista/:_id/:bairro/:cep', EntrevistaController.byCepBairro)

module.exports = entrevistaRoute