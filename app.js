var express = require("express");
var request = require("request");
var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views'));

app.get("/", function (req, res) {
  request("https://api.covid19india.org/data.json", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var indiaData = JSON.parse(body);
      res.render("india", { indiaData: indiaData });
    }
    else console.log(error);
  }
  );
});

app.get("/world", function (req, res) {
  request("https://api.covid19api.com/summary", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var worldData = JSON.parse(body);
      res.render("world", { worldData: worldData });
    }
    else console.log(error);
  }
  );
});

app.get("*", function (req, res) {
  res.redirect("/");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});
