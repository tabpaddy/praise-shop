# E-commerce Frontend

This is the **React.js** frontend for the e-commerce platform, providing users with a seamless shopping experience with admin dashboard.

## Features
- User Authentication (Login, Signup, Logout)
- Admin Authentication 
- Product Listing & Search
- Product Details Page
- Shopping Cart & Checkout
- Secure Payment Integration
- User Profile Management
- Order History

## Technologies Used
- React.js (Frontend Framework)
- React Router (Navigation)
- Tailwind CSS (Styling)
- Axios (API Requests)
- Redux Toolkit (State Management)
- Stripe (Payment Gateway)
- cryptoJs
- uuid (get unique IDs for cart)
- react idle timer

## Installation & Setup

### Prerequisites
Ensure you have **Node.js** and **npm/yarn** installed on your system.

### Steps to Run
```bash
# Clone the repository
git clone https://github.com/tabpaddy/ecommerce-frontend.git
cd ecommerce-frontend

# Install dependencies
npm install  # or yarn install

# Create an .env file and add the backend API URL
REACT_APP_API_BASE_URL=http://localhost:8000/

# Start the development server
npm start  # or yarn start
```

## Folder Structure
```
/src
  /components      # Housing other components
  /pages           # Page components (Home, Product, Cart, etc.)
  /redux           # Redux store and slices
  /styles          # CSS and Tailwind styles
  /context         # user and admin context
  /protectedRoutes # routes for authenticated access
  /axiosInstance   # for axios
  /admin           # for admin access
  /client          # for client access
```

## API Configuration
Make sure your Laravel backend is running at `http://localhost:8000` and update the `.env` file accordingly.

## Deployment
For production, build the project using:
```bash
npm run build
```
Then, deploy the contents of the `build/` folder to a hosting service like Vercel, Netlify, or Firebase.

## Contributing
Feel free to fork this repository and submit pull requests.

## License
This project is licensed under the MIT License.

