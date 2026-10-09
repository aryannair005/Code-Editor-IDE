import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"


import dotenv from "dotenv"
import proxy from "express-http-proxy"
import { protect } from "./middleware/protect.js"
import { getCurrentUser } from "./controllers/user.controller.js"
import { proxyWithHeader } from "./utils/proxyWithHeader.js"
dotenv.config()


const app = express()
app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(cookieParser())
app.use(morgan("dev"))


app.use("/api/auth",proxy(process.env.AUTH_SERVICE))
app.use("/api/project",protect,proxyWithHeader(process.env.PROJECT_SERVICE))
app.use("/api/file",protect,proxy(process.env.FILE_SERVICE))

app.get("/api/me",protect,getCurrentUser)


const port = process.env.PORT || 8000

app.get("/",(req,res)=>{
    return res.json({message:"/ route"})
})

app.listen(port,()=>{
    console.log(`Gateway is listening on PORT: ${port}`)
})
