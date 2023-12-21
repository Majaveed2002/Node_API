require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const Product = require("./models/productModules")
const productRotes = require("./routes/productRoutes")
const errorMiddleware = require("./middleware/errorMiddleware")
var cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const MONGO_URL = process.env.MONGO_URL
const PORT_NO = process.env.PORT_NO || "3005"


app.use("/api/products", productRotes)

app.use(errorMiddleware)

mongoose.
connect(MONGO_URL)
.then(() => {
  console.log("Connected to MongoDB")
  app.listen(PORT_NO, ()=> {
    console.log(`Server Running at Port: ${PORT_NO}`)
  })
})
.catch((error)=> {
  console.log(error)
})


