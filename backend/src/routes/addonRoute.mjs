import addonControl from "../controller/addonController.mjs";
import express from "express";

const addonRouter = express.Router()

addonRouter.post("/add-item", addonControl.addItem);
addonRouter.get("/get-by-id/:_id", addonControl.getItemById)
addonRouter.get("/get-all-items", addonControl.getAllItems);

export default addonRouter