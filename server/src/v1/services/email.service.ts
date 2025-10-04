// services/emailService.ts
import { emailQueue } from '../queues/email.queue';

export const sendEmail = async (
  to: string,
  subject: string,
  text?: string,
  html?: string
) => {
  try {
    await emailQueue.add({ to, subject, text, html });
    return true;
  } catch (err) {
    console.error('Email failed:', err);
    return false;
  }
};
