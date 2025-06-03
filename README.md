# 🚀 Task Management Backend (Node.js + Express + MongoDB)

This is the **backend server** for the Task Management System. Built with **Express**, **TypeScript**, and **MongoDB**, it provides a fully functional RESTful API for user authentication and task operations.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

## ⚙️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **TypeScript**
- **JWT Authentication**
- **CORS**
- **dotenv**
- **bcrypt** for password hashing
- **Zod** (or manual validation if not used)
- **Express Async Handler**

---

## ✅ Features

### 👤 Authentication
- Register new users with hashed passwords
- Login using email and password
- JWT-based token system for protected routes

### 📋 Task Management
- Create, update, delete, and fetch tasks
- Users can only see their own tasks
- Admin can view all users and their tasks

### 🧑‍💼 User Management (Admin)
- Fetch all users (Admin-only route)
- Fetch tasks by specific user ID

### 🧠 Error & Access Handling
- Global error handler middleware
- Role-based route protection (admin vs user)
- Input validation and response normalization

---

## 📂 Folder Structure

# 🚀 Task Management Backend (Node.js + Express + MongoDB)

This is the **backend server** for the Task Management System. Built with **Express**, **TypeScript**, and **MongoDB**, it provides a fully functional RESTful API for user authentication and task operations.

---

## ⚙️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **TypeScript**
- **JWT Authentication**
- **CORS**
- **dotenv**
- **bcrypt** for password hashing
- **Zod** (or manual validation if not used)
- **Express Async Handler**

---

## ✅ Features

### 👤 Authentication
- Register new users with hashed passwords
- Login using email and password
- JWT-based token system for protected routes

### 📋 Task Management
- Create, update, delete, and fetch tasks
- Users can only see their own tasks
- Admin can view all users and their tasks

### 🧑‍💼 User Management (Admin)
- Fetch all users (Admin-only route)
- Fetch tasks by specific user ID

### 🧠 Error & Access Handling
- Global error handler middleware
- Role-based route protection (admin vs user)
- Input validation and response normalization

---

## 📂 Folder Structure

