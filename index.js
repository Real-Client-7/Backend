import express from "express"
import morgan from "morgan"
import {config} from 'dotenv'
import connectDB from "./config/db.js"
import bodyParser from "body-parser"
import Appointment from "./routes/AppoitmentRoute.js"
import patientRouter from "./routes/patientRoutes.js"
import adminRouter from "./routes/adminRoute.js"

config()
connectDB()


const app = express()

const port = process.env.PORT || 5000;
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('tiny'))

app.use("/admin" ,adminRouter)
app.use("/appointment" ,Appointment)
app.use("/patient" ,patientRouter)


app.listen(port,(req , res)=>{
    console.log(`server listen on port ${port}`)
})


