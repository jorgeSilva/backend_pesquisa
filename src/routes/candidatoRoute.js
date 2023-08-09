const express = require('express')
const candidatoRoute = express.Router()

const CandidatoController = require('../controller/candidatoController')
const UserMiddleware = require('../middleware/UserMiddleware')

candidatoRoute.post('/candidato', CandidatoController.store)
candidatoRoute.post('/candidato/login', CandidatoController.login)
candidatoRoute.get('/candidato/:_id', UserMiddleware, CandidatoController.index)
candidatoRoute.get('/candidato', UserMiddleware, CandidatoController.show)

module.exports = candidatoRoute