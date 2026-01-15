# 🚆 RAILSYNC Backend

Backend API for Railway Concession Automation System (Mumbai Suburban Railways)

## 📋 Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Student/Admin)
- Password reset functionality
- Secure password hashing with bcrypt

### Student Module
- Student registration and profile management
- Concession application management
- Document upload and management
- Application status tracking
- Notification system

### Admin Module
- Dashboard with analytics
- Application review and approval
- Document verification
- Student management
- Report generation
- Export functionality

### Core Features
- RESTful API design
- File upload with Cloudinary integration
- Email notifications
- Comprehensive logging
- Rate limiting and security headers
- Input validation and sanitization

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcrypt
- **File Storage:** Cloudinary
- **Email:** Nodemailer
- **Validation:** Express-validator
- **Logging:** Winston
- **Security:** Helmet, CORS, rate limiting

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Cloudinary account (for file uploads)
- SMTP email service (for notifications)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/railsync-backend.git
cd railsync-backend