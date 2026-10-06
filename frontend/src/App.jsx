import React from 'react'
import {auth,googleProvider} from "../firebase.js"
import { signInWithPopup } from 'firebase/auth'
import { login } from './features/login.js'

const App = () => {
  const handleLogin = async()=>{
    const result = await signInWithPopup(auth,googleProvider)
    const token = await result.user.getIdToken()
    const data = await login(token)
    console.log(data)
  }
  return (
    <div>
      <button onClick={handleLogin}>Continue with google</button>
    </div>
  )
}

export default App
