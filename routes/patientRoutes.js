import express from 'express';
import { addPatient, getAllPatients, getPatientById, updatePatientById, deletePatientById } from '../controllers/patientController.js';
export const router = express.Router()


router.get('/getAllPatients',getAllPatients);
router.get('/get/:id',getPatientById);
router.post('/addPatient',addPatient);
router.put('/editPatient/:id',updatePatientById);
router.delete('/deletePatient/:id',deletePatientById);

export default router;
