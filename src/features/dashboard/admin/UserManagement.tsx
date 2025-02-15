import type React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"
import { useBlockUserMutation, useGetAllUserQuery } from "../../../redux/features/admin/userManagement"
import { BlockUserModal } from "../../../components/ui/BlockUserModal"
import { toast } from "sonner"

interface User {
  _id: string
  name: string
  email: string
  status: string
}

export const UserManagement: React.FC = () => {
  const { data, isLoading, isError, error } = useGetAllUserQuery(undefined);
  const [blockUser]= useBlockUserMutation()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : "An error occurred"}</div>
  }

  const handleBlockUser = (user: User) => {
    setSelectedUser(user)
  }

  const handleConfirmBlock =async () => {
    // Implement the logic to block the user=
    const toastId = toast.loading("Blocking...");
    try{
       const res = await blockUser({id:selectedUser?._id})
       if(res.data.success){
        setSelectedUser(null)
        toast.success("User Blocked!!!",{id:toastId})
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error:any){
      toast.error(error.message?? 'User Blocked Failed!!',{id:toastId})
    }
    setSelectedUser(null)
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((user: User) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleBlockUser(user)}
                  variant={user.status === "active" ? "destructive" : "secondary"}
                >
                  {user.status === "active" ? "Block" : "Unblock"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BlockUserModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        onConfirm={handleConfirmBlock}
        userName={selectedUser?.name || ""}
      />
    </div>
  )
}

