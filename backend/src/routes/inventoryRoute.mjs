import inventoryController from "../controller/inventoryController.mjs";
import express from "express";

const inventoryRouter = express.Router()

inventoryRouter.post("/add-item", inventoryController.addItem);
inventoryRouter.get("/get-by-name/:name", inventoryController.getItemByName)
inventoryRouter.get("/get-by-classification/:classification", inventoryController.getItemByClassification);
inventoryRouter.put("/update-by-name/:name", inventoryController.updateItemByName);
inventoryRouter.delete("/delete-by-name/:name", inventoryController.deleteItemByName);

export default inventoryRouter