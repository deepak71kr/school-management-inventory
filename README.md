School Management APIThis project provides two Node.js APIs for a school management system, using Express.js, MySQL, and the geolib library.Getting Started1. Database SetupFirst, you need to set up the MySQL database. Connect to your MySQL server and run the following SQL query to create the school_management database and the schools table.CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
2. Project InstallationClone this repository and navigate to the project directory.Install the required Node.js packages:npm install
3. ConfigurationCreate a .env file in the root directory of your project to store your database credentials. This keeps your sensitive information out of the code and is crucial for a production environment like Render.MYSQL_HOST=localhost
MYSQL_USER=your_mysql_username
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=school_management
Note for Render Deployment:When you deploy to Render, you will need to add these same environment variables directly in the Render dashboard, using the credentials provided by your Render MySQL service.4. Running the ApplicationTo start the server, run the following command:node server.js
The API will be available at http://localhost:3000.5. API EndpointsOnce the server is running, you can test the following endpoints:POST /addSchool: Add a new school to the database.GET /listSchools: Retrieve a list of schools sorted by distance from a given location.You can use the provided postman-collection.json file to easily test these endpoints.