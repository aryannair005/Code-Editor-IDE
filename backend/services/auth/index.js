import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
dotenv.config()



const app = express()
app.use(express.json())


const port = process.env.PORT || 8001


app.get("/",(req,res)=>{
    return res.json({message:"auth route"})
})

app.listen(port,()=>{
    connectDb()
    console.log(`auth is listening on PORT: ${port}`)
})
