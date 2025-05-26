/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useUpdateStoreMutation } from "../../redux/features/vendor/vendorApi"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Loader2, Upload, X } from "lucide-react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Alert, AlertDescription } from "../ui/alert"
import { useForm } from "react-hook-form"

interface IStoreUpdate {
  shopName: string
  shopAddress: string
  phone: string
  profileImage: string
}

interface StoreEditDialogProps {
  store: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onStoreUpdated: () => void
}

export function StoreEditDialog({ store, open, onOpenChange, onStoreUpdated }: StoreEditDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [updateStore] = useUpdateStoreMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<IStoreUpdate>({
    defaultValues: {
      shopName: "",
      shopAddress: "",
      phone: "",
      profileImage: "",
    },
  })

  watch("profileImage")

  // Initialize form with store data when dialog opens
  useEffect(() => {
    if (open && store) {
      reset({
        shopName: store.shopName || "",
        shopAddress: store.shopAddress || "",
        phone: store.phone || "",
        profileImage: store.profileImage || "",
      })
      setImagePreview(store.profileImage || null)
      setSubmitError(null)
    }
  }, [open, store, reset])

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

  const onSubmit = async (data: IStoreUpdate) => {
    setIsSubmitting(true)
    setSubmitError(null)
    const toastId = toast.loading("Updating store...")

    try {
      const formData = new FormData()
      const image = fileInputRef?.current?.files?.[0]

      // Append data as JSON string (following the same format as create form)
      formData.append("data", JSON.stringify(data))

      // Append file if a new image was selected
      if (image) {
        formData.append("file", image as File)
      }

      const res = await updateStore({
        id: store._id,
        data: formData,
      })

      console.log(res)

      if (res?.error) {
        //@ts-expect-error ignoring this error
        return toast.error(res?.error?.data?.message || "Failed to update store", { id: toastId })
      }

      toast.success("Store updated successfully!", { id: toastId })
      onStoreUpdated()
      onOpenChange(false)
    } catch (error) {
      console.error("Update error:", error)
      toast.error("Something went wrong", { id: toastId })
      setSubmitError("Failed to update store. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Store</DialogTitle>
          <DialogDescription>Update your store information here.</DialogDescription>
        </DialogHeader>

        {submitError && (
          <Alert className="border-red-200 bg-red-50 text-red-800">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Shop Name */}
          <div className="space-y-2">
            <Label htmlFor="shopName">Shop Name</Label>
            <Input
              id="shopName"
              type="text"
              placeholder="Enter your shop name"
              {...register("shopName", {
                required: "Shop name is required",
                minLength: {
                  value: 2,
                  message: "Shop name must be at least 2 characters",
                },
              })}
              className={errors.shopName ? "border-red-500" : ""}
            />
            {errors.shopName && <p className="text-sm text-red-600">{errors.shopName.message}</p>}
          </div>

          {/* Store Image */}
          <div className="space-y-2">
            <Label htmlFor="profileImage">Store Image</Label>
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
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
                {imagePreview ? "Change Image" : "Select Image"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Upload a new image or keep the existing one</p>
          </div>

          {/* Shop Address */}
          <div className="space-y-2">
            <Label htmlFor="shopAddress">Shop Address</Label>
            <Textarea
              id="shopAddress"
              placeholder="Enter your shop address"
              rows={3}
              {...register("shopAddress", {
                required: "Shop address is required",
                minLength: {
                  value: 10,
                  message: "Address must be at least 10 characters",
                },
              })}
              className={errors.shopAddress ? "border-red-500" : ""}
            />
            {errors.shopAddress && <p className="text-sm text-red-600">{errors.shopAddress.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number (e.g., +1 1234567890)"
              {...register("phone", {
                required: "Phone number is required",
              })}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
            <p className="text-xs text-muted-foreground">Format: +1 1234567890 or 1234567890</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Store...
                </>
              ) : (
                "Update Store"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


