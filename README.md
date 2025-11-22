# Task-Manager
Task Manager with Audit Logging: A scalable full-stack application featuring CRUD operations, server-side pagination, dynamic search, and real-time audit logging. Implements input validation, XSS protection, data sanitization, and Basic Auth, built with Node.js, Express, MongoDB, and React.
```
task-manager/
├── backend/
│ ├── models/ # Task and AuditLog schemas
│ ├── routes/ # API routes
│ ├── controllers/ # Business logic
│ ├── middleware/ # Auth middleware
│ ├── utils/ # Validation utilities
│ ├── config/ # DB configuration
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── services/ # API service
│ │ ├── utils/ # Validation utilities
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
```
