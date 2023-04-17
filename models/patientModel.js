import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Should not be empty"],
    trim: true,
  },

  middle_name: {
    type: String,
    required: [true, "Should not be empty"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Should not be empty"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Should not be empty"],
    unique: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, "Should not be empty"],
    unique: true,
    trim: true,
  },

  dob: {
    type: Date,
    required: [true, "Should not be empty"],
  },
  gender: {
    type: String,
    required: [true, "Should not be empty"],
    trim: true,
  },
  maritalStatus: {
    type: String,
    required: [true, "Should not be empty"],
    trim: true,
  },

  occupation: {
    type: String,
    required: [true, "Should not be empty"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Should not be empty"],
    trim: true,
  },

  referredBY: {
    type: String,
    required: [true, "Should not be empty"],
    trim: true,
  },

  notes: {
    type: String,
    required: [true, "Should not be empty"],
    trim: true,
  },
  medicalStatus: {
    type: String,
    required: [true, "Should not be empty"],
    trim: true,
  },

  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;