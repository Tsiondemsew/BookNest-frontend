"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UploadIcon, BookIcon, HeadphonesIcon, XIcon, CheckIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { booksAPI } from "@/lib/api"

const languages = ["English", "Amharic", "French", "Spanish", "Arabic"]

export default function UploadBookPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    language: "English",
    pdfFile: null as File | null,
    audioFile: null as File | null,
    coverImage: null as File | null,
    pdfPrice: "",
    audioPrice: "",
    pdf_page_count: "",
    audio_duration_sec: "",
    author_name: "",
    publisher_name: "",
  })

  const [categoriesList, setCategoriesList] = useState<Array<{id:string,name:string}>>([])
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [categoriesError, setCategoriesError] = useState<string | null>(null)
  const { user } = useAuth()

  const loadCategories = async () => {
    setCategoriesLoading(true)
    setCategoriesError(null)
    try {
      const res = await booksAPI.getCategories()
      console.debug('categories response', res)

      // Expect either an array or { success:true, data: [...] }
      if (Array.isArray(res)) {
        setCategoriesList(res.map((c: any) => ({ id: String(c.id || c.value || c._id), name: c.name || c.label || c.title || c.value || String(c.id) })))
      } else if (res?.data && Array.isArray(res.data)) {
        setCategoriesList(res.data.map((c: any) => ({ id: String(c.id), name: c.name || c.title || String(c.id) })))
      } else {
        // Unexpected shape
        setCategoriesError('Unexpected response from server')
        setCategoriesList([])
      }
    } catch (e: any) {
      console.error('Failed to load categories', e)
      setCategoriesError(e?.message || 'Failed to load categories')
      setCategoriesList([])
    } finally {
      setCategoriesLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true
    void loadCategories()

    // prefill uploader name
    if (user) {
      setFormData((prev) => ({
        ...prev,
        author_name: user.role === 'author' ? (user.displayName || user.name || user.email || '') : prev.author_name,
        publisher_name: user.role === 'publisher' ? (user.displayName || user.name || user.email || '') : prev.publisher_name,
      }))
    }

    return () => { mounted = false }
  }, [user])

  const handleFileChange = (field: "pdfFile" | "audioFile" | "coverImage", file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const validateForSubmit = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.category_id) return "Category is required";
    if (!formData.coverImage) return "Cover image is required";
    if (formData.pdfFile && (!formData.pdfPrice || Number(formData.pdfPrice) < 50)) return "PDF price must be at least 50 ETB";
    // If pdf uploaded ensure page count
    if (formData.pdfFile && !formData.pdf_page_count) return "Please provide page count for PDF";
    // If audio uploaded ensure duration
    if (formData.audioFile && !formData.audio_duration_sec) return "Please provide audio duration in seconds";

    // Ensure author/publisher names present as controller expects both
    if (!formData.author_name.trim()) return "Author name is required";
    if (!formData.publisher_name.trim()) return "Publisher name is required";
    return null;
  }

  const handleSubmit = async () => {
    setError("")
    const validationError = validateForSubmit()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)

      const payload = new FormData()
      payload.append("title", formData.title)
      payload.append("description", formData.description)
      payload.append("category_id", formData.category_id)
      payload.append("language", (formData.language || 'english').toLowerCase())
      // include author/publisher names (controller expects both)
      payload.append("author_name", formData.author_name)
      payload.append("publisher_name", formData.publisher_name)
      if (formData.pdfPrice) payload.append("pdf_price", formData.pdfPrice)
      if (formData.audioPrice) payload.append("audio_price", formData.audioPrice)
      if (formData.pdf_page_count) payload.append("pdf_page_count", formData.pdf_page_count)
      if (formData.audio_duration_sec) payload.append("audio_duration_sec", formData.audio_duration_sec)
      if (formData.coverImage) payload.append("cover", formData.coverImage)
      if (formData.pdfFile) payload.append("pdf_file", formData.pdfFile)
      if (formData.audioFile) payload.append("audio_file", formData.audioFile)

      // Use booksAPI.createBook which sends Authorization header from localStorage
      const res = await booksAPI.createBook(payload)

      // Expect backend to return created book or success flag
      if (res && (res.success === false)) {
        throw new Error(res.error || "Upload failed")
      }

      // Show success message and redirect after a short delay
      setSuccessMessage('Book uploaded successfully. Redirecting...')
      const role = user?.role || 'author'
      setTimeout(() => {
        if (role === 'publisher') router.push('/author')
        else if (role === 'author') router.push('/author/books')
        else router.push('/')
      }, 1400)
    } catch (err: any) {
      setError(err?.message || "Upload failed. Please try again.")
    } finally {
      setLoading(false)
    }
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

        {successMessage && (
          <div className="mt-4 p-3 rounded-md bg-green-50 text-green-700 text-sm border border-green-100">
            {successMessage}
          </div>
        )}
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
              <Label htmlFor="description">Description (optional)</Label>
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
                <div className="flex items-center justify-between">
                  <Label>Category *</Label>
                  <div>
                    {categoriesLoading ? (
                      <span className="text-sm text-muted-foreground">Loading categories...</span>
                    ) : categoriesError ? (
                      <button
                        type="button"
                        className="text-sm text-primary underline"
                        onClick={() => void loadCategories()}
                      >
                        Retry
                      </button>
                    ) : null}
                  </div>
                </div>

                <select
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground"
                  value={formData.category_id}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category_id: e.target.value }))}
                >
                  <option value="">Select category</option>
                  {categoriesList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                {categoriesError && (
                  <p className="text-sm text-destructive mt-2">{categoriesError}</p>
                )}
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

            {/* Author / Publisher name inputs: show the field for the non-uploader and keep uploader name prefilled */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {user?.role === 'author' ? (
                <div className="space-y-2 col-span-2">
                  <Label>Publisher Name *</Label>
                  <Input
                    placeholder="Enter publisher name"
                    value={formData.publisher_name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, publisher_name: e.target.value }))}
                  />
                </div>
              ) : user?.role === 'publisher' ? (
                <div className="space-y-2 col-span-2">
                  <Label>Author Name *</Label>
                  <Input
                    placeholder="Enter author name"
                    value={formData.author_name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, author_name: e.target.value }))}
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Author Name *</Label>
                    <Input
                      placeholder="Author name"
                      value={formData.author_name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, author_name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Publisher Name *</Label>
                    <Input
                      placeholder="Publisher name"
                      value={formData.publisher_name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, publisher_name: e.target.value }))}
                    />
                  </div>
                </>
              )}
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
                {/* In Pricing step (Step 3) */}
                <Label htmlFor="pdfPrice">PDF Price (ETB) *</Label>
