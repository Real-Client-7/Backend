import Expense from "../models/expenseModel.js"


export function createExpense(req, res, next) {
    try {
        let data = req.body
        let expenseData = new Expense(data)
        expenseData.save()
        res.status(200).json({ response: expenseData })
    } catch (err) {
        res.status(500).json({ err })
    }
}

export async function getAll(req, res, next) {
    try {
        const get = await Expense.find({})
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)
    }
}

export async function getExpense(req, res, next) {
    let id=req.params.id
    try {
        const get = await Expense.findById({_id:id})
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)
    }
}

export async function deleteExpense(req, res, next) {
    let id = req.params.id
    try {
        await Expense.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Expense deleted successfully" })
    } catch (err) {
        res.status(400).json(err)
    }
}

export async function updateExpense(req,res,next){
    let id = req.params.id
    let data = req.body
    try{
        await Expense.updateOne({_id:id , $set:data})
        let response = await Expense.findById({_id:id})
        res.status(200).json({message : "Updated successfully" , response })
    }catch(err){
        res.status(400).json(err)
    }
}


const expense = { createExpense, getExpense, deleteExpense, updateExpense ,getAll}

export default expense;