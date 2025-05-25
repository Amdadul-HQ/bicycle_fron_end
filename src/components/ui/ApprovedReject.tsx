import { useState } from "react"
import { Check, X, AlertTriangle, User, Phone, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Badge } from "./badge"
import { Label } from "./label"
import { Textarea } from "./textarea"
import { Button } from "./button"

interface StoreType {
  _id: string
  shopName: string
  shopAddress: string
  phone: string
  profileImage: string
  status: string
  user: {
    _id: string
    name: string
    email: string
  }
  storeProducts: string[]
  totalIncome: number
  createdAt: string
}

interface ApproveModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (storeId: string, message?: string) => void
  store: StoreType | null
  isLoading?: boolean
}

interface RejectModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (storeId: string, reason: string) => void
  store: StoreType | null
  isLoading?: boolean
}

export function ApproveModal({ isOpen, onClose, onConfirm, store, isLoading = false }: ApproveModalProps) {
  const [message, setMessage] = useState("")

  const handleConfirm = () => {
    if (store) {
      onConfirm(store._id, message)
      setMessage("")
    }
  }

  const handleClose = () => {
    setMessage("")
    onClose()
  }

  if (!store) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            Approve Store Application
          </DialogTitle>
          <DialogDescription>
            You are about to approve this store application. The store will become active and the owner will be
            notified.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Store Information */}
          <div className="p-4 bg-gray-50 rounded-lg space-y-3 text-black">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={store.profileImage || "/placeholder.svg"} alt={store.shopName} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{store.shopName}</h3>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{store.user.name}</span>
                <span className="text-gray-500">({store.user.email})</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{store.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{store.shopAddress}</span>
              </div>
            </div>
          </div>

          {/* Optional Message */}
          <div className="space-y-2">
            <Label htmlFor="approval-message">Approval Message (Optional)</Label>
            <Textarea
              id="approval-message"
              placeholder="Add a welcome message or any instructions for the store owner..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Approving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Approve Store
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function RejectModal({ isOpen, onClose, onConfirm, store, isLoading = false }: RejectModalProps) {
  const [reason, setReason] = useState("")
  const [selectedReason, setSelectedReason] = useState("")

  const predefinedReasons = [
    "Incomplete documentation",
    "Invalid business information",
    "Suspicious activity detected",
    "Does not meet quality standards",
    "Duplicate application",
    "Policy violation",
    "Other (specify below)",
  ]

  const handleConfirm = () => {
    if (store && (selectedReason || reason.trim())) {
      const finalReason = selectedReason === "Other (specify below)" ? reason : selectedReason
      onConfirm(store._id, finalReason)
      setReason("")
      setSelectedReason("")
    }
  }

  const handleClose = () => {
    setReason("")
    setSelectedReason("")
    onClose()
  }

  const isFormValid = selectedReason && (selectedReason !== "Other (specify below)" || reason.trim())

  if (!store) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
              <X className="w-5 h-5 text-red-600" />
            </div>
            Reject Store Application
          </DialogTitle>
          <DialogDescription>
            You are about to reject this store application. Please provide a reason for rejection.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Store Information */}
          <div className="p-4 bg-gray-50 rounded-lg space-y-3 text-black">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={store.profileImage || "/placeholder.svg"} alt={store.shopName} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{store.shopName}</h3>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{store.user.name}</span>
                <span className="text-gray-500">({store.user.email})</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{store.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{store.shopAddress}</span>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-800">Important</p>
              <p className="text-amber-700">
                The store owner will be notified of this rejection and the reason provided.
              </p>
            </div>
          </div>

          {/* Rejection Reason */}
          <div className="space-y-3">
            <Label>Reason for Rejection *</Label>
            <div className="space-y-2">
              {predefinedReasons.map((reasonOption) => (
                <label key={reasonOption} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rejection-reason"
                    value={reasonOption}
                    checked={selectedReason === reasonOption}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="text-red-600"
                  />
                  <span className="text-sm">{reasonOption}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Custom Reason */}
          {selectedReason === "Other (specify below)" && (
            <div className="space-y-2">
              <Label htmlFor="custom-reason">Please specify the reason</Label>
              <Textarea
                id="custom-reason"
                placeholder="Provide detailed reason for rejection..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                required
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={!isFormValid || isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Rejecting...
              </>
            ) : (
              <>
                <X className="w-4 h-4 mr-2" />
                Reject Store
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
