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
router.use(verifyToken);

router.get("/:AID/updateAddress", jsonParser, async function (req, res, next) {
    try {
        var addresses = [];
        var executeFinally = false;

        //Get current primary address
        const addressObject = await prisma.address.findFirst({
            where: { 
                AND: [
                    {
                        UserId: {
                            equals: req.user.UserId,
                        },
                    },
                    {
                        Primary: {
                            equals: true,
                        },
                    },
                ],
            },
        });

        //Unset Primary Address based off Primary AddressID
        console.log("Unsetting current primary address");
        await prisma.address.update({
            where: {
                AddressId: addressObject.AddressId
            },
            data: {
                Primary: false
            }
        }); 

        //Set new Primary card
        await prisma.address.update({
            where: {
                AddressId: req.params.AID
            },
            data: {
                Primary: true
            }
        }); 

        //Query User Information
        const primaryAddress = await prisma.address.findFirst({
            where: { 
                AND: [
                    {
                        UserId: {
                            equals: req.user.UserId,
                        },
                    },
                    {
                        Primary: {
                            equals: true,
                        },
                    },
                ],
            },
        });

        if(primaryAddress.SecondaryAddress == null){
            primaryAddress.SecondaryAddress = '';
        }

        //Put primary at the top of the list
        addresses.push({
            NameLine: [req.user.FirstName, ' ', req.user.LastName].join(''),
            LocalLine: [primaryAddress.PrimaryAddress, ', ', primaryAddress.SecondaryAddress].join(''),
            StateLine: [primaryAddress.City, ', ', primaryAddress.State, ' ', primaryAddress.Zip],
            primary: true,
            AID: primaryAddress.AddressId, //Address ID
            id: 0
        });
        console.log("Primary Addresses")
        console.log(addresses);

        //Try and see if there are more addresses
        try{
            const nonPrimaryAddress = await prisma.address.findMany({
                where: { 
                    AND: [
                        {
                            UserId: {
                                equals: req.user.UserId,
                            },
                        },
                        {
                            Primary: {
                                equals: false,
                            },
                        },
                    ],
                },
            });


            if(nonPrimaryAddress){
                //Push to list, offset by 1 for unique id number
                for(let i = 1; i < nonPrimaryAddress.length + 1; i++){
                    addresses.push({
                        NameLine: [req.user.FirstName, ' ', req.user.LastName].join(''),
                        LocalLine: [nonPrimaryAddress[i-1].PrimaryAddress, ', ', nonPrimaryAddress[i-1].SecondaryAddress].join(''),
                        StateLine: [nonPrimaryAddress[i-1].City, ', ', nonPrimaryAddress[i-1].State, ' ', nonPrimaryAddress[i-1].Zip].join(''),
                        primary: false,
                        AID: nonPrimaryAddress[i-1].AddressId, //Address ID
                        id: i
                    });
                }
            }

            
            console.log("Primary Address and Non-Primary Address")
            console.log(addresses);
            res.status(200).json({
                addressList: addresses
            });
            console.log("Returning")
            return

        } catch (err) {
            executeFinally = true; //Only a primary card, no non-primary cards to return
            console.error(`Only a primary address, no non-primary address to return (or there was an error) `, err.message);
            next(err);
        } finally {
            if(executeFinally){
                console.log(addresses);
                res.status(200).json({
                    addressList: addresses
                });
                return
            }
        }

    } catch (err) {
        console.error(`No Primary Card or just Error? `, err.message);
        next(err);
    }
});

