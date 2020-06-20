const express = require('express');
const router = express.Router();

const client = require('../postgreSql-Database');


router.get('/', (req, res) => {

    res.render('userDetail', {
        title: 'User-Profile',
        user: req.session.user
    })

});

router.get('/user-edit', (req, res) => {
    res.render('user-edit', {
        title: 'user-edit',
        user: req.session.user
    })
});

router.post('/user-edit/:email', (req, res) => {

    let {email} = req.params;
    let {name} = req.body; 
    let {age} = req.body;

    let query = `
    UPDATE users
    SET name='${name}', age=${age}
    WHERE email='${email}'
    `;

    client
    .query(`SELECT * FROM users WHERE email='${email}'`)
    .then(re => { 
        if(re.rows.length == 0 || !re) {
            req.flash('danger', 'Email Id Not Found');
            res.redirect('/api/userDetail/user-edit');
        } else {
            client
            .query(query)
            .then(resp => {
                    client
                    .query(`SELECT * FROM users WHERE email='${email}'`)
                    .then(rep => {
                        req.session.user.name = rep.rows[0].name;
                        req.session.user.age = rep.rows[0].age;
                        req.flash('success', 'Update Successfully');
                        res.redirect('/api/userDetail');
                    })
                    .catch(e => console.error(e.stack))
            })
            .catch(e => console.error(e.stack))
        }
    })
})

module.exports = router;