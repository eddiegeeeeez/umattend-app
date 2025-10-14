'use client';

import { useEffect, useState } from 'react';
import { Building2, GraduationCap, Mail, User, Hash, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DepartmentAndPrograms } from '@/lib/department-and-program';
import { useAuthStore } from '@/store/authStore';

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
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample student data - in production, this would come from authentication
  const studentData = {
    name: 'Mario Jr Inguito',
    idNumber: '484470',
    email: 'm.inguito.484470@umindanao.edu.ph'
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const departments = Object.keys(DepartmentAndPrograms);
  const programs = selectedDepartment ? DepartmentAndPrograms[selectedDepartment as keyof typeof DepartmentAndPrograms] : [];

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    setSelectedProgram(''); // Reset program when department changes
  };

  const handleSubmit = async () => {
    if (!selectedDepartment || !selectedProgram) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to dashboard after successful onboarding
    router.push('/dashboard');
  };

  const isFormValid = selectedDepartment && selectedProgram;
  // End of v0 code

  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="container mx-auto max-w-4xl px-4 py-12 sm:px-12 sm:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">Complete Your Profile</h1>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed sm:text-base">
            Help us personalize your experience by providing your academic information
          </p>
        </div>

        <Card className="border-border border shadow-sm">
          <CardHeader className="border-border space-y-1 border-b pb-6">
            <CardTitle className="text-foreground text-xl font-semibold">Academic Information</CardTitle>
            <CardDescription className="text-muted-foreground">Your information is securely stored and will only be used for event management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-8">
            <div className="bg-muted/30 border-border/50 rounded-lg border p-6">
              <div className="flex flex-col items-start gap-6 sm:flex-row">
                <div className="flex-shrink-0">
                  <Avatar className="border-border h-20 w-20 border-2 shadow-sm">
                    <AvatarFallback className="bg-foreground text-background text-xl font-semibold">{getInitials(studentData.name)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="grid w-full flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
                      <User className="h-3.5 w-3.5" />
                      Full Name
                    </Label>
                    <p className="text-foreground text-base font-semibold">{studentData.name}</p>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
                      <Hash className="h-3.5 w-3.5" />
                      Student ID
                    </Label>
                    <p className="text-foreground font-mono text-base font-semibold">{studentData.idNumber}</p>
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
                      <Mail className="h-3.5 w-3.5" />
                      University Email
                    </Label>
                    <p className="text-foreground text-sm font-medium break-all">{studentData.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2.5">
                <Label htmlFor="department" className="text-foreground flex items-center gap-2 text-sm font-semibold">
                  <Building2 className="text-primary h-4 w-4" />
                  Department
                  <span className="text-destructive">*</span>
                </Label>
                <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                  <SelectTrigger
                    id="department"
                    className="border-border hover:border-foreground/20 bg-background h-12 w-full text-left text-sm break-words !whitespace-normal transition-colors [&>span]:line-clamp-2 [&>span]:text-left [&>span]:leading-normal [&>span]:break-words [&>span]:whitespace-normal"
                  >
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent className="max-w-[calc(100vw-2rem)] md:max-w-md">
                    {departments.map((dept) => (
                      <SelectItem
                        key={dept}
                        value={dept}
                        className="h-auto min-h-fit cursor-pointer !items-start py-3 text-sm leading-normal break-words !whitespace-normal"
                      >
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="program" className="text-foreground flex items-center gap-2 text-sm font-semibold">
                  <GraduationCap className="text-primary h-4 w-4" />
                  Program
                  <span className="text-destructive">*</span>
                </Label>
                <Select value={selectedProgram} onValueChange={setSelectedProgram} disabled={!selectedDepartment}>
                  <SelectTrigger
                    id="program"
                    className="border-border hover:border-foreground/20 bg-background h-12 w-full text-left text-sm break-words !whitespace-normal transition-colors disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-2 [&>span]:text-left [&>span]:leading-normal [&>span]:break-words [&>span]:whitespace-normal"
                  >
                    <SelectValue placeholder={selectedDepartment ? 'Select your program' : 'Please select a department first'} />
                  </SelectTrigger>
                  <SelectContent className="max-w-[calc(100vw-2rem)] md:max-w-md">
                    {programs.map((program) => (
                      <SelectItem
                        key={program}
                        value={program}
                        className="h-auto min-h-fit cursor-pointer !items-start py-3 text-sm leading-normal break-words !whitespace-normal"
                      >
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4">
              {!isSubmitting ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full text-base font-semibold shadow-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                  size="lg"
                >
                  Continue to Dashboard
                </Button>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-6">
                  <div className="relative">
                    <div className="border-muted border-t-primary h-12 w-12 animate-spin rounded-full border-3" />
                  </div>
                  <p className="text-foreground text-sm font-medium">Setting up your profile...</p>
                </div>
              )}
            </div>

            <p className="text-muted-foreground pt-2 text-center text-xs leading-relaxed">
              By continuing, you agree to our <button className="text-foreground font-medium hover:underline">Terms of Service</button> and{' '}
              <button className="text-foreground font-medium hover:underline">Privacy Policy</button>
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Need assistance?{' '}
            <a href="/contact" className="text-foreground font-medium hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
