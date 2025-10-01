<h1 align="center">
  <a href="https://dentahub.vercel.app/">
     <img src="./public/dentahub.png" alt="DentaHub Banner" width="100%" height="100%">
  </a> 
</h1>

## 🦷 DentaHub - Modern Dental Appointment System
> **A full-stack dental platform that digitizes patient registration, appointment scheduling and administration.**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js_15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?logo=appwrite&logoColor=white)](https://appwrite.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)](https://openai.com/)




[**🎥 Watch Demo Video**](#) <!-- Add your Loom video link here -->

---

## 📋 Table of Contents

- [Demo Access](#-demo-access)
- [Key Features](#-key-features)
- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Tech Stack](#-tech-stack)
- [What I Learned](#-what-i-learned)
- [Future Enhancements](#-future-enhancements)
- [Important Notes](#-important-notes)


---

## 🎭 Demo Access

**Live Demo:** [dentahub-manage.vercel.app](https://dentahub-manage.vercel.app)

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
## ✨ Key Features
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
- Illegible handwriting leading to errors in patient records
- No way to track appointments or update personal information
- Forms could be lost or damaged

**For Clinic Staff:**
- Difficulty reading handwritten patient information
- Time-consuming manual data entry and retrieval
- Risk of losing important patient documents
- No centralized system for appointment management
- Mixing sensitive medical data with basic administrative information

These pain points inspired me to create a digital solution that improves the experience for both patients and healthcare providers.

---

## ✅ The Solution

**DentaHub** is a modern web application that streamlines the entire patient journey - from registration to appointment management. The platform separates administrative tasks from medical workflows, allowing patients to:

- Complete registration forms at their own pace from any device
- View and manage their appointments in real-time
- Update personal information without clinic visits
- Get instant answers to common dental questions via AI chatbot

Meanwhile, clinic administrators can:
- Manage all appointments from a centralized dashboard
- Confirm or cancel appointments with automated SMS notifications
- Access patient information securely with proper authentication
- Track appointment statistics (scheduled, pending, cancelled)

---

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library
- **react-hook-form** - Performant form management
- **Zod** - Schema validation

### Backend & Services
- **Appwrite** - Backend-as-a-Service
  - Authentication
  - Database (NoSQL)
  - Storage (file uploads)
  - Real-time updates
- **OpenAI API** - AI chatbot integration
- **Twilio** - SMS notifications

### Key Libraries
- **react-datepicker** - Date and time selection
- **react-phone-number-input** - International phone formatting
- **react-markdown** - Chatbot response formatting
- **lucide-react** - Icon library

---

## 📚 What I Learned

### Technical Growth

**Appwrite Mastery**
This was my first project using Appwrite after working with Supabase. The documentation presented challenges, but I learned to:
- Distinguish between client-side and server-side Appwrite implementations
- Implement secure authentication flows
- Manage file storage and retrieval
- Handle real-time database updates

**SMS Integration with Twilio**
Implemented automated notification system that:
- Sends appointment confirmations
- Alerts patients of cancellations
- Updates appointment status in real-time across the platform

**Complex Form Handling**
Built multi-step forms with:
- Real-time validation using Zod schemas
- Dynamic field rendering based on user input
- File upload with preview
- Phone number formatting for international numbers
- Date/time selection with business logic constraints

### Problem-Solving Highlights

**Doctor Availability Logic**
Created an algorithm that:
- Filters time slots by business hours
- Checks existing appointments to prevent double-booking
- Updates availability in real-time as appointments are scheduled
- Handles different time zones correctly

**Next.js Caching Challenges**
Learned to manage Next.js 15's aggressive caching strategy by:
- Implementing proper revalidation strategies
- Using `force-dynamic` for real-time admin data
- Understanding the difference between build-time and runtime data fetching

**Type Safety Throughout**
Maintained full TypeScript coverage with:
- Custom interfaces for Patient, Appointment, and User types
- Zod schemas that match TypeScript interfaces
- Generic form components that work with any schema
- Proper error handling with typed catch blocks

---

## 🔮 Future Enhancements

While the current version is fully functional, here are planned improvements:

- **Email Verification** - Easy to implement with Appwrite's built-in email service
- **Multi-language Support** - Internationalization for broader accessibility
- **Payment Integration** - Stripe/PayPal for appointment deposits
- **Video Consultations** - Integrate Zoom or similar for telehealth
- **Medical Records** - Separate secure section for clinical notes (dentist-only access)
- **Appointment Reminders** - Automated SMS/email reminders 24 hours before appointments
- **Advanced Analytics** - Charts and graphs for appointment trends
- **Patient Reviews** - Rating system for doctors and services
- **Export Reports** - PDF generation for patient records

---

## ⚠️ Important Notes

### Portfolio Project Disclaimers

**Admin Passkey Exposure**
The admin passkey (`123456`) is intentionally exposed for demonstration purposes only. In a production environment:
- Passkeys would NEVER be exposed in code or documentation
- Multi-factor authentication would be implemented
- Role-based access control would be enforced
- Admin sessions would have timeout mechanisms

**Privacy & Compliance**
This application demonstrates technical capabilities but is not HIPAA-compliant in its current state. For real-world medical use, additional features would be required:
- HIPAA-compliant data encryption at rest and in transit
- Audit logging for all data access
- Patient consent management specific to jurisdiction
- Data retention and deletion policies
- Business Associate Agreements with third-party services

The current privacy consent system is simplified - each medical institution would need to implement their own specific privacy policies based on:
- Local healthcare regulations
- Institutional policies
- Insurance requirements
- Legal jurisdiction

**Data Security**
- All sensitive data is encrypted by Appwrite
- Files are stored securely with access control
- Authentication tokens are httpOnly cookies
- Environment variables protect API keys

---

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests with improvements
- Share ideas for enhancements

---

## 📧 Contact

**Your Name**
- Portfolio: [your-portfolio.com](#)
- LinkedIn: [linkedin.com/in/yourprofile](#)
- Email: your.email@example.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Appwrite** for the robust backend infrastructure
- **Vercel** for seamless deployment
- My 10 years in customer service, which taught me to always prioritize user experience

---

**Built with ❤️ by a developer who understands both sides of the customer service counter**
