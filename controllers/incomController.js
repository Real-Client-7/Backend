import Income from "../models/incomeModel.js";


function addIncome (req ,res){
    try{
    const data = req.body
    const income = new Income(data)
    income.save()
    res.status(200).json({message:"incom create successfully" , income})
    }catch(err){
    res.status(404).json({err})
    }
}

async function getIncome (req ,res){
    try{
        const data = await Income.find({})
        res.status(200).json({data})
    }catch(err){
        res.status(404).json({err})
    }
}

async function getIncomeById (req ,res){
    let id = req.params.id
    try{
        const data = await Income.findById({_id:id})
        res.status(200).json({data})
    }catch(err){
        res.status(404).json({err})
    }
}

async function deleteIncome (req,res){
    let id = req.params.id
    try{
        const data = await Income.findByIdAndDelete({_id:id})
        res.status(200).json({ message:"income deleted successfully" })
    }catch(err){
        res.status(404).json({err})
    }
} 

async function updateIncome (req ,res){
    let id = req.params.id
    let body = req.body 
    try{
        const data = await Income.findByIdAndUpdate({_id:id},{$set:body})
        res.status(200).json({message:'Income Updated successfully' , data})
    }catch(err){
        res.status(404).json({err})
    }
}

const income = {addIncome,getIncome,getIncomeById,deleteIncome,updateIncome}

export default income