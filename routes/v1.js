var express = require('express');
var router = express.Router();
const passport = require('passport');
var authenticateController=require('../controllers/authenticate.controller');
require('../middleware/passport')(passport);

router.post('/signUp',authenticateController.signUp);

// router.get('/logIn',authenticateController.login);


// router.get('/check',passport.authenticate('jwt',{session:false}),function(req,res,next){
//     console.log(req.user);
//     res.send('authorized');
// });
module.exports = router;
