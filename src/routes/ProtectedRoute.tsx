import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import type { PropsWithChildren } from "react"

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute

