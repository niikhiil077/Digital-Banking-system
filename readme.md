# 💳 Bank API System

## 📌 Project Overview

**Bank API System** is a complete full-stack banking application built as a first real-world project. It combines a robust Express.js backend with a modern React + Tailwind frontend to simulate a secure banking environment.

This repository includes:

- A RESTful backend API with authentication, account management, payment flows, beneficiary management, and transaction history.
- A frontend client built with React, Vite, Redux, and Tailwind CSS.
- Realistic banking operations such as bank transfer, UPI payments, credit/debit actions, card status, beneficiary list, and user profile management.

> This is the first full project in my portfolio, created to demonstrate practical backend and frontend skills while keeping the architecture clean and extendable.

---

## 🚀 What the Project Does

### Backend highlights

- Secure user registration and login using JWT.
- Middleware-based authorization and route protection.
- Bank account lifecycle management, including card and balance state.
- Multiple transaction types:
  - Bank Transfer (IMPS, NEFT, RTGS)
  - UPI payment
  - Credit
  - Debit
  - Beneficiary transfer
- Beneficiary management with duplicate prevention and removal.
- Transaction history retrieval for all transactions and user-specific transaction search.
- Card status checks and card detail retrieval.
- User personal details and account verification endpoints.

### Frontend highlights

- Responsive React interface using Vite and Tailwind CSS.
- Client-side routing with React Router.
- Global state management with Redux Toolkit.
- Pages for:
  - Signup / Signin
  - Dashboard / Home
  - Account details
  - Transaction history
  - Bank transfer and transfer success
  - UPI payments
  - Credit and debit operations
  - Card details
  - Beneficiary payment flow
- Alerts and error handling for a smooth user experience.

---

## 🧱 Architecture

### Backend structure

- `Backend/app.js` — Express app setup, middleware, CORS, routes, and global error handler.
- `Backend/routes/` — API route definitions separated by domain:
  - `authentication.route.js`
  - `transaction.route.js`
  - `service.route.js`
  - `delete.route.js`
- `Backend/controllers/` — Controller logic for users, transactions, services, and delete operations.
- `Backend/models/` — Mongoose schemas for User, Bank, Transaction, Beneficiary, Card, and more.
- `Backend/middlewares/` — Validation, authentication, beneficiary handling, card checks, and request parsing.
- `Backend/utils/` — Utility helpers for response handling, transaction calculations, bank services, and async wrappers.

### Frontend structure

- `frontend-2/src/App.jsx` — App routing and protected route configuration.
- `frontend-2/src/pages/` — Page-level components for each feature.
- `frontend-2/src/components/` — Shared UI elements, navigation, loading states, and auth guards.
- `frontend-2/src/context/` — Redux slices and state management.
- `frontend-2/config/axios.js` — API client configuration.

---

## 📦 Key Features Explained

### Authentication

- Register new users with validation.
- Login users using JWT tokens.
- Token refresh and logout endpoints.
- Protected routes for sensitive operations.

### Bank Transfers

- Transfer money through IMPS, NEFT, RTGS.
- Validate account number, IFSC, amount, and daily transfer limits.
- Transaction creation and atomic balance updates with MongoDB.
- Transfer success page and detailed response payload.

### Beneficiary Flow

- Add beneficiary during bank transfer.
- Prevent duplicate beneficiaries while allowing the transfer to continue.
- Fetch saved beneficiary list.
- Remove beneficiary from list.
- Transfer to saved beneficiaries with one click.

### UPI + Card Management

- UPI payment flow with card validation.
- Check card status and validity.
- Fetch card details securely.

### Transaction History

- Get all transactions for the logged-in user.
- Search user-specific transactions by receiver account.
- Includes transaction amount, status, method, and mode.

### Account & Profile Services

- User details and personal details endpoints.
- Bank status check and card status checks.
- PIN setting and other support service APIs.

---

## ⚙️ Setup Instructions

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/` with required values such as:

```env
PORT=5000
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_jwt_secret>
```

Run the backend server:

```bash
npm start
```

### Frontend

```bash
cd frontend-2
npm install
npm run dev
```

Open the local Vite URL in your browser (usually `http://localhost:5173`).

---

## 🔌 API Endpoints Overview

### Auth API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/verify-user`
- `GET /api/auth/refresh-token`
- `GET /api/auth/logout`

### Transaction API

- `POST /api/transaction/banktransfer`
- `POST /api/transaction/credit`
- `POST /api/transaction/debit`
- `POST /api/transaction/upi`
- `POST /api/transaction/beneficiary`

### Service API

- `GET /api/service/user-details`
- `GET /api/service/personal-details`
- `POST /api/service/card-status`
- `POST /api/service/bank-status`
- `POST /api/service/set-pin`
- `GET /api/service/getBeneficiary-list`
- `POST /api/service/removeBeneficiary`
- `POST /api/service/search`
- `GET /api/service/getAllTransaction`
- `GET /api/service/getTransaction`
- `GET /api/service/getCardDetails`

### Delete API

- `POST /api/delete/account`

---

## 🛠️ Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- Frontend: React, Vite, Redux Toolkit, Tailwind CSS, Axios, React Router
- Utilities: dotenv, cors, cookie-parser, express-validator, multer

---

## 💡 Notes

- This is the first full-stack banking project I built, and it is intentionally designed for learning and real-world simulation.
- The project architecture separates services, controllers, middleware, and utilities for easier scaling and maintenance.
- I focused on making the transfer flows, beneficiary behavior, and authentication as realistic as possible.

---

## 🙌 Support

If you want to help improve this project or need support:

- Open an issue for bugs or feature requests.
- Share suggestions for UX, API design, or security improvements.
- Star the repository if you like the direction and effort.

If you are a support developer or review engineer, this README is designed to give you a quick project overview and a clear path for testing both backend APIs and frontend flows.

---

## 🎯 Final Summary

Bank API System is a learning-first banking application that already supports many real banking patterns:

- Authentication and session management
- Account and card service checks
- Secure transfer modes and beneficiary controls
- Transaction history with search
- Frontend integration using modern React tooling

This is the first project in the portfolio, and it is structured to be easy to extend with additional features, stronger security, and production-ready deployment later.