router.get("/pullAddress", jsonParser, async function (req, res, next) {
    try {
        var addresses = [];
        var executeFinally = false;

        //Query User Information
        const primaryAddress = await prisma.address.findFirst({
            where: { 
                AND: [
                    {
                        UserId: {
                            equals: req.user.UserId,
                        },
                    },
                    {
                        Primary: {
                            equals: true,
                        },
                    },
                ],
            },
        });

        if(primaryAddress.SecondaryAddress == null){
            primaryAddress.SecondaryAddress = '';
        }

        //Put primary at the top of the list
        addresses.push({
            NameLine: [req.user.FirstName, ' ', req.user.LastName].join(''),
            LocalLine: [primaryAddress.PrimaryAddress, ', ', primaryAddress.SecondaryAddress].join(''),
            StateLine: [primaryAddress.City, ', ', primaryAddress.State, ' ', primaryAddress.Zip],
            primary: true,
            AID: primaryAddress.AddressId, //Address ID
            id: 0
        });
        console.log("Primary Addresses")
        console.log(addresses);

        //Try and see if there are more addresses
        try{
            console.log("Trying to grab non-primary")
            const nonPrimaryAddress = await prisma.address.findMany({
                where: { 
                    AND: [
                        {
                            UserId: {
                                equals: req.user.UserId,
                            },
                        },
                        {
                            Primary: {
                                equals: false,
                            },
                        },
                    ],
                },
            });

            console.log("Non-Primary grabbed")
            if(nonPrimaryAddress){
                //Push to list, offset by 1 for unique id number
                for(let i = 1; i < nonPrimaryAddress.length + 1; i++){
                    addresses.push({
                        NameLine: [req.user.FirstName, ' ', req.user.LastName].join(''),
                        LocalLine: [nonPrimaryAddress[i-1].PrimaryAddress, ', ', nonPrimaryAddress[i-1].SecondaryAddress].join(''),
                        StateLine: [nonPrimaryAddress[i-1].City, ', ', nonPrimaryAddress[i-1].State, ' ', nonPrimaryAddress[i-1].Zip].join(''),
                        primary: false,
                        AID: nonPrimaryAddress[i-1].AddressId, //Address ID
                        id: i
                    });
                }
            }

            
            console.log("Primary Address and Non-Primary Address")
            console.log(addresses);
            res.status(200).json({
                addressList: addresses
            });
            console.log("Returning")
            return

        } catch (err) {
            executeFinally = true; //Only a primary address, no non-primary address to return
            console.error(`Only a primary address, no non-primary address to return (or there was an error) `, err.message);
            next(err);
        } finally {
            if(executeFinally){
                console.log(addresses);
                res.status(200).json({
                    addressList: addresses
                });
                return
            }
        }

    } catch (err) {
        console.error(`Spooky Error? `, err.message);
        next(err);
    }
});

router.post("/insertAddress", jsonParser, async function (req, res, next) {
    console.log("Working?")
    try {
        if (!req.body.PrimaryAddress){
            res.status(400).json({
              message: "Please enter a valid primary address"
            });
            return
        }

        if (!req.body.City){
            res.status(400).json({
              message: "Please enter a City"
            });
            return
        }

        if (!req.body.State || req.body.State.length > 2){
            res.status(400).json({
              message: "Please enter a valid state"
            });
            return
        }

        if (!req.body.ZIP || req.body.ZIP.length > 5){
            res.status(400).json({
              message: "Please enter a valid zipcode"
            });
            return
        }

        //Set as primary address
        try{
            //See if current primary address exists
            console.log("Finding Primary Address ID of User");
            const addressObject = await prisma.address.findFirst({
                where: { 
                    AND: [
                        {
                            UserId: {
                                equals: req.user.UserId,
                            },
                        },
                        {
                            Primary: {
                                equals: true,
                            },
                        },
                    ],
                },
            });

            //If one does, update to be non-primary
            console.log("Unsetting current primary address");
            await prisma.address.update({
                where: {
                    AddressId: addressObject.AddressId
                },
                data: {
                    Primary: false
                }
            }); 

            //Insert and set this address as primary
            console.log("Inserting and setting new primary address");
            await prisma.address.create({ 
                data: {
                    AddressId: uuid(),
                    UserId: req.user.UserId,
                    PrimaryAddress: req.body.PrimaryAddress,
                    SecondaryAddress: req.body.SecondaryAddress,
                    City: req.body.City,
                    State: req.body.State,
                    Zip: req.body.ZIP,
                    Primary: true
              }});

              res.status(200).json({
                message: "Address Added!"
              });
              return
        }
        catch(err){ //No Primary address, set this one as primary
            console.log("No primary address, add in first one");
            await prisma.address.create({ 
                data: {
                    AddressId: uuid(),
                    UserId: req.user.UserId,
                    PrimaryAddress: req.body.PrimaryAddress,
                    SecondaryAddress: req.body.SecondaryAddress,
                    City: req.body.City,
                    State: req.body.State,
                    Zip: req.body.ZIP,
                    Primary: true
              }});

              res.status(200).json({
                message: "Address Added!"
              });
              return
        }

    } catch (err) {
        console.error(`Something spooky happened! `, err.message);
        next(err);
      }
});

