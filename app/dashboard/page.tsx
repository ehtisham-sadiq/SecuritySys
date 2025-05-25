"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  CalendarDays,
  Clock,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  Building2,
  FileText,
  MapPin,
  BarChart3,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

export default function DashboardPage() {
  const [showCalendarDialog, setShowCalendarDialog] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowCalendarDialog(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            View Calendar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shifts">Shifts</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Shifts</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+3 new this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Worked</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£24,565</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Upcoming Shifts</CardTitle>
                <CardDescription>You have 12 shifts scheduled for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                      <div className="flex-1">
                        <div className="font-medium">City Center Mall</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date().toLocaleDateString()} • 8:00 AM - 4:00 PM
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((j) => (
                            <div
                              key={j}
                              className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border-2 border-background"
                            >
                              <span className="text-xs font-medium">S{j}</span>
                            </div>
                          ))}
                        </div>
                        <Button variant="ghost" size="icon">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Shifts
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Issues that need your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Missing documents for John Doe</p>
                      <p className="text-sm text-muted-foreground">SIA license expired 2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Shift coverage needed</p>
                      <p className="text-sm text-muted-foreground">Westfield Mall - May 12, 2023</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">New employee onboarded</p>
                      <p className="text-sm text-muted-foreground">Sarah Johnson completed all requirements</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View All Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shifts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Upcoming Shifts</CardTitle>
                <CardDescription>Next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: "City Center Mall",
                      date: new Date(Date.now() + 1 * 86400000),
                      time: "08:00 AM - 04:00 PM",
                      officers: 3,
                    },
                    {
                      title: "Westfield Office Building",
                      date: new Date(Date.now() + 2 * 86400000),
                      time: "09:00 AM - 05:00 PM",
                      officers: 2,
                    },
                    {
                      title: "Birmingham Conference Center",
                      date: new Date(Date.now() + 3 * 86400000),
                      time: "10:00 AM - 06:00 PM",
                      officers: 4,
                    },
                  ].map((shift, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                      <div className="flex-1">
                        <div className="font-medium">{shift.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {shift.date.toLocaleDateString()} • {shift.time}
                        </div>
                      </div>
                      <Badge>{shift.officers} Officers</Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    View All Shifts
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Active Shifts</CardTitle>
                <CardDescription>Currently in progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: "London Financial District",
                      time: "07:00 AM - 07:00 PM",
                      officers: 4,
                      progress: 65,
                    },
                    {
                      title: "Manchester Airport Terminal",
                      time: "06:00 AM - 06:00 PM",
                      officers: 6,
                      progress: 40,
                    },
                  ].map((shift, i) => (
                    <div key={i} className="flex flex-col gap-2 rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{shift.title}</div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          In Progress
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Today • {shift.time}</div>
                      <div className="w-full h-2 bg-muted rounded-full mt-1">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${shift.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Start</span>
                        <span>{shift.progress}% Complete</span>
                        <span>End</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    View Active Shifts
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Shift Statistics</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Total Shifts</div>
                    <div className="font-bold">87</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Completed Shifts</div>
                    <div className="font-bold">72</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Cancelled Shifts</div>
                    <div className="font-bold">3</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Hours Worked</div>
                    <div className="font-bold">696</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Average Shift Duration</div>
                    <div className="font-bold">8 hours</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Incidents Reported</div>
                    <div className="font-bold">5</div>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Detailed Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Employee Status</CardTitle>
                <CardDescription>Current employee statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Total Employees</div>
                    <div className="font-bold">42</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Active Employees</div>
                    <div className="font-bold">36</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Pending Documents</div>
                    <div className="font-bold">4</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Inactive Employees</div>
                    <div className="font-bold">2</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">New This Month</div>
                    <div className="font-bold">3</div>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    <Users className="mr-2 h-4 w-4" />
                    View All Employees
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Employees</CardTitle>
                <CardDescription>Newly added employees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "John Smith",
                      role: "Security Officer",
                      status: "Active",
                      joinDate: "May 1, 2023",
                    },
                    {
                      name: "Sarah Johnson",
                      role: "Supervisor",
                      status: "Active",
                      joinDate: "May 5, 2023",
                    },
                    {
                      name: "Michael Brown",
                      role: "Security Officer",
                      status: "Pending",
                      joinDate: "May 10, 2023",
                    },
                  ].map((employee, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                      <Avatar>
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {employee.role} • Joined {employee.joinDate}
                        </div>
                      </div>
                      <Badge
                        variant={employee.status === "Active" ? "default" : "outline"}
                        className={
                          employee.status === "Active"
                            ? ""
                            : employee.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    View All Employees
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Document Status</CardTitle>
                <CardDescription>Employee document overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      type: "SIA Licenses",
                      total: 36,
                      valid: 32,
                      expiring: 3,
                      expired: 1,
                    },
                    {
                      type: "ID Verification",
                      total: 36,
                      valid: 36,
                      expiring: 0,
                      expired: 0,
                    },
                    {
                      type: "Training Certificates",
                      total: 36,
                      valid: 30,
                      expiring: 4,
                      expired: 2,
                    },
                  ].map((doc, i) => (
                    <div key={i} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <div className="font-medium">{doc.type}</div>
                        </div>
                        <div className="text-sm font-medium">{doc.total} Total</div>
                      </div>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="rounded bg-green-100 p-1 text-green-800">{doc.valid} Valid</div>
                        <div className="rounded bg-yellow-100 p-1 text-yellow-800">{doc.expiring} Expiring</div>
                        <div className="rounded bg-red-100 p-1 text-red-800">{doc.expired} Expired</div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    <FileText className="mr-2 h-4 w-4" />
                    View All Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Client Overview</CardTitle>
                <CardDescription>Current client statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Total Clients</div>
                    <div className="font-bold">18</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Active Clients</div>
                    <div className="font-bold">16</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Inactive Clients</div>
                    <div className="font-bold">2</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Total Sites</div>
                    <div className="font-bold">42</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">New This Month</div>
                    <div className="font-bold">2</div>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    <Building2 className="mr-2 h-4 w-4" />
                    View All Clients
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Top Clients</CardTitle>
                <CardDescription>By revenue this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "Manchester Shopping Ltd",
                      type: "Retail",
                      location: "Manchester",
                      revenue: "£8,450",
                      sites: 3,
                    },
                    {
                      name: "London Office Spaces",
                      type: "Corporate",
                      location: "London",
                      revenue: "£7,200",
                      sites: 5,
                    },
                    {
                      name: "Birmingham Events Co",
                      type: "Event",
                      location: "Birmingham",
                      revenue: "£5,800",
                      sites: 2,
                    },
                  ].map((client, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border p-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {client.type} • {client.location}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{client.revenue}</div>
                        <div className="text-sm text-muted-foreground">{client.sites} sites</div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    View All Clients
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Client Locations</CardTitle>
                <CardDescription>Sites by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      location: "London",
                      sites: 18,
                      clients: 7,
                      officers: 24,
                    },
                    {
                      location: "Manchester",
                      sites: 12,
                      clients: 5,
                      officers: 16,
                    },
                    {
                      location: "Birmingham",
                      sites: 8,
                      clients: 4,
                      officers: 10,
                    },
                    {
                      location: "Liverpool",
                      sites: 4,
                      clients: 2,
                      officers: 6,
                    },
                  ].map((location, i) => (
                    <div key={i} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <div className="font-medium">{location.location}</div>
                        </div>
                        <div className="text-sm font-medium">{location.sites} Sites</div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{location.clients}</span> Clients
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{location.officers}</span> Officers
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    <MapPin className="mr-2 h-4 w-4" />
                    View All Locations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Calendar Dialog */}
      <Dialog open={showCalendarDialog} onOpenChange={setShowCalendarDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Shift Calendar</DialogTitle>
            <DialogDescription>View and manage upcoming shifts</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-7 gap-2 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-2 font-medium text-sm">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 6
                const isToday = day === 15
                const hasShift = [12, 15, 18, 22, 25].includes(day)
                return (
                  <div
                    key={i}
                    className={`p-2 text-sm border rounded ${
                      day < 1 || day > 31
                        ? "text-muted-foreground"
                        : isToday
                          ? "bg-primary text-primary-foreground"
                          : hasShift
                            ? "bg-blue-100 text-blue-800"
                            : ""
                    }`}
                  >
                    {day > 0 && day <= 31 ? day : ""}
                    {hasShift && day > 0 && day <= 31 && <div className="text-xs mt-1">Shift</div>}
                  </div>
                )
              })}
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span>Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
                <span>Scheduled Shifts</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
