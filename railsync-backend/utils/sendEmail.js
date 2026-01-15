const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"RAILSYNC" <${process.env.EMAIL_FROM}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
      text: options.text
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

const sendWelcomeEmail = async (student) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
        .header { background: #0B5ED7; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .button { background: #0B5ED7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚆 Welcome to RAILSYNC</h1>
        </div>
        <div class="content">
          <h2>Hello ${student.fullName},</h2>
          <p>Welcome to RAILSYNC - Railway Concession Automation System for Mumbai Students!</p>
          <p>Your registration has been successfully completed with the following details:</p>
          <ul>
            <li><strong>Student ID:</strong> ${student.studentId}</li>
            <li><strong>College:</strong> ${student.college}</li>
            <li><strong>Course:</strong> ${student.course} - ${student.year} Year</li>
          </ul>
          <p>You can now login to your account and apply for railway concession.</p>
          <p>
            <a href="${process.env.FRONTEND_URL}/student/login" class="button">Login to Dashboard</a>
          </p>
          <p>Need help? Contact our support team at support@railsync.in</p>
        </div>
        <div class="footer">
          <p>© 2024 RAILSYNC - Mumbai Suburban Railways. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return sendEmail({
    email: student.email,
    subject: 'Welcome to RAILSYNC - Railway Concession System',
    html
  });
};

const sendApplicationStatusEmail = async (application, student) => {
  const statusTemplates = {
    submitted: {
      subject: 'Application Submitted Successfully',
      message: 'Your railway concession application has been submitted successfully.'
    },
    under_review: {
      subject: 'Application Under Review',
      message: 'Your application is now under review by railway authorities.'
    },
    approved: {
      subject: '🎉 Application Approved!',
      message: 'Congratulations! Your railway concession application has been approved.'
    },
    rejected: {
      subject: 'Application Status Update',
      message: 'Your application requires additional information.'
    }
  };
  
  const template = statusTemplates[application.status] || statusTemplates.submitted;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
        .header { background: #0B5ED7; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .status-badge { 
          display: inline-block; 
          padding: 8px 16px; 
          border-radius: 20px; 
          font-weight: bold; 
          margin: 10px 0; 
        }
        .approved { background: #00A651; color: white; }
        .pending { background: #FFD700; color: black; }
        .rejected { background: #DC2626; color: white; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚆 Application Status Update</h1>
        </div>
        <div class="content">
          <h2>Hello ${student.fullName},</h2>
          <p>${template.message}</p>
          
          <div class="status-badge ${application.status}">
            ${application.status.toUpperCase().replace('_', ' ')}
          </div>
          
          <h3>Application Details:</h3>
          <ul>
            <li><strong>Application ID:</strong> ${application.applicationId}</li>
            <li><strong>Route:</strong> ${application.travelDetails.fromStation} → ${application.travelDetails.toStation}</li>
            <li><strong>Class:</strong> ${application.travelDetails.travelClass}</li>
            <li><strong>Submitted:</strong> ${new Date(application.submittedAt).toLocaleDateString()}</li>
          </ul>
          
          <p>You can track your application status by logging into your dashboard.</p>
          <p>
            <a href="${process.env.FRONTEND_URL}/student/status" style="background: #0B5ED7; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Application Status
            </a>
          </p>
          <p>Need assistance? Contact railway department helpline: 1800-123-4567</p>
        </div>
        <div class="footer">
          <p>© 2024 RAILSYNC - Mumbai Suburban Railways. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return sendEmail({
    email: student.email,
    subject: template.subject,
    html
  });
};

const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
        .header { background: #DC2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .button { background: #DC2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; }
        .warning { color: #DC2626; font-weight: bold; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔒 Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Hello,</h2>
          <p>We received a request to reset your password for your RAILSYNC account.</p>
          <p>Click the button below to reset your password:</p>
          <p>
            <a href="${resetUrl}" class="button">Reset Password</a>
          </p>
          <p class="warning">This link will expire in 1 hour for security reasons.</p>
          <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
          <p>Need help? Contact our support team at support@railsync.in</p>
        </div>
        <div class="footer">
          <p>© 2024 RAILSYNC - Mumbai Suburban Railways. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return sendEmail({
    email: user.email,
    subject: 'RAILSYNC - Password Reset Request',
    html
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendApplicationStatusEmail,
  sendPasswordResetEmail
};