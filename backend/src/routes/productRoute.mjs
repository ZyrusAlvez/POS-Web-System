import productController from "../controller/productController.mjs";
import express from "express"

const productRouter = express.Router()

productRouter.post("/add-item", productController.addItem);
productRouter.get("/get-by-name/:name", productController.getItemByName)
productRouter.get("/get-by-classification/:classification", productController.getItemByClassification)
productRouter.delete("/delete-by-name/:name", productController.deleteItemByName)

export default productRouter