import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Filter, Plus, Search, MapPin, Building2, Users, Clock, CalendarClock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

export default function ShiftsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Shift Management</h2>
        <div className="flex items-center gap-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">
                <Plus className="mr-2 h-4 w-4" />
                Create Shift
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Shift</DialogTitle>
                <DialogDescription>Fill in the details to create a new security shift.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="client">Client</Label>
                    <Select>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manchester">Manchester Shopping Ltd</SelectItem>
                        <SelectItem value="london">London Office Spaces</SelectItem>
                        <SelectItem value="birmingham">Birmingham Events Co</SelectItem>
                        <SelectItem value="northern">Northern Retail Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city-center">City Center Mall, Manchester</SelectItem>
                        <SelectItem value="westfield">Westfield Shopping Center, London</SelectItem>
                        <SelectItem value="bullring">Bullring Shopping Centre, Birmingham</SelectItem>
                        <SelectItem value="arndale">Arndale Centre, Manchester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="shift-type">Shift Type</Label>
                    <Select>
                      <SelectTrigger id="shift-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular Shift</SelectItem>
                        <SelectItem value="emergency">Emergency Coverage</SelectItem>
                        <SelectItem value="event">Special Event</SelectItem>
                        <SelectItem value="temporary">Temporary Assignment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input id="start-time" type="time" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input id="end-time" type="time" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="officers">Required Officers</Label>
                  <Input id="officers" type="number" min="1" placeholder="Number of officers needed" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Select>
                    <SelectTrigger id="requirements">
                      <SelectValue placeholder="Select requirements" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sia">SIA License Required</SelectItem>
                      <SelectItem value="first-aid">First Aid Certification</SelectItem>
                      <SelectItem value="cctv">CCTV Operation</SelectItem>
                      <SelectItem value="driving">Driving License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Shift Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter details about the shift, duties, and any special instructions"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Shift</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Shifts</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="grid w-full sm:max-w-sm items-center gap-1.5">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search shifts..." className="w-full pl-8" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="manchester">Manchester</SelectItem>
                <SelectItem value="birmingham">Birmingham</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                <SelectItem value="mall">Shopping Malls</SelectItem>
                <SelectItem value="office">Office Buildings</SelectItem>
                <SelectItem value="event">Events</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                id: "SH-001",
                title: "City Center Mall Security",
                status: "Confirmed",
                date: new Date(Date.now() + 1 * 86400000),
                timeStart: "08:00 AM",
                timeEnd: "04:00 PM",
                location: "City Center Mall, Manchester",
                client: "Manchester Shopping Ltd",
                officers: 3,
                assigned: true,
                assignedOfficers: [
                  { name: "John Smith", id: "EMP-001" },
                  { name: "Sarah Johnson", id: "EMP-002" },
                  { name: "Michael Brown", id: "EMP-003" },
                ],
              },
              {
                id: "SH-002",
                title: "Westfield Office Building",
                status: "Pending Confirmation",
                date: new Date(Date.now() + 2 * 86400000),
                timeStart: "09:00 AM",
                timeEnd: "05:00 PM",
                location: "Westfield Office Building, London",
                client: "London Office Spaces",
                officers: 2,
                assigned: true,
                assignedOfficers: [
                  { name: "Emma Wilson", id: "EMP-004" },
                  { name: "David Lee", id: "EMP-005" },
                ],
              },
              {
                id: "SH-003",
                title: "Birmingham Conference Center",
                status: "Unassigned",
                date: new Date(Date.now() + 3 * 86400000),
                timeStart: "10:00 AM",
                timeEnd: "06:00 PM",
                location: "Conference Center, Birmingham",
                client: "Birmingham Events Co",
                officers: 4,
                assigned: false,
                assignedOfficers: [],
              },
              {
                id: "SH-004",
                title: "Northern Shopping Mall",
                status: "Confirmed",
                date: new Date(Date.now() + 4 * 86400000),
                timeStart: "07:00 AM",
                timeEnd: "03:00 PM",
                location: "Northern Mall, Manchester",
                client: "Northern Retail Group",
                officers: 3,
                assigned: true,
                assignedOfficers: [
                  { name: "Robert Harris", id: "EMP-006" },
                  { name: "Jennifer Clark", id: "EMP-007" },
                  { name: "Thomas Wilson", id: "EMP-008" },
                ],
              },
              {
                id: "SH-005",
                title: "Midlands Shopping Center",
                status: "Pending Confirmation",
                date: new Date(Date.now() + 5 * 86400000),
                timeStart: "08:00 AM",
                timeEnd: "04:00 PM",
                location: "Midlands Shopping Center, Birmingham",
                client: "Midlands Shopping Centers",
                officers: 2,
                assigned: true,
                assignedOfficers: [
                  { name: "Lisa Taylor", id: "EMP-009" },
                  { name: "James Anderson", id: "EMP-010" },
                ],
              },
            ].map((shift, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-[1fr_200px]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{shift.title}</h3>
                        <Badge
                          variant={
                            shift.status === "Unassigned"
                              ? "destructive"
                              : shift.status === "Pending Confirmation"
                                ? "outline"
                                : "default"
                          }
                        >
                          {shift.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {shift.date.toLocaleDateString()} • {shift.timeStart} - {shift.timeEnd}
                      </div>
                      <div className="mt-4 grid gap-2 md:grid-cols-3">
                        <div>
                          <div className="text-sm font-medium">Location</div>
                          <div className="text-sm text-muted-foreground">{shift.location}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Client</div>
                          <div className="text-sm text-muted-foreground">{shift.client}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Required Officers</div>
                          <div className="text-sm text-muted-foreground">{shift.officers} Security Officers</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-end md:items-end mt-4 md:mt-0">
                      <div className="flex -space-x-2">
                        {shift.assigned &&
                          shift.assignedOfficers.map((officer, j) => (
                            <div
                              key={j}
                              className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border-2 border-background"
                              title={officer.name}
                            >
                              <span className="text-xs font-medium">
                                {officer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                          ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">View Details</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Shift Details</DialogTitle>
                              <DialogDescription>
                                Shift ID: {shift.id} • {shift.status}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                              <div>
                                <h3 className="text-lg font-semibold">{shift.title}</h3>
                                <div className="text-sm text-muted-foreground">
                                  {shift.date.toLocaleDateString()} • {shift.timeStart} - {shift.timeEnd}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Location</h4>
                                  </div>
                                  <p className="text-sm">{shift.location}</p>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Client</h4>
                                  </div>
                                  <p className="text-sm">{shift.client}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Required Officers</h4>
                                  </div>
                                  <p className="text-sm">{shift.officers} Security Officers</p>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Duration</h4>
                                  </div>
                                  <p className="text-sm">8 hours</p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Shift Requirements</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="sia" checked={true} />
                                    <label
                                      htmlFor="sia"
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      SIA License Required
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="first-aid" checked={false} />
                                    <label
                                      htmlFor="first-aid"
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      First Aid Certification
                                    </label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox id="cctv" checked={true} />
                                    <label
                                      htmlFor="cctv"
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      CCTV Operation
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Assigned Officers</h4>
                                {shift.assigned ? (
                                  <div className="space-y-2">
                                    {shift.assignedOfficers.map((officer, j) => (
                                      <div key={j} className="flex items-center gap-2 p-2 rounded-md border">
                                        <Avatar className="h-8 w-8">
                                          <AvatarFallback>
                                            {officer.name
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium text-sm">{officer.name}</div>
                                          <div className="text-xs text-muted-foreground">ID: {officer.id}</div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground">No officers assigned yet.</p>
                                )}
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Shift Description</h4>
                                <p className="text-sm text-muted-foreground">
                                  Regular security duties including patrolling the premises, monitoring CCTV, checking
                                  visitor IDs, and responding to any security incidents. Officers should arrive 15
                                  minutes before shift start for briefing.
                                </p>
                              </div>
                            </div>
                            <DialogFooter>
                              {!shift.assigned ? (
                                <Button>Assign Officers</Button>
                              ) : shift.status === "Pending Confirmation" ? (
                                <Button>Confirm Shift</Button>
                              ) : (
                                <Button>Edit Shift</Button>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline">
                          {shift.status === "Unassigned" ? "Assign Officers" : "Edit"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                id: "SH-006",
                title: "London Financial District",
                status: "In Progress",
                date: new Date(),
                timeStart: "07:00 AM",
                timeEnd: "07:00 PM",
                location: "Financial District, London",
                client: "London Office Spaces",
                officers: 4,
                assigned: true,
                assignedOfficers: [
                  { name: "John Smith", id: "EMP-001" },
                  { name: "Sarah Johnson", id: "EMP-002" },
                  { name: "Michael Brown", id: "EMP-003" },
                  { name: "Emma Wilson", id: "EMP-004" },
                ],
                progress: 65,
              },
              {
                id: "SH-007",
                title: "Manchester Airport Terminal",
                status: "In Progress",
                date: new Date(),
                timeStart: "06:00 AM",
                timeEnd: "06:00 PM",
                location: "Airport Terminal, Manchester",
                client: "Northern Transport Authority",
                officers: 6,
                assigned: true,
                assignedOfficers: [
                  { name: "David Lee", id: "EMP-005" },
                  { name: "Robert Harris", id: "EMP-006" },
                  { name: "Jennifer Clark", id: "EMP-007" },
                  { name: "Thomas Wilson", id: "EMP-008" },
                  { name: "Lisa Taylor", id: "EMP-009" },
                  { name: "James Anderson", id: "EMP-010" },
                ],
                progress: 40,
              },
              {
                id: "SH-008",
                title: "Birmingham Tech Conference",
                status: "In Progress",
                date: new Date(),
                timeStart: "09:00 AM",
                timeEnd: "05:00 PM",
                location: "Conference Center, Birmingham",
                client: "Birmingham Events Co",
                officers: 3,
                assigned: true,
                assignedOfficers: [
                  { name: "William Davis", id: "EMP-011" },
                  { name: "Elizabeth Martin", id: "EMP-012" },
                  { name: "Richard Thompson", id: "EMP-013" },
                ],
                progress: 25,
              },
            ].map((shift, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-[1fr_200px]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{shift.title}</h3>
                        <Badge variant="default" className="bg-green-600">
                          {shift.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {shift.date.toLocaleDateString()} • {shift.timeStart} - {shift.timeEnd}
                      </div>
                      <div className="mt-4 grid gap-2 md:grid-cols-3">
                        <div>
                          <div className="text-sm font-medium">Location</div>
                          <div className="text-sm text-muted-foreground">{shift.location}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Client</div>
                          <div className="text-sm text-muted-foreground">{shift.client}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Progress</div>
                          <div className="w-full h-2 bg-muted rounded-full mt-1.5">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${shift.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-end md:items-end mt-4 md:mt-0">
                      <div className="flex -space-x-2">
                        {shift.assignedOfficers.slice(0, 3).map((officer, j) => (
                          <div
                            key={j}
                            className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border-2 border-background"
                            title={officer.name}
                          >
                            <span className="text-xs font-medium">
                              {officer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        ))}
                        {shift.assignedOfficers.length > 3 && (
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center border-2 border-background text-primary-foreground">
                            <span className="text-xs font-medium">+{shift.assignedOfficers.length - 3}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">View Details</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Active Shift Details</DialogTitle>
                              <DialogDescription>
                                Shift ID: {shift.id} • {shift.status}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                              <div>
                                <h3 className="text-lg font-semibold">{shift.title}</h3>
                                <div className="text-sm text-muted-foreground">
                                  {shift.date.toLocaleDateString()} • {shift.timeStart} - {shift.timeEnd}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Shift Progress</h4>
                                <div className="space-y-2">
                                  <div className="w-full h-2.5 bg-muted rounded-full">
                                    <div
                                      className="h-full bg-primary rounded-full"
                                      style={{ width: `${shift.progress}%` }}
                                    ></div>
                                  </div>
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>{shift.timeStart}</span>
                                    <span>{shift.progress}% Complete</span>
                                    <span>{shift.timeEnd}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Location</h4>
                                  </div>
                                  <p className="text-sm">{shift.location}</p>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Client</h4>
                                  </div>
                                  <p className="text-sm">{shift.client}</p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Active Officers</h4>
                                <div className="space-y-2">
                                  {shift.assignedOfficers.map((officer, j) => (
                                    <div key={j} className="flex items-center gap-2 p-2 rounded-md border">
                                      <Avatar className="h-8 w-8">
                                        <AvatarFallback>
                                          {officer.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium text-sm">{officer.name}</div>
                                        <div className="text-xs text-muted-foreground">ID: {officer.id}</div>
                                      </div>
                                      <Badge variant="outline" className="ml-auto">
                                        On Duty
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Recent Activity</h4>
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <CalendarClock className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                      <p className="text-sm">All officers checked in on time</p>
                                      <p className="text-xs text-muted-foreground">{shift.timeStart}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <CalendarClock className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                      <p className="text-sm">First patrol completed</p>
                                      <p className="text-xs text-muted-foreground">
                                        {new Date(
                                          new Date(`${shift.date.toDateString()} ${shift.timeStart}`).getTime() +
                                            2 * 60 * 60 * 1000,
                                        ).toLocaleTimeString()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <CalendarClock className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div>
                                      <p className="text-sm">Break rotation started</p>
                                      <p className="text-xs text-muted-foreground">
                                        {new Date(
                                          new Date(`${shift.date.toDateString()} ${shift.timeStart}`).getTime() +
                                            4 * 60 * 60 * 1000,
                                        ).toLocaleTimeString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Contact Officers</Button>
                              <Button>View Live Updates</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline">
                          Live Updates
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                id: "SH-009",
                title: "London Shopping Center",
                status: "Completed",
                date: new Date(Date.now() - 1 * 86400000),
                timeStart: "08:00 AM",
                timeEnd: "04:00 PM",
                location: "Shopping Center, London",
                client: "London Retail Group",
                officers: 3,
                assigned: true,
                assignedOfficers: [
                  { name: "John Smith", id: "EMP-001" },
                  { name: "Sarah Johnson", id: "EMP-002" },
                  { name: "Michael Brown", id: "EMP-003" },
                ],
                incidents: 0,
                rating: 5,
              },
              {
                id: "SH-010",
                title: "Manchester Corporate Office",
                status: "Completed",
                date: new Date(Date.now() - 2 * 86400000),
                timeStart: "09:00 AM",
                timeEnd: "05:00 PM",
                location: "Corporate Office, Manchester",
                client: "Manchester Business Services",
                officers: 2,
                assigned: true,
                assignedOfficers: [
                  { name: "Emma Wilson", id: "EMP-004" },
                  { name: "David Lee", id: "EMP-005" },
                ],
                incidents: 1,
                rating: 4,
              },
              {
                id: "SH-011",
                title: "Birmingham Music Festival",
                status: "Completed",
                date: new Date(Date.now() - 3 * 86400000),
                timeStart: "02:00 PM",
                timeEnd: "10:00 PM",
                location: "Festival Grounds, Birmingham",
                client: "Birmingham Events Co",
                officers: 8,
                assigned: true,
                assignedOfficers: [
                  { name: "Robert Harris", id: "EMP-006" },
                  { name: "Jennifer Clark", id: "EMP-007" },
                  { name: "Thomas Wilson", id: "EMP-008" },
                  { name: "Lisa Taylor", id: "EMP-009" },
                  { name: "James Anderson", id: "EMP-010" },
                  { name: "William Davis", id: "EMP-011" },
                  { name: "Elizabeth Martin", id: "EMP-012" },
                  { name: "Richard Thompson", id: "EMP-013" },
                ],
                incidents: 3,
                rating: 4,
              },
            ].map((shift, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-[1fr_200px]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{shift.title}</h3>
                        <Badge variant="secondary">{shift.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {shift.date.toLocaleDateString()} • {shift.timeStart} - {shift.timeEnd}
                      </div>
                      <div className="mt-4 grid gap-2 md:grid-cols-3">
                        <div>
                          <div className="text-sm font-medium">Location</div>
                          <div className="text-sm text-muted-foreground">{shift.location}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Client</div>
                          <div className="text-sm text-muted-foreground">{shift.client}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Rating</div>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, j) => (
                              <svg
                                key={j}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill={j < shift.rating ? "gold" : "none"}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-star text-muted-foreground"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-end md:items-end mt-4 md:mt-0">
                      <div className="flex items-center gap-2">
                        <Badge variant={shift.incidents === 0 ? "outline" : "destructive"}>
                          {shift.incidents} {shift.incidents === 1 ? "Incident" : "Incidents"}
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">View Details</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Completed Shift Details</DialogTitle>
                              <DialogDescription>
                                Shift ID: {shift.id} • {shift.status}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                              <div>
                                <h3 className="text-lg font-semibold">{shift.title}</h3>
                                <div className="text-sm text-muted-foreground">
                                  {shift.date.toLocaleDateString()} • {shift.timeStart} - {shift.timeEnd}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Location</h4>
                                  </div>
                                  <p className="text-sm">{shift.location}</p>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Client</h4>
                                  </div>
                                  <p className="text-sm">{shift.client}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Officers Assigned</h4>
                                  </div>
                                  <p className="text-sm">{shift.officers} Security Officers</p>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <h4 className="font-medium">Duration</h4>
                                  </div>
                                  <p className="text-sm">8 hours</p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Performance Summary</h4>
                                <div className="space-y-4">
                                  <div>
                                    <div className="flex justify-between mb-1">
                                      <span className="text-sm">Client Rating</span>
                                      <span className="text-sm font-medium">{shift.rating}/5</span>
                                    </div>
                                    <div className="flex">
                                      {[...Array(5)].map((_, j) => (
                                        <svg
                                          key={j}
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          viewBox="0 0 24 24"
                                          fill={j < shift.rating ? "gold" : "none"}
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="lucide lucide-star text-muted-foreground"
                                        >
                                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex justify-between mb-1">
                                      <span className="text-sm">Incidents</span>
                                      <span className="text-sm font-medium">
                                        {shift.incidents} {shift.incidents === 1 ? "Incident" : "Incidents"}
                                      </span>
                                    </div>
                                    {shift.incidents > 0 ? (
                                      <div className="text-sm text-muted-foreground">
                                        {shift.incidents === 1
                                          ? "Minor incident reported and resolved."
                                          : `${shift.incidents} incidents reported and resolved.`}
                                      </div>
                                    ) : (
                                      <div className="text-sm text-muted-foreground">No incidents reported.</div>
                                    )}
                                  </div>

                                  <div>
                                    <div className="flex justify-between mb-1">
                                      <span className="text-sm">Attendance</span>
                                      <span className="text-sm font-medium">100%</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      All officers arrived on time and completed their shifts.
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Client Feedback</h4>
                                <div className="p-3 bg-muted rounded-md text-sm italic">
                                  {shift.rating === 5
                                    ? "Excellent service provided by the security team. All officers were professional and attentive throughout the shift."
                                    : shift.rating === 4
                                      ? "Good service overall. Officers were professional and handled the situation well."
                                      : "Satisfactory service. Some areas for improvement have been noted."}
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Download Report</Button>
                              <Button>Generate Invoice</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="outline">
                          Download Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Shift ID</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Title</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Time</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Client</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Officers</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {[
                      {
                        id: "SH-001",
                        title: "City Center Mall Security",
                        date: new Date(Date.now() + 1 * 86400000),
                        timeStart: "08:00 AM",
                        timeEnd: "04:00 PM",
                        location: "Manchester",
                        client: "Manchester Shopping Ltd",
                        officers: 3,
                        status: "Confirmed",
                      },
                      {
                        id: "SH-002",
                        title: "Westfield Office Building",
                        date: new Date(Date.now() + 2 * 86400000),
                        timeStart: "09:00 AM",
                        timeEnd: "05:00 PM",
                        location: "London",
                        client: "London Office Spaces",
                        officers: 2,
                        status: "Pending Confirmation",
                      },
                      {
                        id: "SH-003",
                        title: "Birmingham Conference Center",
                        date: new Date(Date.now() + 3 * 86400000),
                        timeStart: "10:00 AM",
                        timeEnd: "06:00 PM",
                        location: "Birmingham",
                        client: "Birmingham Events Co",
                        officers: 4,
                        status: "Unassigned",
                      },
                      {
                        id: "SH-006",
                        title: "London Financial District",
                        date: new Date(),
                        timeStart: "07:00 AM",
                        timeEnd: "07:00 PM",
                        location: "London",
                        client: "London Office Spaces",
                        officers: 4,
                        status: "In Progress",
                      },
                      {
                        id: "SH-007",
                        title: "Manchester Airport Terminal",
                        date: new Date(),
                        timeStart: "06:00 AM",
                        timeEnd: "06:00 PM",
                        location: "Manchester",
                        client: "Northern Transport Authority",
                        officers: 6,
                        status: "In Progress",
                      },
                      {
                        id: "SH-009",
                        title: "London Shopping Center",
                        date: new Date(Date.now() - 1 * 86400000),
                        timeStart: "08:00 AM",
                        timeEnd: "04:00 PM",
                        location: "London",
                        client: "London Retail Group",
                        officers: 3,
                        status: "Completed",
                      },
                      {
                        id: "SH-010",
                        title: "Manchester Corporate Office",
                        date: new Date(Date.now() - 2 * 86400000),
                        timeStart: "09:00 AM",
                        timeEnd: "05:00 PM",
                        location: "Manchester",
                        client: "Manchester Business Services",
                        officers: 2,
                        status: "Completed",
                      },
                      {
                        id: "SH-011",
                        title: "Birmingham Music Festival",
                        date: new Date(Date.now() - 3 * 86400000),
                        timeStart: "02:00 PM",
                        timeEnd: "10:00 PM",
                        location: "Birmingham",
                        client: "Birmingham Events Co",
                        officers: 8,
                        status: "Completed",
                      },
                    ].map((shift, i) => (
                      <tr
                        key={i}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle font-medium">{shift.id}</td>
                        <td className="p-4 align-middle">{shift.title}</td>
                        <td className="p-4 align-middle">{shift.date.toLocaleDateString()}</td>
                        <td className="p-4 align-middle">
                          {shift.timeStart} - {shift.timeEnd}
                        </td>
                        <td className="p-4 align-middle">{shift.location}</td>
                        <td className="p-4 align-middle">{shift.client}</td>
                        <td className="p-4 align-middle">{shift.officers}</td>
                        <td className="p-4 align-middle">
                          <Badge
                            variant={
                              shift.status === "Unassigned"
                                ? "destructive"
                                : shift.status === "Pending Confirmation"
                                  ? "outline"
                                  : shift.status === "In Progress"
                                    ? "default"
                                    : shift.status === "Completed"
                                      ? "secondary"
                                      : "default"
                            }
                          >
                            {shift.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Shift Details</DialogTitle>
                                  <DialogDescription>
                                    Shift ID: {shift.id} • {shift.status}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6 py-4">
                                  <div>
                                    <h3 className="text-lg font-semibold">{shift.title}</h3>
                                    <div className="text-sm text-muted-foreground">
                                      {shift.date.toLocaleDateString()} • {shift.timeStart} - {shift.timeEnd}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <h4 className="font-medium">Location</h4>
                                      </div>
                                      <p className="text-sm">{shift.location}</p>
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                        <h4 className="font-medium">Client</h4>
                                      </div>
                                      <p className="text-sm">{shift.client}</p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <h4 className="font-medium">Required Officers</h4>
                                      </div>
                                      <p className="text-sm">{shift.officers} Security Officers</p>
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <h4 className="font-medium">Status</h4>
                                      </div>
                                      <Badge
                                        variant={
                                          shift.status === "Unassigned"
                                            ? "destructive"
                                            : shift.status === "Pending Confirmation"
                                              ? "outline"
                                              : shift.status === "In Progress"
                                                ? "default"
                                                : shift.status === "Completed"
                                                  ? "secondary"
                                                  : "default"
                                        }
                                      >
                                        {shift.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button>View Full Details</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
