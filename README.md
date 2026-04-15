# Task Manager App

A full-stack Task Manager project with:

* **Backend:** Node.js, Express, MongoDB Atlas, JWT, Socket.IO
* **Mobile App:** React Native (Expo), TypeScript, Expo Router, Axios, AsyncStorage
* **Features:** Authentication, Task CRUD, Real-time updates, Persistent login

---

# Project Structure

```bash
task-manager/
├── backend/
└── mobile/
```

---

# Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB Atlas + Mongoose
* JWT Authentication
* bcryptjs
* Socket.IO
* express-validator
* dotenv
* cors

## Mobile

* React Native (Expo)
* TypeScript
* Expo Router
* Axios
* AsyncStorage
* Socket.IO Client

---

# Prerequisites

Install these tools:

* Node.js (LTS)
* VS Code
* Android Studio (Emulator + SDK)
* MongoDB Atlas account
* Git (optional)

---

# 1. Clone / Open Project

```bash
cd task-manager
```

---

# 2. Backend Setup

## Go to backend folder

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
```

## Run backend

```bash
npm run dev
```

Expected output:

```bash
MongoDB Connected
Server running on port 5000
```

---

# 3. Mobile Setup

Open a new terminal.

## Go to mobile folder

```bash
cd mobile
```

## Install dependencies

```bash
npm install
```

## Start app

```bash
npm start
```

Then:

* Press **a** to open Android Emulator
* OR scan QR code with Expo Go app

---

# 4. Connect Mobile to Backend

Update API URL in:

`mobile/src/services/api.ts`

## Android Emulator

```ts
baseURL: "http://10.0.2.2:5000/api"
```

## Physical Device

Use your PC IP address:

```ts
baseURL: "http://192.168.1.5:5000/api"
```

Also update Socket URL in:

`mobile/app/tasks.tsx`

```ts
const socket = io("http://10.0.2.2:5000");
```

---

# Available API Endpoints

## Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

## Tasks

* `GET /api/tasks`
* `POST /api/tasks`
* `PUT /api/tasks/:id`
* `DELETE /api/tasks/:id`

---

# App Features

## Authentication

* Register user
* Login user
* JWT token storage with AsyncStorage
* Logout

## Task Management

* Add task
* View all tasks
* Update task status
* Delete task
* Set status while creating task

## Real-Time

* Task created alerts
* Task updated alerts
* Auto refresh using Socket.IO

---

# Common Issues

## Network Error

* Check backend is running
* Check correct IP / `10.0.2.2`
* Ensure same Wi-Fi network for phone testing
* Allow firewall access for Node.js

## MongoDB Connection Error

* Check `MONGO_URI`
* Add IP to Atlas Network Access
* Verify username/password

## Expo Route Errors

```bash
npx expo start -c
```

---

# Recommended Workflow

## Terminal 1

```bash
cd backend
npm run dev
```

## Terminal 2

```bash
cd mobile
npm start
```

---

# Submission Checklist

* Backend code complete
* Mobile app complete
* `.env` configured locally
* README added
* Screenshots / demo video (optional)
* Push to GitHub

---

# Author

Mayank Ratmele
# Task-Manager-App
# Task-Manager-App
