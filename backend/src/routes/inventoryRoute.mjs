import inventoryController from "../controller/inventoryController.mjs";
import express from "express";

const inventoryRouter = express.Router()

inventoryRouter.post("/add-item", inventoryController.addItem);
inventoryRouter.get("/get-by-id/:_id", inventoryController.getItemById)
inventoryRouter.get("/get-by-category/:category", inventoryController.getItemByCategory);
inventoryRouter.put("/decrement-by-name/", inventoryController.updateItemByName);
inventoryRouter.delete("/delete-by-id/:_id", inventoryController.deleteItemById);

export default inventoryRouter