require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const routes = require("./routes/index.routes")
const { API_PORT, MONGO_URL } = process.env
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDocs = YAML.load("./swagger.yaml")

const app = express()
const PORT = API_PORT

app.use(express.json())
app.use(cors())
app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocs)
)

mongoose.connect(MONGO_URL).catch(err => {
    if (err) {
        console.log("tidak bisa terkoneksi ke mongodb!")
        throw err
    }
})

app.use(routes)


app.listen(PORT, () => {
    console.log("Server API jalan di port " + PORT)
})

module.exports = app
