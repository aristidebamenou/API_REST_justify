const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

app = express()

app.use(morgan('dev'))
app.use(bodyParser.text())


app.post('/api/justify', (request, response)=>{
    response.setHeader('Content-Type', 'text/plain');

    response.send(justify(request.body.slice()))
})

app.listen(8000, ()=>console.log('Started on port 8080'))

var justify= (text)=>{

    var justify_text = text.split(' ')

    return justify_text
}