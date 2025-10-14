'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DepartmentAndPrograms } from "@/lib/department-and-program"
import { Building2, GraduationCap, Mail, User, Hash, CheckCircle2 } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter();
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  // const isDoneOnboarding = useAuthStore((state) => state.isDoneOnboarding);

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     router.push('/');
  //   }

  //   if (isDoneOnboarding()) {
  //     router.push('/events');
  //   }
  // }, [isAuthenticated, router, isDoneOnboarding]);


  // Starting functions from v0
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")
  const [selectedProgram, setSelectedProgram] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sample student data - in production, this would come from authentication
  const studentData = {
    name: "Mario Jr Inguito",
    idNumber: "484470",
    email: "m.inguito.484470@umindanao.edu.ph",
  }

  const getInitials = (name: string) => {
    const names = name.split(" ")
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const departments = Object.keys(DepartmentAndPrograms)
  const programs = selectedDepartment
    ? DepartmentAndPrograms[selectedDepartment as keyof typeof DepartmentAndPrograms]
    : []

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value)
    setSelectedProgram("") // Reset program when department changes
  }

  const handleSubmit = async () => {
    if (!selectedDepartment || !selectedProgram) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to dashboard after successful onboarding
    router.push("/dashboard")
  }

  const isFormValid = selectedDepartment && selectedProgram
  // End of v0 code


  return (
  <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto max-w-4xl px-4 py-12 sm:px-12 sm:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">Complete Your Profile</h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Help us personalize your experience by providing your academic information
          </p>
        </div>

        <Card className="border border-border shadow-sm">
          <CardHeader className="space-y-1 pb-6 border-b border-border">
            <CardTitle className="text-xl font-semibold text-foreground">Academic Information</CardTitle>
            <CardDescription className="text-muted-foreground">
              Your information is securely stored and will only be used for event management
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <div className="p-6 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <Avatar className="h-20 w-20 border-2 border-border shadow-sm">
                    <AvatarFallback className="bg-foreground text-background text-xl font-semibold">
                      {getInitials(studentData.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      Full Name
                    </Label>
                    <p className="text-base font-semibold text-foreground">{studentData.name}</p>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5" />
                      Student ID
                    </Label>
                    <p className="text-base font-semibold text-foreground font-mono">{studentData.idNumber}</p>
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      University Email
                    </Label>
                    <p className="text-sm font-medium text-foreground break-all">{studentData.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2.5">
                <Label htmlFor="department" className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Building2 className="h-4 w-4 text-primary" />
                  Department
                  <span className="text-destructive">*</span>
                </Label>
                <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                  <SelectTrigger
                    id="department"
                    className="w-full h-12 text-sm border-border hover:border-foreground/20 transition-colors bg-background !whitespace-normal break-words text-left [&>span]:line-clamp-2 [&>span]:whitespace-normal [&>span]:break-words [&>span]:text-left [&>span]:leading-normal"
                  >
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent className="max-w-[calc(100vw-2rem)] md:max-w-md">
                    {departments.map((dept) => (
                      <SelectItem
                        key={dept}
                        value={dept}
                        className="text-sm py-3 !whitespace-normal break-words !items-start min-h-fit h-auto leading-normal cursor-pointer"
                      >
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedDepartment && (
                  <div className="flex items-center gap-1.5 text-xs text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Department selected</span>
                  </div>
                )}
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="program" className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Program
                  <span className="text-destructive">*</span>
                </Label>
                <Select value={selectedProgram} onValueChange={setSelectedProgram} disabled={!selectedDepartment}>
                  <SelectTrigger
                    id="program"
                    className="w-full h-12 text-sm border-border hover:border-foreground/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-background !whitespace-normal break-words text-left [&>span]:line-clamp-2 [&>span]:whitespace-normal [&>span]:break-words [&>span]:text-left [&>span]:leading-normal"
                  >
                    <SelectValue
                      placeholder={selectedDepartment ? "Select your program" : "Please select a department first"}
                    />
                  </SelectTrigger>
                  <SelectContent className="max-w-[calc(100vw-2rem)] md:max-w-md">
                    {programs.map((program) => (
                      <SelectItem
                        key={program}
                        value={program}
                        className="text-sm py-3 !whitespace-normal break-words !items-start min-h-fit h-auto leading-normal cursor-pointer"
                      >
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedProgram && (
                  <div className="flex items-center gap-1.5 text-xs text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Program selected</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4">
              {!isSubmitting ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  size="lg"
                >
                  Continue to Dashboard
                </Button>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full border-3 border-muted border-t-primary animate-spin" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Setting up your profile...</p>
                </div>
              )}
            </div>

            <p className="text-center text-xs text-muted-foreground leading-relaxed pt-2">
              By continuing, you agree to our{" "}
              <button className="text-foreground font-medium hover:underline">Terms of Service</button> and{" "}
              <button className="text-foreground font-medium hover:underline">Privacy Policy</button>
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need assistance?{" "}
            <a href="/contact" className="text-foreground font-medium hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </main>
    </div>
);
}
