import nodemailer from 'nodemailer';
import config from '../../config';



export const sendEmail = async (to: string, html: string) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for port 465
      auth: {
        user: config.EMAIL_USER, // Use environment variables for sensitive information
        pass: config.EMAIL_PASS, // Use environment variables for sensitive information
      },
    });

    // Send mail with defined transporter object
    await transporter.sendMail({
      from: '"Gardenia Support" <enayetflweb@gmail.com>', // Sender address
      to, // List of receivers
      subject: 'Reset Password within 10 minutes', // Subject line
      text: '', // Plain text body (optional)
      html, // HTML body content
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent'); // Optionally throw to handle this error elsewhere
  }
};


