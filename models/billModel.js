import { Schema, model } from "mongoose";

const bill = new Schema({
    total : {
        type:Number
    },
    title:{
        type:String
    },
    paid: {
        type:Number
    },
    rest:{
        type:Number
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

//643d15b8e188ca0343673d75