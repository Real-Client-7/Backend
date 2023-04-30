import Debt from "../models/debtModel.js"


export function createDebt(req, res, next) {
    try {
        let data = req.body
        let debtData = new Debt(data)
        debtData.save()
        res.status(200).json({ response: debtData })
    } catch (err) {
        res.status(500).json({ err })
    }
}

export async function getAll(req, res, next) {
    try {
        const get = await Debt.find({})
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)
    }
}

export async function getDebt(req, res, next) {
    let id=req.params.id
    try {
        const get = await Debt.findById({_id:id})
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)
    }
}

export async function deleteDebt(req, res, next) {
    let id = req.params.id
    try {
        await Debt.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Debt deleted successfully" })
    } catch (err) {
        res.status(400).json(err)
    }
}

export async function updateDebt(req,res,next){
    let id = req.params.id
    let data = req.body
    try{
        await Debt.updateOne({_id:id} , {$set:data})
        let response = await Debt.findById({_id:id})
        res.status(200).json({message : "Updated sucssfully" , response })
    }catch(err){
        res.status(400).json(err)
    }
}


const debt = { createDebt, getDebt, deleteDebt, updateDebt ,getAll}

export default debt;