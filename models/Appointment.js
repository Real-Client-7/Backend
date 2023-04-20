import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
    },
    note: {
      type: String,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    treatments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Treatment",
        },
      ],
  },
  {
    collection: "appointments",
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;