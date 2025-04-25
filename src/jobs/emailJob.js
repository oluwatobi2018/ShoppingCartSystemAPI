const nodemailer = require('nodemailer');
const Queue = require('bull');
const logger = require('../utils/logger');

// Create a new Bull queue for email sending
const emailQueue = new Queue('emailQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Set up the email transporter using Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can replace this with any other email provider you use
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password
  },
});

// Function to send email
const sendEmail = async (emailData) => {
  const { to, subject, text, html } = emailData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error(`Error sending email to ${to}: ${error.message}`);
    throw error;
  }
};

// Define the email job handler
emailQueue.process(async (job) => {
  const { emailData } = job.data;
  await sendEmail(emailData);
});

// Function to add an email job to the queue
const addEmailJob = (emailData) => {
  emailQueue.add({ emailData });
};

module.exports = {
  addEmailJob,
};
