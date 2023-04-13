import express from "express"
import morgan from "morgan"
import {config} from 'dotenv'
import connectDB from "./config/db.js"
import bodyParser from "body-parser"
import Appointment from "./routes/AppoitmentRoute.js"
import Debt from "./routes/debtRoute.js"
import Expense from "./routes/expenseRoute.js"

import adminRouter from "./routes/adminRoute.js"

config()
connectDB()


const app = express()

const port = process.env.PORT || 5000;
app.use(express.json())
app.use(morgan('tiny'))

app.use("/admin" ,adminRouter)
app.use("/appointment" ,Appointment)
app.use("/debt" ,Debt)
app.use("/expense" ,Expense)

app.listen(port,(req , res)=>{
    console.log(`server listen on port ${port}`)
})


