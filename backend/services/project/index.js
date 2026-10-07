import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js"
import router from "./routes/project.route.js"

dotenv.config()



const app = express()
app.use(express.json())


const port = process.env.PORT || 8002

app.use("/",router)

app.get("/",(req,res)=>{
    return res.json({message:"Project route"})
})

app.listen(port,()=>{
    connectDb()
    console.log(`project is listening on PORT: ${port}`)
})
