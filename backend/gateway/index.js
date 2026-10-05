import express from "express"


import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 8000
const app = express()

app.get("/",(req,res)=>{
    return res.json({message:"/ route"})
})

app.listen(port,()=>{
    console.log(`Gateway is listening on PORT: ${port}`)
})
