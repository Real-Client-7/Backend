import { Schema, model } from "mongoose";

const treatment = new Schema({
    type: {
        type:String ,
        require:true,
    },
    nbr_of_tooth:{
        type:Number,
        require:true,
    }
},{
    collection:"Treatment"
}) 
const Treatment = model('Treatment',treatment)
export default Treatment;