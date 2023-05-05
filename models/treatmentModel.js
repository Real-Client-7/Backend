import { Schema, model , mongoose } from "mongoose";

const treatment = new Schema(
  {
    type: {
      type: String,
      require: true,
    },
    nbr_of_tooth: {
      type: Number,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  },
  {
    collection: "Treatment",
  }
);
const Treatment = model("Treatment", treatment);
export default Treatment;
