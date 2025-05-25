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
import { Calendar, Clock, MapPin, Users, Plus, Search, Eye } from "lucide-react"

// Mock data for shifts
const mockShifts = [
  {
    id: 1,
    title: "Night Security - Shopping Mall",
    location: "Westfield London",
    date: "2024-01-15",
    startTime: "22:00",
    endTime: "06:00",
    status: "active",
    assignedOfficers: 2,
    requiredOfficers: 2,
    client: "Westfield Group",
    hourlyRate: 15.5,
  },
  {
    id: 2,
    title: "Event Security - Concert",
    location: "O2 Arena",
    date: "2024-01-16",
    startTime: "18:00",
    endTime: "23:00",
    status: "upcoming",
    assignedOfficers: 1,
    requiredOfficers: 3,
    client: "AEG Live",
    hourlyRate: 18.0,
  },
  {
    id: 3,
    title: "Office Building Security",
    location: "Canary Wharf",
    date: "2024-01-14",
    startTime: "09:00",
    endTime: "17:00",
    status: "completed",
    assignedOfficers: 1,
    requiredOfficers: 1,
    client: "HSBC",
    hourlyRate: 16.0,
  },
  {
    id: 4,
    title: "Retail Security",
    location: "Oxford Street Store",
    date: "2024-01-17",
    startTime: "10:00",
    endTime: "18:00",
    status: "upcoming",
    assignedOfficers: 0,
    requiredOfficers: 2,
    client: "John Lewis",
    hourlyRate: 14.5,
  },
]

export default function ShiftsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const [selectedShift, setSelectedShift] = useState<any>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showAssignDialog, setShowAssignDialog] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredShifts = mockShifts.filter((shift) => {
    const matchesSearch =
      shift.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.client.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && shift.status === "active"
    if (activeTab === "upcoming") return matchesSearch && shift.status === "upcoming"
    if (activeTab === "completed") return matchesSearch && shift.status === "completed"

    return matchesSearch
  })

  const handleViewDetails = (shift: any) => {
    setSelectedShift(shift)
    setShowDetailsDialog(true)
  }

  const handleAssignOfficers = (shift: any) => {
    setSelectedShift(shift)
    setShowAssignDialog(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Shift Management</h1>
          <p className="text-muted-foreground">Manage and assign security shifts</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Shift
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Shift</DialogTitle>
              <DialogDescription>Add a new security shift to the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Shift Title</Label>
                <Input id="title" placeholder="Enter shift title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client">Client</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="westfield">Westfield Group</SelectItem>
                    <SelectItem value="aeg">AEG Live</SelectItem>
                    <SelectItem value="hsbc">HSBC</SelectItem>
                    <SelectItem value="johnlewis">John Lewis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input id="startTime" type="time" />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input id="endTime" type="time" />
                </div>
              </div>
            </div>
            <Button type="submit">Create Shift</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search shifts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Shifts</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4">
            {filteredShifts.map((shift) => (
              <Card key={shift.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{shift.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {shift.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {shift.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {shift.startTime} - {shift.endTime}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(shift.status)}>{shift.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {shift.assignedOfficers}/{shift.requiredOfficers} Officers
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">Client: {shift.client}</div>
                      <div className="text-sm font-medium">£{shift.hourlyRate}/hour</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(shift)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {shift.assignedOfficers < shift.requiredOfficers && (
                        <Button size="sm" onClick={() => handleAssignOfficers(shift)}>
                          Assign Officers
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Shift Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Shift Details</DialogTitle>
            <DialogDescription>Complete information about the selected shift</DialogDescription>
          </DialogHeader>
          {selectedShift && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Shift Title</Label>
                  <p className="text-sm text-muted-foreground">{selectedShift.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p className="text-sm text-muted-foreground">{selectedShift.location}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Client</Label>
                  <p className="text-sm text-muted-foreground">{selectedShift.client}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={getStatusColor(selectedShift.status)}>{selectedShift.status}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedShift.date}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Time</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedShift.startTime} - {selectedShift.endTime}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Officers Required</Label>
                  <p className="text-sm text-muted-foreground">{selectedShift.requiredOfficers}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Officers Assigned</Label>
                  <p className="text-sm text-muted-foreground">{selectedShift.assignedOfficers}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Hourly Rate</Label>
                  <p className="text-sm text-muted-foreground">£{selectedShift.hourlyRate}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Officers Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Officers</DialogTitle>
            <DialogDescription>Assign security officers to this shift</DialogDescription>
          </DialogHeader>
          {selectedShift && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Shift: {selectedShift.title}</Label>
                <p className="text-sm text-muted-foreground">
                  {selectedShift.date} • {selectedShift.startTime} - {selectedShift.endTime}
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Required Officers: {selectedShift.requiredOfficers}</Label>
                <Label>Currently Assigned: {selectedShift.assignedOfficers}</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="officer">Select Officer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an officer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Smith - Available</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson - Available</SelectItem>
                    <SelectItem value="mike">Mike Wilson - Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setShowAssignDialog(false)}>Assign Officer</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
