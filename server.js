const express = require("express")

const app = express()

app.get("/",(req,res)=>{
  res.send("Hello Node Api")
})

app.listen(3005 , ()=> {
  console.log("Server is Running on Port: 3000")
})