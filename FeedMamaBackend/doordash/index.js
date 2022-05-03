const DoorDashClient = require("@doordash/sdk");
const { v4: uuidv4 } = require("uuid");
const axios = require('axios');

const client = new DoorDashClient.DoorDashClient({
  "developer_id": "881e3e0b-2ed4-4106-b9d9-4b605b9765fe",
  "key_id": "8c5d00d7-9dea-4695-9ad0-f4d6dd24406f",
  "signing_secret": "Y28Q2pbCKUJfuDgH3Qkh8Fb2hptj3nDP91vSAJ0yEAw"
});

const body = JSON.stringify({
    "external_delivery_id": uuidv4(), // keep track of the generated id here or in the response
    "pickup_address": "400 N Water St, WI 53202",
    "pickup_business_name": "MKE Public Market",
    "pickup_phone_number": "+16505555555",
    "pickup_instructions": "",
    "dropoff_address": "2314 W Wells St Milwaukee, WI 53233",
    "dropoff_business_name": "Home",
    "dropoff_phone_number": "+16505555555",
    "dropoff_instructions": "Enter gate code 3300 on the callbox.",
    "order_value": 3500
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