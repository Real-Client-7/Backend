import { Schema, model } from "mongoose";

const bill = new Schema({
    total : {
        type:String
    },
    time: {
        type:Date
    },
    note:{
        type:String
    },
    appointment: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
      }
},{
    collection:"bill"
}) 
const Bill = model('bill',bill)
export default Bill