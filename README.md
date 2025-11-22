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
<h2>How to Run the Project</h2>

<h3>Prerequisites</h3>
<p>Make sure the following are installed on your system:</p>
<ul>
  <li><strong>Node.js</strong></li>
  <li><strong>MongoDB</strong> (running locally or on cloud)</li>
</ul>
<hr />

<h3>Clone the Repository</h3>
<pre>
<code>
git clone https://github.com/Sandeep-Chagapuram/Task-Manager.git
cd Task-Manager
</code>
</pre>
<hr />

<h3>Start the Backend</h3>
<pre>
<code>
cd backend
</code>
</pre>

<p>Create a <strong>.env</strong> file inside the <em>backend</em> folder and add:</p>
<pre>
<code>
#the mongodb connection string
MONGODB_URI=mongodb://localhost:27017/taskmanager
PORT=5001
</code>
</pre>

<p><strong>Install dependencies & run the backend:</strong></p>
<pre>
<code>
npm install
npm run dev
</code>
</pre>

<p>Backend will start at: <strong>http://localhost:5001</strong></p>
<hr />

<h3>Start the Frontend</h3>
<pre>
<code>
cd frontend
npm install
npm run dev
</code>
</pre>

<p>Frontend will start at: <strong>http://localhost:5173</strong> (Vite default)</p>
<hr />

<h3>🎉 You're Ready!</h3>
<p>Open the frontend URL in your browser to access the full-stack Task Manager application.</p>

