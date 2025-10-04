import Queue from 'bull';
import Redis from 'ioredis';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
} from '../../constants/redis.constants';
import { transporter } from '../../configs/smtp.config';
import { EmailJob } from '../interface/email';

function createRedisClient(): Redis {
  return new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });
}

export const emailQueue = new Queue<EmailJob>('email-queue', {
  createClient: (type) => {
    switch (type) {
      case 'client':
        return createRedisClient();
      case 'subscriber':
        return createRedisClient();
      case 'bclient':
        return createRedisClient();
      default:
        throw new Error(`Unexpected connection type: ${type}`);
    }
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: {
      age: 86400,
      count: 1000,
    },
    removeOnFail: {
      age: 604800,
    },
  },
});

async function processEmailJob(job: Queue.Job<EmailJob>): Promise<void> {
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
    console.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
}

emailQueue.process(processEmailJob);

emailQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed for ${job.data.to}`);
});

emailQueue.on('failed', (job, err) => {
  console.error(
    `Job ${job.id} failed after ${job.attemptsMade} attempts:`,
    err
  );
});
