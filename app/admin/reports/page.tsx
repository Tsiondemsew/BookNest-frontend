"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Flag,
  AlertTriangle,
  MessageSquare,
  BookOpen,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  ShieldAlert,
  Ban,
} from "lucide-react"

const reports = [
  {
    id: 1,
    type: "review",
    title: "Inappropriate Review Content",
    target: "Review on 'The Art of Focus'",
    reporter: "Sarah Mitchell",
    reporterAvatar: "/woman-portrait.png",
    reason: "Contains offensive language and personal attacks against the author",
    status: "pending",
    priority: "high",
    date: "Dec 28, 2025",
  },
  {
    id: 2,
    type: "book",
    title: "Copyright Infringement",
    target: "Digital Art Guide",
    reporter: "Emily Rodriguez",
    reporterAvatar: "/latina-portrait.png",
    reason: "Contains copyrighted images without proper attribution or licensing",
    status: "investigating",
    priority: "urgent",
    date: "Dec 27, 2025",
  },
  {
    id: 3,
    type: "user",
    title: "Spam Account",
    target: "spam_user123",
    reporter: "System",
    reporterAvatar: "",
    reason: "Multiple spam reviews and suspicious activity detected",
    status: "resolved",
    priority: "medium",
    date: "Dec 26, 2025",
  },
  {
    id: 4,
    type: "review",
    title: "Fake Review",
    target: "Review on 'Mindful Living'",
    reporter: "James Chen",
    reporterAvatar: "/asian-man-portrait.png",
    reason: "Suspected fake review - user has not purchased the book",
    status: "pending",
    priority: "medium",
    date: "Dec 25, 2025",
  },
  {
    id: 5,
    type: "book",
    title: "Misleading Content",
    target: "Cooking Basics",
    reporter: "Anonymous",
    reporterAvatar: "",
    reason: "Book description does not match actual content",
    status: "dismissed",
    priority: "low",
    date: "Dec 23, 2025",
  },
]

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<(typeof reports)[0] | null>(null)
  const [actionDialog, setActionDialog] = useState<"view" | "resolve" | "dismiss" | null>(null)
  const [resolutionNote, setResolutionNote] = useState("")

  const pendingReports = reports.filter((r) => r.status === "pending" || r.status === "investigating")
  const resolvedReports = reports.filter((r) => r.status === "resolved" || r.status === "dismissed")

  const handleAction = (report: (typeof reports)[0], action: "view" | "resolve" | "dismiss") => {
    setSelectedReport(report)
    setActionDialog(action)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "review":
        return <MessageSquare className="h-4 w-4" />
      case "book":
        return <BookOpen className="h-4 w-4" />
      case "user":
        return <User className="h-4 w-4" />
      default:
        return <Flag className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-700 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Reports & Moderation</h1>
          <p className="text-muted-foreground mt-1">Review and handle flagged content</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-red-100 p-2">
                <ShieldAlert className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingReports.length}</p>
                <p className="text-sm text-muted-foreground">Pending Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-orange-100 p-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reports.filter((r) => r.priority === "urgent").length}</p>
                <p className="text-sm text-muted-foreground">Urgent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-100 p-2">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reports.filter((r) => r.status === "investigating").length}</p>
                <p className="text-sm text-muted-foreground">Investigating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-100 p-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{resolvedReports.length}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            Active Reports
            <Badge variant="destructive" className="ml-2">
              {pendingReports.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="all">All Reports</TabsTrigger>
        </TabsList>

        {["pending", "resolved", "all"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4 space-y-4">
            {(tab === "all" ? reports : tab === "pending" ? pendingReports : resolvedReports).map((report) => (
              <Card
                key={report.id}
                className={
                  report.priority === "urgent"
                    ? "border-red-300 bg-red-50/30"
                    : report.priority === "high"
                      ? "border-orange-200 bg-orange-50/30"
                      : ""
                }
              >
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`rounded-full p-2.5 ${
                          report.type === "review"
                            ? "bg-purple-100"
                            : report.type === "book"
                              ? "bg-blue-100"
                              : "bg-amber-100"
                        }`}
                      >
                        {getTypeIcon(report.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{report.title}</h3>
                          <Badge variant="outline" className={getPriorityColor(report.priority)}>
                            {report.priority}
                          </Badge>
                          <Badge
                            variant={
                              report.status === "resolved"
                                ? "outline"
                                : report.status === "dismissed"
                                  ? "secondary"
                                  : report.status === "investigating"
                                    ? "default"
                                    : "destructive"
                            }
                            className={
                              report.status === "resolved" ? "bg-green-50 text-green-700 border-green-200" : ""
                            }
                          >
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium">Target:</span> {report.target}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">{report.reason}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={report.reporterAvatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">{report.reporter[0]}</AvatarFallback>
                            </Avatar>
                            <span>Reported by {report.reporter}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{report.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 lg:flex-col">
                      <Button variant="outline" size="sm" onClick={() => handleAction(report, "view")}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      {(report.status === "pending" || report.status === "investigating") && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 bg-transparent"
                            onClick={() => handleAction(report, "resolve")}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-muted-foreground"
                            onClick={() => handleAction(report, "dismiss")}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Dismiss
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      {/* View Report Dialog */}
      <Dialog open={actionDialog === "view"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-full p-2.5 ${
                    selectedReport.type === "review"
                      ? "bg-purple-100"
                      : selectedReport.type === "book"
                        ? "bg-blue-100"
                        : "bg-amber-100"
                  }`}
                >
                  {getTypeIcon(selectedReport.type)}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedReport.title}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{selectedReport.type} Report</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Target</p>
                  <p className="font-medium">{selectedReport.target}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reason</p>
                  <p className="text-sm">{selectedReport.reason}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Priority</p>
                    <Badge variant="outline" className={getPriorityColor(selectedReport.priority)}>
                      {selectedReport.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge variant="secondary">{selectedReport.status}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedReport.reporterAvatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedReport.reporter[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Reported by {selectedReport.reporter}</p>
                  <p className="text-xs text-muted-foreground">{selectedReport.date}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Close
            </Button>
            {selectedReport?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActionDialog("dismiss")
                  }}
                >
                  Dismiss
                </Button>
                <Button
                  onClick={() => {
                    setActionDialog("resolve")
                  }}
                >
                  Take Action
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resolve Report Dialog */}
      <Dialog open={actionDialog === "resolve"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Report</DialogTitle>
            <DialogDescription>Take action on this report and add resolution notes</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-muted">
              <p className="font-medium">{selectedReport?.title}</p>
              <p className="text-sm text-muted-foreground">{selectedReport?.target}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Quick Actions</p>
              <div className="flex flex-wrap gap-2">
                {selectedReport?.type === "review" && (
                  <Button variant="outline" size="sm">
                    <XCircle className="mr-2 h-4 w-4" />
                    Remove Review
                  </Button>
                )}
                {selectedReport?.type === "book" && (
                  <Button variant="outline" size="sm">
                    <Ban className="mr-2 h-4 w-4" />
                    Unpublish Book
                  </Button>
                )}
                {selectedReport?.type === "user" && (
                  <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                    <Ban className="mr-2 h-4 w-4" />
                    Suspend User
                  </Button>
                )}
              </div>
            </div>
            <Textarea
              placeholder="Add resolution notes..."
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button onClick={() => setActionDialog(null)}>Mark as Resolved</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dismiss Report Dialog */}
      <Dialog open={actionDialog === "dismiss"} onOpenChange={() => setActionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dismiss Report</DialogTitle>
            <DialogDescription>
              Are you sure you want to dismiss this report? No action will be taken.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea placeholder="Optional: Add a note explaining why this report was dismissed..." rows={3} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialog(null)}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={() => setActionDialog(null)}>
              Dismiss Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
