require("dotenv").config();
const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
var cors = require("cors");

// env variables
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;

// configuring cors to give access to specific domains
var corsOptions = {
  origin: [FRONTEND, "http://example.com"],
  optionsSuccessStatus: 200, // some legacy browsers choke on 204
};

// middleware
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: false })); // for x-www-form-urlencoded
app.use(cors(corsOptions));

//routes
app.use(`/api/products`, productRoute);

app.get(`/`, (reques, response) => {
  // throw new Error('fake error');
  response.send(`Hello NODE API`);
});

app.get(`/blog`, (request, response) => {
  response.send(`Hello Blog Hi`);
});

//middlewares
app.use(errorMiddleware);

// mongoose.set('strictQuery', false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(`connected to mongodb`);
    app.listen(PORT, () => {
      console.log(`Node API app is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
