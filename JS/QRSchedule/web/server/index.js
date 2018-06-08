const express = require('express')
const path = require('path')
const port = process.env.PORT || 80
const app = express()

app.use(express.static(__dirname + '/build'))

app.get('*', function (request, response){
  response.sendFile(path.resolve('build', 'index.html'))
})

app.listen(port)
console.log("Server started on port " + port)
