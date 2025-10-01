<h1 align="center">
  <a href="https://dentahub.vercel.app/">
     <img src="./public/dentahub.png" alt="DentaHub Banner" width="100%" height="100%">
  </a> 
</h1>

## 🦷 DentaHub - Modern Dental Appointment System
> **A full-stack responsive dental platform that digitizes patient registration, appointment scheduling and administration.**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js_15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?logo=appwrite&logoColor=white)](https://appwrite.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)](https://openai.com/)




<video width="100%" autoplay> 
<source src="./assets/screen-capture.webm" type="video/webm"/>
</video>

---

## 📋 Table of Contents

- [Demo Access](#-demo-access)
- [Key Features](#-key-features)
- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Tech Stack](#-tech-stack)
- [Future Enhancements](#-future-enhancements)
- [Important Notes](#-important-notes)


---

## 🎭 Demo Access

**Live Demo:** [dentahub.vercel.app](https://dentahub.vercel.app)

### Patient Dashboard
Click the **"Demo Patient"** button on the homepage to instantly access a pre-configured patient account and explore all features.

### Admin Dashboard
1. Click "Admin" in the footer of the homepage
2. Enter passkey: `123456`
3. Explore appointment management features
4. SMS notification is fully set up but not available in Demo mode (see Key Features for screenshots)
   
---

<details open>
<summary>
✨ Key Features
</summary> <br />

<p align="center">
    <img width="49%" src="./assets/authentication.png" alt="authentication"/>
&nbsp;
    <img width="49%" src="./assets/registration.png" alt="registration"/>
</p>

<p align="center">
    <img width="49%" src="./assets/patients.png" alt="patients"/>
&nbsp;
    <img width="49%" src="./assets/appointments.png" alt="appointments"/>
</p> 
    
<p align="center">
    <img width="49%" src="./assets/passkey.png" alt="passkey"/>
&nbsp;
    <img width="49%" src="./assets/admin-dash.png" alt="admin dashboard"/>
</p>

<p align="center">
    <img width="49%" src="./assets/ai.png" alt="ai"/>
&nbsp;
    <img width="49%" src="./assets/sms.png" alt="sms"/>
</p>

</details>

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

**DentaHub** is a modern web application that streamlines the entire patient journey - from registration to appointment management. 

Patients can:
- Complete registration forms at their own pace from any device
- View and manage their appointments in real-time
- Update personal information without clinic visits
- Get instant answers to common dental questions via AI chatbot

Meanwhile, clinic administrators can:
- Manage all appointments from a centralized dashboard
- Confirm or cancel appointments with automated SMS notifications
- Track appointment statistics (scheduled, pending, cancelled)

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15** 
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **react-hook-form**
- **Zod**
- 
### Backend & Services
- **Appwrite**
  - Authentication
  - Database (NoSQL)
  - Storage (file uploads)
  - Real-time updates
- **OpenAI API** - AI chatbot integration
- **Twilio** - SMS notifications

### Key Libraries
- **react-datepicker**
- **react-phone-number-input**
- **react-markdown**
- **react-hot-toast**
- **lucide-react**

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

**Data Security**
- All sensitive data is encrypted by Appwrite
- Files are stored securely with access control
- Authentication tokens are httpOnly cookies
- Environment variables protect API keys

---

**Built with ❤️ by a developer who understands both sides of the customer service counter**
