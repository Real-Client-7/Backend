import express from "express"
import Treatment from "../controllers/treatmentController.js"

const router =express.Router()

router.post('/addTreatment' , Treatment.addTreatment)
router.get('/',Treatment.getTreatment)
router.get('/:id',Treatment.getTreatmentByID)
router.delete('/:id' , Treatment.deleteTreatment)
router.put('/:id',Treatment.updateTreatment)


export default router;

