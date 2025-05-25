import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search, FileText, Download, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function InvoicingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Invoicing & Payroll</h2>
        <div className="flex items-center gap-2">
          <Button variant="default">
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="grid w-full sm:max-w-sm items-center gap-1.5">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search invoices..." className="w-full pl-8" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  <SelectItem value="manchester">Manchester Shopping Ltd</SelectItem>
                  <SelectItem value="london">London Office Spaces</SelectItem>
                  <SelectItem value="birmingham">Birmingham Events Co</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="month">
                <SelectTrigger>
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Invoice #</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Client</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Due Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {[
                      {
                        id: "INV-001",
                        client: "Manchester Shopping Ltd",
                        amount: "£2,450",
                        date: "2023-05-01",
                        dueDate: "2023-05-15",
                        status: "Paid",
                      },
                      {
                        id: "INV-002",
                        client: "London Office Spaces",
                        amount: "£3,200",
                        date: "2023-05-05",
                        dueDate: "2023-05-19",
                        status: "Sent",
                      },
                      {
                        id: "INV-003",
                        client: "Birmingham Events Co",
                        amount: "£1,800",
                        date: "2023-05-10",
                        dueDate: "2023-05-24",
                        status: "Draft",
                      },
                      {
                        id: "INV-004",
                        client: "Northern Retail Group",
                        amount: "£4,100",
                        date: "2023-04-20",
                        dueDate: "2023-05-04",
                        status: "Overdue",
                      },
                      {
                        id: "INV-005",
                        client: "Midlands Shopping Centers",
                        amount: "£2,900",
                        date: "2023-04-25",
                        dueDate: "2023-05-09",
                        status: "Paid",
                      },
                    ].map((invoice, i) => (
                      <tr
                        key={i}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle font-medium">{invoice.id}</td>
                        <td className="p-4 align-middle">{invoice.client}</td>
                        <td className="p-4 align-middle">{invoice.amount}</td>
                        <td className="p-4 align-middle">{new Date(invoice.date).toLocaleDateString()}</td>
                        <td className="p-4 align-middle">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                        <td className="p-4 align-middle">
                          <Badge
                            variant={
                              invoice.status === "Paid"
                                ? "default"
                                : invoice.status === "Sent"
                                  ? "outline"
                                  : invoice.status === "Draft"
                                    ? "secondary"
                                    : "destructive"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[625px]">
                                <DialogHeader>
                                  <DialogTitle>Invoice {invoice.id}</DialogTitle>
                                  <DialogDescription>Invoice details for {invoice.client}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6 py-4">
                                  <div className="flex justify-between">
                                    <div>
                                      <h3 className="font-semibold">Security Management System</h3>
                                      <p className="text-sm text-muted-foreground">123 Security Street</p>
                                      <p className="text-sm text-muted-foreground">London, UK</p>
                                    </div>
                                    <div className="text-right">
                                      <h3 className="font-semibold">Invoice #{invoice.id}</h3>
                                      <p className="text-sm text-muted-foreground">
                                        Date: {new Date(invoice.date).toLocaleDateString()}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <h3 className="font-semibold">Bill To:</h3>
                                    <p className="text-sm">{invoice.client}</p>
                                    <p className="text-sm text-muted-foreground">Client Address Line 1</p>
                                    <p className="text-sm text-muted-foreground">Client City, UK</p>
                                  </div>

                                  <div>
                                    <h3 className="font-semibold mb-2">Invoice Items:</h3>
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="border-b">
                                          <th className="py-2 text-left">Description</th>
                                          <th className="py-2 text-right">Quantity</th>
                                          <th className="py-2 text-right">Rate</th>
                                          <th className="py-2 text-right">Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr className="border-b">
                                          <td className="py-2">Security Services - Day Shift</td>
                                          <td className="py-2 text-right">120 hours</td>
                                          <td className="py-2 text-right">£15.00/hr</td>
                                          <td className="py-2 text-right">£1,800.00</td>
                                        </tr>
                                        <tr className="border-b">
                                          <td className="py-2">Security Services - Night Shift</td>
                                          <td className="py-2 text-right">40 hours</td>
                                          <td className="py-2 text-right">£18.00/hr</td>
                                          <td className="py-2 text-right">£720.00</td>
                                        </tr>
                                        <tr>
                                          <td colSpan={2}></td>
                                          <td className="py-2 text-right font-medium">Subtotal:</td>
                                          <td className="py-2 text-right">£2,520.00</td>
                                        </tr>
                                        <tr>
                                          <td colSpan={2}></td>
                                          <td className="py-2 text-right font-medium">VAT (20%):</td>
                                          <td className="py-2 text-right">£504.00</td>
                                        </tr>
                                        <tr>
                                          <td colSpan={2}></td>
                                          <td className="py-2 text-right font-medium">Total:</td>
                                          <td className="py-2 text-right font-bold">{invoice.amount}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>

                                  <div>
                                    <h3 className="font-semibold mb-1">Payment Terms:</h3>
                                    <p className="text-sm text-muted-foreground">
                                      Payment due within 14 days of invoice date.
                                    </p>
                                  </div>

                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline">
                                      <Download className="mr-2 h-4 w-4" />
                                      Download PDF
                                    </Button>
                                    <Button>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Print Invoice
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
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

        <TabsContent value="payroll" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="grid w-full sm:max-w-sm items-center gap-1.5">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search payroll..." className="w-full pl-8" />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <Select defaultValue="month">
                <SelectTrigger>
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="default">Generate Payroll</Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Employee</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Pay Period</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Hours</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Rate</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Gross Pay</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Deductions</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Net Pay</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {[
                      {
                        employee: "John Smith",
                        period: "May 2023",
                        hours: 160,
                        rate: "£15.00",
                        gross: "£2,400.00",
                        deductions: "£480.00",
                        net: "£1,920.00",
                        status: "Paid",
                      },
                      {
                        employee: "Sarah Johnson",
                        period: "May 2023",
                        hours: 168,
                        rate: "£18.00",
                        gross: "£3,024.00",
                        deductions: "£604.80",
                        net: "£2,419.20",
                        status: "Paid",
                      },
                      {
                        employee: "Michael Brown",
                        period: "May 2023",
                        hours: 152,
                        rate: "£14.50",
                        gross: "£2,204.00",
                        deductions: "£440.80",
                        net: "£1,763.20",
                        status: "Processed",
                      },
                      {
                        employee: "Emma Wilson",
                        period: "May 2023",
                        hours: 144,
                        rate: "£15.50",
                        gross: "£2,232.00",
                        deductions: "£446.40",
                        net: "£1,785.60",
                        status: "Processed",
                      },
                      {
                        employee: "David Lee",
                        period: "May 2023",
                        hours: 136,
                        rate: "£14.00",
                        gross: "£1,904.00",
                        deductions: "£380.80",
                        net: "£1,523.20",
                        status: "Pending",
                      },
                    ].map((payroll, i) => (
                      <tr
                        key={i}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {payroll.employee
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{payroll.employee}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">{payroll.period}</td>
                        <td className="p-4 align-middle">{payroll.hours}</td>
                        <td className="p-4 align-middle">{payroll.rate}</td>
                        <td className="p-4 align-middle">{payroll.gross}</td>
                        <td className="p-4 align-middle">{payroll.deductions}</td>
                        <td className="p-4 align-middle font-medium">{payroll.net}</td>
                        <td className="p-4 align-middle">
                          <Badge
                            variant={
                              payroll.status === "Paid"
                                ? "default"
                                : payroll.status === "Processed"
                                  ? "outline"
                                  : "secondary"
                            }
                          >
                            {payroll.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[625px]">
                                <DialogHeader>
                                  <DialogTitle>Payroll Details</DialogTitle>
                                  <DialogDescription>
                                    Payroll information for {payroll.employee} - {payroll.period}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6 py-4">
                                  <div className="flex justify-between">
                                    <div>
                                      <h3 className="font-semibold">Employee Information</h3>
                                      <p className="text-sm">{payroll.employee}</p>
                                      <p className="text-sm text-muted-foreground">Employee ID: EMP-{1000 + i}</p>
                                      <p className="text-sm text-muted-foreground">Position: Security Officer</p>
                                    </div>
                                    <div className="text-right">
                                      <h3 className="font-semibold">Pay Period</h3>
                                      <p className="text-sm">{payroll.period}</p>
                                      <p className="text-sm text-muted-foreground">Status: {payroll.status}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <h3 className="font-semibold mb-2">Earnings:</h3>
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="border-b">
                                          <th className="py-2 text-left">Description</th>
                                          <th className="py-2 text-right">Hours</th>
                                          <th className="py-2 text-right">Rate</th>
                                          <th className="py-2 text-right">Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr className="border-b">
                                          <td className="py-2">Regular Hours</td>
                                          <td className="py-2 text-right">{payroll.hours - 8}</td>
                                          <td className="py-2 text-right">{payroll.rate}</td>
                                          <td className="py-2 text-right">
                                            £
                                            {(
                                              (payroll.hours - 8) *
                                              Number.parseFloat(payroll.rate.replace("£", ""))
                                            ).toFixed(2)}
                                          </td>
                                        </tr>
                                        <tr className="border-b">
                                          <td className="py-2">Overtime Hours</td>
                                          <td className="py-2 text-right">8</td>
                                          <td className="py-2 text-right">
                                            £{(Number.parseFloat(payroll.rate.replace("£", "")) * 1.5).toFixed(2)}
                                          </td>
                                          <td className="py-2 text-right">
                                            £{(8 * Number.parseFloat(payroll.rate.replace("£", "")) * 1.5).toFixed(2)}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan={3} className="py-2 text-right font-medium">
                                            Gross Pay:
                                          </td>
                                          <td className="py-2 text-right">{payroll.gross}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>

                                  <div>
                                    <h3 className="font-semibold mb-2">Deductions:</h3>
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="border-b">
                                          <th className="py-2 text-left">Description</th>
                                          <th className="py-2 text-right">Amount</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr className="border-b">
                                          <td className="py-2">Income Tax</td>
                                          <td className="py-2 text-right">
                                            £{(Number.parseFloat(payroll.deductions.replace("£", "")) * 0.7).toFixed(2)}
                                          </td>
                                        </tr>
                                        <tr className="border-b">
                                          <td className="py-2">National Insurance</td>
                                          <td className="py-2 text-right">
                                            £{(Number.parseFloat(payroll.deductions.replace("£", "")) * 0.3).toFixed(2)}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="py-2 text-right font-medium">Total Deductions:</td>
                                          <td className="py-2 text-right">{payroll.deductions}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>

                                  <div className="border-t pt-4">
                                    <div className="flex justify-between items-center">
                                      <h3 className="font-semibold">Net Pay:</h3>
                                      <span className="text-xl font-bold">{payroll.net}</span>
                                    </div>
                                  </div>

                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline">
                                      <Download className="mr-2 h-4 w-4" />
                                      Download Payslip
                                    </Button>
                                    <Button>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Print Payslip
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
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
