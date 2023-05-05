import Treatment from "../models/treatmentModel.js";
import asyncHandler from 'express-async-handler';
import appoitment from "./AppoitmentController.js";
import Appointment from "../models/Appointment.js";


// ADD a Treatment
async function addTreatment(req, res, next) {
    try {
        const data = req.body;
        const treatmentData = new Treatment(data);
        const savedTreatment = await treatmentData.save(); 
      
    //   const appointmentId = data.appointment;
    //   const appointment = await Appointment.findById(appointmentId);
    //   appointment.treatments.push(savedTreatment._id);
    //   await appointment.save();
      
      res.status(200).json({ response: savedTreatment });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
  
// Get all the data of TReatment
async function getTreatment(req, res, next) {
    try {
        const get = await Treatment.find({})
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)
    }
}

// Get treatment By id
async function getTreatmentByID(req, res, next) {
    let id=req.params.id
    try {
        const getById = await Treatment.findById({_id:id})
        res.status(200).json({ response: getById })
    } catch (err) {
        res.status(400).json(err)
    }
}

// Delete Treatment by id
async function deleteTreatment(req, res, next) {
    let id = req.params.id
    try {
        const deleteById = await Treatment.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Treatment delete success", response : deleteById})
    } catch (err) {
        res.status(400).json(err)
    }
}

// Update Treatment By id
async function updateTreatment(req,res,next){
    let id = req.params.id
    let data = req.body
    try{
        await Treatment.updateOne({_id:id , $set:data})
        let response = await Treatment.findById({_id:id})
        res.status(200).json({message : "Update sucss" , response })
    }catch(err){
        res.status(400).json(err)
    }
}
const treatment = {addTreatment ,getTreatment, getTreatmentByID ,deleteTreatment ,updateTreatment}

export default treatment ;
