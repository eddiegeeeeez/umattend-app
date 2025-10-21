import { emailQueue } from '../queues/email.queue';
import { EmailJob } from '../interface/email';
import { v4 as uuidv4 } from 'uuid';

export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const emailData: EmailJob = { to, subject, html };
  const jobId = uuidv4();
  await emailQueue.add('send-email', emailData, {
    jobId,
  });
  console.log(`Queued email to ${to}`);
}
