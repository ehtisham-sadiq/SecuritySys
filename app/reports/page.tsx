import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Download, LineChart, Calendar, Clock, Users, FileText, ArrowUpRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Select defaultValue="month">
            <SelectTrigger>
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

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
              <SelectItem value="retail">Retail Clients</SelectItem>
              <SelectItem value="corporate">Corporate Clients</SelectItem>
              <SelectItem value="event">Event Clients</SelectItem>
            </SelectContent>
          </Select>

          <Button>Generate Report</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shifts">Shift Reports</TabsTrigger>
          <TabsTrigger value="employees">Employee Reports</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Shifts</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Worked</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£24,565</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.2%</div>
                <p className="text-xs text-muted-foreground">+2.4% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Shift Distribution</CardTitle>
                <CardDescription>Number of shifts by location over the last month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex flex-col justify-center">
                  <div className="space-y-4">
                    {/* Bar Chart Visualization */}
                    <div className="flex items-end gap-2 h-[200px]">
                      <div className="flex flex-col items-center gap-2">
                        <div className="bg-primary h-[160px] w-16 rounded-t-md relative group">
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            80 shifts
                          </div>
                        </div>
                        <span className="text-xs font-medium">London</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="bg-primary h-[120px] w-16 rounded-t-md relative group">
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            60 shifts
                          </div>
                        </div>
                        <span className="text-xs font-medium">Manchester</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="bg-primary h-[100px] w-16 rounded-t-md relative group">
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            50 shifts
                          </div>
                        </div>
                        <span className="text-xs font-medium">Birmingham</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="bg-primary h-[70px] w-16 rounded-t-md relative group">
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            35 shifts
                          </div>
                        </div>
                        <span className="text-xs font-medium">Leeds</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="bg-primary h-[40px] w-16 rounded-t-md relative group">
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            20 shifts
                          </div>
                        </div>
                        <span className="text-xs font-medium">Other</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue by client type over the last month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex flex-col justify-center">
                  {/* Pie Chart Visualization */}
                  <div className="relative h-[200px] w-[200px] mx-auto">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-primary"
                        style={{ clipPath: "polygon(50% 50%, 0 0, 0 100%, 100% 100%, 100% 0)" }}
                      ></div>
                      <div
                        className="absolute inset-0 bg-blue-500"
                        style={{ clipPath: "polygon(50% 50%, 100% 0, 0 0)" }}
                      ></div>
                      <div
                        className="absolute inset-0 bg-green-500"
                        style={{ clipPath: "polygon(50% 50%, 0 0, 0 50%)" }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <span className="text-xs">Retail (45%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs">Corporate (35%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">Events (20%)</span>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shifts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Shift Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.2%</div>
                <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "98.2%" }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Target: 95%</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Shift Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.4 hours</div>
                <p className="text-xs text-muted-foreground">+0.2 hours from last month</p>
                <div className="mt-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div className="text-xs">Most common: 8-hour shifts (72%)</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Shift Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.5%</div>
                <p className="text-xs text-muted-foreground">-1.2% from last month</p>
                <div className="mt-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="text-xs">14 unfilled shifts this month</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Shift Performance by Location</CardTitle>
              <CardDescription>Detailed breakdown of shift metrics by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Location</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Total Shifts</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Completed</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Completion Rate</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Avg. Duration</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Incidents</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {[
                      {
                        location: "London",
                        total: 80,
                        completed: 79,
                        rate: "98.8%",
                        duration: "8.2 hrs",
                        incidents: 2,
                      },
                      {
                        location: "Manchester",
                        total: 60,
                        completed: 59,
                        rate: "98.3%",
                        duration: "8.5 hrs",
                        incidents: 1,
                      },
                      {
                        location: "Birmingham",
                        total: 50,
                        completed: 49,
                        rate: "98.0%",
                        duration: "8.3 hrs",
                        incidents: 3,
                      },
                      { location: "Leeds", total: 35, completed: 34, rate: "97.1%", duration: "8.6 hrs", incidents: 0 },
                      {
                        location: "Other Locations",
                        total: 20,
                        completed: 19,
                        rate: "95.0%",
                        duration: "8.4 hrs",
                        incidents: 1,
                      },
                    ].map((location, i) => (
                      <tr
                        key={i}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle font-medium">{location.location}</td>
                        <td className="p-4 align-middle">{location.total}</td>
                        <td className="p-4 align-middle">{location.completed}</td>
                        <td className="p-4 align-middle">{location.rate}</td>
                        <td className="p-4 align-middle">{location.duration}</td>
                        <td className="p-4 align-middle">{location.incidents}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shift Trends</CardTitle>
              <CardDescription>Monthly shift trends over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex flex-col justify-center">
                {/* Line Chart Visualization */}
                <div className="relative h-[200px] w-full">
                  <div className="absolute bottom-0 left-0 w-full h-px bg-border"></div>
                  <div className="absolute left-0 top-0 h-full w-px bg-border"></div>

                  <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                    {/* Primary line - Total Shifts */}
                    <path
                      d="M0,180 L100,150 L200,120 L300,140 L400,100 L500,80 L600,50"
                      fill="none"
                      stroke="hsl(221.2, 83.2%, 53.3%)"
                      strokeWidth="3"
                    />

                    {/* Secondary line - Completed Shifts */}
                    <path
                      d="M0,190 L100,160 L200,130 L300,150 L400,110 L500,90 L600,60"
                      fill="none"
                      stroke="hsl(217.2, 91.2%, 59.8%)"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                    />
                  </svg>

                  <div className="absolute bottom-[-25px] w-full flex justify-between text-xs text-muted-foreground">
                    <span>Dec</span>
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                  </div>
                </div>

                <div className="flex justify-center gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-6 rounded-full bg-primary"></div>
                    <span className="text-xs">Total Shifts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-6 rounded-full bg-primary/60 border-dashed border-2 border-primary"></div>
                    <span className="text-xs">Completed Shifts</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
                <div className="mt-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="text-xs">85% retention rate</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Hours per Employee</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.4 hours</div>
                <p className="text-xs text-muted-foreground">+1.2 hours from last month</p>
                <div className="mt-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div className="text-xs">Target: 30-35 hours per week</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Document Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                <div className="mt-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div className="text-xs">3 employees with expiring documents</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Employees</CardTitle>
              <CardDescription>Based on shift completion and client feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Employee</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Shifts Completed</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Hours Worked</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Punctuality</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Client Rating</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Performance Score</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {[
                      { name: "John Smith", shifts: 22, hours: 176, punctuality: "98%", rating: "4.9/5", score: "95" },
                      {
                        name: "Sarah Johnson",
                        shifts: 20,
                        hours: 160,
                        punctuality: "100%",
                        rating: "4.8/5",
                        score: "94",
                      },
                      {
                        name: "Michael Brown",
                        shifts: 18,
                        hours: 144,
                        punctuality: "97%",
                        rating: "4.7/5",
                        score: "92",
                      },
                      { name: "Emma Wilson", shifts: 21, hours: 168, punctuality: "95%", rating: "4.8/5", score: "91" },
                      { name: "David Lee", shifts: 19, hours: 152, punctuality: "96%", rating: "4.6/5", score: "90" },
                    ].map((employee, i) => (
                      <tr
                        key={i}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{employee.name}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">{employee.shifts}</td>
                        <td className="p-4 align-middle">{employee.hours}</td>
                        <td className="p-4 align-middle">{employee.punctuality}</td>
                        <td className="p-4 align-middle">{employee.rating}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full rounded-full"
                                style={{ width: `${employee.score}%` }}
                              ></div>
                            </div>
                            <span className="font-medium">{employee.score}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">
                  View All Employees
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employee Availability</CardTitle>
              <CardDescription>Availability distribution across weekdays</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex flex-col justify-center">
                {/* Heatmap-style visualization */}
                <div className="grid grid-cols-7 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <span className="text-xs font-medium">{day}</span>
                      <div className="flex flex-col gap-1">
                        <div
                          className={`h-8 w-16 rounded ${i === 5 || i === 6 ? "bg-primary/30" : "bg-primary/90"} flex items-center justify-center text-xs text-white font-medium`}
                        >
                          Morning
                        </div>
                        <div
                          className={`h-8 w-16 rounded ${i === 5 || i === 6 ? "bg-primary/40" : "bg-primary/80"} flex items-center justify-center text-xs text-white font-medium`}
                        >
                          Afternoon
                        </div>
                        <div
                          className={`h-8 w-16 rounded ${i === 5 || i === 6 ? "bg-primary/60" : "bg-primary/70"} flex items-center justify-center text-xs text-white font-medium`}
                        >
                          Evening
                        </div>
                        <div
                          className={`h-8 w-16 rounded ${i === 5 || i === 6 ? "bg-primary/80" : "bg-primary/50"} flex items-center justify-center text-xs text-white font-medium`}
                        >
                          Night
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-sm bg-primary/30"></div>
                      <span className="text-xs">Low</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-sm bg-primary/60"></div>
                      <span className="text-xs">Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-sm bg-primary/90"></div>
                      <span className="text-xs">High</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£24,565</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
                <div className="mt-4 flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <div className="text-xs text-green-500">Trending upward</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Invoice Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£2,865</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
                <div className="mt-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div className="text-xs">Based on 9 invoices</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">On-time payment rate</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Client</CardTitle>
              <CardDescription>Top clients by revenue this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Client</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Shifts</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Hours</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Revenue</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">% of Total</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {[
                      {
                        client: "Manchester Shopping Ltd",
                        type: "Retail",
                        shifts: 42,
                        hours: 336,
                        revenue: "£6,720",
                        percent: 27.4,
                      },
                      {
                        client: "London Office Spaces",
                        type: "Corporate",
                        shifts: 35,
                        hours: 280,
                        revenue: "£5,600",
                        percent: 22.8,
                      },
                      {
                        client: "Birmingham Events Co",
                        type: "Event",
                        shifts: 18,
                        hours: 144,
                        revenue: "£3,600",
                        percent: 14.7,
                      },
                      {
                        client: "Northern Retail Group",
                        type: "Retail",
                        shifts: 25,
                        hours: 200,
                        revenue: "£4,000",
                        percent: 16.3,
                      },
                      {
                        client: "Midlands Shopping Centers",
                        type: "Retail",
                        shifts: 22,
                        hours: 176,
                        revenue: "£3,520",
                        percent: 14.3,
                      },
                      {
                        client: "Other Clients",
                        type: "Various",
                        shifts: 8,
                        hours: 64,
                        revenue: "£1,125",
                        percent: 4.5,
                      },
                    ].map((client, i) => (
                      <tr
                        key={i}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle font-medium">{client.client}</td>
                        <td className="p-4 align-middle">
                          <Badge variant="outline">{client.type}</Badge>
                        </td>
                        <td className="p-4 align-middle">{client.shifts}</td>
                        <td className="p-4 align-middle">{client.hours}</td>
                        <td className="p-4 align-middle font-medium">{client.revenue}</td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-full max-w-[100px] bg-muted rounded-full overflow-hidden">
                              <div
                                className="bg-primary h-full rounded-full"
                                style={{ width: `${client.percent}%` }}
                              ></div>
                            </div>
                            <span>{client.percent}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
              <CardDescription>Revenue trend over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex flex-col justify-center">
                {/* Area Chart Visualization */}
                <div className="relative h-[200px] w-full">
                  <div className="absolute bottom-0 left-0 w-full h-px bg-border"></div>
                  <div className="absolute left-0 top-0 h-full w-px bg-border"></div>

                  <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                    {/* Area fill */}
                    <path
                      d="M0,180 L100,160 L200,140 L300,120 L400,90 L500,70 L600,50 L600,200 L0,200 Z"
                      fill="hsl(221.2, 83.2%, 53.3%)"
                      fillOpacity="0.2"
                    />

                    {/* Line */}
                    <path
                      d="M0,180 L100,160 L200,140 L300,120 L400,90 L500,70 L600,50"
                      fill="none"
                      stroke="hsl(221.2, 83.2%, 53.3%)"
                      strokeWidth="3"
                    />

                    {/* Data points */}
                    <circle cx="0" cy="180" r="4" fill="hsl(221.2, 83.2%, 53.3%)" />
                    <circle cx="100" cy="160" r="4" fill="hsl(221.2, 83.2%, 53.3%)" />
                    <circle cx="200" cy="140" r="4" fill="hsl(221.2, 83.2%, 53.3%)" />
                    <circle cx="300" cy="120" r="4" fill="hsl(221.2, 83.2%, 53.3%)" />
                    <circle cx="400" cy="90" r="4" fill="hsl(221.2, 83.2%, 53.3%)" />
                    <circle cx="500" cy="70" r="4" fill="hsl(221.2, 83.2%, 53.3%)" />
                    <circle cx="600" cy="50" r="4" fill="hsl(221.2, 83.2%, 53.3%)" />
                  </svg>

                  <div className="absolute bottom-[-25px] w-full flex justify-between text-xs text-muted-foreground">
                    <span>Dec</span>
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                  </div>

                  <div className="absolute left-[-40px] h-full flex flex-col justify-between items-end text-xs text-muted-foreground">
                    <span>£30k</span>
                    <span>£20k</span>
                    <span>£10k</span>
                    <span>£0</span>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button variant="outline" size="sm">
                    View Detailed Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
