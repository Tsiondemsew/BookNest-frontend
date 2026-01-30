"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  VolumeIcon,
  XIcon,
  BookmarkIcon,
  ChevronDownIcon,
  ClockIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

const audioBookData = {
  title: "Atomic Habits",
  author: "James Clear",
  narrator: "James Clear",
  totalDuration: 5 * 60 * 60 + 35 * 60, // 5h 35m in seconds
  currentPosition: 1 * 60 * 60 + 23 * 60 + 45, // 1h 23m 45s in seconds
  chapters: [
    { title: "Introduction", startTime: 0, duration: "12:34" },
    { title: "Chapter 1: The Surprising Power of Atomic Habits", startTime: 754, duration: "28:15" },
    { title: "Chapter 2: How Your Habits Shape Your Identity", startTime: 2449, duration: "22:40" },
    { title: "Chapter 3: How to Build Better Habits", startTime: 3809, duration: "31:12" },
    { title: "Chapter 4: The Man Who Didn't Look Right", startTime: 5681, duration: "19:45" },
    { title: "Chapter 5: The Best Way to Start a New Habit", startTime: 6866, duration: "24:30" },
    { title: "Chapter 6: Motivation Is Overrated", startTime: 8336, duration: "26:18" },
  ],
  bookmarks: [
    { time: 1840, note: "1% improvement concept" },
    { time: 4500, note: "Habit stacking" },
  ],
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

export default function ListenPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(audioBookData.currentPosition)
  const [volume, setVolume] = useState(80)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showChapters, setShowChapters] = useState(false)
  const [sleepTimer, setSleepTimer] = useState<number | null>(null)

  const progress = (currentTime / audioBookData.totalDuration) * 100
  const remainingTime = audioBookData.totalDuration - currentTime

  // Find current chapter
  const currentChapter = audioBookData.chapters.reduce((prev, curr) => {
    return currentTime >= curr.startTime ? curr : prev
  }, audioBookData.chapters[0])

  // Simulate playback
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((t) => Math.min(t + playbackSpeed, audioBookData.totalDuration))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, playbackSpeed])

  const skip = (seconds: number) => {
    setCurrentTime((t) => Math.max(0, Math.min(audioBookData.totalDuration, t + seconds)))
  }

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
  const sleepOptions = [
    { label: "Off", value: null },
    { label: "15 minutes", value: 15 },
    { label: "30 minutes", value: 30 },
    { label: "45 minutes", value: 45 },
    { label: "1 hour", value: 60 },
    { label: "End of chapter", value: -1 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/dashboard/library">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <XIcon className="w-5 h-5" />
          </Button>
        </Link>
        <Button variant="ghost" size="sm" className="gap-2" onClick={() => setShowChapters(!showChapters)}>
          <ChevronDownIcon className={cn("w-4 h-4 transition-transform", showChapters && "rotate-180")} />
          Chapters
        </Button>
      </header>

      {/* Chapters panel */}
      {showChapters && (
        <div className="mx-6 mb-6 p-4 rounded-xl bg-card border border-border max-h-64 overflow-y-auto">
          <h3 className="font-semibold text-foreground mb-3">Chapters</h3>
          <ul className="space-y-1">
            {audioBookData.chapters.map((chapter, index) => {
              const isActive = chapter === currentChapter
              return (
                <li key={index}>
                  <button
                    onClick={() => setCurrentTime(chapter.startTime)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between",
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                  >
                    <span className="truncate">{chapter.title}</span>
                    <span className="text-xs opacity-70 ml-2">{chapter.duration}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Book cover */}
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-linear-to-br from-primary/30 to-primary/10 shadow-2xl flex items-center justify-center mb-8">
          <div className="w-48 h-48 md:w-60 md:h-60 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="text-6xl text-primary/40">📚</span>
          </div>
        </div>

        {/* Book info */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">{audioBookData.title}</h1>
          <p className="text-muted-foreground mt-1">{audioBookData.author}</p>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="text-primary">{currentChapter.title}</span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-lg mb-6">
          <Slider
            value={[currentTime]}
            onValueChange={([v]) => setCurrentTime(v)}
            max={audioBookData.totalDuration}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(remainingTime)}</span>
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex items-center gap-6 mb-8">
          <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => skip(-30)}>
            <SkipBackIcon className="w-6 h-6" />
          </Button>

          <Button size="icon" className="h-16 w-16 rounded-full" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
          </Button>

          <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => skip(30)}>
            <SkipForwardIcon className="w-6 h-6" />
          </Button>
        </div>

        {/* Secondary controls */}
        <div className="flex items-center gap-4 w-full max-w-lg">
          {/* Volume */}
          <div className="flex items-center gap-2 flex-1">
            <VolumeIcon className="w-5 h-5 text-muted-foreground" />
            <Slider value={[volume]} onValueChange={([v]) => setVolume(v)} max={100} className="flex-1" />
          </div>

          {/* Speed */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                {playbackSpeed}x
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {speedOptions.map((speed) => (
                <DropdownMenuItem
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={playbackSpeed === speed ? "bg-accent" : ""}
                >
                  {speed}x
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sleep timer */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent">
                <ClockIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sleep Timer</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sleepOptions.map((option) => (
                <DropdownMenuItem
                  key={option.label}
                  onClick={() => setSleepTimer(option.value)}
                  className={sleepTimer === option.value ? "bg-accent" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Bookmark */}
          <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent">
            <BookmarkIcon className="w-4 h-4" />
          </Button>
        </div>
      </main>

      {/* Footer info */}
      <footer className="px-6 py-4 text-center text-sm text-muted-foreground border-t border-border">
        <p>
          Narrated by {audioBookData.narrator} • {formatDuration(audioBookData.totalDuration)} total
        </p>
        {sleepTimer && (
          <p className="mt-1 text-primary">
            Sleep timer: {sleepTimer === -1 ? "End of chapter" : `${sleepTimer} minutes`}
          </p>
        )}
      </footer>
    </div>
  )
}
