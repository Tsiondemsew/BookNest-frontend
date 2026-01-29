"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UploadIcon, BookIcon, HeadphonesIcon, XIcon, CheckIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const categories = [
  "Self-Development",
  "Business & Finance",
  "Science & Technology",
  "Fiction",
  "History",
  "Philosophy",
  "Psychology",
  "Health & Wellness",
  "Biography",
]

const languages = ["English", "Amharic", "French", "Spanish", "Arabic"]

export default function UploadBookPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    language: "English",
    pdfFile: null as File | null,
    audioFile: null as File | null,
    coverImage: null as File | null,
    pdfPrice: "",
    audioPrice: "",
  })

  const handleFileChange = (field: "pdfFile" | "audioFile" | "coverImage", file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Upload Files" },
    { number: 3, title: "Pricing" },
    { number: 4, title: "Review" },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload New Book</h1>
        <p className="text-muted-foreground mt-1">Fill in the details to publish your book on BookNest</p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center justify-between">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center">
            <div className="flex items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step > s.number
                    ? "bg-primary text-primary-foreground"
                    : step === s.number
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {step > s.number ? <CheckIcon className="w-5 h-5" /> : s.number}
              </div>
              <span
                className={cn(
                  "ml-3 text-sm font-medium",
                  step >= s.number ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s.title}
              </span>
            </div>
            {index < steps.length - 1 && <div className="w-24 h-px bg-border mx-4" />}
          </div>
        ))}
      </div>

      {/* Form content */}
      <div className="p-6 rounded-xl bg-card border border-border">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title *</Label>
              <Input
                id="title"
                placeholder="Enter book title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                placeholder="Enter subtitle (optional)"
                value={formData.subtitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Write a compelling description of your book..."
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <select
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground"
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Language *</Label>
                <select
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground"
                  value={formData.language}
                  onChange={(e) => setFormData((prev) => ({ ...prev, language: e.target.value }))}
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {/* Cover Image */}
            <div className="space-y-2">
              <Label>Book Cover Image *</Label>
              <div
                className={cn(
                  "border-2 border-dashed rounded-xl p-8 text-center transition-colors",
                  formData.coverImage ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                )}
              >
                {formData.coverImage ? (
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-24 h-32 bg-muted rounded-lg" />
                    <div className="text-left">
                      <p className="font-medium text-foreground">{formData.coverImage.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(formData.coverImage.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-destructive"
                        onClick={() => handleFileChange("coverImage", null)}
                      >
                        <XIcon className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <UploadIcon className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                    <p className="font-medium text-foreground">Click to upload cover image</p>
                    <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 5MB (Recommended: 1400x2100px)</p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange("coverImage", e.target.files?.[0] || null)}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* PDF File */}
            <div className="space-y-2">
              <Label>PDF File</Label>
              <div
                className={cn(
                  "border-2 border-dashed rounded-xl p-6 transition-colors",
                  formData.pdfFile ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                )}
              >
                {formData.pdfFile ? (
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <BookIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{formData.pdfFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(formData.pdfFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleFileChange("pdfFile", null)}>
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex items-center gap-4 cursor-pointer">
                    <div className="p-3 rounded-lg bg-muted">
                      <BookIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Upload PDF file</p>
                      <p className="text-sm text-muted-foreground">PDF up to 100MB</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={(e) => handleFileChange("pdfFile", e.target.files?.[0] || null)}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Audio File */}
            <div className="space-y-2">
              <Label>Audiobook File (Optional)</Label>
              <div
                className={cn(
                  "border-2 border-dashed rounded-xl p-6 transition-colors",
                  formData.audioFile ? "border-accent bg-accent/5" : "border-border hover:border-accent/50",
                )}
              >
                {formData.audioFile ? (
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <HeadphonesIcon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{formData.audioFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(formData.audioFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleFileChange("audioFile", null)}>
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex items-center gap-4 cursor-pointer">
                    <div className="p-3 rounded-lg bg-muted">
                      <HeadphonesIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Upload audiobook file</p>
                      <p className="text-sm text-muted-foreground">MP3, M4B up to 500MB</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".mp3,.m4b"
                      onChange={(e) => handleFileChange("audioFile", e.target.files?.[0] || null)}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Set the price for each format. Leave empty if not offering that format.
            </p>

            {formData.pdfFile && (
              <div className="space-y-2">
// In Pricing step (Step 3)
<Label htmlFor="pdfPrice">PDF Price (ETB) *</Label>
<div className="relative">
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">ETB</span>
  <Input
    id="pdfPrice"
    type="number"
    step="1"
    min="50"
    placeholder="50"
    className="pl-12" // More space for "ETB"
    value={formData.pdfPrice}
    onChange={(e) => setFormData((prev) => ({ ...prev, pdfPrice: e.target.value }))}
  />
</div>
<p className="text-sm text-muted-foreground">Minimum: 50 ETB</p>              </div>
            )}

            {formData.audioFile && (
              <div className="space-y-2">
                <Label htmlFor="audioPrice">Audiobook Price (USD) *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="audioPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="pl-8"
                    value={formData.audioPrice}
                    onChange={(e) => setFormData((prev) => ({ ...prev, audioPrice: e.target.value }))}
                  />
                </div>
                <p className="text-sm text-muted-foreground">Recommended: $14.99 - $24.99</p>
              </div>
            )}

            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium text-foreground mb-2">Revenue Share</h4>
              <p className="text-sm text-muted-foreground">
                Authors receive 70% of the sale price. BookNest retains 30% for platform maintenance and payment
                processing.
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="font-semibold text-foreground">Review Your Book</h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="font-medium text-foreground">{formData.title || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subtitle</p>
                  <p className="font-medium text-foreground">{formData.subtitle || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium text-foreground">{formData.category || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Language</p>
                  <p className="font-medium text-foreground">{formData.language}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Formats & Pricing</p>
                  <div className="mt-1 space-y-1">
                    {formData.pdfFile && (
                      <p className="font-medium text-foreground">PDF: ${formData.pdfPrice || "0.00"}</p>
                    )}
                    {formData.audioFile && (
                      <p className="font-medium text-foreground">Audiobook: ${formData.audioPrice || "0.00"}</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Files</p>
                  <div className="mt-1 space-y-1">
                    {formData.coverImage && (
                      <p className="text-sm text-foreground">Cover: {formData.coverImage.name}</p>
                    )}
                    {formData.pdfFile && <p className="text-sm text-foreground">PDF: {formData.pdfFile.name}</p>}
                    {formData.audioFile && <p className="text-sm text-foreground">Audio: {formData.audioFile.name}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="mt-1 text-foreground leading-relaxed">{formData.description || "—"}</p>
            </div>

            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <p className="text-sm text-warning">
                Your book will be submitted for review. Our team typically reviews submissions within 2-3 business days.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="bg-transparent"
        >
          Previous
        </Button>
        <Button onClick={() => (step === 4 ? alert("Book submitted for review!") : setStep((s) => Math.min(4, s + 1)))}>
          {step === 4 ? "Submit for Review" : "Next"}
        </Button>
      </div>
    </div>
  )
}
