import express from "express"
import {
  deleteDebt,
  editDebt,
  getDebt,
} from "../controllers/debtController.js";

const router =express.Router()

router.get("/getDebt", getDebt);
// router.get("/:id", getDebt);
// router.post("/",  createDebt);
router.put("/editDebt/:id",editDebt);
router.delete("/deleteDebt/:id",deleteDebt);



export default router

