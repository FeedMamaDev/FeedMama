const express = require("express");
const {config} = require("../config");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var bodyParser = require('body-parser')
const crypto = require('crypto');
const uuid = require('uuid').v4;
const jwt = require("jsonwebtoken");
 
// create application/json parser
var jsonParser = bodyParser.json()

router.post("/update", jsonParser, async function (req, res, next) {
    console.log("Working?")
    try {
        //Error Check for inputs and userID
        if (!req.body.currentPassword){
            res.status(400).json({
              message: "Please enter your current password"
            });
            return
        }
        if (!req.body.newPassword){
            res.status(400).json({
              message: "Please enter your new password"
            });
            return
        }
        if (!req.body.verNewPassword){
            res.status(400).json({
              message: "Please verify your new password"
            });
            return
        }
        if (!req.body.userID){
            res.status(400).json({
              message: "Uh oh.. No User ID!"
            });
            return
        }

        //Prior to query, check if new passwords match
        if(req.body.newPassword !== req.body.verNewPassword) {
            res.status(400).json({
                message: "Your entries for your new password do not match"
              });
              return
        }

        //query user from database
        const user = await prisma.users.findFirst({where: { UserId: req.body.userID }});
        if (!user){
            res.status(400).json({
              message: "Uh oh.. User not found!"
            });
            return
        }

        var checkCurrentPassword = crypto.createHash('sha256').update(req.body.password).digest('hex')
        if(user.Password !== checkCurrentPassword) {
        res.status(400).json({
            message: "The password you entered does not match your current password"
        })
        return
        }

        var newPassword = crypto.createHash('sha256').update(req.body.newPassword).digest('hex')
        console.log(req.body.newPassword)
        await prisma.users.update({
            where: {
                UserId: userID
            },
            data: {
                Password: newPassword
            }
        }); 


        res.status(200).json({
            message: "Password successfully updated!"
          });
          return
        

    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
      }
});

module.exports = router;