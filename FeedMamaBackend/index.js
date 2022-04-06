const express = require('express')
const bp = require('body-parser')
const cors = require('cors');

const app = express();
const port = 3000;
const authRouter = require("./routes/auth");

app.use(cors());
app.use("/auth", authRouter);
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.listen(port, () => console.log(`FeedMama API listening on port ${port}!`));
