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
    }
},{
    collection:"bill"
}) 
const Bill = model('bill',bill)
export default Bill