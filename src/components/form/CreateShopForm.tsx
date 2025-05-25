
import { useForm } from "react-hook-form"
import { Loader2, Store, Upload, X } from "lucide-react"
import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Alert, AlertDescription } from "../ui/alert"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useApplyForVendorMutation } from "../../redux/features/user/customerApi"
import { toast } from "sonner"

// Your validation schema (extracted the body part for the form)
interface IStore {
  shopName: string,
  shopAddress: string,
  phone: string,
  profileImage: string,
}

export default function CreateStoreForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [applyForVendor] = useApplyForVendorMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<IStore>({
    defaultValues: {
        shopName:"",
        shopAddress:"",
        phone:"",
        profileImage:"",
        },
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setImagePreview(reader.result as string)
            setValue("profileImage", reader.result as string)
          }
          reader.readAsDataURL(file)
        }
      }
    
  const handleRemoveImage = () => {
    setImagePreview(null)
    setValue("profileImage", "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
  
  
  const watchImage = watch("profileImage")


  const onSubmit = async (data: IStore) => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)
    const toastId = toast.loading("Adding...");

        const formData = new FormData();

        const image = fileInputRef?.current?.files?.[0]
        console.log(image)


        formData.append('data',JSON.stringify(data))

        formData.append('file',image as File);

        try {
         const res = await applyForVendor(formData)
         console.log(res)
         if (res?.error) {
          //@ts-expect-error ignoring this error
           return toast.error(res?.error?.data?.message, { id: toastId });
         }
         toast.success("Product Added successfully!!", { id: toastId });
          //  onSubmit(false)
         } catch (error) {
           if (error) {
             toast.error("something went wrong", { id: toastId });
            //  onSubmit(false)
            }
          }
        finally {
          setIsSubmitting(false)
        }
                  


    // try {
      // Simulate API call - replace with your actual API endpoint
    //   const response = await fetch("/api/stores", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ body: data }),
    //   })

    //   if (!response.ok) {
    //     throw new Error("Failed to create store")
    //   }

    //   const result = await response.json()
    //   console.log("Store created successfully:", result)

    //   setSubmitSuccess(true)
    //   reset() // Clear the form
    // } catch (error) {
    //   setSubmitError(error instanceof Error ? error.message : "An error occurred")
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Store className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Create New Store</CardTitle>
          <CardDescription>Enter your store details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          {submitSuccess && (
            <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
              <AlertDescription>Store created successfully! You can now start managing your shop.</AlertDescription>
            </Alert>
          )}

          {submitError && (
            <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                id="shopName"
                type="text"
                placeholder="Enter your shop name"
                {...register("shopName")}
                className={errors.shopName ? "border-red-500" : ""}
              />
              {errors.shopName && <p className="text-sm text-red-600">{errors.shopName.message}</p>}
            </div>
            <div>
                <Label htmlFor="profileImage">Store Image</Label>
                <div className="mt-2 flex flex-col items-center gap-4">
                  <div className="relative flex items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                    {imagePreview ? (
                      <>
                        <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <span className="mt-2 block text-sm font-medium text-gray-900">Upload image</span>
                      </div>
                    )}
                  </div>
                  <Input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Select Image
                  </Button>
                </div>
                {!watchImage && <p className="text-red-500 text-sm mt-1">Image is required</p>}
                  </div>

            <div className="space-y-2">
              <Label htmlFor="shopAddress">Shop Address</Label>
              <Input
                id="shopAddress"
                type="text"
                placeholder="Enter your shop address"
                {...register("shopAddress")}
                className={errors.shopAddress ? "border-red-500" : ""}
              />
              {errors.shopAddress && <p className="text-sm text-red-600">{errors.shopAddress.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number (e.g., +1 1234567890)"
                {...register("phone")}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
              <p className="text-xs text-muted-foreground">Format: +1 1234567890 or 1234567890</p>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Store...
                </>
              ) : (
                "Create Store"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
