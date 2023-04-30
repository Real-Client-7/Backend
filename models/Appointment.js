import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    time: {
      type: String,
    }
    ,date:{
      type:Date
    },
    note: {
      type: String,
    },
    total: {
      type: Number,
    },
    paid: {
      type: Number,
    },
    rest: {
      type: Number,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    treatments: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Treatment",
        },
  },
  {
    collection: "appointments",
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;