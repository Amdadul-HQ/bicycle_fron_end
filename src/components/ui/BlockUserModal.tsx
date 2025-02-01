import type React from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog"
import { Button } from "./button"

interface BlockUserModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  userName: string
}

export const BlockUserModal: React.FC<BlockUserModalProps> = ({ isOpen, onClose, onConfirm, userName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Block User</DialogTitle>
          <DialogDescription>
            Are you sure you want to block {userName}? This action can be undone later.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Block User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

