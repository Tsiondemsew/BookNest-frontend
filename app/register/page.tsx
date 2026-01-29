"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookNestLogo, EyeIcon, EyeOffIcon, BookIcon, PenIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const roles = [
  { id: "reader", name: "Reader", description: "Browse, purchase and read books", icon: BookIcon },
  { id: "author", name: "Author", description: "Publish and sell your books", icon: PenIcon },
] as const;

type Role = (typeof roles)[number]["id"];

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [display_name, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>("reader");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Step 1 – name & email
    if (step === 1) {
      if ( !display_name.trim() || !email.trim()) {
        setError("Full name and email are required");
        return;
      }
      setStep(2);
      return;
    }

    // Step 2 – password validation
    if (!password || !confirmPassword) {
      setError("Please fill in both password fields");
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

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/auth";

      console.log("Calling:", `${apiUrl}/register`);

      const res = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          display_name: display_name.trim(),
          email: email.trim(),
          password,
          role: selectedRole,     // remove this line if backend does NOT accept role
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.message || data.error || "Registration failed");
      }

      // Success
      alert("Account created successfully! Redirecting to login...");
      router.push("/login");

    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <BookNestLogo className="h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={display_name}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <Label>Choose your role</Label>
                <div className="grid grid-cols-2 gap-4">
                  {roles.map((r) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedRole(r.id)}
                        disabled={loading}
                        className={cn(
                          "border rounded-lg p-4 text-center transition-colors",
                          selectedRole === r.id
                            ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                            : "border-gray-300 hover:border-gray-400"
                        )}
                      >
                        <Icon className="mx-auto h-8 w-8 mb-2 text-gray-600" />
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{r.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Continue"}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirm password</Label>
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Back
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </div>
            </>
          )}
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}