"use client"

import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export function UpdateNotification() {
  const { toast } = useToast()

  useEffect(() => {
    // Simulate checking for an update after a delay
    const timer = setTimeout(() => {
      toast({
        title: "New update available!",
        description: "A new version of the app is ready. Please refresh to get the latest features.",
        action: (
          <Button
            variant="outline"
            onClick={() => {
              window.location.reload()
            }}
          >
            Refresh
          </Button>
        ),
        duration: 5000, // Display for 5 seconds
      })
    }, 5000) // Show notification after 5 seconds

    return () => clearTimeout(timer)
  }, [toast])

  return null // This component doesn't render anything visible itself
}
