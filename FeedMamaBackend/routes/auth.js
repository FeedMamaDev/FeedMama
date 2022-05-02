const express = require("express");
const {config} = require("../config");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var bodyParser = require('body-parser')
const crypto = require('crypto');
const uuid = require('uuid').v4;
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authenticate");

 
// create application/json parser
var jsonParser = bodyParser.json()

router.get("/check", verifyToken, async function (req, res, next) {
  res.status(200).json({
    message: "Success!"
  });
})

router.post("/login", jsonParser, async function (req, res, next) {
  try {
    if (!req.body.email || !req.body.password){
      res.status(400).json({
        message: "Please enter an email and a password!"
      });
      return
    }
    
    const user = await prisma.users.findFirst({where: { Email: req.body.email }});

    if (!user) {
      res.status(400).json({
        message: "This email/password combination is not found!"
      })
      return
    }

    var hashedPasswd = crypto.createHash('sha256').update(req.body.password).digest('hex')
    if(user.Password !== hashedPasswd) {
      res.status(400).json({
        message: "This email/password combination is not found!"
      })
      return
    }

    var token = jwt.sign({
      id: user.UserId
    }, process.env.API_SECRET);


    console.log(token)
    res.status(200).json({
      test: token
    });
    return

  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.post("/create", jsonParser, async function (req, res, next) {
  try {
    if (!req.body.email || !req.body.email.includes("@")){
      res.status(400).json({
        message: "Please enter a valid email address!"
      });
      return
    }

    var role = 1;

    const userExists = await prisma.users.findFirst({where: { Email: req.body.email }});

    if (userExists) {
      res.status(400).json({
        message: "A user already exists with this email!"
      })
      return
    }

    if (!req.body.phone){
      res.status(400).json({
        message: "Please enter a phone number!"
      });
      return
    }

    if (!req.body.password){
      res.status(400).json({
        message: "Please enter a password!"
      });
      return
    }

    if (req.body.password.length < 8){
      res.status(400).json({
        message: "Your password must be greater than 8 characters!"
      });
      return
    }

    var hashedPasswd = crypto.createHash('sha256').update(req.body.password).digest('hex')

    //https://www.topcoder.com/thrive/articles/authentication-and-authorization-in-express-js-api-using-jwt
    await prisma.users.create({ 
      data: {
      UserId: uuid(),
      Email: req.body.email,
      LastName: req.body.lastname,
      FirstName: req.body.firstname,
      Phone: req.body.phone,
      Password: hashedPasswd,
      Address: "",
      City: "",
      Role: role,
      ZIP: "",
      Verified: 0,
      VerificationAttempts: 0
    }});
    
    res.status(200).json({
      message: "User successfully created!"
    });
    return

  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

module.exports = router;