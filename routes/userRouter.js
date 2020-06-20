const express = require('express');
const router = express.Router();

const client = require('../postgreSql-Database');

router.get('/register', (req, res) => {
    if(req.session.user) {
        res.redirect('/api/userDetail')
    } else {
        res.render('register',{
            title: 'register'
        })
    }
})

router.post('/register', (req, res) => {
    let {name} = req.body; 
    let {email} = req.body;
    let {password} = req.body;
    let {age} = req.body;

    let query = {
        text: 'INSERT INTO users(name, email, password, age) VALUES($1, $2, $3, $4) RETURNING *',
        values: [name, email, password, age]
    };

    client
    .query(`SELECT * FROM users WHERE email='${email}'`)
    .then(re => {
        if(re.rows.length == 0) {
            client
            .query(query)
            .then(response => {
                    console.log(response.rows[0])
                    req.flash('success', 'You are now registered');
                    res.redirect('/api/users/login');
            })
            .catch(e => console.error(e.stack))
        } else {
            req.flash('danger', 'Email Id already registered, choose another');
            res.redirect('/api/users/register');
        }
    })
});

router.get('/login', (req, res) => {
    if(req.session.user) {
        res.redirect('/api/userDetail')
    } else {
        res.render('login',{
            title: 'login'
        })
    }
});

router.post('/login', (req, res) => {
    let {email} = req.body; 
    let {password} = req.body; 

    client
    .query(`SELECT * FROM users WHERE email='${email}'`)
    .then(re => {
        if(re.rows.length == 0) {
            req.flash('danger', 'No user Found!');
            res.redirect('/api/users/login');
        } else {
            if(re.rows[0].password == password) {
                let loginDetail = {
                    name: re.rows[0].name, email: re.rows[0].email, age:re.rows[0].age
                }
                req.session.user = loginDetail;
                res.redirect('/api/userDetail');
            } else {
                req.flash('danger', 'Wrong password');
                res.redirect('/api/users/login');
            }
        }
    })    
});

// get logout
router.get('/logout', (req, res) => {

    res.locals.loggedIn = false;
    delete req.session.user;

    req.flash('success', 'You are logged out :(');
    res.redirect('/api/users/login');
    
});


module.exports = router;