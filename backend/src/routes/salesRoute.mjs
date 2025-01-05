import salesController from "../controller/salesController.mjs";
import express from "express";

const salesRouter = express.Router()

salesRouter.post("/add-item", salesController.addItem);
salesRouter.get("/get-by-date/:date", salesController.getByDate);

export default salesRouter