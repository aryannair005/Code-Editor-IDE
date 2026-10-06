import React from 'react'
import {auth,googleProvider} from "../firebase.js"
import { signInWithPopup } from 'firebase/auth'

const App = () => {
  const handleLogin = async()=>{
    const data = await signInWithPopup(auth,googleProvider)
    const token = await data.user.getIdToken()
    console.log(data)
  }
  return (
    <div>
      <button onClick={handleLogin}>Continue with google</button>
    </div>
  )
}

export default App
