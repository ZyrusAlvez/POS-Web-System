import historyController from "../../controller/sales/historyController.mjs";
import express from "express";

const historyRouter = express.Router()

historyRouter.post("/add-item", historyController.addItem);
historyRouter.get("/get-by-date/:date", historyController.getByDate);

export default historyRouter