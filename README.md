📦 Inventory Management API

A robust and scalable Inventory Management API built with Node.js, Express, and MongoDB.
This API provides secure authentication, role-based access control, product management, image uploads, email notifications, and advanced querying capabilities (search, filtering, sorting and pagination).


🚀 Live Features
	•	🔐 JWT Authentication & Authorization
	•	👥 Role-Based Access Control (Admin, Storekeeper, Salesperson)
	•	📦 Full Product Management (CRUD)
	•	🖼 Image Upload with Cloudinary
	•	📧 Email Notifications using Nodemailer
	•	🔍 Search (Regex-based)
	•	🎯 Filtering (Price range, category, etc.)
	•	🔃 Sorting (Ascending & Descending)
	•	📄 Pagination
	•	🎛 Field Selection
	•	⚙️ Centralized Error Handling
	•	🌱 Environment Variables Configuration


🧠 Tech Stack
	•	Backend: Node.js, Express.js
	•	Database: MongoDB (Mongoose)
	•	Authentication: JSON Web Token (JWT)
	•	File Upload: Multer
	•	Cloud Storage: Cloudinary
	•	Email Service: Nodemailer (Gmail App Password)


📁 Project Structure
inventory-api/
│
├── config/          # Database configuration
├── controllers/     # Route logic
├── middleware/      # Auth & error handling
├── models/          # Mongoose schemas
├── routes/          # API routes
├── services/        # Helper functions (cloudinary, emailService)
│
├── .env             # Environment variables
├── .gitignore
├── index.js         # Entry point
└── README.md

⚙️ Installation & Setup

1. Clone the repository
git clone https://github.com/Yel-lowBaby/Inventory-Manager-API.git
cd inventory-api

2. Install dependencies
npm install

3. Create .env file
PORT=1004
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

4. Run the server
npm run dev

Server runs on:
http://localhost:1004


🔐 Authentication

All protected routes require a Bearer token:
Authorization: Bearer <your_token>


📦 API Endpoints

🔹 Auth Routes
Register User:
POST /api/auth/register

Login User:
POST /api/auth/login

🔹 Product Routes
Create Product:
POST /api/products
•	Requires authentication
•	Supports image upload (form-data)

Get Products
GET /api/products

Supports:
/api/products?name=laptop
/api/products?price[gte]=40000
/api/products?price[lte]=100000
/api/products?sort=price
/api/products?sort=-price
/api/products?page=1&limit=5
/api/products?fields=name,price

Update Product
PUT /api/products/:id
	•	Use raw JSON

Delete Product
DELETE /api/products/:id


🧪 Postman Documentation

A complete Postman collection is included in this repository:
Inventory Manager API.postman_collection.json

Import into Postman to test all endpoints easily.


🧠 Key Learnings
	•	Handling authentication with JWT
	•	Implementing role-based authorization
	•	Managing file uploads with Multer & Cloudinary
	•	Sending automated emails with Nodemailer
	•	Building advanced query systems (search, filter, sort, pagination)
	•	Structuring scalable backend applications
	•	Debugging real-world backend issues


⚠️ Important Notes
	•	Ensure all numeric fields (price, quantity) are stored as numbers
	•	Use JSON body for updates (not form-data unless uploading files)
	•	Keep .env file private and never commit it


🚀 Future Improvements
	•	📊 Sales tracking & analytics
	•	📉 Stock alerts & notifications
	•	🧾 Order management system
	•	🌐 Frontend integration (React / Next.js)


👨‍💻 Author
Olayinka Adedapo Abioye