@@   Expense-Tracker-App   @@


# 📊 Expense Tracker App

A mobile app to track daily expenses and organize them by categories.  
Built with **React Native** and designed to integrate with a **MySQL backend**.

---

## 🚀 Features

### Core Features (MVP)
- 🔑 User Login (email + password)
- Add new expenses (amount, category, description, date)
- View expenses in a chronological list
- Edit or delete expenses
- Categorize expenses (Food, Travel, Shopping, Bills, Misc)

### Future Enhancements
- 📈 Analytics (Charts) → Spending by category and monthly trends  
- 💰 Monthly Budget → Set and track budget with alerts  
- 🔍 Search & Filters → Find expenses easily  
- 🔄 Recurring Expenses → Auto-add regular expenses (e.g., rent)  
- 🔔 Notifications → Reminders to log expenses, budget alerts  

---

## 🛠️ Tech Stack

- **Frontend:** React Native (Expo / CLI)
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Token)

---

## 🗄️ Database Design (MySQL)

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
