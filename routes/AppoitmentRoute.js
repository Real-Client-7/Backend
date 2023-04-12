import express from "express"
import appoitment from "../controller/AppoitmentController.js"

const router =express.Router()

router.post('/addAppoitment' , appoitment.AddAppoitment)
router.get('/',appoitment.getAppoitment)
router.delete('/deleteApointment/:id' , appoitment.deleteAppoitment)
router.put('/update/:id',appoitment.UpdateAppoitment)


export default router