router.get("/pullPrimary", jsonParser, async function (req, res, next) {
    try {
        //Query User Information
        console.log(req.user.UserId)
        const primaryCard = await prisma.payment.findFirst({
            where: { 
                AND: [
                    {
                        UserId: {
                            equals: req.user.UserId,
                        },
                    },
                    {
                        Primary: {
                            equals: true,
                        },
                    },
                ],
            },
        });

        var lastFour = "????????????" + primaryCard.Number.substring(primaryCard.Number.length - 4, primaryCard.Number.length + 1)

        res.status(200).json({
            card: lastFour
        });
        return

    } catch (err) {
        console.error(`No Primary Card `, err.message);
        next(err);
    }
});

router.get("/:PID/updateCards", jsonParser, async function (req, res, next) {
    try {
        var cards = [];
        var executeFinally = false;

        //Get current primary
        const paymentObject = await prisma.payment.findFirst({
            where: { 
                AND: [
                    {
                        UserId: {
                            equals: req.user.UserId,
                        },
                    },
                    {
                        Primary: {
                            equals: true,
                        },
                    },
                ],
            },
        });

        //Unset Primary Card based off Primary PaymentId
        await prisma.payment.update({
            where: {
                PaymentId: paymentObject.PaymentId
            },
            data: {
                Primary: false
            }
        }); 

        //Set new Primary card
        await prisma.payment.update({
            where: {
                PaymentId: req.params.PID
            },
            data: {
                Primary: true
            }
        }); 

        //Query User Information
        console.log(req.user.UserId)
        const primaryCard = await prisma.payment.findFirst({
            where: { 
                AND: [
                    {
                        UserId: {
                            equals: req.user.UserId,
                        },
                    },
                    {
                        Primary: {
                            equals: true,
                        },
                    },
                ],
            },
        });

        //Put primary at the top of the list
        cards.push({
            lastFour: primaryCard.Number.substring(primaryCard.Number.length - 4, primaryCard.Number.length + 1),
            exp: primaryCard.Expiration,
            primary: true,
            PID: primaryCard.PaymentId, //Payment ID
            id: 0
        });
        console.log(cards);

        //Try and see if there are more cards
        try{
            const nonPrimaryCards = await prisma.payment.findMany({
                where: { 
                    AND: [
                        {
                            UserId: {
                                equals: req.user.UserId,
                            },
                        },
                        {
                            Primary: {
                                equals: false,
                            },
                        },
                    ],
                },
            });

            //console.log("Card Stuff: ", nonPrimaryCards[0].Number.substring(nonPrimaryCards.Number.length - 4, nonPrimaryCards.Number.length + 1))

            if(nonPrimaryCards){
                //Push to list, offset by 1 for unique id number
                for(let i = 1; i < nonPrimaryCards.length + 1; i++){
                    cards.push({
                        lastFour: nonPrimaryCards[i-1].Number.substring(nonPrimaryCards[i-1].Number.length - 4, nonPrimaryCards[i-1].Number.length + 1),
                        exp: nonPrimaryCards[i-1].Expiration,
                        primary: false,
                        PID: nonPrimaryCards[i-1].PaymentId, //Payment ID
                        id: i
                    });
                }
            }

            
            console.log("Cards")
            console.log(cards);
            res.status(200).json({
                cardList: cards
            });
            console.log("Returning")
            return

        } catch (err) {
            executeFinally = true; //Only a primary card
            console.error(`No Primary Card or just Error? `, err.message);
            next(err);
        } finally {
            if(executeFinally){
                console.log(cards);
                res.status(200).json({
                    cardList: cards
                });
                return
            }
        }

    } catch (err) {
        console.error(`No Primary Card or just Error? `, err.message);
        next(err);
    }
});

