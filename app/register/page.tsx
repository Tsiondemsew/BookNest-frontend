"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookNestLogo } from "@/components/icons";
import { BookOpen, Store, PenLine, EyeIcon, EyeOffIcon, ArrowLeft, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Purpose = "read" | "create" | null;
type CreatorRole = "author" | "publisher" | null;

export default function RegisterPage() {
  const router = useRouter();

  // Form State
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [purpose, setPurpose] = useState<Purpose>(null);
  const [creatorRole, setCreatorRole] = useState<CreatorRole>(null);

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const role: "reader" | "author" | "publisher" =
    purpose === "read" ? "reader" :
    creatorRole === "author" ? "author" :
    creatorRole === "publisher" ? "publisher" : "reader";

  const canProceedStep1 = !!(
    displayName.trim() &&
    email.trim() &&
    password.length >= 6 &&
    confirmPassword === password &&
    purpose
  );

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!displayName.trim() || !email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!purpose) {
      setError("Please choose your purpose.");
      return;
    }

    if (purpose === "read") {
      void handleSubmit(e);
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!creatorRole) {
      setError("Please select whether you are an Author or Publisher.");
      return;
    }

    void handleSubmit(e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = "http://localhost:5000/api/auth";

      const res = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          display_name: displayName.trim(),
          email: email.trim(),
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || `Registration failed: ${res.status}`);
      }

      if (data.success === false) {
        throw new Error(data.error || "Registration failed");
      }
      const { token, user } = data
      // Role-based redirect
      if (user.role === "admin") router.push("/admin");
      else if (user.role === "reader") router.push("/dashboard");
      else if (user.role === "author") router.push("/author");
      else if (data.role === "publisher") router.push("/author");
      else router.push("/");

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitLabel =
    role === "reader"
      ? "Create my reader account"
      : role === "author"
        ? "Create my author account"
        : "Create my publisher account";

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
            {step === 1 ? "Account & purpose" : "Choose your creator role"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Progress Bar */}
          <div className="flex gap-2 mb-6" aria-label="Registration progress">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={cn("h-1 flex-1 rounded-full", s <= step ? "bg-primary" : "bg-muted")}
              />
            ))}
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-100">
              {error}
            </div>
          )}

          {/* ────────────────────────────────────────────────
              STEP 1: Name, Email, Password, Confirm, Purpose
          ──────────────────────────────────────────────── */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">User Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>

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
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">At least 6 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-3 pt-2">
                <Label>What brings you to BookNest today?</Label>
                <div className="grid gap-3">
                  <button
                    type="button"
                    onClick={() => setPurpose("read")}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all",
                      purpose === "read"
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : "border-border hover:border-gray-400"
                    )}
                  >
                    <BookOpen className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">Read & Discover</p>
                      <p className="text-xs text-muted-foreground">Find your next favorite book</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPurpose("create")}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all",
                      purpose === "create"
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : "border-border hover:border-gray-400"
                    )}
                  >
                    <Store className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">Share or Sell</p>
                      <p className="text-xs text-muted-foreground">Publish and distribute books</p>
                    </div>
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full mt-2" disabled={loading || !canProceedStep1}>
                {purpose === "read" ? submitLabel : "Continue"}
              </Button>
            </form>
          )}

          {/* ────────────────────────────────────────────────
              STEP 2: Author vs Publisher (only shown when needed)
          ──────────────────────────────────────────────── */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">I am a...</h3>
                <div className="grid gap-4">
                  <button
                    type="button"
                    onClick={() => setCreatorRole("author")}
                    className={cn(
                      "flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all shadow-sm",
                      creatorRole === "author"
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="p-3 rounded-full bg-primary/10">
                      <PenLine className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-semibold">Author</p>
                      <p className="text-sm text-muted-foreground">I write and create books</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCreatorRole("publisher")}
                    className={cn(
                      "flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all shadow-sm",
                      creatorRole === "publisher"
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="p-3 rounded-full bg-primary/10">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-semibold">Publisher</p>
                      <p className="text-sm text-muted-foreground">I publish and distribute books</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>

                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading || !creatorRole}
                >
                  {loading ? "Creating..." : submitLabel}
                </Button>
              </div>
            </form>
          )}
        </CardContent>

        <p className="mt-6 text-center text-sm text-gray-600 pb-6">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </Card>
    </div>
  );
}