import { WelcomeEmail } from '@/emails/welcome-email';

export default function EmailPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-6 rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-2 text-2xl font-bold">Email Template Preview</h1>
          <p className="mb-4 text-gray-600">This is how the welcome email will look when sent to new users.</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>Template: Welcome Email</span>
            <span>•</span>
            <span>Type: Sign Up</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <WelcomeEmail userName="John Doe" userEmail="john.doe@university.edu.ph" />
        </div>
      </div>
    </div>
  );
}
