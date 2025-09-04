# School Management API

This project provides two Node.js APIs for a School Management System, built with:

- Express.js  
- MySQL  
- geolib

The API lets you:
- Add new schools to the database  
- Retrieve a list of schools sorted by distance from a given location  

---

## Getting Started

### 1. Database Setup
First, set up your MySQL database. Connect to your MySQL server and run:

```sql
CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

---

### 2. Project Installation

Clone this repository and navigate to the project folder:

```bash
git clone <your-repo-url>
cd school-management-api
```

Install the dependencies:

```bash
npm install
```

---

### 3. Configuration

Create a `.env` file in the root directory with your MySQL credentials:

```env
MYSQL_HOST=localhost
MYSQL_USER=your_mysql_username
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=school_management
```

For Render Deployment:  
When deploying to Render, add the same environment variables in the Render dashboard, using the credentials provided by your Render MySQL service.

---

### 4. Running the Application

Start the server:

```bash
node server.js
```

The API will run on:

```
http://localhost:3000
```

---

## API Endpoints

### Add a School
`POST /addSchool`

**Request Body:**
```json
{
  "name": "Green Valley High School",
  "address": "123 Main Street",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

---

### List Schools by Distance
`GET /listSchools?latitude=<your_lat>&longitude=<your_long>`

**Example:**
```
GET /listSchools?latitude=12.9716&longitude=77.5946
```

Response will be a list of schools sorted by distance from the given location.

---

## Testing with Postman

Use the provided `postman-collection.json` file to test the API endpoints easily in Postman.

---

## Notes
- Make sure MySQL is running before starting the server.  
- Always use environment variables for credentials (never hardcode them).  
- For production, Render/MySQL/PostgreSQL services provide secure credentials.  

---

## License
This project is open-source. Feel free to use and improve it.
