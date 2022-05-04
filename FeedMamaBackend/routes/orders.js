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
const DoorDashClient = require("@doordash/sdk");
const axios = require('axios');

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

        const client = new DoorDashClient.DoorDashClient({
            "developer_id": "881e3e0b-2ed4-4106-b9d9-4b605b9765fe",
            "key_id": "8c5d00d7-9dea-4695-9ad0-f4d6dd24406f",
            "signing_secret": "Y28Q2pbCKUJfuDgH3Qkh8Fb2hptj3nDP91vSAJ0yEAw"
        });

        const body = JSON.stringify({
            "external_delivery_id": uuid(), // keep track of the generated id here or in the response
            "pickup_address": rest.Address,
            "pickup_business_name": rest.Name,
            "pickup_phone_number": "4142168548",
            "dropoff_address": req.user.Address,
            "dropoff_phone_number": req.user.Phone,
            "order_value": order.Total*100, 
            "tip": order.Tip*100,
        });
        
        function getToken() {
        
          const jwt = require('jsonwebtoken');
        
          const data = {
              "aud": "doordash",
              "iss": "881e3e0b-2ed4-4106-b9d9-4b605b9765fe", 
              "kid": "8c5d00d7-9dea-4695-9ad0-f4d6dd24406f", 
              "exp": Math.floor((Date.now() / 1000) + 60),
              "iat": Math.floor(Date.now() / 1000),
          };
        
          const headers = { algorithm: 'HS256', header: { 'dd-ver': 'DD-JWT-V1' } }
        
          const token = jwt.sign(data, Buffer.from("Y28Q2pbCKUJfuDgH3Qkh8Fb2hptj3nDP91vSAJ0yEAw" , 'base64'), headers);
        
          return token;
        
        }
        axios.post('https://openapi.doordash.com/drive/v2/deliveries', body,  { headers: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' } })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

        res.status(200);
    } catch (err) {
        console.error(`Error while creating order`, err.message);
        next(err);
    }
})

router.get("/previous", jsonParser, async function (req, res, next) {
    try {
        console.log(req.body);

        const orders = await prisma.orders.findMany({
            where: {
                UserID: {
                    equals: req.user.UserId
                }
            }
        });
        const resturantsIds = orders.map(x => x.RestaurantID);

        const restaurants = await prisma.resturants.findMany({
            where: {
                RestaurantID: { in: resturantsIds },
            }
        });

        let dict = restaurants.reduce(
            (dict, el, index) => (dict[el.RestaurantID] = el, dict),
            {}
        );

        let restaurantOrders = []
        orders.forEach(x => {
            restaurantOrders.push({
                OrderId: x.OrderID,
                DateTime: x.DateTime,
                ResturantName: dict[x.RestaurantID].Name, 
                ResturantImg: dict[x.RestaurantID].ImageUrl
            });
        });

        res.status(200).json(restaurantOrders);
    } catch (err) {
        console.error(`Error while getting previous orders`, err.message);
        next(err);
    }
})

router.post("/single", jsonParser, async function (req, res, next) {
    try {
        var id = req.body.id;
        console.log(id)
        console.log("DO")

        const order = await prisma.orders.findFirst({
            where: {
                OrderID: {
                    equals: id
                }
            }
        });

        if (order.UserID != req.user.UserId) {
            res.status(403)
            return
        }

        const orderItems = await prisma.orderMeals.findMany({
            where: {
                OrderID: { equals: id },
            }
        });

        const rest = await prisma.resturants.findFirst({
            where: {
                RestaurantID: {
                    equals: order.RestaurantID
                }
            }
        });

        const mealIds = orderItems.map(x => x.MealID);

        const meals = await prisma.meals.findMany({
            where: {
                MealID: { in: mealIds },
            }
        });

        let dict = meals.reduce(
            (dict, el, index) => (dict[el.MealID] = el, dict),
            {}
        );

        let ordermeals = []
        orderItems.forEach(x => {
            ordermeals.push({
                quantity: x.Quantity,
                id: x.OrderMealID,
                price: x.Total / x.Quantity,
                name: dict[x.MealID].Name
            })
        })
        
        console.log(ordermeals)
        res.status(200).json(
            {
                restaurant: {
                    id: rest.RestaurantID,
                    name: rest.Name,
                    img: rest.ImageUrl,
                    description: rest.Description,
                    address: rest.Address,
                    city: rest.City,
                    state: rest.State,
                    zip: rest.ZIP
                },
                order: order,
                ordermeals: ordermeals
            }
        );
    } catch (err) {
        console.error(`Error while getting previous orders`, err.message);
        next(err);
    }
})

module.exports = router;