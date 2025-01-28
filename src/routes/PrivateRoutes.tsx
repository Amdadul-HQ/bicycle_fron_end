import type React from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import { selectCurrentUser } from "../redux/features/auth/authSlice"

type PrivateRouteProps = {
  children: React.ReactNode
  allowedRoles: ("admin"| "customer")[]
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user?.role as "admin" | "customer")) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

