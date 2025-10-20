'use client';

import { Settings as SettingsIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AcademicInfoForm, LoginHistoryTable } from '@/components/profile/settings';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <main className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
              <SettingsIcon className="text-primary h-6 w-6" />
            </div>
            <div>
              <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">Account Settings</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Manage your profile information and security</p>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <Tabs defaultValue="academic" className="space-y-6">
          <TabsList className="bg-muted grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="academic" className="data-[state=active]:bg-background">
              Academic Info
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-background">
              Login History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academic" className="space-y-4">
            <AcademicInfoForm />
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <LoginHistoryTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
