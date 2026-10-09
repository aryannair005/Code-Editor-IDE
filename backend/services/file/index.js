import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"

dotenv.config()



const app = express()
app.use(express.json())


const port = process.env.PORT || 8003


app.get("/",(req,res)=>{
    return res.json({message:"File route"})
})

app.listen(port,()=>{
    connectDb()
    console.log(`File is listening on PORT: ${port}`)
})
