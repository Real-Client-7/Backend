import express from "express"
import {
  getAll,
  createDebt,
  deleteDebt,
  updateDebt,
  getDebt,
} from "../controllers/debtController.js";

const router =express.Router()

router.get("/", getAll);
router.get("/:id", getDebt);
router.post("/",  createDebt);
router.put("/:id",updateDebt);
router.delete("/:id",deleteDebt);



export default router

