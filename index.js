// Importing modules
const express = require('express');
const path = require('path');

// Make an express app and save reference. Assign path to use.
const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));

// Setting up the buttons count to 0.
var count = 0;

// Handling get request.
app.get('/api', (req, res) => {
  // Return count as json
  res.json(count);
  console.log(`Current button count ${count}`);
});

// Handling data request which also increases the button count.
app.get('/api/count', (req, res) => {
    count++;
    // Return count as json
    res.json(count);
    console.log(`Current button count ${count}`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Assigning port to process environmental port if found, else to the port 5000.
const port = process.env.PORT || 5000;
// Server starts listening on assigned port.
app.listen(port);
console.log(`Button game listening on ${port}`);