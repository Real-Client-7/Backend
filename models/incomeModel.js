import { Schema , model } from "mongoose";

const income = new Schema({
    description : {
        type:String,
        required:[true , "this field is required"]
    },
    amount: {
        type:Number,
        required:[true , "this field is required"]
    },
    date: {
        type:Date,
        required:[true , "this field is required"]
        
    }
},{
    collection:'income'
})

const Income = model('income',income)

export default Income