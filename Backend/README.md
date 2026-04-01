# 🏦 Secure Bank API

A robust backend system for a digital banking application built using Node.js and MongoDB.
This project simulates real-world banking operations such as secure transactions, account management, and automated card services.

---

## 🚀 Key Features

* 🔐 Secure Authentication (JWT-based Register & Login)
* 🏦 Automatic Bank Account Creation
* 💳 Auto-Generated Debit Card System
* 💸 Money Transfer System

  * IMPS (Immediate Payment Service)
  * NEFT (National Electronic Funds Transfer)
  * RTGS (Real-Time Gross Settlement)
* ➕ Credit Money
* ➖ Debit Money
* 📜 Transaction History Tracking
* 🔍 Account Verification Before Transfer
* 🛡️ Protected Routes with Middleware

---

## 🧠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)

---

## 📂 Project Structure

```
src/
├── controllers/
├── services/
├── models/
├── routes/
├── middleware/
├── utils/
└── config/
```

---

## 🔐 Authentication Flow

* User registers → account + debit card auto-created
* Login returns JWT token
* Protected routes require token verification

---

## 💳 Core Banking Functionalities

### 🏦 Account System

* Unique account number generation
* Linked to user profile

### 💳 Card System

* Debit card auto-issued
* Card status: Active / Blocked

### 💸 Transactions

* Secure money transfer between users
* Supports multiple transaction modes:

  * IMPS (instant)
  * NEFT (batch-based)
  * RTGS (high-value transfers)

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/secure-bank-api.git

# Navigate to project folder
cd secure-bank-api

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Run development server
npm run dev
```

---

## 🌍 Environment Variables

Create a `.env` file and configure:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 📌 Sample API Endpoints

| Method | Endpoint                  | Description         |
| ------ | ------------------------- | ------------------- |
| POST   | /api/auth/register        | Register new user   |
| POST   | /api/auth/login           | Login user          |
| POST   | /api/transaction/transfer | Transfer money      |
| POST   | /api/credit               | Credit money        |
| POST   | /api/debit                | Debit money         |
| GET    | /api/transactions         | Transaction history |

---

## 🛡️ Security Features

* JWT Authentication
* Protected Routes
* Environment-based configuration
* Basic validation (can be extended)

---

## ⚠️ Notes

* `.env` file is not included for security reasons
* `node_modules` is ignored
* This project is built for learning and portfolio demonstration

---

## 📈 Future Improvements

* File upload support (Multer)
* Transaction locking (prevent race conditions)
* Rate limiting & logging system
* Caching with Redis
* Frontend integration (React.js)

---

## 👨‍💻 Author

**Nikhil**
Aspiring Software developer 🚀

---

## ⭐ Support

Although this is my first project...And if you found this project useful, consider giving it a ⭐ on GitHub!
