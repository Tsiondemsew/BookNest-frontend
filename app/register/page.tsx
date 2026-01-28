"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookNestLogo, EyeIcon, EyeOffIcon, BookIcon, PenIcon, CheckIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const roles: { id: UserRole; name: string; description: string; icon: React.ElementType }[] = [
  { id: "reader", name: "Reader", description: "Browse, purchase and read books", icon: BookIcon },
  { id: "author", name: "Author", description: "Publish and sell your books", icon: PenIcon },
]

export default function RegisterPage() {
  const { register, isLoading } = useAuth()
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("reader")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (step === 1) {
      if (!name || !email) {
        setError("Please fill in all fields")
        return
      }
      setStep(2)
      return
    }

    if (!password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    try {
      await register(name, email, password, selectedRole)
    } catch {
      setError("Registration failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-primary/5 items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <div className="w-64 h-64 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <BookNestLogo className="w-32 h-32 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Start your reading journey</h2>
          <p className="text-muted-foreground">
            Join thousands of readers and authors in the ultimate digital reading platform.
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <BookNestLogo className="w-10 h-10" />
            <span className="text-2xl font-semibold text-foreground">BookNest</span>
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">{step === 1 ? "Tell us about yourself" : "Secure your account"}</p>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className={cn("flex-1 h-1 rounded-full", step >= 1 ? "bg-primary" : "bg-muted")} />
            <div className={cn("flex-1 h-1 rounded-full", step >= 2 ? "bg-primary" : "bg-muted")} />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-3">
                  <Label>I want to join as</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={cn(
                          "relative p-4 rounded-xl border-2 text-left transition-all",
                          selectedRole === role.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50",
                        )}
                      >
                        {selectedRole === role.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <CheckIcon className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                        <role.icon className="w-6 h-6 text-primary mb-2" />
                        <p className="font-medium text-foreground">{role.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full h-12">
                  Continue
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-12">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 h-12" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </div>
              </>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
