import express from "express"
import appoitment from "../controllers/AppoitmentController.js"

const router =express.Router()

router.post('/addAppoitment' , appoitment.AddAppointment)
router.get('/',appoitment.getAppoitment)
router.get('/getAppoitment/:id',appoitment.getAppoitmentByID)
router.delete('/deleteApointment/:id' , appoitment.deleteAppoitment)
router.put('/update/:id',appoitment.UpdateAppoitment)


export default router

