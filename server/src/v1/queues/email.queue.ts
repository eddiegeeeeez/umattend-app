import { Queue, Worker, JobsOptions } from 'bullmq';
import { transporter } from '../../configs/smtp.config';
import { EmailJob } from '../interface/email';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
} from '../../constants/redis.constants';

const connection = {
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};

// Queue definition
export const emailQueue = new Queue<EmailJob>('email-queue', {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: {
      age: 86400, // 1 day
      count: 1000,
    },
    removeOnFail: {
      age: 604800, // 7 days
    },
  } as JobsOptions,
});

// Worker — automatically processes jobs
const emailWorker = new Worker<EmailJob>(
  'email-queue',
  async (job) => {
    const { to, subject, text, html } = job.data;

    try {
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject,
        text,
        html,
      });
      console.log(`📧 Email sent to ${to}`);
    } catch (error) {
      console.error(`❌ Failed to send email to ${to}:`, error);
      throw error;
    }
  },
  { connection }
);

emailWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed for ${job.data.to}`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed after ${job?.attemptsMade} attempts:`, err);
});
