const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (make sure to replace with your own connection string)
mongoose.connect('mongodb+srv://pandu:pandu@cluster0.soehr5q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String // In a real application, make sure to hash passwords
});

const User = mongoose.model('User ', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the "public" directory

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Save user to database (make sure to validate and hash the password in production)
    const newUser  = new User({ username, password });
    newUser .save()
        .then(() => {
            console.log('User  registered successfully');
            res.redirect('index.html'); // Redirect to home after successful registration
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error registering user');
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});