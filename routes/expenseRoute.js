import express from "express"
import {
  getAll,
  createExpense,
  deleteExpense,
  updateExpense,
  getExpense,
} from "../controllers/expenseController.js";

const router =express.Router()

router.get("/", getAll);
router.get("/:id", getExpense);
router.post("/",  createExpense);
router.put("/:id",updateExpense);
router.delete("/:id",deleteExpense);



export default router

