import Queue from "bull";
import Redis from "ioredis";
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
} from "../../constants/redis.constants";
import { transporter } from "../../configs/smtp.config";
import { EmailJob } from "../interface/email";

function createRedisClient() {
  return new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    maxRetriesPerRequest: null, // <-- important for Bull
    enableReadyCheck: false,    // <-- important for Bull
  });
}

export const emailQueue = new Queue<EmailJob>("email-queue", {
  createClient: (type) => {
    switch (type) {
      case "client":
        return createRedisClient();
      case "subscriber":
        return createRedisClient();
      case "bclient":
        return createRedisClient();
      default:
        throw new Error(`Unexpected connection type: ${type}`);
    }
  },
});

emailQueue.process(async (job) => {
  const { to, subject, text, html } = job.data;

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    text,
    html,
  });

  console.log(`📧 Email sent to ${to}`);
});
