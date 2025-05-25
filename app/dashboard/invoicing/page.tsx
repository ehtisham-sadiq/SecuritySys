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
import { Plus, Search, Eye, Download, FileText, Calendar, DollarSign } from "lucide-react"

// Mock data for invoices
const mockInvoices = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    client: "Westfield Group",
    amount: 4500.0,
    status: "paid",
    issueDate: "2024-01-01",
    dueDate: "2024-01-31",
    paidDate: "2024-01-28",
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    client: "AEG Live",
    amount: 6750.0,
    status: "pending",
    issueDate: "2024-01-15",
    dueDate: "2024-02-14",
    paidDate: null,
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-003",
    client: "HSBC",
    amount: 5200.0,
    status: "overdue",
    issueDate: "2023-12-15",
    dueDate: "2024-01-14",
    paidDate: null,
  },
]

// Mock data for payroll
const mockPayroll = [
  {
    id: 1,
    employeeName: "John Smith",
    period: "January 2024",
    hoursWorked: 160,
    hourlyRate: 15.5,
    grossPay: 2480.0,
    deductions: 496.0,
    netPay: 1984.0,
    status: "processed",
    payDate: "2024-01-31",
  },
  {
    id: 2,
    employeeName: "Sarah Johnson",
    period: "January 2024",
    hoursWorked: 168,
    hourlyRate: 16.0,
    grossPay: 2688.0,
    deductions: 537.6,
    netPay: 2150.4,
    status: "processed",
    payDate: "2024-01-31",
  },
  {
    id: 3,
    employeeName: "Mike Wilson",
    period: "January 2024",
    hoursWorked: 152,
    hourlyRate: 15.0,
    grossPay: 2280.0,
    deductions: 456.0,
    netPay: 1824.0,
    status: "pending",
    payDate: null,
  },
]

