const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

let LoginSchema = require('../schema/loginModel');

router.post("/", async (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;


  LoginSchema.where({email : email}).findOne( (err, res) => {
    
    if (res === null) {
      router.get('/details', (req, res) => {
        res.json({
          email: 'email not Found',
        });
      })
    }

    if (!err && res !== null) {

      LoginSchema.find({ email: email })
        .lean()
        .then((user) => {

          bcrypt.compare(pass, user[0].password).then((result) => {

            if (result === false) {
              router.get("/details", (req, res) => {
                res.json({
                  email: "Email Matched",
                  password : 'Not Matched',
                });
              });
            }

            if (result) {
              router.get("/details", (req, res) => {
                res.json({
                  email: "Matched",
                  password: "Matched",
                  loginTime : new Date(),
                });
              });

              LoginSchema.findOneAndUpdate({
                email: email,
                updatedAt: new Date(),
              }).exec((err, docs) => {
                if (err) {
                  console.log(err);
                }
              });
            }

          });
        });

    }

  })

  // let saltRounds = 10;

  // bcrypt.hash(password, saltRounds).then( hash => {
  //   const model = new LoginSchema({
  //     email: email,
  //     password: hash,
  //   });

  //   try {
  //     console.log(model);
  //     model.save();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })

});



module.exports = router;