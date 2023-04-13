import express from "express"
import income from "../controllers/incomController.js"
const router = express.Router()

router.get('/getIncome' , income.getIncome)
router.post('/addIncome' , income.addIncome)
router.get('/getIncomeById/:id' , income.getIncomeById)
router.delete('/deleteIncome/:id' , income.deleteIncome)
router.put('/updateIncome/:id' , income.updateIncome)

export default router
