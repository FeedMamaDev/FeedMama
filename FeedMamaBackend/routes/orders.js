const express = require("express");
const {config} = require("../config");
const verifyToken = require("../middleware/authenticate");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var bodyParser = require('body-parser')
const crypto = require('crypto');
const uuid = require('uuid').v4;
const jwt = require("jsonwebtoken");
 
// create application/json parser
var jsonParser = bodyParser.json()

router.use(verifyToken);

router.post("/", jsonParser, async function (req, res, next) {
    try {
        console.log(req.body);
        
        // Load the resturant
        const rest = await prisma.resturants.findFirst({
            where: {
                RestaurantID: {
                    equals: req.body.restaurant
                }
            }
        });

        if (!rest) {
            res.status(200).json({
                message: "Could not find given resturant!"
            });
        }

        let tip = 0;
        if (req.body.tip > 0) {
            tip = req.body.tip;
        }

        // Load the meals
        let itemIds = req.body.cart.map(x => x.id);
        const items = await prisma.meals.findMany({
            where: {
                MealID: { in: itemIds },
            }
        })
        let dict = items.reduce(
            (dict, el, index) => (dict[el.MealID] = el, dict),
            {}
        );

        let total = 0
        req.body.cart.forEach(element => {
            if(element.quantity > 0) {
                total += element.quantity * dict[element.id].Price
            }
        });
        let overalltotal = total + tip

        const orderId = uuid()
        const order = await prisma.orders.create({ 
            data: {
                OrderID: orderId,
                Resturants: { connect: { RestaurantID: rest.RestaurantID } },
                Users: { connect: { UserId: req.user.UserId } },
                //Payment: { connect: { PaymentId: undefined } },
                Total: overalltotal,
                Tip: tip,
                DateTime: new Date(),
                Address: req.body.dropoff_address
        }});

        for(let i = 0; i < req.body.cart.length; i++) {
            let cartItem = req.body.cart[i];
            if (cartItem.quantity > 0) {
                let meal = dict[cartItem.id]
                await prisma.orderMeals.create({ 
                    data: {
                        OrderMealID: uuid(),
                        Orders: { connect: { OrderID: orderId } },
                        Meals: { connect: { MealID: meal.MealID } },
                        Quantity: cartItem.quantity,
                        Total: cartItem.quantity * meal.Price
                }});
            }
        }
        
        // Do DoorDash stuff

        res.status(200);
    } catch (err) {
        console.error(`Error while creating order`, err.message);
        next(err);
    }
})

module.exports = router;