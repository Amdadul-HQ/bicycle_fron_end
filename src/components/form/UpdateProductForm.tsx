/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from "react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useUpdateProductMutation } from "../../redux/features/admin/productManagement"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Upload, X } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2).max(100),
  brand: z.string().min(2).max(100),
  price: z.number().positive(),
  category: z.enum([
  "Mountain",
  "Road",
  "Hybrid",
  "Gravel",
  "Electric",
  "Cruiser",
  "BMX",
  "Folding",
  "City",
  "Touring",
  "Fat Tire",
  "Fixie",
]),
  description: z.string().min(10).max(1000),
  quantity: z.number().int().nonnegative(),
  inStock: z.boolean(),
})



interface UpdateProductFormProps {
    product: IProduct
    onSubmit: (data:boolean) => void
}
type IProduct = z.infer<typeof formSchema> & { _id: string; isDeleted: boolean; image:string }

export const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ product, onSubmit }) => {
  
        const [updateProduct] = useUpdateProductMutation()

        const { control,handleSubmit } = useForm<IProduct>({
          defaultValues: {
            _id:product._id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            category: product.category,
            description: product.description,
            quantity: product.quantity,
            inStock: product.inStock
          },
        })

        const handleRemoveImage = () => {
            setImagePreview(null)
            if (fileInputRef.current) {
              fileInputRef.current.value = ""
            }
          }
      
        const [imagePreview, setImagePreview] = useState<string | null>(product.image)
        const fileInputRef = useRef<HTMLInputElement>(null)
      
        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0]
          if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
              setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
          }
        }

  const onUpdateSubmit = async (data: z.infer<typeof formSchema>) => {
        const toastId = toast.loading("Updating...");

        const formData = new FormData();

        const image = fileInputRef?.current?.files?.[0]


        formData.append('data',JSON.stringify(data))

        formData.append('file',image as File);

         try {
           const res = await updateProduct({id:product._id,data:formData})
           if (res?.error) {
            //@ts-expect-error ignoring this error
             return toast.error(res?.error?.data?.message, { id: toastId });
           }
           toast.success("Product Updated successfully!!", { id: toastId });
           onSubmit(false)
         } catch (error) {
           if (error) {
             toast.error("something went wrong", { id: toastId });
             onSubmit(false)
           }
         }
  }

  return (
      <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="image">Image</Label>
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
            id="image"
            name="image"
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
        {!imagePreview && <p className="text-red-500 text-sm mt-1">Image is required</p>}
      </div>
      {/* name and brand */}
      <div className="flex gap-4">
        <div className="w-full">
          <Label htmlFor="name">Name</Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input {...field} id="name" />
                {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
              </>
            )}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="brand">Brand</Label>
          <Controller
            name="brand"
            control={control}
            rules={{ required: "Brand is required" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input {...field} id="brand" />
                {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
              </>
            )}
          />
        </div>
      </div>
      <div className="flex gap-x-4">
        <div className="w-full">
          <Label htmlFor="price">Price</Label>
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
              validate: (value) => !isNaN(value) || "Price must be a number",
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  {...field}
                  id="price"
                  type="number"
                  step="0.01"
                  onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
              </>
            )}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="quantity">Quantity</Label>
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Quantity is required",
              min: { value: 0, message: "Quantity must be positive" },
              validate: (value) => Number.isInteger(value) || "Quantity must be a whole number",
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  {...field}
                  id="quantity"
                  type="number"
                  onChange={(e) => field.onChange(Number.parseInt(e.target.value, 10))}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
              </>
            )}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mountain">Mountain</SelectItem>
                <SelectItem value="Road">Road</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="BMX">BMX</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Textarea {...field} id="description" />
              {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
            </>
          )}
        />
      </div>
        <Button type="submit">Update Product</Button>
      </form>
  )
}

