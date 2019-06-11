const express = require('express')
const user = require('./routes/user')
const app = express()

app.use(express.urlencoded({}))
app.use('/user',user)





app.use(express.static('./public'))
app.listen(8000)
