import type React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthContext"

type PrivateRouteProps = {
  children: React.ReactNode
  allowedRoles: ("admin" | "customer")[]
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

