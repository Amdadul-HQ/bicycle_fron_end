import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { useSignupMutation } from "../redux/features/auth/authApi"
import { useAppDispatch } from "../redux/hooks"
import { toast } from "sonner"
import { verifyToken } from "../utils/function/verifyToken"
import { setUser, TUser } from "../redux/features/auth/authSlice"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export function SignUpPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch();
  const [signup] = useSignupMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const toastId = toast.loading("Sign Up..,")
    // Here you would typically send the form data to your backend
    try{
    const userInfo = {
      name:values.name,
      email:values.email,
      password:values.password
    }
    const res = await signup(userInfo).unwrap();
    const user = verifyToken(res.data.token) as TUser;
    dispatch(setUser({user,token:res.data.token}));
    toast.success("Sign Up Successful",{id:toastId,duration:2000});
    navigate('/')
    }catch(error){{
      toast.error("Something want wrong",{id:toastId,duration:2000})
      console.log(error);
    }}
    setIsLoading(false)
    // Redirect to home page or dashboard after successful login
    navigate('/')
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create an account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
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
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

