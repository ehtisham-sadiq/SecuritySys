"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, CheckCircle, Clock, FileText, Search, UserPlus } from "lucide-react"

// Mock employee data
const mockEmployees = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    role: "Security Officer",
    status: "Active",
    location: "London",
    join_date: "2023-01-15",
    rating: 4.5,
    documents: [
      { document_type: "ID Card", status: "Approved" },
      { document_type: "SIA License", status: "Approved" },
      { document_type: "Training Certificate", status: "Approved" },
    ],
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    phone: "123-456-7891",
    role: "Supervisor",
    status: "Active",
    location: "Manchester",
    join_date: "2022-11-05",
    rating: 4.8,
    documents: [
      { document_type: "ID Card", status: "Approved" },
      { document_type: "SIA License", status: "Approved" },
      { document_type: "Training Certificate", status: "Approved" },
    ],
  },
  {
    id: 3,
    first_name: "Michael",
    last_name: "Johnson",
    email: "michael.johnson@example.com",
    phone: "123-456-7892",
    role: "Security Officer",
    status: "Pending",
    location: "Birmingham",
    join_date: "2023-05-20",
    rating: 3.9,
    documents: [
      { document_type: "ID Card", status: "Approved" },
      { document_type: "SIA License", status: "Pending" },
      { document_type: "Training Certificate", status: "Pending" },
    ],
  },
  {
    id: 4,
    first_name: "Emily",
    last_name: "Williams",
    email: "emily.williams@example.com",
    phone: "123-456-7893",
    role: "Security Officer",
    status: "Inactive",
    location: "Leeds",
    join_date: "2022-08-12",
    rating: 3.2,
    documents: [
      { document_type: "ID Card", status: "Approved" },
      { document_type: "SIA License", status: "Expired" },
      { document_type: "Training Certificate", status: "Rejected" },
    ],
  },
  {
    id: 5,
    first_name: "David",
    last_name: "Brown",
    email: "david.brown@example.com",
    phone: "123-456-7894",
    role: "Manager",
    status: "Active",
    location: "London",
    join_date: "2022-03-10",
    rating: 4.9,
    documents: [
      { document_type: "ID Card", status: "Approved" },
      { document_type: "SIA License", status: "Approved" },
      { document_type: "Training Certificate", status: "Approved" },
    ],
  },
  {
    id: 6,
    first_name: "Sarah",
    last_name: "Miller",
    email: "sarah.miller@example.com",
    phone: "123-456-7895",
    role: "Security Officer",
    status: "Pending",
    location: "Glasgow",
    join_date: "2023-06-01",
    rating: 4.0,
    documents: [
      { document_type: "ID Card", status: "Approved" },
      { document_type: "SIA License", status: "Pending" },
      { document_type: "Training Certificate", status: "Approved" },
    ],
  },
  {
    id: 7,
    first_name: "James",
    last_name: "Wilson",
    email: "james.wilson@example.com",
    phone: "123-456-7896",
    role: "Security Officer",
    status: "Inactive",
    location: "Liverpool",
    join_date: "2022-09-15",
    rating: 3.5,
    documents: [
      { document_type: "ID Card", status: "Expired" },
      { document_type: "SIA License", status: "Expired" },
      { document_type: "Training Certificate", status: "Approved" },
    ],
  },
]

