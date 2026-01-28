"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Download, TrendingUp, Wallet, ArrowUpRight, Calendar, CreditCard, Building } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const earningsData = [
  { month: "Jul", earnings: 1850 },
  { month: "Aug", earnings: 2100 },
  { month: "Sep", earnings: 1920 },
  { month: "Oct", earnings: 2450 },
  { month: "Nov", earnings: 2780 },
  { month: "Dec", earnings: 3200 },
]

const transactions = [
  { id: "TXN001", date: "Dec 28, 2025", type: "Sale", book: "The Art of Focus", amount: "$14.99", status: "completed" },
  { id: "TXN002", date: "Dec 27, 2025", type: "Sale", book: "Mindful Living", amount: "$9.99", status: "completed" },
  { id: "TXN003", date: "Dec 26, 2025", type: "Payout", book: "-", amount: "$1,500.00", status: "completed" },
  {
    id: "TXN004",
    date: "Dec 25, 2025",
    type: "Sale",
    book: "Digital Minimalism",
    amount: "$12.99",
    status: "completed",
  },
  { id: "TXN005", date: "Dec 24, 2025", type: "Sale", book: "The Art of Focus", amount: "$14.99", status: "pending" },
  { id: "TXN006", date: "Dec 23, 2025", type: "Refund", book: "Mindful Living", amount: "-$9.99", status: "completed" },
]

const payouts = [
  { id: "PAY001", date: "Dec 26, 2025", amount: "$1,500.00", method: "Bank Transfer", status: "completed" },
  { id: "PAY002", date: "Nov 26, 2025", amount: "$2,100.00", method: "Bank Transfer", status: "completed" },
  { id: "PAY003", date: "Oct 26, 2025", amount: "$1,850.00", method: "PayPal", status: "completed" },
  { id: "PAY004", date: "Sep 26, 2025", amount: "$1,420.00", method: "Bank Transfer", status: "completed" },
]

export default function EarningsPage() {
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Earnings & Payouts</h1>
          <p className="text-muted-foreground mt-1">Track your revenue and manage withdrawals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
            <DialogTrigger asChild>
              <Button>
                <Wallet className="mr-2 h-4 w-4" />
                Withdraw Funds
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Withdraw Funds</DialogTitle>
                <DialogDescription>Request a payout to your linked bank account or PayPal</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-2xl font-bold text-foreground">$3,247.50</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Withdrawal Amount</Label>
                  <Input id="amount" type="number" placeholder="Enter amount" defaultValue="3247.50" />
                  <p className="text-xs text-muted-foreground">Minimum withdrawal: $50.00</p>
                </div>
                <div className="space-y-2">
                  <Label>Payout Method</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-auto py-3 flex-col gap-1 bg-transparent">
                      <Building className="h-5 w-5" />
                      <span className="text-xs">Bank Transfer</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 flex-col gap-1 bg-transparent">
                      <CreditCard className="h-5 w-5" />
                      <span className="text-xs">PayPal</span>
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setWithdrawOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setWithdrawOpen(false)}>Request Withdrawal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-green-100 p-2">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <TrendingUp className="mr-1 h-3 w-3" />
                +15%
              </Badge>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">$24,580</p>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">$3,247.50</p>
              <p className="text-sm text-muted-foreground">Available Balance</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-amber-100 p-2">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">$3,200</p>
              <p className="text-sm text-muted-foreground">This Month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-blue-100 p-2">
                <ArrowUpRight className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">$6,870</p>
              <p className="text-sm text-muted-foreground">Total Payouts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Earnings Overview</CardTitle>
          <CardDescription>Your monthly earnings for the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              earnings: { label: "Earnings", color: "hsl(var(--primary))" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(value) => `$${value}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="var(--color-earnings)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-earnings)", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Transactions Tabs */}
      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">All Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Payout History</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Transaction History</CardTitle>
              <CardDescription>All sales, refunds, and payouts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                      <TableCell>{txn.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            txn.type === "Sale" ? "default" : txn.type === "Payout" ? "secondary" : "destructive"
                          }
                        >
                          {txn.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{txn.book}</TableCell>
                      <TableCell className={txn.amount.startsWith("-") ? "text-red-600" : "text-green-600"}>
                        {txn.amount}
                      </TableCell>
                      <TableCell>
                        <Badge variant={txn.status === "completed" ? "outline" : "secondary"}>{txn.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payouts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Payout History</CardTitle>
              <CardDescription>All completed and pending payouts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payout ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell className="font-mono text-sm">{payout.id}</TableCell>
                      <TableCell>{payout.date}</TableCell>
                      <TableCell className="font-semibold">{payout.amount}</TableCell>
                      <TableCell>{payout.method}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {payout.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
