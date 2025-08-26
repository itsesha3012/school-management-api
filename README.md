# 📚 School Management API

A simple backend API for managing schools.  
This project allows you to **add new schools** and **list all schools** using a RESTful API built with **Node.js, Express, and MongoDB**.

---

##  Features
- Add a new school
- Get list of all schools
- MongoDB integration
- Clean project structure

---

## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **TypeScript** (if you used it)

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:itsesha3012/school-management-api.git
   cd school-management-api
   install depenedices 
   npm install
   npm run dev   # For development (with nodemon)
npm start
# For production
node index.js

🌐 Live API Endpoints (Deliverable 2)

The backend is deployed and accessible online at:

Base URL:

https://school-management-api-6.onrender.com

1️⃣ Add a New School

Endpoint: POST /addSchool

https://school-management-api-6.onrender.com/addSchool
{
  "name": "Green Valley School",
  "address": "123 Main Street",
  "latitude": 28.7041,
  "longitude": 77.1025
}
Response 
{
    "message": "School added successfully",
    "school": {
        "name": "Green Valley School",
        "address": "123 Main Street",
        "latitude": 28.7041,
        "longitude": 77.1025,
        "_id": "68adc524ff33fdb9142ea893",
        "createdAt": "2025-08-26T14:31:00.864Z",
        "updatedAt": "2025-08-26T14:31:00.864Z",
        "__v": 0
    }
}

https://school-management-api-6.onrender.com/listSchools?latitude=28.61&longitude=77.08
 it returns with the school name 

 these are live and deployed 


