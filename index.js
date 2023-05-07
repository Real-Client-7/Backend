import express from "express"
import morgan from "morgan"
import {config} from 'dotenv'
import connectDB from "./config/db.js"
import bodyParser from "body-parser"
import Appointment from "./routes/AppoitmentRoute.js"
import patientRouter from "./routes/patientRoutes.js"
import Treatment from "./routes/treatmentRoute.js"
import cors from "cors"


import Debt from "./routes/debtRoute.js"
import Expense from "./routes/expenseRoute.js"


import bill from "./routes/billRoute.js"


import adminRouter from "./routes/adminRoute.js"
import income from "./routes/incomeRoute.js"

config()
connectDB()


const app = express()

const port = process.env.PORT || 5000;
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('tiny'))
app.use(cors({
  origin:["http://localhost:4600" , "https://bassam-monla-ycid.onrender.com"],
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}));
  app.use("/admin" ,adminRouter)
app.use("/appointment" ,Appointment)
app.use("/patient" ,patientRouter)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use("/debt" ,Debt)
app.use("/expense" ,Expense)

app.use("/bill" ,bill)
app.use("/income" ,income)

app.use("/treatments", Treatment)

app.listen(port,(req , res)=>{
    console.log(`server listen on port ${port}`)
})