<div className="relative">
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">ETB</span>
  <Input
    id="pdfPrice"
    type="number"
    step="1"
    min="50"
    placeholder="50"
    className="pl-12"
    value={formData.pdfPrice}
    onChange={(e) => setFormData((prev) => ({ ...prev, pdfPrice: e.target.value }))}
  />
  {/* More space for "ETB" */}
</div>
<p className="text-sm text-muted-foreground"></p>              </div>
            )}

            {formData.pdfFile && (
              <div className="space-y-2">
                <Label htmlFor="pdfPages">PDF Page Count *</Label>
                <Input
                  id="pdfPages"
                  type="number"
                  min="1"
                  placeholder="Number of pages"
                  value={formData.pdf_page_count}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pdf_page_count: e.target.value }))}
                />
              </div>
            )}

            {formData.audioFile && (
              <div className="space-y-2">
                <Label htmlFor="audioPrice">Audiobook Price (ETB) *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"></span>
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
                <p className="text-sm text-muted-foreground"></p>
              </div>
            )}

            {formData.audioFile && (
              <div className="space-y-2">
                <Label htmlFor="audioDuration">Audio Duration (seconds) *</Label>
                <Input
                  id="audioDuration"
                  type="number"
                  min="1"
                  placeholder="Duration in seconds"
                  value={formData.audio_duration_sec}
                  onChange={(e) => setFormData((prev) => ({ ...prev, audio_duration_sec: e.target.value }))}
                />
              </div>
            )}

            <div className="p-4 rounded-lg bg-muted/50">
              <h4 className="font-medium text-foreground mb-2">Revenue Share</h4>
              <p className="text-sm text-muted-foreground">
                Authors receive 80% of the sale price. BookNest retains 20% for platform maintenance and payment
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
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium text-foreground">{(categoriesList.find(c => c.id === formData.category_id)?.name) || "—"}</p>
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
          disabled={step === 1 || loading}
          className="bg-transparent"
        >
          Previous
        </Button>
        <div className="flex items-center gap-3">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            onClick={async () => {
              if (step === 4) await handleSubmit()
              else setStep((s) => Math.min(4, s + 1))
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : step === 4 ? "Submit for Review" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
