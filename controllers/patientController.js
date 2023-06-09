import Patient from "../models/patientModel.js"
import asyncHandler from 'express-async-handler';
import appointment from "../models/Appointment.js";

// add new Patient
export const addPatient = asyncHandler(async(req,res) =>{
    const { first_name, middle_name , last_name , email , mobile ,dob,gender,maritalStatus , occupation , address ,referredBY , notes, medicalStatus} = req.body
    if (!first_name || !middle_name || !last_name || !email || !mobile || !dob || !gender || !maritalStatus || !occupation || !address || !referredBY || !notes || !medicalStatus) {
        res.status(400)
        throw new Error('Please enter all fields')
    }
    const PatientExists = await Patient.findOne({ email })
    if (PatientExists) {
        res.status(400)
        throw new Error('Patient already exists')
    }
    const patient = await Patient.create({
        first_name,
        middle_name,
        last_name,
        email,
        mobile,
        dob,
        gender,
        maritalStatus,
        occupation,
        address,
        referredBY,
        notes,
        medicalStatus
        
    })

    if (patient) {
        res.status(201).json({
            _id: patient.id,
            first_name: patient.first_name,
            middle_name: patient.middle_name,
            last_name: patient.last_name,
            email: patient.email,
            mobile: patient.mobile,
            dob: patient.dob,
            gender: patient.gender,
            maritalStatus: patient.maritalStatus,
            occupation: patient.occupation,
            address: patient.address,
            referredBY: patient.referredBY,
            notes: patient.notes,
            medicalStatus:patient.medicalStatus

        })
    } else {
        res.status(400)
        throw new Error('Invalid patient data')
    }


}

) 


// GET all patients
export const getAllPatients = asyncHandler(async (req, res) => {
    const patients = await Patient.find({}).populate('appointments')
    res.json(patients);
  });
  


  
// UPDATE patient by ID
  export const updatePatientById = asyncHandler(async (req, res) => {
    const { first_name, middle_name, last_name, email, mobile, dob, gender, maritalStatus, occupation, address, referredBY, notes, medicalStatus } = req.body;
  
    const patient = await Patient.findById(req.params.id);
  
    if (patient) {
      patient.first_name = first_name || patient.first_name;
      patient.middle_name = middle_name || patient.middle_name;
      patient.last_name = last_name || patient.last_name;
      patient.email = email || patient.email;
      patient.mobile = mobile || patient.mobile;
      patient.dob = dob || patient.dob;
      patient.gender = gender || patient.gender;
      patient.maritalStatus = maritalStatus || patient.maritalStatus;
      patient.occupation = occupation || patient.occupation;
      patient.address = address || patient.address;
      patient.referredBY = referredBY || patient.referredBY;
      patient.notes = notes || patient.notes;
      patient.medicalStatus = medicalStatus || patient.medicalStatus;
  
      const updatedPatient = await patient.save();
      res.json({
        _id: updatedPatient._id,
        first_name: updatedPatient.first_name,
        middle_name: updatedPatient.middle_name,
        last_name: updatedPatient.last_name,
        email: updatedPatient.email,
        mobile: updatedPatient.mobile,
        dob: updatedPatient.dob,
        gender: updatedPatient.gender,
        maritalStatus: updatedPatient.maritalStatus,
        occupation: updatedPatient.occupation,
        address: updatedPatient.address,
        referredBy: updatedPatient.referredBY,
        notes: updatedPatient.notes,
        medicalStatus: updatedPatient.medicalStatus
      });
    } else {
      res.status(404);
      throw new Error("Patient not found");
    }
  });
  

// DELETE patient by ID
  export const deletePatientById = asyncHandler(async (req, res) => {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (patient) {
      res.json({ message: "Patient removed" });
    } else {
      res.status(404);
      throw new Error("Patient not found");
    }
  });

// GET patient by ID
export const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate('appointments');
  if (patient) {
      res.json(patient);
  } else {
      res.status(404);
      throw new Error("Patient not found");
  }
});
