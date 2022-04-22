const DoorDashClient = require("@doordash/sdk");
const { v4: uuidv4 } = require("uuid");
const axios = require('axios');

const client = new DoorDashClient.DoorDashClient({
    "developer_id": "881e3e0b-2ed4-4106-b9d9-4b605b9765fe",
   "key_id": "3fbe625a-01a3-4376-916c-a5291bced78c",
   "signing_secret": "0NSaut3rE6idxIWddHQqaMupI_KRUPG2d0vqOLmm9so"
});

const response = client
  .createDelivery({
    external_delivery_id: uuidv4(),
    pickup_address: "1000 4th Ave, Seattle, WA, 98104",
    pickup_phone_number: "+1(650)5555555",
    pickup_business_name: "Wells Fargo SF Downtown",
    pickup_instructions: "Enter gate code 1234 on the callbox.",
    dropoff_address: "1201 3rd Ave, Seattle, WA, 98101",
    dropoff_phone_number: "+1(650)5555555",
    dropoff_business_name: "Wells Fargo SF Downtown",
    dropoff_instructions: "Enter gate code 1234 on the callbox.",
    order_value: 1999
  })
  .then(() => {
    // do something
  })
  .catch((err) => {
    // handle error
  });


axios.get('https://openapi.doordash.com/drive/v2/deliveries/fe4154a2-0381-4e54-8706-831b2472cfa8', { headers: { 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImRkLXZlciI6IkRELUpXVC1WMSJ9.eyJhdWQiOiJkb29yZGFzaCIsImlzcyI6Ijg4MWUzZTBiLTJlZDQtNDEwNi1iOWQ5LTRiNjA1Yjk3NjVmZSIsImtpZCI6IjNmYmU2MjVhLTAxYTMtNDM3Ni05MTZjLWE1MjkxYmNlZDc4YyIsImlhdCI6MTY1MDU4OTgyMSwiZXhwIjoxNjUwNTkxNjIxfQ.9u7R-yr1mkbDxeqAJmFqBQ2FRA785dQAMZD1VT3GmO8', 'Content-Type': 'application/json' } })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });