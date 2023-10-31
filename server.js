require("dotenv").config();
const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware");

// env variables
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: false })); // for x-www-form-urlencoded

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
