import React, { useEffect, useState } from 'react'
import TopBar from '../components/TopBar'
import ActiveBar from '../components/ActiveBar'
import { AnimatePresence } from 'motion/react'
import Explorer from '../components/Explorer'
import {useParams} from "react-router-dom"
import { getProjectById } from '../features/project'
import { useDispatch } from 'react-redux'
import { setCurrentProject } from '../redux/projectSlice'

const ProjectPage = () => {
    const {id} = useParams( )
    const [showExplorer,setShowExplorer] = useState(false)
    const [showAiChat,setShowAiChat] = useState(false)
    const [showTerminal,setShowTerminal] = useState(false)
    const [showPreview,setShowPreview] = useState(false)
    const [tree,setTree] = useState([])
    const dispatch= useDispatch()
    const  handleGetProject =async()=>{
        const  data = await getProjectById(id)
        dispatch(setCurrentProject(data))
    }
    const loadTree = async () =>{
        const data = await getTree(id)
        setTree(data)
    }
    useEffect(()=>{
        handleGetProject()
        loadTree()
    },[id])
  return (
    <div className='relative flex h-screen flex-col overflow-hidden bg-[#0a0a0c]'>
        <div className='pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-sky-500/10 blur-[140px]'/>
        <div className='pointer-events-none absolute -top-20 right-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]'/>
        <TopBar showPreview={showPreview} setShowPreview={setShowPreview}/>
        <div className='flex flex-1 overflow-hidden'>
            <ActiveBar showAiChat={showAiChat} showExplorer={showExplorer} showTerminal={showTerminal} setShowAiChat={setShowAiChat} setShowTerminal={setShowTerminal} setShowExplorer={setShowExplorer}/>


            <AnimatePresence initial={false}>
                {showExplorer && (
                    <Explorer projectId={id} tree={tree} reloadTree={loadTree}/>
                )}
            </AnimatePresence>
        </div>
    </div>
  )
}

export default ProjectPage
