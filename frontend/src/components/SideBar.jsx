import React from 'react'
import {motion} from "motion/react"

const SideBar = ({activeSession,setActiveSession}) => {
    const isActive = activeSession == "projects"?"projects":"starred"
  return (
    <div className='flex h-full w-64 shrink-0 flex-col border-r border-slate-200/70 bg-white/60 px-3 py-5 font-sans backdrop-blur-xl transition-colors duration-300 dark:border-white/6 dark:bg-white/2'>
      <div className='flex flex-col gap-1'>
        <motion.div
        whileTap={{scale:0.97}}
        >

        </motion.div>

        <motion.div 
        whileTap={{scale:0.97}}
        >

        </motion.div>
      </div>
    </div>
  )
}

export default SideBar
