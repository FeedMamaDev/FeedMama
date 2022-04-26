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

router.get("/items", jsonParser, async function (req, res, next) {
    try {
        res.status(200).json({
            items: [
                {
                    name: "Test 1",
                    id: "6c2b34f2-696d-4dc0-886f-ad98415eda88",
                    img: "https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g="
                },
                {
                    name: "Test 2",
                    id: "22fc8942-862a-45d2-8c5d-505aa0e3ceb7",
                    img: "https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g="
                },
                {
                    name: "Test 3",
                    id: "7d31e175-71f7-4c88-b4e7-c9cdad953303",
                    img: "https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g="
                },
            ]
        });
    } catch (err) {
        console.error(`Error while trying to get restaurant items`, err.message);
        next(err);
    }
})

router.get("/", jsonParser, async function (req, res, next) {
    try {
        res.status(200).json({
            items: [
                {
                    name: "Test 1",
                    id: "6c2b34f2-696d-4dc0-886f-ad98415eda88",
                    description: "A very cool restaurant!",
                    img: "https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g=",
                    address: "1313 West Wisconsin Ave",
                    city: "Milwaukee",
                    state: "WI",
                    zip: "53233"
                },
                {
                    name: "Test 2",
                    id: "22fc8942-862a-45d2-8c5d-505aa0e3ceb7",
                    description: "A very cool restaurant!",
                    img: "https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g=",
                    address: "1313 West Wisconsin Ave",
                    city: "Milwaukee",
                    state: "WI",
                    zip: "53233"
                },
                {
                    name: "Test 3",
                    id: "7d31e175-71f7-4c88-b4e7-c9cdad953303",
                    description: "A very very very very very very very very very very very very very cool restaurant!",
                    img: "https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g=",
                    address: "1313 West Wisconsin Ave",
                    city: "Milwaukee",
                    state: "WI",
                    zip: "53233"
                },
            ]
        });
    } catch (err) {
        console.error(`Error while trying to get restaurant items`, err.message);
        next(err);
    }
})

module.exports = router;