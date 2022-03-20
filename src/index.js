const express = require('express')
const mongoose = require('mongoose');
const handlebars = require('./app/handlebars')
const path = require('path')
const app = express()
const port = 8080
const route = require('./routes')
const db = require('./config/db')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const SortMidddleware = require('./app/midddleware/SortMidddleware')
const getCategory = require('./app/midddleware/GetCategory')
const getTotalCart = require('./app/midddleware/GetTotalCart')
//  override method PUT or DELETE
app.use(methodOverride('_method'));

// custom Middleware
app.use(SortMidddleware)
app.use(getCategory)


app.use(express.static(path.join(__dirname, 'public')))
handlebars(app)

app.use(session({
    secret: 'chinh',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 86400000 }
}))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json())

// HTTP logger
// app.use(morgan('combined'))

//Khai báo sử dụng middleware cookieParse()
app.use(cookieParser())

route(app)

// connect to db
db.connect()

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})