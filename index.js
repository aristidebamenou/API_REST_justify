const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(8000, ()=>console.log('Started on port 8080'))