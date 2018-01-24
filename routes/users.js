var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Register Routes
router.get('/register', function(req,res,next){
 res.render('register',{
   'title':'Register'
 });
});

//Login Routs
router.get('/login', function(req, res, next){
 res.render('login',{
   'title':'Login'
 });
});

router.post('/register',function(req, res, next){
		  //Get Form Values
		  var name = req.body.name;
		  var email = req.body.email;
		  var username =req.body.username;
		  var password =req.body.password;
		  var password2 =req.body.password2;




		//Check for Image Field
		if(req.files.profilimage){
			consile.log('Uploading File ...');
			// File Info
			var profileImageOriginalName =req.files.profileimage.originalname;
			var profileImageName = req.files.profileimage.name;
		    var profileImageMime = req.files.profileimage.mimetype;
		    var profileImagepath = req.files.profileimage.path;
		    var profileImageExt = req.files.profileimage.extention;
		    var profileImageSize = req.files.profileimage.size;
		} else {
		// set adefualt image 
			var profileImageName = 'noimage.png';

		}

		//form validation 
		req.checkBody('name','Name field is required').notEmpty();
		req.checkBody('email','Email field is required').notEmpty();
		req.checkBody('email','Email field is required').isEmail();
		req.checkBody('username','username field is required').notEmpty();
		req.checkBody('password','password field is required').notEmpty();
		req.checkBody('password2','password2 field is required').equals(req.body.password);

		//check errors 
		var errors =req.validationErrors();

		if(errors) {
			req.render('register',{
			 errors: errors,
             name: name,
             email: email,
             username: username,
             password: password,
             password2: password2
			});
		} else {
			 var newUser = new User({
			 name: name,
             email: email,
             username: username,
             password: password,
             password2: password2,
             profileimage : profileImageName
          });

			  //create user 
			  user.createUser(newUser, function(err, user){
                if(err) throw err;
                console.log(user);
			  });
			  //Sucesss Message
			  req.flash('success', 'you are now registered and may log in');

			  req.location('/');
			  res.redirect('/');
		}
});
module.exports = router;











