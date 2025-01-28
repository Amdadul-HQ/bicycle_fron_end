import type React from "react"
import { useNavigate } from "react-router-dom"
import Lottie from "lottie-react"
import unauthorizedAnimation from "../assets/unauthorized.json"
import { Button } from "../components/ui/button";

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-64 h-64 mb-8">
        <Lottie animationData={unauthorizedAnimation} loop={true} />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center">Unauthorized Access</h1>
      <p className="text-xl mb-8 text-center text-muted-foreground">
        Sorry, you don't have permission to access this page.
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button variant="outline" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  )
}

