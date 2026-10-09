import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice.js"
import projectReducer from "./projectSlice"

export const store = configureStore({
    reducer:{
        user:userReducer,
        project:projectReducer
    },
})