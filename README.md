---

# NewHacks

Welcome to the **NewHacks** project! This repository contains code and resources for a project developed as part of NewHacks, focusing on [brief description of project objective and purpose, e.g., "a storm-tracking application that visualizes weather data"]. The project is designed using React for the frontend and Flask for backend services, integrating the Google Maps API for interactive map-based data visualization.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

**NewHacks** aims to [describe key objectives and the problem your project addresses, e.g., "provide real-time data visualization for weather patterns, enabling users to track storms in specific regions interactively."]. Developed as part of the NewHacks hackathon, this project demonstrates collaborative problem-solving and technical skills in web development, API integration, and data representation.

## Features
- **Interactive Map Visualization**: Track weather patterns using Google Maps integration.
- **Real-Time Data Updates**: Fetch and display dynamic location data from a backend server.
- **Responsive Design**: Adapts seamlessly to various devices.
- **Storm Tracking**: Displays weather tracking information for specified regions.

## Tech Stack
- **Frontend**: React, React Router
- **Backend**: Flask
- **API**: Google Maps API, Custom Flask API
- **Styling**: CSS

## Installation

### Prerequisites
- **Node.js** and **npm** for the frontend.
- **Python** (v3.6+) and **Flask** for the backend.

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/utcjcao/NewHacks.git
   cd NewHacks
   ```

2. **Backend Setup**
   - Navigate to the backend directory.
     ```bash
     cd backend
     ```
   - Install dependencies.
     ```bash
     pip install -r requirements.txt
     ```
   - Start the Flask server.
     ```bash
     python app.py
     ```

3. **Frontend Setup**
   - Navigate to the frontend directory.
     ```bash
     cd ../frontend
     ```
   - Install dependencies.
     ```bash
     npm install
     ```
   - Start the React application.
     ```bash
     npm start
     ```

4. **Environment Variables**
   - Create an `.env` file in the `frontend` and `backend` directories.
   - Add your Google Maps API key in the `frontend/.env`:
     ```
     REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     ```

## Usage
- **Accessing the App**: Once both servers are running, open a web browser and go to [http://localhost:3000](http://localhost:3000).
- **Tracking Weather**: Use the interface to view weather data on the interactive map, dynamically updated based on data retrieved from the backend.

## API Documentation

### 1. `/api/locations/initial` (GET)
   - **Description**: Fetches initial location data for the application.
   - **Response**:
     ```json
     [
       { "lat": 25.7617, "lng": -80.1918, "name": "Miami" },
       ...
     ]
     ```

### 2. `/api/locations/updated` (GET)
   - **Description**: Fetches updated location data for tracking changes.
   - **Response**:
     ```json
     [
       { "lat": 26.1224, "lng": -80.1373, "name": "Fort Lauderdale" },
       ...
     ]
     ```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a pull request.

## License
This project is licensed under the MIT License.

---

Feel free to expand on any section based on your project’s details or link additional resources like a project demo or screenshots for added clarity. Let me know if you’d like to include any specific sections!
