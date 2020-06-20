const express = require('express');
const router = express.Router();

const checkAuth = require('../isSession');

const user = require('./userRouter');
const userDetail = require('./userDetailRouter');

router.use('/users', user);
router.use('/userDetail', checkAuth.isSession, userDetail);


module.exports = router;