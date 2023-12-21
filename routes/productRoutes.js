const express = require('express')
const Product = require("../models/productModules")
const {getProducts,getProduct,addProduct,deleteProduct,updatedProduct} = require("../controllers/productControllers")

const router = express.Router()

router.get("/", getProducts)


router.post("/", addProduct)

router.get("/:id",getProduct )

router.put("/:id", updatedProduct)

router.delete("/:id", deleteProduct)

module.exports = router