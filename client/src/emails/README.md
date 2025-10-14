# UMAttend Email Templates

This directory contains email templates for UMAttend.

## Welcome Email

The welcome email is sent to new users when they sign up for UMAttend.

### Usage

#### Option 1: React Component (for React Email or similar)

\`\`\`tsx
import { WelcomeEmail } from './welcome-email'

// Use with React Email or render to HTML
<WelcomeEmail userName="John Doe" userEmail="john@um.edu.ph" />
\`\`\`

#### Option 2: HTML String (for Nodemailer, Resend, etc.)

\`\`\`typescript
import { generateWelcomeEmailHTML } from './welcome-email-html'

// Generate HTML string
const htmlContent = generateWelcomeEmailHTML('John Doe', 'john@um.edu.ph')

// Use with your email service
await sendEmail({
  to: 'john@um.edu.ph',
  subject: 'Welcome to UMAttend!',
  html: htmlContent
})
\`\`\`

### Features

- Responsive design that works on all email clients
- UMAttend branding with yellow, white, and black colors
- Welcome message with user personalization
- Feature highlights
- Call-to-action button to explore events
- Support contact information
- Professional footer

### Email Services Integration

This template can be used with:
- **Resend** - Modern email API
- **Nodemailer** - Classic SMTP solution
- **SendGrid** - Enterprise email service
- **Mailgun** - Developer-focused email API
- **React Email** - Build emails with React components

### Example Integration with Resend

\`\`\`typescript
import { Resend } from 'resend'
import { generateWelcomeEmailHTML } from '@/emails/welcome-email-html'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(userName: string, userEmail: string) {
  const html = generateWelcomeEmailHTML(userName, userEmail)
  
  await resend.emails.send({
    from: 'UMAttend <noreply@umattend.edu.ph>',
    to: userEmail,
    subject: 'Welcome to UMAttend! 🎉',
    html: html
  })
}
\`\`\`

### Customization

To customize the email template:
1. Edit `welcome-email.tsx` for the React component version
2. Edit `welcome-email-html.ts` for the HTML string version
3. Update colors, text, or layout as needed
4. Test with different email clients to ensure compatibility
