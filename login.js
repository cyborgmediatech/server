const axios = require('axios');
const express = require('express');

const app = express();


app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
})
