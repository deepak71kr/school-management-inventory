School Management APIThis project implements a RESTful API for managing school data, including adding new schools and retrieving a list of schools sorted by geographical proximity.RequirementsNode.jsMySQLInstallationClone the repository.Install dependencies:npm install
Database SetupOpen your MySQL client.Execute the following SQL commands to create the database and table:CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
ConfigurationCreate a .env file in the root directory.Add your MySQL connection details:MYSQL_HOST=your_host
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=school_management
Running the APIStart the server using the following command:node server.js
API EndpointsPOST /addSchoolDescription: Adds a new school record.Body (JSON): { "name": "...", "address": "...", "latitude": ..., "longitude": ... }GET /listSchoolsDescription: Retrieves schools sorted by proximity.Parameters: ?user_latitude=...&user_longitude=...