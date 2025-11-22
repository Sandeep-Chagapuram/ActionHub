# Task-Manager
Task Manager with Audit Logging: A scalable full-stack application featuring CRUD operations, server-side pagination, dynamic search, and real-time audit logging. Implements input validation, XSS protection, data sanitization, and Basic Auth, built with Node.js, Express, MongoDB, and React.
task-manager/
├── backend/
│   ├── models/
│   │   ├── Task.js
│   │   └── AuditLog.js
│   ├── routes/
│   │   ├── tasks.js
│   │   └── logs.js
│   ├── controllers/
│   │   ├── taskController.js
│   │   └── logController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── validation.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── TaskTable.jsx
│   │   │   ├── TaskModal.jsx
│   │   │   ├── AuditLogs.jsx
│   │   │   └── Pagination.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── validation.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
