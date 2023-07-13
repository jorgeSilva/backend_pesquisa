const express = require('express')
const candidatoRoute = express.Router()

const CandidatoController = require('../controller/candidatoController')

candidatoRoute.post('/candidato', CandidatoController.store)
candidatoRoute.post('/candidato/login', CandidatoController.login)

module.exports = candidatoRoute