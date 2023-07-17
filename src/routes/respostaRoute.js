const express = require('express')
const respostaRoute = express.Router()

const RespostaController = require('../controller/respostaController')

respostaRoute.post('/resposta', RespostaController.store)

module.exports = respostaRoute