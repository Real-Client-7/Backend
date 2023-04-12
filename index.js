import express from "express"
import morgan from "morgan"
import {config} from 'dotenv'
import connectDB from "./config/db.js"
import bodyParser from "body-parser"
import Appointment from "./routes/AppoitmentRoute.js"
config()
connectDB()


const app = express()
const port = process.env.PORT

app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use("/appoitment" , Appointment)

app.listen(port,(req , res)=>{
    console.log(`server listen om port ${port}`)
})