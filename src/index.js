const express = require('express')
const cors = require('cors')
const server =  express()

server.use(cors())
server.use(express.json())

server.listen(3333, () => {
  console.log('SERVIDOR FUNCIONANDO!');
})