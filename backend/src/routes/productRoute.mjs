import productController from "../controller/productController.mjs";
import express from "express"

const productRouter = express.Router()

productRouter.post("/add-item", productController.addItem);
productRouter.get("/get-by-id/:_id", productController.getItemById)
productRouter.get("/get-by-category/:category", productController.getItemByCategory)
productRouter.delete("/delete-by-id/:_id", productController.deleteItemById)

export default productRouter