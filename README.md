# 🌙 Mood Journal App

A full‑stack mood journaling application built using **Angular** (frontend) and **Node.js + Express + Sequelize + MySQL** (backend). Users can securely register, log in, create personal journal entries, update their profile, and delete their account.

---

## 🚀 Features

### 🔐 Authentication

* User registration with validation
* Login with JWT-based authentication
* Password hashing using **bcrypt**
* Protected APIs using JWT middleware

### 📘 Journal Management

* Create a new journal entry
* View only your journal entries (private)
* Delete individual entries
* Automatic mapping between **User** and **JournalEntry** via Sequelize associations

### 👤 Profile Management

* View logged-in user's profile
* Update username (with uniqueness check), full name, and password
* Delete account (also deletes all journal entries)

---

## 🏗️ Tech Stack

### **Frontend (Angular 18)**

* Standalone components
* HttpClient for API calls
* Reactive Forms
* LocalStorage for storing JWT
* Responsive modern UI styling

### **Backend (Node.js + Express)**

* REST API architecture
* Sequelize ORM
* JWT authentication
* Bcrypt password security

### **Database**

* **MySQL** with Sequelize models:

  * `User`
  * `JournalEntry`

---

## ⚙️ Setup Instructions

### **1. Clone the repository**

```bash
git clone <repo-url>
cd mood-journal
```

---

## 🛠️ Backend Setup

### **2. Install dependencies**

```bash
cd mood-journal-backend
npm install
```

### **3. Create `.env` file**

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=moodjournal
JWT_SECRET=your_secret_key
```

### **4. Start MySQL server**

Ensure MySQL is running.

### **5. Start Backend**

```bash
npm run start
```

Backend will run on **[http://localhost:5000](http://localhost:5000)**.

---

## 💻 Frontend Setup

### **6. Install Angular dependencies**

```bash
cd frontend\mood-frontend
npm install
```

### **7. Start Angular App**

```bash
npm start
```

Frontend runs on **[http://localhost:4200](http://localhost:4200)**.

---

## 🔒 API Endpoints

### **Auth Routes**

| Method | Endpoint                   | Description            |
| ------ | -------------------------- | ---------------------- |
| POST   | `/api/auth/login`          | Login user             |
| POST   | `/api/auth/register`       | Register user          |
| GET    | `/api/auth/profile`        | Get user profile       |
| PUT    | `/api/auth/profile/update` | Update profile details |
| DELETE | `/api/auth/delete-account` | Delete user + data     |

### **Journal Routes**

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| POST   | `/api/journal/add`        | Add new entry        |
| GET    | `/api/journal/all`        | Fetch user's entries |
| DELETE | `/api/journal/delete/:id` | Delete entry         |

---

## 🧠 How Authentication Works

1. User logs in → server returns **JWT token**
2. Token is stored in **localStorage** (Angular)
3. Every protected API call includes:

```
Authorization: Bearer <token>
```

4. `verifyToken` middleware validates token and attaches `req.user`

---


## 🧯 Troubleshooting

### **Invalid token error**

Expire time is 1 hour. Re-login.

### **Foreign key issues**

Make sure you didn’t manually remove users without deleting journal entries.

---

## 📄 License

This project is for personal learning and development.

---

## 💬 Author

**Anjana A P**

Happy journaling! ✨🌙
