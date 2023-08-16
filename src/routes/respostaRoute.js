const express = require('express')
const respostaRoute = express.Router()

const RespostaController = require('../controller/respostaController')

respostaRoute.post('/resposta/:_id', RespostaController.store)
respostaRoute.get('/resposta/:_id', RespostaController.index)

module.exports = respostaRoute