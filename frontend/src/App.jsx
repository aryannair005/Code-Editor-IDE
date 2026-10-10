import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { me } from './features/me.js'
import { setUserData } from './redux/userSlice.js'
import ProjectPage from './pages/ProjectPage.jsx'

const App = () => {
  const dispatch =useDispatch()
  useEffect(()=>{
    const fetch = async () =>{
      const data = await me()
      dispatch(setUserData(data))
    }
    fetch()
  },[])
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/project/:id' element={<ProjectPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
