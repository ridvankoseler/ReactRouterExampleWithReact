import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = () => {
    

    //?Aslında bu bilgi Global State'den okuncak
const isAuthenticated = false



  return (
    isAuthenticated ? <Outlet/> : Navigate('/')
  )
}

export default PrivateRouter