interface Employee {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  role: string
  status: string
  location: string
  join_date: string
  rating: number
  documents: { document_type: string; status: string }[]
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    // Simulate API call with mock data
    fetchEmployees()
  }, [activeTab, searchQuery])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Filter employees based on activeTab and searchQuery
      let filteredEmployees = [...mockEmployees]

      if (activeTab !== "all") {
        filteredEmployees = filteredEmployees.filter((employee) => employee.status.toLowerCase() === activeTab)
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredEmployees = filteredEmployees.filter(
          (employee) =>
            employee.first_name.toLowerCase().includes(query) ||
            employee.last_name.toLowerCase().includes(query) ||
            employee.email.toLowerCase().includes(query) ||
            employee.role.toLowerCase().includes(query),
        )
      }

      setEmployees(filteredEmployees)
      setError(null)
    } catch (err) {
      console.error("Error fetching employees:", err)
      setError("Failed to load employees. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchEmployees()
  }

  const handleAddEmployee = async (formData: FormData) => {
    try {
      setLoading(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newEmployee = {
        id: mockEmployees.length + 1,
        first_name: formData.get("firstName") as string,
        last_name: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        role: formData.get("role") as string,
        status: "Pending",
        location: formData.get("location") as string,
        join_date: new Date().toISOString().split("T")[0],
        rating: 0,
        documents: [],
      }

      // Add to mock data
      mockEmployees.unshift(newEmployee)

      setIsAddDialogOpen(false)
      fetchEmployees()
    } catch (err) {
      console.error("Error adding employee:", err)
      // Handle error
    } finally {
      setLoading(false)
    }
  }

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsViewDialogOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Inactive":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Expired":
        return "bg-red-100 text-red-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderEmployeeList = () => {
    if (loading) {
      return Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 border-b">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))
    }

    if (error) {
      return (
        <div className="p-4 text-center text-red-500">
          <p>{error}</p>
          <Button variant="outline" onClick={fetchEmployees} className="mt-2">
            Try Again
          </Button>
        </div>
      )
    }

    if (employees.length === 0) {
      return (
        <div className="p-4 text-center text-gray-500">
          <p>No employees found.</p>
        </div>
      )
    }

    return employees.map((employee) => (
      <div key={employee.id} className="flex items-center justify-between p-4 border-b hover:bg-gray-50">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>
              {employee.first_name.charAt(0)}
              {employee.last_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{`${employee.first_name} ${employee.last_name}`}</p>
            <p className="text-sm text-gray-500">{employee.role}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className={getStatusColor(employee.status)}>
            <span className="flex items-center space-x-1">
              {getStatusIcon(employee.status)}
              <span>{employee.status}</span>
            </span>
          </Badge>
          <Button variant="outline" size="sm" onClick={() => handleViewEmployee(employee)}>
            View
          </Button>
        </div>
      </div>
    ))
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Enter the details of the new employee below.</DialogDescription>
            </DialogHeader>
            <form action={handleAddEmployee}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" name="postalCode" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select name="role" defaultValue="Security Officer">
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Security Officer">Security Officer</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select name="availability" defaultValue="Full-time">
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} type="button">
                  Cancel
                </Button>
                <Button type="submit">Add Employee</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2">
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline" onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employees</CardTitle>
          <CardDescription>Manage your security personnel and their documents.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending Documents</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="all">All Employees</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="border rounded-md">
              {renderEmployeeList()}
            </TabsContent>
            <TabsContent value="pending" className="border rounded-md">
              {renderEmployeeList()}
            </TabsContent>
            <TabsContent value="inactive" className="border rounded-md">
              {renderEmployeeList()}
            </TabsContent>
            <TabsContent value="all" className="border rounded-md">
              {renderEmployeeList()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Employee Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {selectedEmployee.first_name.charAt(0)}
                    {selectedEmployee.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{`${selectedEmployee.first_name} ${selectedEmployee.last_name}`}</h3>
                  <p className="text-gray-500">{selectedEmployee.role}</p>
                  <Badge className={getStatusColor(selectedEmployee.status)}>
                    <span className="flex items-center space-x-1">
                      {getStatusIcon(selectedEmployee.status)}
                      <span>{selectedEmployee.status}</span>
                    </span>
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedEmployee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{selectedEmployee.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p>{selectedEmployee.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p>{new Date(selectedEmployee.join_date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Documents</h4>
                <div className="space-y-2">
                  {selectedEmployee.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span>{doc.document_type}</span>
                      </div>
                      <Badge variant="outline" className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
                <Button>Edit Employee</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
