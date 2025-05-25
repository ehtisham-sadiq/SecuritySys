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
import { Plus, Search, Eye, Download, FileText, Calendar, User } from "lucide-react"

// Mock data for documents
const mockDocuments = [
  {
    id: 1,
    title: "SIA License",
    employeeName: "John Smith",
    documentType: "License",
    status: "approved",
    uploadDate: "2024-01-10",
    expiryDate: "2025-01-10",
    fileSize: "2.3 MB",
    fileType: "PDF",
  },
  {
    id: 2,
    title: "ID Verification",
    employeeName: "Sarah Johnson",
    documentType: "Identification",
    status: "pending",
    uploadDate: "2024-01-12",
    expiryDate: "2026-01-12",
    fileSize: "1.8 MB",
    fileType: "PDF",
  },
  {
    id: 3,
    title: "Training Certificate",
    employeeName: "Mike Wilson",
    documentType: "Training",
    status: "rejected",
    uploadDate: "2024-01-08",
    expiryDate: "2025-01-08",
    fileSize: "1.2 MB",
    fileType: "PDF",
  },
  {
    id: 4,
    title: "Background Check",
    employeeName: "Emma Davis",
    documentType: "Background",
    status: "approved",
    uploadDate: "2024-01-05",
    expiryDate: "2025-01-05",
    fileSize: "3.1 MB",
    fileType: "PDF",
  },
]

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [documents, setDocuments] = useState(mockDocuments)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleViewDocument = (document: any) => {
    setSelectedDocument(document)
    setShowViewDialog(true)
  }

  const handleDownloadDocument = (document: any) => {
    // Simulate download
    const link = document.createElement("a")
    link.href = "/placeholder.pdf"
    link.download = `${document.title}.pdf`
    link.click()
    alert(`Downloading ${document.title}...`)
  }

  const handleApproveDocument = (documentId: number) => {
    setDocuments((docs) => docs.map((doc) => (doc.id === documentId ? { ...doc, status: "approved" } : doc)))
    alert("Document approved successfully!")
  }

  const handleRejectDocument = (documentId: number) => {
    setDocuments((docs) => docs.map((doc) => (doc.id === documentId ? { ...doc, status: "rejected" } : doc)))
    alert("Document rejected.")
  }

  const filteredDocuments = documents.filter((document) => {
    const matchesSearch =
      document.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.documentType.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return matchesSearch && document.status === "pending"
    if (activeTab === "approved") return matchesSearch && document.status === "approved"
    if (activeTab === "rejected") return matchesSearch && document.status === "rejected"

    return matchesSearch
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Document Management</h1>
          <p className="text-muted-foreground">Manage employee documents and certifications</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Upload a new document to the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="employee">Employee</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="mike">Mike Wilson</SelectItem>
                    <SelectItem value="emma">Emma Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="documentType">Document Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="license">SIA License</SelectItem>
                    <SelectItem value="id">ID Verification</SelectItem>
                    <SelectItem value="training">Training Certificate</SelectItem>
                    <SelectItem value="background">Background Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Document Title</Label>
                <Input id="title" placeholder="Enter document title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file">File</Label>
                <Input id="file" type="file" accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>
            <Button type="submit">Upload Document</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4">
            {filteredDocuments.map((document) => (
              <Card key={document.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {document.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {document.employeeName}
                        </span>
                        <span>{document.documentType}</span>
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(document.status)}>{document.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Uploaded: {document.uploadDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Expires: {document.expiryDate}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {document.fileType} • {document.fileSize}
                      </div>
                      <div className="text-sm text-muted-foreground">Type: {document.documentType}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDocument(document)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadDocument(document)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      {document.status === "pending" && (
                        <>
                          <Button size="sm" variant="default" onClick={() => handleApproveDocument(document.id)}>
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRejectDocument(document.id)}>
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      {/* Document View Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Document Viewer</DialogTitle>
            <DialogDescription>Preview and review document details</DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Document Title</Label>
                  <p className="text-sm text-muted-foreground">{selectedDocument.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Employee</Label>
                  <p className="text-sm text-muted-foreground">{selectedDocument.employeeName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Document Type</Label>
                  <p className="text-sm text-muted-foreground">{selectedDocument.documentType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={getStatusColor(selectedDocument.status)}>{selectedDocument.status}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Upload Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedDocument.uploadDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Expiry Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedDocument.expiryDate}</p>
                </div>
              </div>
              <div className="border rounded-lg p-4 bg-muted/50 min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Document Preview</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedDocument.fileType} • {selectedDocument.fileSize}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => handleDownloadDocument(selectedDocument)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                {selectedDocument.status === "pending" && (
                  <>
                    <Button
                      onClick={() => {
                        handleApproveDocument(selectedDocument.id)
                        setShowViewDialog(false)
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleRejectDocument(selectedDocument.id)
                        setShowViewDialog(false)
                      }}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
