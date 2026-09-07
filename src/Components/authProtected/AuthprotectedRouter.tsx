import React from 'react'
import { Navigate } from 'react-router'

export default function AuthprotectedRouter({ children }: { children: React.ReactNode }) {
if (localStorage.getItem("userToken")) {
 return <Navigate to="/posts" />
}
return children;
}
