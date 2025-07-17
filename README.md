# 🧩 Business Management System API

A full-featured backend RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing clients, employees, categories, transactions, system settings, and more.  
Includes JWT authentication, role-based access, WhatsApp integration via QR code, logging, and full Swagger documentation.

---

## 🚀 Features

- 🔐 **Authentication**
  - Register, login, email confirmation
  - Forget/reset password
  - JWT + Role-based access
  - Session management (lock/reset)

- 👥 **User Management**
  - Admins can manage system users
  - Assign roles, update info, reset passwords

- 🧑‍💼 **Clients & Employees**
  - Full CRUD operations
  - Filtering, searching, and advanced fields (financial, business info)

- 🗃️ **Categories & Transactions**
  - Manage service categories and financial transactions

- ⚙️ **Settings Module**
  - Dynamic system configuration per category (general, whatsapp, etc.)

- 💬 **WhatsApp Integration**
  - QR-based login
  - Status check, disconnect, and message sending

- 🧾 **Logging & Notifications**
  - Auto-logging system events
  - Admin notifications
  - Mark as read/delete notifications

- 📄 **Swagger Docs**
  - Complete documentation for all endpoints using Swagger

- 🐳 **Dockerized**
  - Fully containerized for local or cloud deployment

---

## 🛠️ Technologies Used

| Tech            | Description                           |
|-----------------|---------------------------------------|
| Node.js / Express | Backend framework (REST API)        |
| MongoDB / Mongoose | NoSQL Database & ORM              |
| TypeScript      | Type safety                          |
| JWT             | Authentication and session control   |
| Joi             | Input validation                     |
| Swagger         | Auto-generated API documentation     |
| Docker          | Containerization                     |
| WhatsApp Web.js | Integration with WhatsApp QR session |

---
📚 API Documentation
Swagger docs available at:
http://localhost:5000/api-docs



