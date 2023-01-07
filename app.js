const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()

app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://localhost:27017/mydatabase')

app.use(bodyParser.urlencoded({extended: false}))

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Form = mongoose.model('Form', formSchema);

app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    // Create a new form submission
    const submission = new Form({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
  
    // Save the submission to the database
    submission.save((error) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        console.log('Form submission saved to the database!');
        console.log(submission)
        res.sendStatus(200);
      }
    });
  });





app.get("/", function(req,res){
    res.sendFile(path.join(__dirname+"/views/index.html"))
})

app.listen(3000, () => {
    console.log("App listening on port 3000")
});