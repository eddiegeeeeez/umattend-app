import nodemailer from 'nodemailer';
import { MAIL_USER, MAIL_PASS } from '@/constants/smtp.constants';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: MAIL_USER, 
    pass: MAIL_PASS, 
  },
});

export default transporter;
