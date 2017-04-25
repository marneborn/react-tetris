'use strict';

const express = require('express');
const http = require('http');

const app = express();

app.use(express.static('web'));
app.listen(8080, () => {
  console.log('Listening to port 8080');
});
