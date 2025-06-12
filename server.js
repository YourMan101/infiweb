const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

console.log('Starting server setup...');

// Serve static files from the 'public' directory
app.use(express.static('public'));
console.log('Static file middleware configured...');

// Route for the home page
app.get('/', (req, res) => {
    console.log('Received request for homepage');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log('=================================');
    console.log(`Server is running!`);
    console.log(`To view the website:`);
    console.log(`1. Open your web browser`);
    console.log(`2. Go to http://localhost:${port}`);
    console.log('=================================');
}); 