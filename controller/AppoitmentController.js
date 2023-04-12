import Appointment from "../model/Appointment.js"


function AddAppoitment(req, res, next) {
    try {
        let data = req.body
        let appoitmentData = new Appointment(data)
        appoitmentData.save()
        res.status(200).json({ response: appoitmentData })
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function getAppoitment(req, res, next) {
    try {
        const get = await Appointment.find({})
        res.status(200).json({ response: get })
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deleteAppoitment(req, res, next) {
    let id = req.params.id
    try {
        await Appointment.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Appointment delete success" })
    } catch (err) {
        res.status(400).json(err)
    }
}

async function UpdateAppoitment(req,res,next){
    let id = req.params.id
    let data = req.body
    try{
        await Appointment.updateOne({_id:id , $set:data})
        let response = await Appointment.findById({_id:id})
        res.status(200).json({message : "Update sucss" , response })
    }catch(err){
        res.status(400).json(err)
    }
}

// const data= async()=>{
//      console.log( await Appointment.find({}))
//  }
//  data()

const appoitment = { AddAppoitment, getAppoitment, deleteAppoitment, UpdateAppoitment}

export default appoitment