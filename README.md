# 📝 Quick Notes App

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

A containerized, full-stack web application for creating, managing, and organizing personal notes. Built with the **MERN Stack** (MongoDB, Express, React, Node.js) and entirely strongly-typed using **TypeScript**.

##  Features

* **Secure Authentication:** JWT-based user login and registration with encrypted passwords (bcrypt).
* **Role-Based Access Control (RBAC):** Distinct permissions for standard `user` and `admin` roles.
* **Full CRUD Operations:** Create, Read, Update, and Delete notes seamlessly.
* **Data Isolation:** Users can only access and modify their own notes.
* **Real-time Search:** Instantly filter notes by title or content on the client side.
* **Theming:** Dynamic Dark/Light mode toggle.
* **Dockerized:** Fully containerized architecture using Docker Compose for consistent development and deployment environments.

---

##  Architecture & Tech Stack

### Frontend
* **React (Vite)** + **TypeScript**
* **React Router:** Protected routes and navigation.
* **State Management:** React Hooks (`useState`, `useEffect`, Context API).
* **Styling:** Custom CSS with CSS Variables for theming.

### Backend
* **Node.js & Express** + **TypeScript**
* **Database:** MongoDB with Mongoose ODM.
* **Security:** JSON Web Tokens (JWT) & bcrypt.
* **Architecture:** MVC-inspired structure (Models, Controllers, Routes, Middlewares).

### Infrastructure
* **Docker & Docker Compose**
* Designed with CI/CD readiness (Azure DevOps).

---

##  Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v18 or higher)
* [Docker Desktop](https://www.docker.com/products/docker-desktop)

### Environment Variables
Create a `.env` file in the `backend` directory based on the following template:

```env
PORT=3000
MONGO_URI=mongodb://mongo:27017/quicknotes
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
