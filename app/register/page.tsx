"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookNestLogo } from "@/components/icons";
import { BookOpen, Store, PenLine, EyeIcon, EyeOffIcon, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "reader" | "author" | "publisher";

export default function RegisterPage() {
  const router = useRouter();

  // Form State
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("reader");
  
  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

    // Step 1 Validation
    if (step === 1) {
      if (!displayName.trim() || !email.trim()) {
        setError("Please fill in your name and email.");
        return;
      }
      if (!email.includes("@") || !email.includes(".")) {
        setError("Please enter a valid email address.");
        return;
      }
      setStep(2);
      return;
    }

    // Step 2 Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      // Use environment variable or default
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/auth";
      
      console.log("Registering with:", { displayName, email, role });
      
      const res = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          display_name: displayName.trim(),
          email: email.trim(),
          password: password,
          role: role,
        }),
      });

      const data = await res.json();
      
      console.log("Registration response:", data);

      if (!res.ok) {
        // Check for specific error messages
        if (data.error) {
          throw new Error(data.error);
        }
        if (data.message) {
          throw new Error(data.message);
        }
        throw new Error(`Registration failed: ${res.status} ${res.statusText}`);
      }

      // Check if response has success flag
      if (data.success === false) {
        throw new Error(data.error || "Registration failed");
      }

      // Success! Redirect to login with success message
      router.push("/login?message=Account created successfully! Please login.");
      
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Keep your existing JSX (it's good!)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="mb-8 flex flex-col items-center">
            <BookNestLogo className="h-10 w-auto mb-2" />
            <h1 className="text-xl font-bold text-gray-900">BookNest</h1>
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            {step === 1 ? "Start your journey with us" : "Secure your account"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Progress Bar */}
          <div className="flex gap-2 mb-6">
            <div className={cn("h-1 flex-1 rounded-full", step >= 1 ? "bg-primary" : "bg-muted")} />
            <div className={cn("h-1 flex-1 rounded-full", step >= 2 ? "bg-primary" : "bg-muted")} />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">User Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <Label>I want to...</Label>
                  <div className="grid gap-3">
                    <button
                      type="button"
                      onClick={() => setRole("reader")}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all",
                        role === "reader" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-gray-400"
                      )}
                    >
                      <BookOpen className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-semibold">Read & Discover</p>
                        <p className="text-xs text-muted-foreground">Find your next favorite book</p>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setRole("author")}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all",
                        role === "author" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-gray-400"
                      )}
                    >
                      <Store className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-semibold">Publish & Sell</p>
                        <p className="text-xs text-muted-foreground">Share your stories with the world</p>
                      </div>
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full mt-4">
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={loading}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </Button>
                  <Button type="submit" className="flex-[2]" disabled={loading}>
                    {loading ? "Creating..." : "Create Account"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
        
        <p className="mt-2 text-sm text-gray-600 m-7">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </Card>
    </div>
  );
}