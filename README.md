# Forever — Full-Stack E-Commerce Application

A full-stack e-commerce web application built with **React.js, Node.js, Express.js, and MongoDB**. Forever provides a modern shopping experience with product browsing, user authentication, cart management, order placement, and an admin dashboard for managing the store.

## Overview

Forever is designed to simulate a real-world online fashion store. Customers can explore products, filter collections, manage their shopping carts, place orders, and view their order history. The admin panel provides tools for managing products and monitoring orders.

## Features

### Customer Application
- **User Authentication:** User registration and login.
- **Product Catalog:** Browse products and explore collections.
- **Product Details:** View product descriptions, images, prices, and available sizes.
- **Search and Filtering:** Find products by search terms and collection filters.
- **Shopping Cart:** Add products, select sizes, update quantities, and calculate totals.
- **Order Management:** Place orders and view order history.
- **Responsive Interface:** A responsive shopping interface built with React and Tailwind CSS.

### Admin Dashboard
- **Product Management:** Add and manage product listings.
- **Order Management:** View orders and update order statuses.
- **Store Administration:** Access administrative features through a separate dashboard.

### Backend
- RESTful API endpoints built with Express.js.
- MongoDB database integration using Mongoose.
- JWT-based authentication.
- Image upload and cloud storage integration.
- Order processing and payment integration structure.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| HTTP Client | Axios |
| Notifications | React Toastify |
| Image Storage | Cloudinary |
| Version Control | Git and GitHub |

## Project Structure

```text
forever-ecommerce/
├── admin/                  # Admin dashboard
├── backend/                # Express API and database logic
│   ├── config/             # Database and Cloudinary configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Authentication middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── .env                # Backend environment variables (not committed)
│   └── server.js           # Backend entry point
├── frontend/               # Customer-facing React application
│   ├── src/
│   │   ├── assets/
│   │   ├── component/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env                # Frontend environment variables (not committed)
├── .gitignore
└── README.md
```

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following tools before starting:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account or a local MongoDB instance
- A [Cloudinary](https://cloudinary.com/) account for image storage

### 1. Clone the Repository

```bash
git clone https://github.com/messuuu/forever-ecommerce.git
cd forever-ecommerce
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and configure the required environment variables:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

Use your own credentials. Never commit real secrets or passwords to GitHub.

Start the backend server:

```bash
npm run server
```

If your `package.json` uses a different script, use the corresponding command defined there.

### 3. Configure the Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173`.

### 4. Run the Admin Dashboard

Open another terminal:

```bash
cd admin
npm install
npm run dev
```

If the actual Vite application is inside `admin/vite-project`, navigate to that directory before running these commands.

## Environment Variables

Keep all credentials and environment-specific configuration in `.env` files. The backend requires database, authentication, and image-storage configuration. The frontend requires the backend API URL.

Environment files should remain excluded from version control. You can provide an `.env.example` file containing placeholder values for other developers.

## Future Improvements

- Add automated testing for frontend components and backend APIs.
- Improve product discovery with sorting and advanced filtering.
- Add pagination and enhanced error handling.
- Strengthen payment verification and order security.
- Deploy the frontend, backend, and admin dashboard to production hosting.

## Contributing

Contributions, suggestions, and bug reports are welcome. Fork the repository, create a feature branch, and submit a pull request with a clear description of your changes.

## License

No license has been specified yet. Add a `LICENSE` file if you intend to distribute the project under a particular open-source license.

---

## Author

**Sourav Nayak**

GitHub: [@messuuu](https://github.com/messuuu)