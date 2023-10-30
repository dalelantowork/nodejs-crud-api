const express = require("express");
const mongoose = require("mongoose");
const app = express();

//routes

app.get(`/`, (reques, response) => {
  response.send(`Hello NODE API`);
});

app.get(`/blog`, (request, response) => {
  response.send(`Hello Blog Hi`);
});

// mongoose.set('strictQuery', false);
mongoose
  .connect(
    "mongodb+srv://dalelantowork:8XPE7M4Bj0krXlLk@nodejsapi.gepbfqw.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`connected to mongodb`);
    app.listen(3000, () => {
      console.log(`Node API app is running on port http://localhost:3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
