import Project from "../models/project.model.js"

export const createProject = async (req,res) =>{
    try{
        const  userId = req.headers["x-user-id"]
        if(!userId){
            return res.status(401).json({message:"userId is required"})
        }
        const {name,description} = req.body
        const project = await Project.create({
            owner:userId,
            name,
            description
        })

        return res.status(201).json(project)
    }catch(error){
        return res.status(500).json({message:`create project error : ${error}`})
    }
}

export const getProjects = async (req,res) =>{
    try{
        const userId = req.headers["x-user-id"]
        if(!userId){
            return res.status(401).json({message:"userId is required"})
        }

        const projects = await Project.find({
            owner:userId,
        }).sort({updatedAt:-1})

        return res.status(201).json(projects)
    }catch(error){
        return res.status(500).json({message:`Get all projects error : ${error}`})
    }
}


export const getProjectById = async(req,res) =>{
    try{
        const {id} = req.params
        const project = await Project.findById(id)
        if(!project){
            return res.status(404).json({message:"Project not found"})
        }
        project.lastOpenedAt = new Date()
        await project.save()

        return res.status(200).json(project)
    }catch(error){
        return res.status(500).json({message:`Get project by id error : ${error}`})
    }
}


export const getStarredProjects = async (req,res) =>{
    try{
        const userId = req.headers["x-user-id"]
        if(!userId){
            return res.status(401).json({message:"userId is required"})
        }

        const projects = await Project.find({
            owner:userId,
            starred:true
        }).sort({updatedAt:-1})

        return res.status(201).json(projects)
    }catch(error){
        return res.status(500).json({message:`Get all starred projects error : ${error}`})
    }
}

export const toggleStar =async (req,res) =>{
    try{
        const {id} = req.params
        const project = await Project.findById(id)
        if(!project){
            return res.status(404).json({message:"Project not found"})
        }
        project.starred = !project.starred
        await project.save()

        return res.status(200).json(project)
    }catch(error){
        return res.status(500).json({message:`toggle starred project error : ${error}`})
    }
}

export default deleteProject = async(req,res) =>{
    try{
        const {id} = req.params
        const project = await Project.findByIdAndDelete(id)
        
        if(!project){
            return res.status(404).json({message:"Project not found"})
        }

        return res.status(200).json(project)
    }catch(error){
        return res.status(500).json({message:`project delete error : ${error}`})
    }
}