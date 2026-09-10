# 💰 Expense Tracker — Real-Time Analytics Dashboard

A modern, full-stack **Personal Expense Tracker** built with **React**, **Node.js/Express**, and **MySQL**. Track, manage, and analyze your spending in real time through a beautiful dark-theme dashboard — perfect for showcasing in a B.Tech / fresher portfolio.

---

## ✨ Features

| Feature | Details |
|---|---|
| **CRUD Expenses** | Add, edit, delete, view all expenses |
| **Categorization** | 9 categories with color-coded badges |
| **Search & Filter** | Search by title, filter by category/month, sort by amount/date |
| **Dashboard** | 4 stat cards + recent transactions |
| **Analytics** | Category pie chart, monthly bar chart, category ranking bars |
| **Real-time Updates** | Dashboard/charts refresh immediately after every CRUD action |
| **Validation** | Client-side + server-side (express-validator) |
| **Security** | Helmet, CORS, parameterized SQL queries, env vars |
| **Responsive** | Sidebar collapses to hamburger on mobile |
| **Toasts** | Success/error notifications for all operations |
| **Pagination** | 10 records per page with page controls |

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, React Router v6, Recharts, Axios, react-hot-toast, Lucide React  
**Backend:** Node.js, Express.js, MySQL2, express-validator, Helmet, CORS, dotenv  
**Database:** MySQL 8+

---

## 📁 Project Structure

```
expense-tracker/
├── database/
│   ├── schema.sql          ← DB + table creation
│   └── seed.sql            ← 25 sample records
│
├── backend/
│   ├── config/db.js        ← MySQL pool
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── models/expenseModel.js
│   ├── controllers/
│   │   ├── expenseController.js
│   │   └── analyticsController.js
│   ├── routes/
│   │   ├── expenses.js
│   │   └── analytics.js
│   ├── server.js
│   ├── .env               ← your credentials (NOT committed)
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/    ← Sidebar, Header, StatCard, charts, forms, table…
│   │   ├── pages/         ← Dashboard, Expenses, Add, Edit, Analytics
│   │   ├── services/api.js
│   │   ├── utils/formatters.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
│
└── README.md
```

---

## 🗄️ Database Setup

### 1. Start MySQL and open a client

```bash
mysql -u root -p
```

### 2. Run the schema (creates DB + table)

```sql
SOURCE /path/to/expense-tracker/database/schema.sql;
```

### 3. Load sample data

```sql
SOURCE /path/to/expense-tracker/database/seed.sql;
```

On **Windows** with MySQL Workbench, use **File → Run SQL Script** and select each `.sql` file in order.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` inside `backend/` and fill in your credentials:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=expense_tracker
```

> **Never commit your `.env` file.**

---

## 🚀 Running the Application

### Backend

```bash
cd expense-tracker/backend
npm install          # first time only
npm run dev          # starts on http://localhost:5000
```

You should see:
```
✅ MySQL Connected successfully
🚀 Server running on http://localhost:5000
```

### Frontend

```bash
cd expense-tracker/frontend
npm install          # first time only
npm run dev          # starts on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

> Both servers must run simultaneously. The Vite dev proxy forwards `/api` calls to the Express server.

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/expenses` | Get all expenses (supports `?search=&category=&month=&sortBy=&order=`) |
| GET    | `/expenses/:id` | Get single expense |
| POST   | `/expenses` | Create new expense |
| PUT    | `/expenses/:id` | Update expense |
| DELETE | `/expenses/:id` | Delete expense |
| GET    | `/analytics` | Get full analytics (totals, monthly, category breakdown) |
| GET    | `/health` | API health check |

**Request body (POST/PUT):**
```json
{
  "title": "Grocery Shopping",
  "amount": 1500.00,
  "category": "Food",
  "expense_date": "2026-09-10",
  "payment_method": "UPI",
  "description": "Weekly groceries"
}
```

**Success response shape:**
```json
{ "success": true, "data": {} }
```

**Error response shape:**
```json
{ "success": false, "message": "Validation failed", "errors": [] }
```

---

## 📸 Screenshots

_Add screenshots here after running the application._

---

## 🔮 Future Enhancements

- User authentication (JWT)
- Budget alerts when spending exceeds limits
- Export to CSV/PDF
- Dark/light theme toggle
- Recurring expense scheduler
- Multi-currency support
