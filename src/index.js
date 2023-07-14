const express = require('express')
const cors = require('cors')
const server =  express()

server.use(cors())
server.use(express.json())

const admRoute = require('./routes/administradorRoute')
const candidatoRoute = require('./routes/candidatoRoute')
const entrevistadorRoute = require('./routes/entrevistadorRoute')
const perguntaRoute = require('./routes/perguntaRoute')

server.use(admRoute)
server.use(candidatoRoute)
server.use(entrevistadorRoute)
server.use(perguntaRoute)

server.listen(3333, () => {
  console.log('SERVIDOR FUNCIONANDO!');
})