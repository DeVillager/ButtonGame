// Importing modules
const express = require('express');
// const session = require("express-session");
// const cors = require("cors")
const path = require('path');

// Assign express to constant app.
const app = express();

// Setting up the buttons count to 0.
var count = 0;

// Setting cors options.
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
//     credentials: true,
//     allowedHeaders: "Content-Type, Authorization, X-Requested-With",
// }

// Using app using cors and setting up settings.
// app.use(cors(corsOptions))

// Handling get request.
app.get('/api', (req, res) => {
  // Return count as json
  res.json(count);
  console.log(`Current button count ${count}`);
});

// Handling data request which also increases the button count.
app.get('/api/data', (req, res) => {
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