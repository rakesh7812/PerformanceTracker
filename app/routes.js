// app/routes.js
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
// grab the nerd model we just created
var Nerd = require('./models/nerd');
var User = require('./models/user');
var config = require("./config/config");


var trackerController = require('./controllers/TrackerController');


//authenticate dont need token verification. so placing it before applying token check
router.post('/authenticate', function(req,res){
  console.log("email is "+req.body.email);
    User.findOne({email:req.body.email}, function(err,user){
      if(err) throw err;
      console.log("User"+user);
      if(!user){
        res.json({success:false, message:'Authentication failed. User not found'});
      }
      else if(user){
        if(user.password != req.body.password){
          res.json({success:false, message:'Authentication failed. Wrong password'});
        }
        else{
            //res.json({success:true, message:'Authentication successful.. '});
            var token = jwt.sign(user,config.secret,{expiresIn:60});
            res.json({
                success: true,
                message:"Enjoy your Token",
                token :token
            });
        }
      }
    });
});


router.use(function(req,res,next){
  //check header or url params or post params for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['x-access-token-cookie'];
  if(token){
    //verify token and chcks express
    jwt.verify(token,config.secret, function(err,decoded){
    //  console.log(decoded);
      if(err){
        //res.json({success:false, message:"Failed to authenticate token"});
        return res.status(403).send({success:false, message:"Failed to authenticate token"});
      }
      else{
        //if good save the request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  }
  else{
    //if no token return error
    return res.status(403).send({success:false, message:"No token provided"});


  }
});

router.get('/users', function(req,res){
      User.find({}, function(err,users){
        res.json(users);
      });
});

router.get('/user/:email', function(req,res){
    User.find({'email':/req.params.email/}, function(err, user){

        if(err) throw err;
        if(user){
          res.json(user);
        }
        else {
          res.json({message:"No user found"});
        }

    });
});

router.get('/getUserDetails', function(req,res){
      res.json(req.decoded);
});

//routes for project

router.post('/createProject', function(req,res){
      trackerController.createProject(req.body);
      res.json({
          success: true
      });
});

router.get('/listAllProject', function(req,res){
  trackerController.listAllProject(req,res);
});

router.get('/listAllLocations', function(req,res){
  trackerController.listAllLocations(req,res);
});
router.get('/listAllLocationsByProject/:id', function(req,res){
  trackerController.listAllLocationsByProject(req,res);
  //req.params.id
});
router.get('/listAllLocationsFilterByProject/:id', function(req,res){
  trackerController.listAllLocationsFilterByProject(req,res);
});

router.get('/listAllProjectsByLocation/:id', function(req,res){
  trackerController.listAllProjectsByLocation(req,res);
});
router.get('/getProjectDetailsByLocation/:locationId/:projectId', function(req,res){
  trackerController.getProjectDetailsByLocation(req,res);
});
router.get('/getProjectDetailsForAllLocations/:projectId', function(req,res){
  trackerController.getProjectDetailsForAllLocations(req,res);
});
router.post('/inviteProperty', function(req,res){
    trackerController.inviteProperty(req,res, req.body);
});

router.post('/updateMasterData', function(req,res){
      trackerController.updateMasterData(req.body);
      res.json({
          success: true
      });
});













//==========**************=======******************

// sample api route
router.get('/api/nerds', function(req, res) {
  // use mongoose to get all nerds in the database
  console.log("Inside /api/nerds");
  Nerd.find({},function(err, nerds) {
      console.log(nerds);
      // if there is an error retrieving, send the error.
                      // nothing after res.send(err) will execute
      if (err)
          res.send(err);

      res.json(nerds); // return all nerds in JSON format
  });
});

// route to handle creating goes here (app.post)
// route to handle delete goes here (app.delete)

// frontend routes =========================================================
// route to handle all angular requests






  module.exports = router;
