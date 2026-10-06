import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
import router from "./routes/auth.route.js"
dotenv.config()



const app = express()
app.use(express.json())

app.use("/",router)

const port = process.env.PORT || 8001


app.get("/",(req,res)=>{
    return res.json({message:"auth route"})
})

app.listen(port,()=>{
    connectDb()
    console.log(`auth is listening on PORT: ${port}`)
})