export default function InvoicingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("invoices")

  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [selectedPayroll, setSelectedPayroll] = useState<any>(null)
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false)
  const [showPayrollDialog, setShowPayrollDialog] = useState(false)

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPayrollStatusColor = (status: string) => {
    switch (status) {
      case "processed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredInvoices = mockInvoices.filter(
    (invoice) =>
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPayroll = mockPayroll.filter(
    (payroll) =>
      payroll.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payroll.period.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice)
    setShowInvoiceDialog(true)
  }

  const handleDownloadInvoice = (invoice: any) => {
    const link = document.createElement("a")
    link.href = "/placeholder.pdf"
    link.download = `${invoice.invoiceNumber}.pdf`
    link.click()
    alert(`Downloading ${invoice.invoiceNumber}...`)
  }

  const handleViewPayroll = (payroll: any) => {
    setSelectedPayroll(payroll)
    setShowPayrollDialog(true)
  }

  const handleDownloadPayslip = (payroll: any) => {
    const link = document.createElement("a")
    link.href = "/placeholder.pdf"
    link.download = `Payslip_${payroll.employeeName}_${payroll.period}.pdf`
    link.click()
    alert(`Downloading payslip for ${payroll.employeeName}...`)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Invoicing & Payroll</h1>
          <p className="text-muted-foreground">Manage invoices and employee payroll</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {activeTab === "invoices" ? "Create Invoice" : "Process Payroll"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{activeTab === "invoices" ? "Create New Invoice" : "Process Payroll"}</DialogTitle>
              <DialogDescription>
                {activeTab === "invoices" ? "Create a new invoice for a client." : "Process payroll for employees."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {activeTab === "invoices" ? (
                <>
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
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="Enter amount" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="period">Pay Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jan2024">January 2024</SelectItem>
                        <SelectItem value="feb2024">February 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="employees">Employees</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employees" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Employees</SelectItem>
                        <SelectItem value="active">Active Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>
            <Button type="submit">{activeTab === "invoices" ? "Create Invoice" : "Process Payroll"}</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <div className="grid gap-4">
            {filteredInvoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {invoice.invoiceNumber}
                      </CardTitle>
                      <CardDescription>Client: {invoice.client}</CardDescription>
                    </div>
                    <Badge className={getInvoiceStatusColor(invoice.status)}>{invoice.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">£{invoice.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Due: {invoice.dueDate}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Issued: {invoice.issueDate}</div>
                      {invoice.paidDate && (
                        <div className="text-sm text-muted-foreground">Paid: {invoice.paidDate}</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewInvoice(invoice)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadInvoice(invoice)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <div className="grid gap-4">
            {filteredPayroll.map((payroll) => (
              <Card key={payroll.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{payroll.employeeName}</CardTitle>
                      <CardDescription>
                        {payroll.period} • {payroll.hoursWorked} hours
                      </CardDescription>
                    </div>
                    <Badge className={getPayrollStatusColor(payroll.status)}>{payroll.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="grid grid-cols-3 gap-4 flex-1">
                      <div>
                        <div className="text-sm text-muted-foreground">Gross Pay</div>
                        <div className="font-medium">£{payroll.grossPay.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Deductions</div>
                        <div className="font-medium">£{payroll.deductions.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Net Pay</div>
                        <div className="font-medium text-green-600">£{payroll.netPay.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewPayroll(payroll)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Payslip
                      </Button>
                      {payroll.status === "pending" && <Button size="sm">Process Payment</Button>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Invoice View Dialog */}
      <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>Complete invoice information</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="grid gap-4 py-4">
              <div className="text-center border-b pb-4">
                <h3 className="text-lg font-semibold">Security Services Ltd.</h3>
                <p className="text-sm text-muted-foreground">Professional Security Solutions</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Invoice Number</Label>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Client</Label>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.client}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Issue Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.issueDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Due Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.dueDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Amount</Label>
                  <p className="text-lg font-semibold">£{selectedInvoice.amount.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={getInvoiceStatusColor(selectedInvoice.status)}>{selectedInvoice.status}</Badge>
                </div>
              </div>
              {selectedInvoice.paidDate && (
                <div>
                  <Label className="text-sm font-medium">Paid Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedInvoice.paidDate}</p>
                </div>
              )}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => handleDownloadInvoice(selectedInvoice)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">Send Reminder</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payroll View Dialog */}
      <Dialog open={showPayrollDialog} onOpenChange={setShowPayrollDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Payslip Details</DialogTitle>
            <DialogDescription>Employee payroll information</DialogDescription>
          </DialogHeader>
          {selectedPayroll && (
            <div className="grid gap-4 py-4">
              <div className="text-center border-b pb-4">
                <h3 className="text-lg font-semibold">Security Services Ltd.</h3>
                <p className="text-sm text-muted-foreground">Employee Payslip</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Employee Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedPayroll.employeeName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Pay Period</Label>
                  <p className="text-sm text-muted-foreground">{selectedPayroll.period}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Hours Worked</Label>
                  <p className="text-sm text-muted-foreground">{selectedPayroll.hoursWorked}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Hourly Rate</Label>
                  <p className="text-sm text-muted-foreground">£{selectedPayroll.hourlyRate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Gross Pay</Label>
                  <p className="text-sm text-muted-foreground">£{selectedPayroll.grossPay.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Deductions</Label>
                  <p className="text-sm text-muted-foreground">£{selectedPayroll.deductions.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Net Pay</Label>
                  <p className="text-lg font-semibold text-green-600">£{selectedPayroll.netPay.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={getPayrollStatusColor(selectedPayroll.status)}>{selectedPayroll.status}</Badge>
                </div>
              </div>
              {selectedPayroll.payDate && (
                <div>
                  <Label className="text-sm font-medium">Pay Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedPayroll.payDate}</p>
                </div>
              )}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => handleDownloadPayslip(selectedPayroll)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Payslip
                </Button>
                <Button variant="outline">Email Payslip</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
