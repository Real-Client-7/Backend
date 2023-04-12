import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const appointment = new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    mobile:{
        type:Number,
        required:true
    },
    treatment:{
        type:String
    },
    blood_group:{
        type:String 
    },
    patient:{
        type:String
    },
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