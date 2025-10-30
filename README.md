# 🪴 Growventory – Simple Inventory Manager (Plants)

**Growventory** is a user-friendly web-based inventory management system designed for small businesses to efficiently manage plant stock.  
The system allows users to **add, view, update, and delete products**, with **secure login and registration functionality** for user authentication, all wrapped in a **modern, fully responsive design**.

---

## 🛠️ Tech Stack

- **Frontend:** React.js with Vite, Tailwind CSS
- **Backend:** Pure Node.js (without Express)  
- **Database:** MySQL  
- **Icons:** Lucide React
- **Routing:** React Router DOM

---

## 🌿 Key Features

- 🏠 **Modern Landing Page** – Professional home page with features showcase and call-to-action sections
- 🔐 **User Authentication** – Secure login and registration with password hashing (bcrypt)
- ✅ **Complete CRUD Operations** – Add, view, update, and delete plant inventory items
- 📊 **Interactive Dashboard** – Real-time analytics with:
  - Total products and inventory value metrics
  - Stock status overview (In Stock, Low Stock, Out of Stock)
  - Smart alerts for low stock and out-of-stock items
  - Top products by inventory value with visual percentage indicators
- 🔍 **Advanced Product Management** – Search, filter, and paginate through products
- 📱 **Fully Mobile Responsive** – Optimized design for all devices (desktop, tablet, mobile)
- 🎨 **Modern UI/UX** – Clean, intuitive interface with smooth animations and transitions
- 🔗 **RESTful API** – Seamless integration between frontend and backend
- ⚡ **Lightweight Architecture** – Easy deployment and scalability
- 🚪 **Secure Logout** – Session management with localStorage

---

## 🚀 Project Overview

Built as an **individual project** to strengthen **full-stack development** skills using **pure Node.js** and **React.js**.  
The system demonstrates a complete workflow from frontend design to backend logic and database management, emphasizing secure and efficient business operations.

### Architecture Highlights:
- Pure Node.js HTTP server without framework dependencies
- Component-based React architecture with modern hooks
- Debounced search for optimized performance
- Real-time data validation and error handling
- Responsive design patterns with mobile-first approach

---

## 📂 Project Structure

```
Growventory/
├── Growventory-Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ui/
│   │   ├── pages/
│   │   │   ├── Home.jsx (Landing Page)
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   └── AddProduct.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── services/
│       └── api.js
└── Growventory-Backend/
    ├── server.js
    ├── db.js
    ├── productController.js
    └── userController.js
```

---

## 🎯 Features Breakdown

### 🏠 Landing Page
- Hero section with gradient background and animations
- Features showcase with icon cards
- "How It Works" section with step-by-step guide
- Responsive navigation with mobile menu
- Call-to-action sections
- Professional footer

### 📊 Dashboard
- Real-time KPI metrics (Total Products, Inventory Value, Total Stock, Average Price)
- Visual stock status overview with color-coded categories
- Low stock alerts table
- Out of stock alerts table
- Top 5 products by value with percentage indicators
- Refresh data functionality

### 📦 Product Management
- Paginated product listing (6 items per page)
- Real-time search with debouncing
- Edit products with modal dialog
- Delete confirmation dialogs
- Stock status badges (In Stock, Low Stock, Out of Stock)
- Responsive table with horizontal scroll on mobile

### 🔐 Authentication
- Password strength indicator on registration
- Form validation with helpful error messages
- Secure password hashing with bcrypt
- Session management with localStorage
- Protected routes

---

## 📸 Preview  

<img width="1918" height="872" alt="Landing_Page" src="https://github.com/user-attachments/assets/bb2801e3-28b1-4791-9d11-7cdd9ecafb6c" />
<img width="1918" height="873" alt="Login" src="https://github.com/user-attachments/assets/1ca03848-59f0-40f5-bb37-3ece8206d569" />
<img width="1914" height="869" alt="Register" src="https://github.com/user-attachments/assets/59abeee4-b495-4164-a7a6-fe439062751d" />
<img width="1919" height="869" alt="Dashboard" src="https://github.com/user-attachments/assets/2f2a5f31-342b-4c51-b60a-ad6e8325f2cb" />
<img width="1919" height="870" alt="Products" src="https://github.com/user-attachments/assets/10e61ebd-608b-417b-b871-a3241202ff8a" />
<img width="1919" height="869" alt="AddProduct" src="https://github.com/user-attachments/assets/cab3b720-43ef-49e5-ba98-cf75fddb3601" />


---

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Randima528/Growventory.git
   cd growventory
   ```

2. **Setup Database**
   ```sql
   CREATE DATABASE inventory_db;
   
   CREATE TABLE users (
     id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   CREATE TABLE products (
     id INT PRIMARY KEY AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     stock INT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **Backend Setup**
   ```bash
   cd Growventory-Backend
   npm install
   npm start
   ```
   Server runs on `http://localhost:3000`

4. **Frontend Setup**
   ```bash
   cd Growventory-Frontend
   npm install
   npm run dev
   ```
   Application runs on `http://localhost:5173`
