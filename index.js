const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// call routes
var routes = require("./router/router");
routes(app);

app.listen(3100, () => {
  console.log("success running");
});
