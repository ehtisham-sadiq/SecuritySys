"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Mail, Phone, MapPin, Building } from "lucide-react"

// Mock data for clients
const mockClients = [
  {
    id: 1,
    name: "Westfield Group",
    contactPerson: "James Wilson",
    email: "james.wilson@westfield.com",
    phone: "+44 20 7000 0001",
    businessType: "Retail",
    status: "active",
    location: "London",
    sites: 3,
    contractValue: 45000,
    startDate: "2023-01-15",
  },
  {
    id: 2,
    name: "AEG Live",
    contactPerson: "Sarah Thompson",
    email: "sarah.thompson@aeglive.com",
    phone: "+44 20 7000 0002",
    businessType: "Entertainment",
    status: "active",
    location: "London",
    sites: 5,
    contractValue: 78000,
    startDate: "2023-03-20",
  },
  {
    id: 3,
    name: "HSBC",
    contactPerson: "Michael Brown",
    email: "michael.brown@hsbc.com",
    phone: "+44 20 7000 0003",
    businessType: "Financial",
    status: "pending",
    location: "Canary Wharf",
    sites: 2,
    contractValue: 65000,
    startDate: "2024-02-01",
  },
  {
    id: 4,
    name: "John Lewis",
    contactPerson: "Emma Davis",
    email: "emma.davis@johnlewis.com",
    phone: "+44 20 7000 0004",
    businessType: "Retail",
    status: "inactive",
    location: "Oxford Street",
    sites: 1,
    contractValue: 25000,
    startDate: "2023-06-10",
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.businessType.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && client.status === "active"
    if (activeTab === "inactive") return matchesSearch && client.status === "inactive"
    if (activeTab === "pending") return matchesSearch && client.status === "pending"

    return matchesSearch
  })

  const handleViewDetails = (client: any) => {
    setSelectedClient(client)
    setShowDetailsDialog(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Client Management</h1>
          <p className="text-muted-foreground">Manage clients and contracts</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Add a new client to the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="clientName">Company Name</Label>
                <Input id="clientName" placeholder="Enter company name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input id="contactPerson" placeholder="Enter contact person name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
            </div>
            <Button type="submit">Add Client</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4">
            {filteredClients.map((client) => (
              <Card key={client.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        {client.name}
                      </CardTitle>
                      <CardDescription>
                        Contact: {client.contactPerson} • {client.businessType}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{client.location}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {client.sites} sites • £{client.contractValue.toLocaleString()} contract
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(client)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Client Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
            <DialogDescription>Complete client information and contract details</DialogDescription>
          </DialogHeader>
          {selectedClient && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedClient.name}</h3>
                  <p className="text-muted-foreground">{selectedClient.businessType}</p>
                  <Badge className={getStatusColor(selectedClient.status)}>{selectedClient.status}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Contact Person</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.contactPerson}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Number of Sites</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.sites}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Contract Value</Label>
                  <p className="text-sm text-muted-foreground">£{selectedClient.contractValue.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Start Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.startDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Business Type</Label>
                  <p className="text-sm text-muted-foreground">{selectedClient.businessType}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Edit Client</Button>
                <Button variant="outline">View Contracts</Button>
                <Button variant="outline">Billing History</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
