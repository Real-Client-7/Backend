import express from "express"
import billRoute from "../controllers/billController.js"

const router = express.Router()

router.post('/addBill' , billRoute.addBill)
router.get('/getBill', billRoute.getBill)
router.get('/getBillById',billRoute.getBillById)
router.put('/updateBill/:id' , billRoute.UpdateBill)
router.delete('/deleteBill/:id' , billRoute.deleteBill)

export default router