router.get("/pullCards", jsonParser, async function (req, res, next) {
    try {
        var cards = [];
        var executeFinally = false;
        //Query User Information
        console.log(req.user.UserId)
        const primaryCard = await prisma.payment.findFirst({
            where: { 
                AND: [
                    {
                        UserId: {
                            equals: req.user.UserId,
                        },
                    },
                    {
                        Primary: {
                            equals: true,
                        },
                    },
                ],
            },
        });

        //Put primary at the top of the list
        cards.push({
            lastFour: primaryCard.Number.substring(primaryCard.Number.length - 4, primaryCard.Number.length + 1),
            exp: primaryCard.Expiration,
            primary: true,
            PID: primaryCard.PaymentId, //Payment ID
            id: 0
        });
        console.log(cards);

        //Try and see if there are more cards
        try{
            const nonPrimaryCards = await prisma.payment.findMany({
                where: { 
                    AND: [
                        {
                            UserId: {
                                equals: req.user.UserId,
                            },
                        },
                        {
                            Primary: {
                                equals: false,
                            },
                        },
                    ],
                },
            });

            //console.log("Card Stuff: ", nonPrimaryCards[0].Number.substring(nonPrimaryCards.Number.length - 4, nonPrimaryCards.Number.length + 1))

            if(nonPrimaryCards){
                //Push to list, offset by 1 for unique id number
                for(let i = 1; i < nonPrimaryCards.length + 1; i++){
                    cards.push({
                        lastFour: nonPrimaryCards[i-1].Number.substring(nonPrimaryCards[i-1].Number.length - 4, nonPrimaryCards[i-1].Number.length + 1),
                        exp: nonPrimaryCards[i-1].Expiration,
                        primary: false,
                        PID: nonPrimaryCards[i-1].PaymentId, //Payment ID
                        id: i
                    });
                }
            }

            
            console.log("Cards")
            console.log(cards);
            res.status(200).json({
                cardList: cards
            });
            console.log("Returning")
            return

        } catch (err) {
            executeFinally = true; //Only a primary card
            console.error(`No Primary Card or just Error? `, err.message);
            next(err);
        } finally {
            if(executeFinally){
                console.log(cards);
                res.status(200).json({
                    cardList: cards
                });
                return
            }
        }

    } catch (err) {
        console.error(`No Primary Card or just Error? `, err.message);
        next(err);
    }
});


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
        let cardMM = parseInt(req.body.Date.substring(0,2));
        let cardYY = parseInt('20' + req.body.Date.substring(3,5));

        console.log(todayMM, " is before ", cardMM);
        console.log(todayYY, " is before ", cardYY);
        
        if(todayYY > cardYY) {
            res.status(400).json({
                message: "Please enter a valid date"
              });
              return
        }

        if (todayMM >= cardMM && todayYY == cardYY){
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

            //Find Primary Payment ID of user
            console.log("Finding Primary Payment ID of User")

            const paymentObject = await prisma.payment.findFirst({
                where: { 
                    AND: [
                        {
                            UserId: {
                                equals: req.user.UserId,
                            },
                        },
                        {
                            Primary: {
                                equals: true,
                            },
                        },
                    ],
                },
            });

            //Unset Primary Card based off Primary PaymentId
            await prisma.payment.update({
                where: {
                    PaymentId: paymentObject.PaymentId
                },
                data: {
                    Primary: false
                }
            }); 

            //Insert and set this card as primary
            console.log("Current Primary Card Unset")
            await prisma.payment.create({ 
                data: {
                    PaymentId: uuid(),
                    UserId: req.user.UserId,
                    Number: req.body.Value.replace(/\s/g, ''),
                    Expiration: req.body.Date,
                    CVC: req.body.CVV,
                    ZIP: req.body.ZIP,
                    Primary: true
              }});

              res.status(200).json({
                message: "Card Added!"
              });
              return

           } catch (err) { //No primary card, set this one as primary

            console.log("No primary card set yet")
                console.log(req.user.UserId)

                console.log(req.body.Value)
                console.log(req.body.Date)
                console.log(req.body.Primary)
                console.log(req.body.CVV)
                console.log(req.body.ZIP)
                await prisma.payment.create({ 
                    data: {
                    PaymentId: uuid(),
                    UserId: req.user.UserId,
                    Number: req.body.Value.replace(/\s/g, ''),
                    Expiration: req.body.Date,
                    CVC: req.body.CVV,
                    ZIP: req.body.ZIP,
                    Primary: true
                }});

                res.status(200).json({
                    message: "Card Added!"
                  });
                  return
          }
        } else { //Non-primary
            console.log("Adding Non-Primacy Card")
            await prisma.payment.create({ 
                data: {
                PaymentId: uuid(),
                UserId: req.body.userID,
                Number: req.body.Value.replace(/\s/g, ''),
                Expiration: req.body.Date,
                CVC: req.body.CVV,
                ZIP: req.body.ZIP,
                Primary: false
            }});

            res.status(200).json({
                message: "Card Added!"
              });
              return
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
                UserId: req.user.UserId,
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
                UserId: req.user.UserId
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