"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookNestLogo, EyeIcon, EyeOffIcon } from "@/components/icons";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password) {
      setError("Please enter email and password");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/auth";

      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Invalid email or password");
      }

      // Assuming your backend returns something like:
      // {
      //   token: "jwt...",
      //   user: { id, name, email, role }
      // }
      // Adjust the field names according to your actual response

      const { token, user } = data;

      if (!token || !user?.role) {
        throw new Error("Invalid response from server");
      }

      // Store token (most common pattern)
      localStorage.setItem("token", token);
      // Optional: store user info
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (user.role === "reader") {
        router.push("/readerDashboard");
      } else if (user.role === "author") {
        router.push("/author/dashboard");
      } else if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard"); // fallback
      }

    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Optional: keep demo logins if you still want them (but using real backend)
  // You would need to create these test users in your database
  const handleDemoLogin = async (role: "reader" | "author" | "admin") => {
    const demoCredentials = {
      reader: { email: "reader@booknest.com", password: "demo123" },
      author: { email: "author@booknest.com", password: "demo123" },
      admin: { email: "admin@booknest.com", password: "demo123" },
    };

    const { email, password } = demoCredentials[role];

    setEmail(email);
    setPassword(password);

    // Trigger real login
    await handleSubmit(new Event("submit") as any);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <BookNestLogo className="w-10 h-10" />
            <span className="text-2xl font-semibold text-foreground">BookNest</span>
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to continue your reading journey</p>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={loading}
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* Optional demo buttons – only useful if you created these users in DB */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-4 text-muted-foreground">Or try a demo account</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDemoLogin("reader")}
                disabled={loading}
                className="h-11"
              >
                Reader
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDemoLogin("author")}
                disabled={loading}
                className="h-11"
              >
                Author
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDemoLogin("admin")}
                disabled={loading}
                className="h-11"
              >
                Admin
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-primary/5 items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <div className="w-64 h-64 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <BookNestLogo className="w-32 h-32 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Your reading sanctuary awaits</h2>
          <p className="text-muted-foreground">
            Access thousands of books, track your progress, and connect with fellow readers.
          </p>
        </div>
      </div>
    </div>
  );
}