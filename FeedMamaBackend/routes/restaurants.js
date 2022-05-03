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

router.get("/:restId/items", jsonParser, async function (req, res, next) {
    try {
        console.log(req.params.restId);
        const meals = await prisma.meals.findMany({
            where: {
                RestaurantID: {
                    equals: req.params.restId
                }
            }
        });
        var items = [];
        meals.forEach(meal => items.push({
            id: meal.MealID,
            name: meal.Name,
            description: meal.Description,
            price: meal.Price,
            max_quantity: meal.Quantity,
            vegan: meal.IsVegan,
            vegetarian: meal.IsVegetarian
        }));
        
        res.status(200).json(items);
    } catch (err) {
        console.error(`Error while trying to get restaurant items`, err.message);
        next(err);
    }
})

router.get("/", jsonParser, async function (req, res, next) {
    try {
        //const restaurants = await prisma.resturants.findMany();
        var items = [];

        /* restaurants.forEach(rest => items.push({
            id: rest.RestaurantID,
            name: rest.Name,
            description: rest.Description,
            img: rest.ImageUrl,
            address: rest.Address + " " + rest.AddressLineTwo,
            city: rest.City,
            state: rest.State,
            zip: rest.ZIP
        })); */
        res.status(200).json(items);
    } catch (err) {
        console.error(`Error while trying to get restaurant items`, err.message);
        next(err);
    }
})

router.get("/:restId/info", jsonParser, async function (req, res, next) {
    try {
        const rest = await prisma.resturants.findFirst({
            where: {
                RestaurantID: {
                    equals: req.params.restId
                }
            }
        });
        
        res.status(200).json({
            id: rest.RestaurantID,
            name: rest.Name,
            img: rest.ImageUrl,
            description: rest.Description,
            address: rest.Address,
            city: rest.City,
            state: rest.State,
            zip: rest.ZIP
        });
    } catch (err) {
        console.error(`Error while trying to get restaurant items`, err.message);
        next(err);
    }
})

module.exports = router;