"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Scan } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"

interface EventQRScannerProps {
  eventId: string
  onAttendeeScanned: (attendeeId: string) => void
}

export function EventQRScanner({ eventId, onAttendeeScanned }: EventQRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedValue, setScannedValue] = useState<string | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scanningRef = useRef(false)
  const lastScannedRef = useRef<string>("")
  const lastScannedTimeRef = useRef<number>(0)
  const [jsQRLoaded, setJsQRLoaded] = useState(false)

  // Load jsQR library
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js"
    script.onload = () => {
      setJsQRLoaded(true)
      console.log("[v0] jsQR library loaded successfully")
    }
    script.onerror = () => {
      console.error("[v0] Failed to load jsQR library")
    }
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const startAutoScan = () => {
    scanningRef.current = true
    const scanFrame = () => {
      if (!scanningRef.current || !videoRef.current || !canvasRef.current) return

      const context = canvasRef.current.getContext("2d")
      if (context && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)

        const detectedCode = detectQRCode(imageData)
        if (detectedCode) {
          const now = Date.now()
          if (detectedCode !== lastScannedRef.current || now - lastScannedTimeRef.current > 2000) {
            lastScannedRef.current = detectedCode
            lastScannedTimeRef.current = now
            setScannedValue(detectedCode)
            setShowDialog(true)
            setIsProcessing(true)
            console.log("[v0] QR Code detected:", detectedCode)
            console.log("[v0] Dialog opened with scanned value:", detectedCode)
          }
        }
      }

      requestAnimationFrame(scanFrame)
    }
    scanFrame()
  }

  const detectQRCode = (imageData: ImageData): string | null => {
    if (typeof (window as any).jsQR === "undefined") {
      return null
    }

    const code = (window as any).jsQR(imageData.data, imageData.width, imageData.height)
    if (code) {
      console.log("[v0] QR code data extracted:", code.data)
      return code.data
    }

    return null
  }

  const startCamera = async () => {
    try {
      setIsScanning(true)
      console.log("[v0] Starting camera...")
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          console.log("[v0] Camera stream loaded, starting auto-scan")
          startAutoScan()
        }
      }
    } catch (error) {
      console.error("[v0] Camera access error:", error)
      setIsScanning(false)
    }
  }

  const stopCamera = () => {
    scanningRef.current = false
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
    }
    setIsScanning(false)
    console.log("[v0] Camera stopped")
  }

  const handleConfirmScan = () => {
    if (scannedValue) {
      setTimeout(() => {
        onAttendeeScanned(scannedValue)
        console.log("[v0] Confirmed scanned value:", scannedValue)
        console.log("[v0] Dialog closed after confirmation")
        setShowDialog(false)
        setIsProcessing(false)
      }, 1500)
    }
  }

  return (
    <div className="space-y-4 md:space-y-6 w-full">
      {/* Scanner Section */}
      <Card className="p-4 md:p-6 border-border bg-card">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">QR Code Scanner</h3>

        {!isScanning ? (
          <div className="flex flex-col gap-4">
            <Button onClick={startCamera} className="gap-2 w-full text-sm md:text-base" disabled={!jsQRLoaded}>
              <Scan className="h-4 w-4" />
              {jsQRLoaded ? "Start Camera" : "Loading QR Scanner..."}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="relative w-full max-w-2xl mx-auto bg-black rounded-lg overflow-hidden aspect-video">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="hidden" width={640} height={480} />

              <div className="absolute inset-0 flex items-center justify-center p-4 md:p-0">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 border-2 border-primary rounded-lg">
                  <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-primary" />
                </div>
              </div>
            </div>

            <Button onClick={stopCamera} variant="destructive" className="w-full text-sm md:text-base">
              Stop Scanning
            </Button>
          </div>
        )}
      </Card>

      <Dialog
        open={showDialog && isProcessing}
        onOpenChange={(open) => {
          if (!open) {
            setShowDialog(false)
            setIsProcessing(false)
          }
        }}
      >
        <DialogContent className="w-full max-w-sm md:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">QR Code Scanned</DialogTitle>
            <DialogDescription className="text-sm md:text-base">Processing scanned data...</DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center justify-center gap-4">
            <Spinner className="h-8 w-8" />
            <div className="bg-muted p-3 md:p-4 rounded-lg w-full">
              <p className="text-center text-base md:text-lg font-mono font-semibold text-foreground break-all">
                {scannedValue}
              </p>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground text-center">Processing attendee information...</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDialog && !isProcessing} onOpenChange={setShowDialog}>
        <DialogContent className="w-full max-w-sm md:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">QR Code Scanned</DialogTitle>
            <DialogDescription className="text-sm md:text-base">
              The following value was detected from the QR code:
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-muted p-3 md:p-4 rounded-lg">
              <p className="text-center text-base md:text-lg font-mono font-semibold text-foreground break-all">
                {scannedValue}
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowDialog(false)} className="text-sm md:text-base">
              Cancel
            </Button>
            <Button onClick={handleConfirmScan} className="text-sm md:text-base">
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
