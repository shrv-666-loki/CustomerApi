const express = require("express");
const bodyParser = require("body-parser");
const customerRoutes = require('./routes/customerRoutes')

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

// Handle the endpoint '/customers'
app.use('/customers', customerRoutes)

app.get("/", (req, res) => {
  res.status(201).json({ message: "done!" });
});

app.listen(8080, function () {
  console.log("Server is running on 8080");
});
