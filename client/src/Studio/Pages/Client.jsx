

import { useState } from "react"
import { Search, Plus, Edit, Trash2, MoreHorizontal, X } from "lucide-react"
// import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FadeInUp } from "@/components/ui/FadeInUp"
import { ClientTableCard } from "../components/Clients/ClientTableCard"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useEffect } from "react"

import { AddClientModal } from "../components/Clients/AddClientModel"
import { EditClientModal } from "../components/Clients/EditClientModel"
import { DeleteClientDialog } from "../components/Clients/DeleteClientDialog"




const mockClients = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    company: "Johnson Events",
    dateCreated: "2024-01-15",
    eventName: "Wedding Photography",
    eventDate: "2024-03-20",
    eventType: "Wedding",
    photographers: 2,
    budget: 3500,
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Chen",
    email: "m.chen@techcorp.com",
    phone: "+1 (555) 987-6543",
    company: "TechCorp Inc",
    dateCreated: "2024-01-10",
    eventName: "Corporate Headshots",
    eventDate: "2024-02-15",
    eventType: "Corporate",
    photographers: 1,
    budget: 1200,
  },
  {
    id: "3",
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.r@gmail.com",
    phone: "+1 (555) 456-7890",
    dateCreated: "2024-01-08",
    eventName: "Family Portrait Session",
    eventDate: "2024-02-28",
    eventType: "Portrait",
    photographers: 1,
    budget: 800,
  },
]

// Add Client Modal Component


