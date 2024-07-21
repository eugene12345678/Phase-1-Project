# Phase-1-Project
# Car Sales Web Application

This project is a web application that displays a list of cars available for sale. Users can search for cars, view details of a selected car, buy a car, and delete a car from the database. The application uses a RESTful API to fetch car data from a JSON server.

## Features

- **Search**: Users can search for cars by their titles.
<<<<<<< HEAD
- **View Details**: Users can click on a car to view its details, including the poster, title, top speed, price, and description.
=======
- **View Details**: Users can click on a car to view its details, including the poster, title, top speed, horse power, and description.
>>>>>>> origin/main
- **Buy Car**: Users can buy a car, which updates the number of available cars.
- **Delete Car**: Users can delete a car from the database.

## Technologies Used

- HTML
- CSS
- JavaScript
- JSON Server (for API)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your computer
- JSON Server installed globally or locally in your project

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/eugene12345678/Phase-1-Project.git
    cd phase-1-project
    ```

2. **Install JSON Server**

    ```bash
    npm install -g json-server
    ```

3. **Run JSON Server**

    ```bash
    json-server --watch db.json
    ```

    This will start the JSON Server and watch the `db.json` file for changes. The server will run on `http://localhost:3000`.

4. **Open index.html in your browser**:

    Simply open the `index.html` file in your preferred web browser to run the application.

## API Endpoints

The application interacts with the following API endpoints:

- **GET /cars**: Fetch all cars
- **GET /cars/:id**: Fetch details of a specific car by its ID
- **PATCH /cars/:id**: Update the number of cars sold
- **DELETE /cars/:id**: Delete a car

## Project Structure
```
 car-sales-app/
│
├── css/
│ └── style.css # Styles for the application
│
├── script/
│ └── script.js # Main JavaScript file with all functionality
│
├── db.json # JSON Server database file
│
├── index.html # Main HTML file
│
└── README.md # Project documentation
```
## Usage

### Load Cars

When the page loads, all cars are fetched from the API and displayed in the carousel. Users can click on any car to view its details.

### Search Cars

Users can search for cars by typing in the search input field. The list of cars updates automatically based on the search query.

### Buy Car

When viewing the details of a car, users can click the "Buy" button to purchase the car. This updates the number of available cars in the database.

### Delete Car

When viewing the details of a car, users can click the "Delete" button to remove the car from the database. A confirmation dialog will appear before the car is deleted.

## Code Explanation

The main functionality is implemented in the `script.js` file. Here's a brief overview of the key functions:

- `loadCars()`: Fetches all cars from the API and displays them in the carousel.
- `displayCars(data)`: Displays the cars in the carousel.
- `createCarItem(car)`: Creates an image element for a car item.
- `fetchCars(id)`: Fetches details of a specific car by its ID.
- `updateCarDetails(data)`: Updates the car details section with the fetched data.
- `updateCars(available)`: Updates the number of available cars and the button state.
- `buyCars()`: Handles buying a car.
- `updateCarsSold(updatedCarsSold)`: Updates the number of cars sold for the current car.
- `markAsSoldOut(title)`: Marks a car as sold out in the carousel.
- `deleteCar()`: Handles deleting a car.
- `handleError(error)`: Handles errors by logging them to the console.

## Contributing

Contributions are always welcome! Please feel free to submit a pull request or open an issue to discuss any changes or improvements.

## AUTHOR
[Eugene Mathenge](https://github.com/dashboard)
## Deployed
[LINK](https://phase-1-project-one-zeta.vercel.app/)



