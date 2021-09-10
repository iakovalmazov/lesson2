const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const mainRoute = require('./routes/main')
const statRoute = require('./routes/stat')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', mainRoute)
app.use('/stat', statRoute)


const PORT = process.env.PORT || 3000

app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`)
})