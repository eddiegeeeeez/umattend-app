import nodemailer from 'nodemailer';
import {
  MAIL_USER,
  MAIL_PASS,
} from '@/constants/smtp.constants';

export const transporter = nodemailer.createTransport({
  host: "Gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export default transporter;
