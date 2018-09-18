// -- EXPRESS --
var express = require('express');
var app = express();

// -- STATIC PATH
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));

// -- SET the VIEW path
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// -- BODY-PARSER
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// -- MONGOOSE --
var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/api_1955');

// -- SCHEMA --
var UserSchema = new mongoose.Schema({
 name:{
   type: String,
   required: true,
   minlength: 2
 }},
 {timestamp: true}
)
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'


// // -- ROUTES --

app.get('/', function(req,res){
  // users is the object received from data.find
  User.find({}, function(err, users) {
    if(err){
      console.log("Error -- could not retrieve users")
      res.json({message: "Failure", error: err});
    }
    else{
      console.log("Successfully retrieved users:");
      res.json({users});
    }
})
})

// add a new person to the database
app.get('/new/:name',function(req,res){
  var user = new User({
    name: req.params.name
  })
  user.save(function(err){
    if (err){
      console.log("error");
      res.json({message: "error", error:err});
    }
    else{
      res.json({message: "success", data: user});
    }

  })
})

app.get('/remove/:name', function(req,res){
  console.log(req.params.name)
  User.remove({name: req.params.name},function(err){})
})

// Setting our Server to Listen on Port: 8000
app.listen(8001, function() {
    console.log("listening on port 8001");
})
