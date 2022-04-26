const DoorDashClient = require("@doordash/sdk");
const { v4: uuidv4 } = require("uuid");
const axios = require('axios');

const client = new DoorDashClient.DoorDashClient({
  "developer_id": "881e3e0b-2ed4-4106-b9d9-4b605b9765fe",
  "key_id": "8c5d00d7-9dea-4695-9ad0-f4d6dd24406f",
  "signing_secret": "Y28Q2pbCKUJfuDgH3Qkh8Fb2hptj3nDP91vSAJ0yEAw"
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

axios.get('https://openapi.doordash.com/drive/v2/deliveries/' + "7c06ab62-540a-4ae4-ad47-af598e4b5700", { headers: { 'Authorization': 'Bearer ' + getToken(), 'Content-Type': 'application/json' } })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });