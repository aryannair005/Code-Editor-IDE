import { signInWithPopup } from 'firebase/auth'
import {FcGoogle} from "react-icons/fc"
import { auth, googleProvider } from '../../firebase.js'
import { login } from '../features/login.js'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'
import NavBar from '../components/NavBar.jsx'
import SideBar from '../components/SideBar.jsx'

const Dashboard = () => {
    const [loading,setLoading] = useState(false)
    const [activeSession,setActiveSession] = useState("projects")
    const dispatch = useDispatch()

    const {userData} = useSelector(state=>state.user)
    const handleLogin = async()=>{
        setLoading(true)
        const result = await signInWithPopup(auth,googleProvider)
        const token = await result.user.getIdToken()
        const data = await login(token)
        dispatch(setUserData(data))
        setLoading(false)
        console.log(data)
    }
    if(!userData){
      return (
        <div className='relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 transition-colors duration-300 dark:bg-[#07070c]'>
          <div className='pointer-events-none absolute -top-32 left-1/2 hidden h-150 w-150 -translate-x-1/2 rounded-full bg-white/5 blur-[120px] dark:block'/>

          <div className='relative w-full max-w-sm rounded-2xl border border-slate-200/70 bg-white/80 p-8 text-center shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:border-white/8 dark:bg-white/3 dark:shadow-black/40'>
            <div className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg shadow-black/5 dark:border-transparent'>
                <span className='text-lg font-bold text-slate-900'>AI</span>
            </div>
            <h2 className='mb-2 text-xl font-bold text-slate-900 dark:text-white'>Welcome to VertexAI</h2>
            <p className='mb-6 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400'>Sign in to access your projects and continue building.</p>
            <button 
            onClick={handleLogin}
            disabled={loading}
            className='flex w-full items-center justify-center gap-3  rounded-lg border border-slate-200 bg-white py-2.5 text-[13.5px] font-medium text-slate-800 shadow-sm transition-colors duration-150 hover:bg-slate-50 disabled:opacity-70 dark:border-transparent dark:bg-white dark:hover:bg-slate-100'>
                <FcGoogle/>
                {loading?"Signing in...":"Continue with Google"}
            </button>
            <p className='mt-5 text-[11px] text-slate-400 dark:text-slate-600'>By continuing you agree to our Terms & Privacy Policy.</p>
          </div>
        </div>
      )
    }
    return (
    <div className='relative flex h-screen w-full flex-col overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-[#07070c]'>
      <div className='pointer-events-none absolute -top-40 left-1/3 hidden h-175 w-175 rounded-full bg-white/4 blur-[140px] dark:block'/>

      <div className='pointer-events-none absolute right-0 top-1/3 hidden h-125 w-125 rounded-full bg-white/3 blur-[130px] dark:block'/>

      <div className='relative flex min-h-0 flex-1 flex-col'>
        <NavBar/>
        <div className='flex min-h-0 flex-1'>
          <SideBar activeSession={activeSession} setActiveSession = {setActiveSession}/>
        </div>
      </div>
    </div>
    )
  
}

export default Dashboard
