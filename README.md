<div align="center">
  <img src="./assets/dentahub.png" alt="DentaHub Logo" width="100%">
  <h1>AI-Powered Dental Appointment & Patient Registration Platform</h1>  
  </div>

### **A full-stack dental platform featuring AI-assisted patient support, smart appointment scheduling and administration.**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js_15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)](https://openai.com/)
[![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?logo=appwrite&logoColor=white)](https://appwrite.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

---

## 📋 Table of Contents

- [Demo Access](#-demo-access)
- [Key Features](#-key-features)
- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Tech Stack](#-tech-stack)
- [AI Implementation](#-ai-implementation)
- [Future Enhancements](#-future-enhancements)
- [Important Notes](#-important-notes)


---

## 🎭 Demo Access

<a href="https://www.loom.com/share/d71b9d8645634cbfbff0b90f7dd5262c?sid=4492fec9-58e7-43d8-9b0a-12834469dce5">
    <img src="https://img.shields.io/badge/📹_Watch_2min_Demo-Click_Here-blue?style=for-the-badge" alt="Watch Demo">
</a>
  
**Live Demo:** [dentahub.vercel.app](https://dentahub.vercel.app)

### Patient Dashboard
Click the **"Demo Patient"** button on the homepage to instantly access a pre-configured patient account and explore all features.

### Admin Dashboard
1. Click "Admin" in the footer of the homepage
2. Enter passkey: `123456`
3. Explore appointment management features
4. SMS notification is fully set up but not available in Demo mode (see Key Features for screenshots)
   
---
### 🤖 AI-Powered Patient Support
**Intelligent Dental Chatbot** - Patients can ask common dental questions and receive instant, accurate responses powered by OpenAI's GPT models. The AI is specifically programmed with safety guardrails to **never provide medical advice or diagnoses**, instead directing patients to schedule professional consultations when needed.

<p align="center">
    <img width="70%" src="./assets/ai.png" alt="AI Dental Assistant"/>
</p>

### 📱 Patient Experience
<p align="center">
    <img width="49%" src="./assets/authentication.png" alt="Secure Authentication"/>
&nbsp;
    <img width="49%" src="./assets/registration.png" alt="Digital Registration"/>
</p>

- **Secure Authentication** - Phone number-based login with OTP verification
- **Comprehensive Digital Registration** - Complete patient forms at their own pace from any device
- **Real-time Appointment Management** - View, schedule, and track appointments instantly
- **Document Upload** - Secure medical document storage via Appwrite

### 🏥 Admin Dashboard
<p align="center">
    <img width="49%" src="./assets/admin-dash.png" alt="Admin Dashboard"/>
&nbsp;
    <img width="49%" src="./assets/appointments.png" alt="Appointment Management"/>
</p>

- **Centralized Appointment Control** - Confirm, reschedule, or cancel appointments
- **Real-time Statistics** - Track scheduled, pending, and cancelled appointments
- **Patient Management** - Access complete patient records and history
- **Automated SMS Notifications** - Twilio integration for appointment confirmations

<p align="center">
    <img width="49%" src="./assets/passkey.png" alt="Secure Admin Access"/>
&nbsp;
    <img width="49%" src="./assets/sms.png" alt="SMS Notifications"/>
</p>

---

## 🔍 The Problem

After working in customer service for 10 years, including at a dental clinic, I witnessed firsthand the inefficiencies of paper-based patient management systems:

**For Patients:**
- Uncomfortable filling out lengthy forms in waiting rooms under time pressure
- No way to track appointments or update personal information
- Forms could be lost or damaged

**For Clinic Staff:**
- Difficulty reading handwritten patient information
- Time-consuming manual data entry and retrieval
- Risk of losing important patient documents
- No centralized system for appointment management

These pain points inspired me to create a digital solution that improves the experience for both patients and healthcare providers.

---

## ✅ The Solution

**DentaHub** is a modern, AI-enhanced web application that streamlines the entire patient journey - from registration to appointment management. 

**Patients can:**
- Complete registration forms at their own pace from any device
- Get instant answers to common dental questions via AI chatbot
- View and manage their appointments in real-time
- Update personal information without clinic visits

**Meanwhile, clinic administrators can:**
- Manage all appointments from a centralized dashboard
- Confirm or cancel appointments with automated SMS notifications
- Track appointment statistics (scheduled, pending, cancelled)

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library
- **react-hook-form** + **Zod** - Form validation
  
### Backend & Services
- **Appwrite**
  - Authentication (Phone-based OTP)
  - Database (NoSQL)
  - Storage (Secure file uploads)
  - Real-time updates
- **OpenAI API** - GPT-powered chatbot with custom safety prompts
- **Twilio** - SMS notification system

### Key Libraries
- **react-datepicker** - Appointment scheduling
- **react-phone-number-input** - International phone formatting
- **react-markdown** - AI response rendering
- **react-hot-toast** - User notifications
- **lucide-react** - Icon system
---

## 🤖 AI Implementation

### Responsible AI Design

The dental chatbot leverages OpenAI's API with carefully created system prompts to ensure:

✅ **Safety-First Approach** - Explicitly programmed to never provide medical diagnoses or treatment advice  
✅ **Appropriate Boundaries** - Directs patients to schedule appointments for any medical concerns  
✅ **General Information Only** - Answers common questions about dental hygiene, procedures and appointment preparations
✅ **Liability Protection** - Clear disclaimers that responses are informational, not medical advice

Drawing on my 10 years in customer service, I set up the AI to handle the types of repetitive questions that consume staff time while maintaining professional boundaries appropriate for healthcare settings.

---
## 🔮 Future Enhancements

While the current version is fully functional, here are planned improvements:

- **Email Verification** - Easy to implement with Appwrite's built-in email service
- **Multi-language Support** - Internationalization for broader accessibility
- **Payment Integration** - Stripe/PayPal for appointment deposits
- **Appointment Reminders** - Automated SMS/email reminders 24 hours before appointments
- **Export Reports** - PDF generation for patient records

---

> [!IMPORTANT]
> **Disclaimers**

**Admin Passkey Exposure**
The admin passkey is intentionally exposed for demonstration purposes only. In a production environment passkeys would never be exposed in code or documentation.

**Privacy & Compliance**
This application demonstrates technical capabilities but is not GDPR-compliant in its current state. For real-world medical use in the EU, additional features would be required:
- GDPR-compliant data encryption and audit logging
- Data subject rights implementation (access, erasure, portability)
- Data Protection Impact Assessment (DPIA)
- Data Processing Agreements with third-party services
- Patient consent management and data retention policies

While Appwrite offers compliance features, each EU member state may have additional healthcare data regulations that must be addressed.

**AI Disclaimer**  
The AI chatbot is for informational purposes only and explicitly programmed to avoid providing medical advice. All medical concerns are directed to professional consultation.

**Data Security**
- All sensitive data is encrypted by Appwrite
- Files are stored securely with access control
- Authentication tokens are httpOnly cookies
- Environment variables protect API keys

---

**Built with ❤️ by a developer who understands both sides of the customer service counter**
