require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path')
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const { collection } = require('./app/models/menu');

const app = express();
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)
const flash = require('express-flash');


// database connection
// mongoose.connect('mongodb+srv://harshit:Harshit@cluster0.xznjxjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
mongoose.connect(process.env.DB_URL, {
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.log(e);
  });

const mongoStore = new MongoDbStore({
  url:process.env.DB_URL,
    collection: 'sessions'
})
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}))

app.use(flash())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(expressLayouts)
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)




app.listen(PORT, function () {
  console.log(`Listening on Port ->  ${PORT}`)
})

