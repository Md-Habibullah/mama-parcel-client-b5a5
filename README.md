# 📦 Mama Parcel – Parcel Delivery Frontend

A modern, secure, and role-based frontend application for the **Mama Parcel** delivery system, built with **React**, **Redux Toolkit**, and **RTK Query**.
This app provides role-specific dashboards for **Senders**, **Receivers**, and **Admins**, enabling seamless parcel creation, tracking, and management with real-time updates.

---

## 🚀 Live Demo
🔗 **Frontend URL:** [https://mamaparcel.vercel.app](https://mama-parcel-frontend.vercel.app)
🔗 **Backend URL:** [https://mama-parcel-backend.vercel.app](https://mama-parcel-backend.vercel.app)

---

## ✨ Features

### 🏠 Public Landing Section
- **Home Page** with introduction to Mama Parcel
- **About Page** describing the service, mission, and team
- **Contact Page** with a simple inquiry form

### 🔐 Authentication & Authorization
- JWT-based Login & Registration
- Role selection during registration (Sender / Receiver)
- Persistent authentication (remains logged in after refresh)
- Role-based redirection & access control

### 📦 Sender Dashboard
- Create new parcel requests
- Cancel parcels (if not dispatched)
- View all created parcels with status history

### 📬 Receiver Dashboard
- View incoming parcels
- Confirm delivery
- View delivery history

### 👨‍💼 Admin Dashboard
- View and manage all users (block/unblock)
- View and manage all parcels (block/unblock, update status)

### 🔎 Parcel Tracking
- Search parcels by tracking ID
- View full parcel status timeline with timestamps and notes

### 📊 Dashboard & Data Visualization
- Overview cards (Total, Delivered, In Transit, Pending/Cancelled)
- Bar/Pie charts for delivery status distribution & trends
- Paginated, searchable, filterable parcel table with actions

### 🎨 General Features
- Responsive, mobile-friendly UI
- Toast notifications for success/error states
- Global loading & error handling
- Role-based navigation menu
- Form validation with **Zod**
- Realistic demo data for a professional finish

---

## 🛠 Tech Stack

**Frontend**
- React (TypeScript)
- Redux Toolkit & RTK Query (State & API)
- React Router DOM
- Tailwind CSS & ShadCN UI Components
- Zod (Validation)
- Sonner (Toast Notifications)
- Recharts (Charts & Visualization)

**Backend**
- Node.js & Express
- MongoDB & Mongoose
- JWT + bcrypt (Authentication & Security)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/mama-parcel-frontend.git
cd mama-parcel-frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup environment variables
Create a `.env` file in the root folder:
```env
VITE_API_URL=https://mama-parcel-backend.vercel.app/api
```

### 4️⃣ Start development server
```bash
npm run dev
```

---

## 📸 Screenshots

### 🔐 Authentication Pages
- Login & Registration with role-based redirection

### 📦 Sender Dashboard
- Create parcels, cancel parcels, and view status logs

### 📬 Receiver Dashboard
- View incoming parcels & confirm deliveries

### 👨‍💼 Admin Dashboard
- Manage users, parcels, and delivery statuses

---

## 🧪 Testing

1. Open **Postman** or the **frontend demo**
2. Test with the provided credentials

### Demo Credentials

| Role       | Email                   | Password      |
|------------|-------------------------|---------------|
| Admin      | super@gmail.com         | 12345678      |
| Sender     | john2@gmail.com         | John@1234     |
| Receiver   | john3@gmail.com         | John@1234     |

---

## 📂 Project Structure

```
src/
├── components/       # Reusable UI Components
├── pages/            # Landing, Dashboard, Auth Pages
├── redux/            # Redux Toolkit & RTK Query Slices
├── hooks/            # Custom Hooks
├── utils/            # Helpers & Config
├── types/            # TypeScript Types
└── App.tsx           # Main App Entry
```

---

## 🏆 Credits

Developed by **[Your Name]**
- Email: mdhabibullah.work@email.com
- GitHub: [md-habibullah](https://github.com/md-habibullah)

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use it for learning or production with credit.
