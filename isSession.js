exports.isSession = (req, res, next) => {
    if(req.session.user) {
        res.locals.loggedIn = true;
        next();
    } else {
        req.flash('danger', 'Please login')
        res.redirect('/api/users/login')
    }
}