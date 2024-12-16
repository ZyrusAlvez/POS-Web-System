import inventoryController from "../controller/inventoryController.mjs";
import express from "express";

const inventoryRouter = express.Router()

inventoryRouter.post("/add-item", inventoryController.addItem);
inventoryRouter.get("/get-by-name", inventoryController.getItemByName)
inventoryRouter.get("/get-by-classification", inventoryController.findByClassification);
inventoryRouter.put("/update-by-name", inventoryController.updateItemByName);
inventoryRouter.delete("/delete-by-name", inventoryController.deleteItemByName);

export default inventoryRouter