const express = require("express")
const request = require("request")
const app = express()
app.set("view engine", "ejs")
app.use(express.static(__dirname + '/views'))

const port = process.env.PORT || 3000

app.get("/india", (req, res) => {
  request("https://api.covid19india.org/data.json", (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const indiaData = JSON.parse(body)
      res.render("india", { indiaData: indiaData })
    }
    else console.log(error)
  }
  )
})

app.get("/", (req, res) => {
  request("https://api.covid19api.com/summary", (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const worldData = JSON.parse(body)
      res.render("world", { worldData: worldData })
    }
    else console.log(error)
  }
  )
})

app.get("*", (req, res) => {
  res.redirect("/")
})

app.listen(port, () => {
  console.log(`Server Has Started on port ${port}`)
})
