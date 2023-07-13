const express = require('express')
const cors = require('cors')
const server =  express()

server.use(cors())
server.use(express.json())

const admRoute = require('./routes/administradorRoute')

server.use(admRoute)

server.listen(3333, () => {
  console.log('SERVIDOR FUNCIONANDO!');
})