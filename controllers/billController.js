import Bill from "../models/billModel.js"

function addBill (req,res){
    try{
    let data = req.body
    const bill = new Bill(data)
    bill.save()
    res.status(200).json({message : "creat bill successfully" , bill})
    }catch(err){
        res.status(404).json({err})
    }
}

async function getBill (req , res){
    try{
        const data = await Bill.find({})
        res.status(200).json({data})
    }catch(err){
        res.status(404).json({err})
    }
}

async function getBillById (req , res){
    const id = req.params.id;
    try{
        const data = await Bill.findById(id);
        res.status(200).json({ data });
    }catch(err){
        res.status(404).json({ err });
    }
}


async function deleteBill (req,res){
    let {id} = req.params
    try{
        await Bill.findByIdAndDelete({_id:id})
        res.status(200).json({message:"Bill deleted successfully"})
    }catch(err){
        res.status(404).json({err})
    }
}

async function UpdateBill (req ,res){
    let {id}= req.params
    let data = req.body
    try{
        const dataUpdate = await Bill.findByIdAndUpdate({_id:id} , {$set:data})
        res.status(200).json({message : "Bill update successfully" , dataUpdate})
    }catch(err){
        res.status(404).json({err})
    }
}

// const data =async ()=>{
//    console.log( await Bill.find({}))
// }
// data()

const bill = {addBill,getBill,getBillById,deleteBill,UpdateBill}

export default bill