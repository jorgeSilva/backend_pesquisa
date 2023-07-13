const express = require('express')
const cors = require('cors')
const server =  express()

server.use(cors())
server.use(express.json())

const admRoute = require('./routes/administradorRoute')
const candidatoRoute = require('./routes/candidatoRoute')

server.use(admRoute)
server.use(candidatoRoute)

server.listen(3333, () => {
  console.log('SERVIDOR FUNCIONANDO!');
})