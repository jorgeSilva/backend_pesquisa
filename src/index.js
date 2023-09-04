const express = require('express')
const cors = require('cors')
const server =  express()
require('dotenv').config()

server.use(cors())
server.use(express.json())

const admRoute = require('./routes/administradorRoute')
const candidatoRoute = require('./routes/candidatoRoute')
const entrevistadorRoute = require('./routes/entrevistadorRoute')
const perguntaRoute = require('./routes/perguntaRoute')
const respostaRoute = require('./routes/respostaRoute')
const entrevistaRoute = require('./routes/entrevistaRoute')

const PORT = process.env.PORT

server.use(admRoute)
server.use(candidatoRoute)
server.use(entrevistadorRoute)
server.use(perguntaRoute)
server.use(respostaRoute)
server.use(entrevistaRoute)


server.listen(PORT, () => {
  console.log('SERVIDOR FUNCIONANDO!');
})