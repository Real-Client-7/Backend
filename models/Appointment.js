    import mongoose from "mongoose";

    const appointmentSchema = new mongoose.Schema(
      {
      
        date:{
          type:Date
          
        },
        note: {
          type: String,
        },
        total: {
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
            nbroftooth: {
              type: Number,
              min: 11,
              max: 48
            }
            
      },
      {
        collection: "appointments",
      }
    );

    const Appointment = mongoose.model("Appointment", appointmentSchema);

    export default Appointment;