# MediConnect API

A production-ready REST API for a telehealth platform that connects patients with licensed therapists. Supports appointment booking, real-time video consultations, and role-based access control.

> Built with Node.js · TypeScript · Express.js · MongoDB · Agora · Agenda

---

## Features

- **Auth & roles** — JWT-based authentication with separate flows for patients and therapists
- **Therapist profiles** — registration, verification, specialization, and availability management
- **Appointment booking** — patients book, reschedule, and cancel sessions with therapists
- **Video consultations** — Agora-powered token generation for real-time video calls
- **Background jobs** — Agenda handles appointment reminders and session cleanup
- **Admin controls** — therapist verification and platform oversight endpoints

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Video | Agora RTC |
| Jobs | Agenda |
| Validation | Zod |

---

## Project Structure
src/
├── config/         # DB connection, env, Agora setup
├── modules/
│   ├── auth/       # Register, login, token refresh
│   ├── user/       # Patient profile management
│   ├── therapist/  # Therapist profile and availability
│   ├── appointment/# Booking, rescheduling, cancellation
│   ├── session/    # Agora token generation, video session
│   └── admin/      # Platform management
├── middlewares/    # Auth guard, role check, error handler
├── jobs/           # Agenda job definitions
└── app.ts          # Express app entry point

---

## API Overview

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register as patient or therapist |
| POST | /api/auth/login | Login and receive JWT |
| POST | /api/auth/refresh | Refresh access token |

### Therapists
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/therapists | Browse verified therapists |
| GET | /api/therapists/:id | Get therapist profile |
| PATCH | /api/therapists/:id/availability | Update availability slots |

### Appointments
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/appointments | Book an appointment |
| GET | /api/appointments/:id | Get appointment details |
| PATCH | /api/appointments/:id | Reschedule appointment |
| DELETE | /api/appointments/:id | Cancel appointment |

### Sessions
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/sessions/:appointmentId/token | Generate Agora video token |
| PATCH | /api/sessions/:appointmentId/end | End session |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/itsxcell/mediconnect-api.git
cd mediconnect-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

---

## Environment Variables

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
AGORA_APP_ID=your_agora_app_id
AGORA_APP_CERTIFICATE=your_agora_certificate
```

---

## Status

🚧 **Actively in development** — follow this repo for updates

---

## Author

**Excel Afonime** — Backend Developer
[excelafonime@gmail.com](mailto:excelafonime@gmail.com) · [github.com/itsxcell](https://github.com/itsxcell)
