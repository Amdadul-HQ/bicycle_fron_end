# Bicycle Store Application

## Project Overview & Objective
The Bicycle Store application is designed to provide a seamless shopping experience for customers while enabling admins to manage products and orders efficiently. This project ensures secure authentication, a user-friendly interface, and responsive design.

## Features

### 1. User Registration & Authentication (Role-Based)
- Secure registration and login.
- Users register with name, email, and password (default role: Customer).
- Admin roles can be updated manually.
- Passwords are securely hashed.
- JWT-based authentication for session management.
- Secure logout functionality.

### 2. Public Routes
#### Home Page
- **Navbar:** Includes logo, navigation items, and login/signup buttons.
- **Banner:** Displays promotional offers using a carousel.
- **Featured Bicycles:** Showcases up to 6 bicycles with a "View All" button.
- **Extra Section:** Testimonials and relevant e-commerce content.
- **Footer:** Contains important links, social media, and contact details.

#### All Bicycles Page
- **Search:** Users can search by brand, name, or category.
- **Filters:** Filter by price, model, brand, category, and availability.
- **Dynamic Results:** Real-time updates based on user input.
- **Bicycle Cards:** Display essential details and a "View Details" button.

#### Bicycle Details Page
- Displays image and specifications.
- "Buy Now" button redirects to the checkout page.

#### About Page
- Provides shop details and mission statement.

### 3. Private Routes
#### Checkout Page
- Users can place orders with stock validation.
- Order form with product details, user details, total price, and payment method.
- Integration with **Stripe**.
- "Order Now" button to confirm purchase.

#### Dashboard (Role-Based Access)
- **Admin Dashboard:**
  - Manage users (deactivate accounts).
  - CRUD operations for products and orders.
- **User Dashboard:**
  - View orders.
  - Manage profile settings.
  - Update password (requires current password for security).

### 4. UI/UX Design
- **Responsive Design:** Fully optimized for all screen sizes.
- **Error Handling:** Friendly messages for login failures, duplicate emails, and out-of-stock items.
- **Loading States:** Spinners/loaders during API calls.
- **Toasts:** Notifications for important actions (e.g., "Login Successful", "Order Placed").

## Recommendation Functionalities (Optional)

### User Side
- **Bicycle Comparison Tool:** Compare up to 3 bicycles by specifications and pricing.

### Admin Side
- **Sales Dashboard:**
  - **Overview Chart:** Visual representation of sales data (bar, line, or pie charts).
  - **Key Metrics:**
    - **Total Sales Revenue:** Revenue breakdown over a time period.
    - **Units Sold:** Total bicycles sold.
    - **Top-Selling Bicycles:** Highlighting the most popular models.

## Backend Requirements

### Database (MongoDB)
- **Users Collection:** Manages customer and admin roles.
- **Bicycles Collection:** Stores name, brand, price, model, and stock.
- **Orders Collection:** Links to users, product details, total price, and status.

### Authentication
- Secure user registration and login.
- JWT-based session handling.
- Password hashing for security.

### Product & Order Management
- CRUD operations for bicycles.
- CRUD operations for orders with stock validation.

### Payment Integration
- Supports **Stripe**.

### Error Handling & Security
- **Consistent error messaging** for invalid logins and out-of-stock items.
- **Authentication middleware** to protect private routes.
- **Pagination support** for bicycle listings and orders.

---

## Installation & Setup

### Prerequisites
- Node.js
- MongoDB
- A payment gateway API key

### Steps to Run the Project
1. **Clone the repository:**
   ```bash
   git clone git@github.com:Amdadul-HQ/Bicycles-Backend-A4.git
   cd bicycle-store
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file and add:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     PAYMENT_API_KEY=your_payment_gateway_key
     ```
4. **Start the server:**
   ```bash
   npm start
   ```
5. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Technologies Used
- **Frontend:** React.js, Tailwind CSS, Shadcn
- **Backend:** Node.js, Express.js , Mongoose
- **Database:** MongoDB
- **Authentication:** JWT
- **Payment Gateway:** Stripe
- **Deployment:** Vercel 

## Contributors
- [Amdadul HQ](https://github.com/Amdadul-HQ)

## License
This project is licensed under the [MIT License](LICENSE).

