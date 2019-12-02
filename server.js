const express = require('express');
const mongoose = require('mongoose');
//DO I Need this path in the server.js
const path = require('path');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku). WE ONLY NEED THIS WHEN WE BUILD THIS ON HEROKU.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);

// Connect to the Mongo DB
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

mongoose.Promise = Promise;
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://user:kershaw19@ds351428.mlab.com:51428/heroku_lrzd9hr9',
  { useNewUrlParser: true }
);
// Send every other request to the React app
// Define any API routes before this runs
//app.get("*", (req, res) => {
  //res.sendFile(path.join(__dirname, "./client/build/index.html"));
//});

//app.listen(PORT, () => {
//  console.log(`🌎 ==> API server now on port ${PORT}!`);
//});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
