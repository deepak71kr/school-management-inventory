School Management API

This is a simple REST API to manage schools.  
You can add schools and list them by how close they are to your location.

---

Requirements
- Node.js
- MySQL

---

Installation

1. Clone this project  
   git clone <your-repo-url>
   cd school-management-api

2. Install packages  
   npm install

---

Database Setup

1. Open MySQL.
2. Run this:

   CREATE DATABASE IF NOT EXISTS school_management;
   USE school_management;

   CREATE TABLE IF NOT EXISTS schools (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       address VARCHAR(255) NOT NULL,
       latitude FLOAT NOT NULL,
       longitude FLOAT NOT NULL
   );

---

Configuration

Make a file called .env in the main folder. Put your MySQL details inside:

MYSQL_HOST=your_host
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=school_management

---

Run the Project

node server.js

---

API Endpoints

Add a School
- POST /addSchool
- Body example:
  {
    "name": "ABC School",
    "address": "123 Street",
    "latitude": 28.61,
    "longitude": 77.20
  }

---

List Schools (by nearest)
- GET /listSchools?user_latitude=28.70&user_longitude=77.10

Response will be a list of schools sorted by distance.

---

Notes
- Make sure MySQL is running before starting the server.
- Change .env with your real database info.