// function AddClientModal({ open, onOpenChange, onSubmit }) {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//     eventName: "",
//     eventDate: "",
//     eventType: "",
//     photographers: 1,
//     budget: "",
//   })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onSubmit({
//       ...formData,
//       photographers: Number(formData.photographers),
//       budget: formData.budget ? Number(formData.budget) : undefined,
//     })
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       company: "",
//       eventName: "",
//       eventDate: "",
//       eventType: "",
//       photographers: 1,
//       budget: "",
//     })
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] bg-[#1C1124] border-[#2A133F]">
//       <DialogClose asChild>
//       <button
//         className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
//         aria-label="Close"
//       >
//         <X className="h-5 w-5" />
//       </button>
//     </DialogClose>
//         <DialogHeader>
//           <DialogTitle className="text-[#A259FF] text-xl">Add New Client</DialogTitle>
//           <DialogDescription className="text-gray-400">
//             Enter the client details to add them to your database.
//           </DialogDescription>
    
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="firstName" className="text-[#F1F1F1]">
//                   First Name *
//                 </Label>
//                 <Input
//                   id="firstName"
//                   value={formData.firstName}
//                   onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                   required
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="lastName" className="text-[#F1F1F1]">
//                   Last Name *
//                 </Label>
//                 <Input
//                   id="lastName"
//                   value={formData.lastName}
//                   onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                   required
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-[#F1F1F1]">
//                 Email *
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//                 className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="phone" className="text-[#F1F1F1]">
//                   Phone Number *
//                 </Label>
//                 <Input
//                   id="phone"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   required
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="company" className="text-[#F1F1F1]">
//                   Company
//                 </Label>
//                 <Input
//                   id="company"
//                   value={formData.company}
//                   onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="eventName" className="text-[#F1F1F1]">
//                 Event Name
//               </Label>
//               <Input
//                 id="eventName"
//                 value={formData.eventName}
//                 onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
//                 className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="eventDate" className="text-[#F1F1F1]">
//                   Event Date
//                 </Label>
//                 <Input
//                   id="eventDate"
//                   type="date"
//                   value={formData.eventDate}
//                   onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="eventType" className="text-[#F1F1F1]">
//                   Event Type
//                 </Label>
//                 <Select
//                   value={formData.eventType}
//                   onValueChange={(value) => setFormData({ ...formData, eventType: value })}
//                 >
//                   <SelectTrigger className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1]">
//                     <SelectValue placeholder="Select type" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-[#1C1124] border-[#2A133F]">
//                     <SelectItem value="Wedding" className="text-[#F1F1F1] focus:bg-[#2A133F]">
//                       Wedding
//                     </SelectItem>
//                     <SelectItem value="Corporate" className="text-[#F1F1F1] focus:bg-[#2A133F]">
//                       Corporate
//                     </SelectItem>
//                     <SelectItem value="Portrait" className="text-[#F1F1F1] focus:bg-[#2A133F]">
//                       Portrait
//                     </SelectItem>
//                     <SelectItem value="Event" className="text-[#F1F1F1] focus:bg-[#2A133F]">
//                       Event
//                     </SelectItem>
//                     <SelectItem value="Product" className="text-[#F1F1F1] focus:bg-[#2A133F]">
//                       Product
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="photographers" className="text-[#F1F1F1]">
//                   Number of Photographers
//                 </Label>
//                 <Input
//                   id="photographers"
//                   type="number"
//                   min="1"
//                   value={formData.photographers}
//                   onChange={(e) => setFormData({ ...formData, photographers: Number(e.target.value) })}
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="budget" className="text-[#F1F1F1]">
//                   Budget (Optional)
//                 </Label>
//                 <Input
//                   id="budget"
//                   type="number"
//                   placeholder="0"
//                   value={formData.budget}
//                   onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//               className="border-gray-700 text-g   ray-300 hover:bg-gray-700 hover:text-white"
//             >
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
//               Add Client
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// // Edit Client Modal Component


// function EditClientModal({ client, open, onOpenChange, onSubmit }) {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//     eventName: "",
//     eventDate: "",
//     eventType: "",
//     photographers: 1,
//     budget: "",
//   })

//   useEffect(() => {
//     if (client) {
//       setFormData({
//         firstName: client.firstName,
//         lastName: client.lastName,
//         email: client.email,
//         phone: client.phone,
//         company: client.company || "",
//         eventName: client.eventName || "",
//         eventDate: client.eventDate || "",
//         eventType: client.eventType || "",
//         photographers: client.photographers || 1,
//         budget: client.budget?.toString() || "",
//       })
//     }
//   }, [client])

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onSubmit({
//       ...client,
//       ...formData,
//       photographers: Number(formData.photographers),
//       budget: formData.budget ? Number(formData.budget) : undefined,
//     })
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] bg-[#1C1124] border-[#2A133F]">
//         <DialogHeader>
//           <DialogTitle className="text-[#A259FF] text-xl">Edit Client</DialogTitle>
//           <DialogDescription className="text-gray-400">Update the client details below.</DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="firstName" className="text-[#F1F1F1]">
//                   First Name *
//                 </Label>
//                 <Input
//                   id="firstName"
//                   value={formData.firstName}
//                   onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//                   required
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="lastName" className="text-[#F1F1F1]">
//                   Last Name *
//                 </Label>
//                 <Input
//                   id="lastName"
//                   value={formData.lastName}
//                   onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//                   required
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-[#F1F1F1]">
//                 Email *
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//                 className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="phone" className="text-[#F1F1F1]">
//                   Phone Number *
//                 </Label>
//                 <Input
//                   id="phone"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   required
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="company" className="text-[#F1F1F1]">
//                   Company
//                 </Label>
//                 <Input
//                   id="company"
//                   value={formData.company}
//                   onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="eventName" className="text-[#F1F1F1]">
//                 Event Name
//               </Label>
//               <Input
//                 id="eventName"
//                 value={formData.eventName}
//                 onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
//                 className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="eventDate" className="text-[#F1F1F1]">
//                   Event Date
//                 </Label>
//                 <Input
//                   id="eventDate"
//                   type="date"
//                   value={formData.eventDate}
//                   onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="eventType" className="text-[#F1F1F1]">
//                   Event Type
//                 </Label>
//                 <Select
//                   value={formData.eventType}
//                   onValueChange={(value) => setFormData({ ...formData, eventType: value })}
//                 >
//                   <SelectTrigger className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1]">
//                     <SelectValue placeholder="Select type" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-[#1C1124] border-[#2A133F]">
//                     <SelectItem value="Wedding" className="text-[#F1F1F1] focus:bg-[#2A133F]">
//                       Wedding
//                     </SelectItem>
//                     <SelectItem value="Corporate" className="text-[#F1F1F1] focus:bg-[#2A133F]">
//                       Corporate
//                     </SelectItem>
//                     <SelectItem value="Portrait" className="text-[#F1F1F1] focus:bg-[#2A133F]">
//                       Portrait
//                     </SelectItem>
//                     <SelectItem value="Event" className="text-[#F1F1F1] focus:bg-[#2A133F]">
//                       Event
//                     </SelectItem>
//                     <SelectItem value="Product" className="text-[#F1F1F1] focus:bg-[#2A133F]">
//                       Product
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="photographers" className="text-[#F1F1F1]">
//                   Number of Photographers
//                 </Label>
//                 <Input
//                   id="photographers"
//                   type="number"
//                   min="1"
//                   value={formData.photographers}
//                   onChange={(e) => setFormData({ ...formData, photographers: Number(e.target.value) })}
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="budget" className="text-[#F1F1F1]">
//                   Budget (Optional)
//                 </Label>
//                 <Input
//                   id="budget"
//                   type="number"
//                   placeholder="0"
//                   value={formData.budget}
//                   onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
//                   className="bg-[#2A133F] border-[#2A133F] text-[#F1F1F1] focus:border-[#A259FF]"
//                 />
//               </div>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//               className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
//             >
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
//               Update Client
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// // Delete Client Dialog Component

//     function DeleteClientDialog({ client, open, onOpenChange, onConfirm }) {
//   return (
//     <AlertDialog open={open} onOpenChange={onOpenChange}>
//       <AlertDialogContent className="bg-[#1C1124] border-[#2A133F]">
//         <AlertDialogHeader>
//           <AlertDialogTitle className="text-[#F1F1F1]">Delete Client</AlertDialogTitle>
//           <AlertDialogDescription className="text-gray-400">
//             Are you sure you want to delete{" "}
//             <strong className="text-[#F1F1F1]">
//               {client.firstName} {client.lastName}
//             </strong>
//             ? This action cannot be undone and will permanently remove all client data including their booking history
//             and contact information.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white">
//             Delete Client
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }

// Main Client Component
export default function ClientPage() {
  // const { toast } = useToast()
  const [clients, setClients] = useState(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [deletingClient, setDeletingClient] = useState(null)

  const filteredClients = clients.filter(
    (client) =>
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddClient = (clientData) => {
    const newClient = {
      ...clientData,
      id: Date.now().toString(),
      dateCreated: new Date().toISOString().split("T")[0],
    }
    setClients([...clients, newClient])
    setIsAddModalOpen(false)
    toast({
      title: "Client added successfully",
      description: `${clientData.firstName} ${clientData.lastName} has been added to your client list.`,
    })
  }

  const handleEditClient = (clientData) => {
    setClients(clients.map((client) => (client.id === clientData.id ? clientData : client)))
    setEditingClient(null)
    toast({
      title: "Client updated successfully",
      description: `${clientData.firstName} ${clientData.lastName}'s information has been updated.`,
    })
  }

  const handleDeleteClient = (clientId) => {
    const client = clients.find((c) => c.id === clientId)
    setClients(clients.filter((c) => c.id !== clientId))
    setDeletingClient(null)
    toast({
      title: "Client deleted",
      description: `${client?.firstName} ${client?.lastName} has been removed from your client list.`,
      variant: "destructive",
    })
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <FadeInUp>
        <div className="flex items-center justify-between relative">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-400">
              Clients
            </h1>
            <p className="text-gray-400">
              Manage your client database and relationships
            </p>
          </div>
          

        </div>
      </FadeInUp>

     
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={() => setIsAddModalOpen(true)} 
            className="bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200 hover:shadow-lg hover:shadow-purple-500/25"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Client
          </Button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-lg border border-gray-700 bg-gray-900">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-gray-800/50">
              <TableHead className="text-gray-300">Client</TableHead>
              <TableHead className="text-gray-300">Company</TableHead>
              <TableHead className="text-gray-300">Contact</TableHead>
              <TableHead className="text-gray-300">Event</TableHead>
              <TableHead className="text-gray-300">Date Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id} className="border-gray-700 hover:bg-gray-800/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-purple-600 text-white font-medium">
                        {getInitials(client.firstName, client.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-white">
                        {client.firstName} {client.lastName}
                      </div>
                      <div className="text-sm text-gray-400">{client.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {client.company ? (
                    <span className="font-medium text-white">{client.company}</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-white">
                    <div>{client.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {client.eventName ? (
                    <div>
                      <div className="font-medium text-white">{client.eventName}</div>
                      <div className="text-sm text-gray-400">
                        {client.eventType} • {client.eventDate}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell className="text-white">
                  {new Date(client.dateCreated).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800 hover:text-white">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                      <DropdownMenuItem
                        onClick={() => setEditingClient(client)}
                        className="text-white hover:bg-gray-700"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingClient(client)}
                        className="text-red-400 hover:bg-gray-700 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block md:hidden space-y-4">
        {filteredClients.map((client) => (
          <ClientTableCard 
            key={client.id} 
            client={client} 
            onEdit={setEditingClient}
            onDelete={setDeletingClient}
            getInitials={getInitials}
          />
        ))}
        
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No clients found matching your criteria.</div>
            <div className="text-gray-500 text-sm mt-2">Try adjusting your search terms.</div>
          </div>
        )}
      </div>

      <AddClientModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSubmit={handleAddClient} />

      {editingClient && (
        <EditClientModal
          client={editingClient}
          open={!!editingClient}
          onOpenChange={(open) => !open && setEditingClient(null)}
          onSubmit={handleEditClient}
        />
      )}

      {deletingClient && (
        <DeleteClientDialog
          client={deletingClient}
          open={!!deletingClient}
          onOpenChange={(open) => !open && setDeletingClient(null)}
          onConfirm={() => handleDeleteClient(deletingClient.id)}
        />
      )}
    </div>
  )
}
