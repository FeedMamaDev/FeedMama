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

router.post("/insertCard", jsonParser, async function (req, res, next) {
    console.log("Working?")
    try {
        //Error Check for inputs and userID
        console.log(req.body.Value)
        if (!req.body.Value || req.body.Value.length < 19){
            res.status(400).json({
              message: "Please enter a valid card number"
            });
            return
        }

        if (!req.body.Date){
            res.status(400).json({
              message: "Please enter a valid date"
            });
            return
        }

        let today = new Date();
        let todayMM = parseInt(today.getMonth() + 1); // Months start at 0!
        let todayYY = parseInt(today.getFullYear());
        let cardMM = parseInt(req.body.Date.substring(1,2));
        let cardYY = parseInt(req.body.Date.substring(4,5));

        if (todayMM >= cardMM || todayYY > cardYY){
            res.status(400).json({
              message: "Please enter a valid date"
            });
            return
        }

        if (!req.body.CVV || req.body.CVV.length < 3){
            res.status(400).json({
              message: "Please enter a valid CVV"
            });
            return
        }

        if (!req.body.ZIP || req.body.ZIP.length < 5){
            res.status(400).json({
              message: "Please enter a valid email"
            });
            return
        }

        //Set as primary card
        if (req.body.Primary){
           try{

            //Unset current primary card
            await prisma.payment.update({
                where: {
                    UserId: req.body.userID,
                    Primary: req.body.Primary
                },
                data: {
                    Primary: !req.body.Primary
                }
            }); 

            //Insert and set this card as primary
            await prisma.payment.create({ 
                data: {
                UserId: userID,
                Number: crypto.createHash('sha256').update(req.body.Value).digest('hex'),
                Expiration: crypto.createHash('sha256').update(req.body.Date).digest('hex'),
                CVC: crypto.createHash('sha256').update(req.body.CVV).digest('hex'),
                ZIP: crypto.createHash('sha256').update(req.body.ZIP).digest('hex'),
                Primary: true
              }});

              res.status(200).json({
                message: "Card Added!"
              });
              return

           } catch (err) { //No primary card, set this one as primary
                await prisma.payment.create({ 
                    data: {
                    UserId: userID,
                    Number: crypto.createHash('sha256').update(req.body.Value).digest('hex'),
                    Expiration: crypto.createHash('sha256').update(req.body.Date).digest('hex'),
                    CVC: crypto.createHash('sha256').update(req.body.CVV).digest('hex'),
                    ZIP: crypto.createHash('sha256').update(req.body.ZIP).digest('hex'),
                    Primary: true
                }});

                res.status(200).json({
                    message: "Card Added!"
                  });
                  return
          }
        } 

    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
      }
});

router.get("/:userId/pullUser", jsonParser, async function (req, res, next) {
    try {
        //Query User Information
        const user = await prisma.users.findFirst({
            where: { 
                UserId: req.params.userId
            }
        });

        if (!user){
            res.status(400).json({
                message: "Uh oh.. User not found!"
            });
            return
        }
        console.log("User: ", user);
        res.status(200).json({
            userInfo: user
        });
        return
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

router.post("/pushUser", jsonParser, async function (req, res, next) {
    console.log("Working?")
    try {
        //Error Check for inputs and userID
        console.log(req.body.fName)
        if (!req.body.fName){
            res.status(400).json({
              message: "Please enter your first name"
            });
            return
        }
        if (!req.body.lName){
            res.status(400).json({
              message: "Please enter your last name"
            });
            return
        }
        if (!req.body.phone || req.body.phone.length != 10){
            res.status(400).json({
              message: "Please enter a valid phone number"
            });
            return
        }

        if (!req.body.email || req.body.email.indexOf('@') <= -1){
            res.status(400).json({
              message: "Please enter a valid email"
            });
            return
        }

        

        //Update User Info
        await prisma.users.update({
            where: {
                UserId: userID
            },
            data: {
                FirstName: req.body.fName,
                LastName: req.body.lName,
                Email: req.body.email,
                Phone: req.body.phone
            }
        }); 


        res.status(200).json({
            message: "User Information updated!"
          });
          return
        

    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
      }
});

module.exports = router;