import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Checkbox } from "../components/ui/checkbox"
import { useLoginMutation } from "../redux/features/auth/authApi"
import { useAppDispatch } from "../redux/hooks"
import { toast } from "sonner"
import { verifyToken } from "../utils/function/verifyToken"
import { setUser, type TUser } from "../redux/features/auth/authSlice"
import { Separator } from "../components/ui/separator"
import { Badge } from "../components/ui/badge"
import { User, Shield, Store } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().default(false),
})

// Demo credentials
const demoCredentials = {
  customer: {
    email: "customer@gmail.com",
    password: "customer@gmail.com",
    role: "Customer",
    icon: User,
    color: "bg-blue-500 hover:bg-blue-600",
  },
  admin: {
    email: "admin@gmail.com",
    password: "admin@gmail.com",
    role: "Admin",
    icon: Shield,
    color: "bg-red-500 hover:bg-red-600",
  },
  vendor: {
    email: "vendor@gmail.com",
    password: "vendor@gmail.com",
    role: "Vendor",
    icon: Store,
    color: "bg-green-500 hover:bg-green-600",
  },
}

export function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingRole, setLoadingRole] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const toastId = toast.loading("Logging in...")

    try {
      const userInfo = {
        email: values.email,
        password: values.password,
      }
      const res = await login(userInfo).unwrap()
      const user = verifyToken(res.data.token) as TUser
      dispatch(setUser({ user, token: res.data.token }))
      toast.success("Login Successful", { id: toastId, duration: 2000 })
      navigate("/")
    } catch (error) {
      //@ts-expect-error ignoring
      toast.error(error?.data?.message as string, { id: toastId, duration: 2000 })
      console.log(error)
    }
    setIsLoading(false)
  }

  const handleDemoLogin = async (role: keyof typeof demoCredentials) => {
    setLoadingRole(role)
    const credentials = demoCredentials[role]
    const toastId = toast.loading(`Logging in as ${credentials.role}...`)

    try {
      const userInfo = {
        email: credentials.email,
        password: credentials.password,
      }
      const res = await login(userInfo).unwrap()
      const user = verifyToken(res.data.token) as TUser
      dispatch(setUser({ user, token: res.data.token }))
      toast.success(`Logged in as ${credentials.role}`, { id: toastId, duration: 2000 })
      navigate("/")
    } catch (error) {
      //@ts-expect-error ignoring
      toast.error(error?.data?.message as string, { id: toastId, duration: 2000 })
      console.log(error)
    }
    setLoadingRole(null)
  }

  const fillCredentials = (role: keyof typeof demoCredentials) => {
    const credentials = demoCredentials[role]
    form.setValue("email", credentials.email)
    form.setValue("password", credentials.password)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Demo Login Section */}
          <div className="space-y-4">
            <div className="text-center">
              <Badge variant="outline" className="mb-3">
                Quick Demo Login
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(demoCredentials).map(([key, cred]) => {
                const IconComponent = cred.icon
                const isCurrentlyLoading = loadingRole === key
                return (
                  <div key={key} className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => fillCredentials(key as keyof typeof demoCredentials)}
                      disabled={isLoading || loadingRole !== null}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      Fill {cred.role}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className={`${cred.color} text-white`}
                      onClick={() => handleDemoLogin(key as keyof typeof demoCredentials)}
                      disabled={isLoading || loadingRole !== null}
                    >
                      {isCurrentlyLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Manual Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                        disabled={isLoading || loadingRole !== null}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        disabled={isLoading || loadingRole !== null}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading || loadingRole !== null}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Remember me</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading || loadingRole !== null}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            Forgot your password?
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
