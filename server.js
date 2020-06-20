const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const config = require('./config');
const client = require('./postgreSql-Database');

const app = express();

// promise
client
  .query('SELECT NOW() as now')
  .then(res => console.log(res.rows[0]))
  .catch(e => console.error(e.stack))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard dog',
    resave: true,
    saveUninitialized: true
    })
);

//set global errors variable
app.locals.errors = null;

app.locals.loggedIn = false;


//express-message middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get('/', (req, res) => {
    res.redirect('/api/users/login')
})

const routes = require('./routes/indexRouter');

app.use('/api', routes);

app.listen(config.port, () => {
    console.log(`server is running on http://localhost:${config.port}`)
});