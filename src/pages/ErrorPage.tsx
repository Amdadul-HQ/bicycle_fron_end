import type React from "react"
import { useNavigate, useRouteError } from "react-router-dom"
import Lottie from "lottie-react"
import { Button } from "../components/ui/button";
import errorAnimation from "../assets/error.json"

interface RouteError {
  statusText?: string
  message?: string
}

export const ErrorPage: React.FC = () => {
  const error = useRouteError() as RouteError
  const navigate = useNavigate()

  const errorMessage = error?.statusText || error?.message || "An unexpected error has occurred."

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-64 h-64 mb-8">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center">Oops!</h1>
      <p className="text-xl mb-8 text-center text-muted-foreground">{errorMessage}</p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        <Button variant="outline" onClick={() => navigate("/")}>
          Return to Home
        </Button>
      </div>
    </div>
  )
}

