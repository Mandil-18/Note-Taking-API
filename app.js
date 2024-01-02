// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDatabase = require('./db');
const noteRoutes = require('./routes/noteRoutes');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = process.env.PORT || 3000;

connectDatabase();

const users = {
  admin: '123456789', 
};

app.use(basicAuth({
  users,
  challenge: true,
  unauthorizedResponse: 'Unauthorized',
}));

app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Note-Taking API');
});


app.use(noteRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;