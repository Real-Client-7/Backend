import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const appointment = new Schema({
    time:{
        type:Date
    },
    note:{
        type:String
    }
},{
    collection:'appoitments'
})

const Appointment = model('Appoitment',appointment)
export default Appointment