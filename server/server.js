'use strict';

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.use('/vendor', express.static(path.resolve('node_modules')));
app.use(express.static('web/dist'));
app.listen(8080, () => {
  console.log('Listening to port 8080');
});
