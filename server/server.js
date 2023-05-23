const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Set up CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Define a schema for your data
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname:String,
  email: String,
  gender: String,
  image: String,
  signature: String,
  dateOfBirth:String,
  file: String
});

// Create a model based on the schema
const User = mongoose.model('form', userSchema);

// Middleware to parse request bodies as JSON
app.use(express.json());

// Set up a route to get the data from the database
app.get('/getdata', async (req, res) => {
  try {
    const formData = await User.find();
    res.send(formData);
  } catch (err) {
    console.error('Error getting form data from MongoDB', err);
    res.status(500).send('Internal server error');
  }
});

app.post('/postdata', async (req, res) => {
  console.log(typeof req.body.image, "image", typeof req.body.signature);

  if (req.body.image) {
    try {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        email: req.body.email,

        gender: req.body.gender,
        image: req.body.image,
        signature: req.body.signature,
        dateOfBirth:req.body.dateOfBirth,
        file:req.body.file
      });

      await newUser.save();
      console.log('User saved to MongoDB');
      res.send('User saved to MongoDB');
    } catch (err) {
      console.error('Error saving user to MongoDB', err);
      res.status(500).send('Internal server error');
    }
  }
});

// Start the server
app.listen(7006, () => {
  console.log('Server started on port 7006');
});
