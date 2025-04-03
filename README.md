# Shop with Praise - E-commerce Frontend

This is the **React.js** frontend for the *Shop with Praise* ecommerce platform, delivering a seamless shopping experience for users and a robust admin dashboard for managing products, orders, and users. Built as a portfolio project, it integrates with a Laravel backend (available in this repo under `https://github.com/tabpaddy/praise-shop-backend`) to showcase full-stack development skills.

**[Live Demo](https://shopwithpraise.vercel.app)** (Frontend only; backend requires local setup due to hosting constraints)

## Features

### User Functionality
- **Authentication**: Signup, login, logout, and forgotten password with reset link sent via email.
- **Shopping Experience**: Browse product listings with search, view detailed product pages, add items to cart with dynamic quantity adjustments (calculated on the cart page).
- **Checkout Process**: Secure payments via Stripe, Paystack, or Cash on Delivery (COD), requiring login and delivery details; order receipt emailed post-purchase.
- **Order Management**: View order history on a dedicated orders page.

### Admin Dashboard
- **Role-Based Access**: 
  - **Super Admin**: Created by developer; full CRUD on admins, products, users.
  - **Sub Admins**: Created by super admin; CRUD on users/products, no admin creation.
- **Management Tools**: Manage products, users, and order statuses (e.g., processing to shipped).

## Technologies Used
- **Core**: React.js (Frontend Framework)
- **Routing**: `react-router-dom` (Navigation)
- **Styling**: Tailwind CSS (Utility-first styling)
- **API Requests**: Axios (HTTP client with custom instance)
- **State Management**: Redux Toolkit (Centralized state with slices)
- **Payment Gateways**: Stripe (Card payments), Paystack (Regional payments)
- **Utilities**: 
  - `uuid` (Unique cart IDs)
  - `crypto-js` (Encryption utilities)
  - `react-idle-timer` (Session timeout detection)
  - `framer-motion` (Animations)
  - `react-icons` (Icon library)
  - `react-spinners` (Loading indicators)
- **Hosting**: Vercel (Frontend deployment)

## Installation & Setup

### Prerequisites
- **Node.js** (v16+ recommended) and **npm** (or **yarn**) installed.
- A running Laravel backend (e.g., `http://localhost:8000`)—see `backend/` folder setup.

### Steps to Run Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/tabpaddy/praise-shop.git
   cd praise-shop/frontend

### Install Dependencies:
2. Install all packages:
        ```bash
        npm install

    Or with yarn:
        ```bash
        yarn install

    Specific Dependencies:
        ```bash
        npm install react-router-dom tailwindcss axios @reduxjs/toolkit react-redux stripe @stripe/stripe-js crypto-js uuid react-idle-timer framer-motion react-icons react-spinners

3. Configure Environment:
    - Create a .env file in frontend/:
        ```bash
        REACT_APP_API_BASE_URL=http://localhost:8000/api

    - Update to match your backend URL.


4. Start the Development Server:
    ```bash
    npm start
    - Runs at http://localhost:5173.

Folder Structure
    /frontend
    /src
        /assets                # images
        /components            # All components
            /admin             # Admin dashboard components
            /axiosInstance     # Custom Axios setup
            /client            # User-facing components (cart, checkout)
                /pages         # Page components (Home, Product, Cart, Orders)
            /context           # Auth context for user/admin
            /protectedRoutes   # Authenticated route guards
            /redux             # Redux store and slices (cart, auth)


API Configuration
    - Connects to Laravel backend APIs (e.g., /api/orders, /api/reset-link).
    - Set REACT_APP_API_BASE_URL in .env.
    - Backend CORS must allow https://shopwithpraise.vercel.app.
  

Deployment
    - Build:
        ```bash
        npm run build

    - Deploy to Vercel:
        ```bash
        vercel --prod
    - Live at https://shopwithpraise.vercel.app.
  

Screenshots
    Below are key features in action (screenshots embedded from this repo):
        1. User Cart Page
            Cart Page
            Dynamic quantity updates and total calculation.

        2. Admin Dashboard
            Admin Dashboard
            Product and user management interface.


    To view locally, see praise-shop/screenshots/ folder.


Why No Live Backend?
    Built for resume purposes with a $0 budget. Frontend is hosted on Vercel; backend runs locally (see backend/ folder for setup).


Lessons Learned
    - Designed secure REST API integrations with Axios and Laravel Sanctum.
    - Implemented role-based access control for admin dashboards.
    - Integrated Stripe and Paystack payment gateways with React.
    - Managed complex state with Redux Toolkit.
    - Adapted to hosting challenges by focusing on a deployable frontend.


Contributing
    Fork this repo and submit pull requests—open to improvements!

License
    MIT License (LICENSE)

Contact
    - GitHub: tabpaddy
    - Email: taborotap@gmail.com (mailto:taborotap@gmail.com)
    - Built by Praise Taborota. as a real-world portfolio project to showcase full-stack development skills.

---

### How to Add Screenshots That Show in the README
1. **Capture Screenshots**:
   - Open `https://shopwithpraise.vercel.app` (or local `http://localhost:3000`).
   - Take screenshots of:
     - Cart page (showing items and quantity changes).
     - Admin dashboard (showing product/user management).
   - Use your OS tool (e.g., Windows Snipping Tool, macOS `Cmd+Shift+4`) or browser dev tools.

2. **Save Files**:
   - Name them clearly: `cart-page.png`, `admin-dashboard.png`.
   - Place in `frontend/screenshots/`:
     ```
     praise-shop/
       frontend/
         screenshots/
           cart-page.png
           admin-dashboard.png
     ```

3. **Push to GitHub**:
   - From `frontend/`:
     ```bash
     mkdir screenshots
     mv /path/to/cart-page.png screenshots/
     mv /path/to/admin-dashboard.png screenshots/
     git add screenshots/
     git commit -m "Add screenshots for README"
     git push origin main
     ```
   - GitHub renders them automatically in the README via `screenshots/cart-page.png`.

4. **Verify**:
   - Visit `https://github.com/tabpaddy/praise-shop/blob/main/frontend/README.md`.
   - Ensure images display under “Screenshots”.

---

### Frontend Done—What’s Next?
- **Push It**: Add this README as `frontend/README.md` in `https://github.com/tabpaddy/praise-shop`, commit with screenshots, and you’re set for recruiters.
- **Backend README**: Tell me how the backend works (e.g., APIs, DB tables, email setup), and I’ll craft a matching README for `backend/` in the same repo. It’ll cover your Laravel setup, API endpoints, and sync email logic.

Your GitHub (`tabpaddy`) and email (`taborotap@gmail.com`) are plugged in—ready to push this and share backend details?