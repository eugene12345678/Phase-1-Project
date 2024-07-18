const url = 'http://localhost:3000/cars'; // Base URL for the API

document.addEventListener('DOMContentLoaded', () => {
     // Load all cars on page load
     loadCars();

    // Select DOM elements
    const carousel = document.querySelector('#carousel');
    const poster = document.querySelector('#poster');
    const title = document.querySelector('#title');
    const topspeed = document.querySelector('#topspeed');
    const horsepower = document.querySelector('#horsepower');
    const availableCars = document.querySelector('#available-cars');
    const description = document.querySelector('#description');
    const buyCarButton = document.querySelector('#buy-car');
    const deleteCarButton = document.querySelector('#delete-car');
    const carDetails = document.querySelector('#car-details');
    let currentCarId; // Variable to store the ID of the currently displayed car
    const searchInput = document.querySelector(".search_input")

    // Fetch all cars from the API and display them in the carousel
    function loadCars() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const filteredCars = data.filter(movie => movie.title.toLowerCase().includes(searchInput.value.toLowerCase()));
                displayCars(filteredCars);
            })
            .catch(handleError);
    }

    searchInput.addEventListener("change", loadCars);
    // Display the cars in the carousel
    function displayCars(data) {
        carousel.innerHTML = ''; // Clear the carousel


        data.forEach(car => {
            const carItem = createCarItem(car); // Create a car item for each car
            carousel.appendChild(carItem); // Add the car item to the carousel
        });
    if (data.length > 0 ) {
        fetchCars(data[0].id); // Fetch and display details of the first car
    }
    }

    // Create an image element for a car item
    function createCarItem(car) {
        const carItem = document.createElement('img');
        carItem.src = car.poster;
        carItem.alt = car.title;
        // Add click event to fetchCars and display details of the clicked car
        carItem.addEventListener('click', () => fetchCars(car.id));
        return carItem;
    }

    // Fetch details of a specific car by its ID
    function fetchCars(id) {
        fetch(`${url}/${id}`)
            .then(response => response.json())
            .then(updateCarDetails)
            .catch(handleError);
    }

    // Update the car details section with the fetched data
    function updateCarDetails(data) {
        currentCarId = data.id; // Update the current car ID
        poster.src = data.poster;
        title.textContent = data.title;
        topspeed.textContent = data.topspeed;
        horsepower.textContent = data.horsepower;
        description.textContent = data.description;
        updateCars(data.capacity - data.cars_sold); // Update available cars
        carDetails.classList.remove('hidden'); // Show the car details section
        carDetails.style.transform = 'translateX(0)'; // Ensure it's displayed properly
    }

    // Update the number of available cars and the button state
    function updateCars(available) {
        availableCars.textContent = available;
        buyCarButton.disabled = available === 0; // Disable the button if no cars are available
        buyCarButton.textContent = available === 0 ? 'Sold Out' : 'Buy'; // Update button text
    }

    // Add click event listener to the buy car button
    buyCarButton.addEventListener('click', buyCars);

    // Handle buying a car
    function buyCars() {
        fetch(`${url}/${currentCarId}`)
            .then(response => response.json())
            .then(data => {
                const available = data.capacity - data.cars_sold;
                if (available > 0) {
                    updateCarsSold(data.cars_sold + 1); // Update cars sold if available
                } else {
                    alert('Sorry but this car is sold out!'); // Alert if no cars are available
                }
            })
            .catch(handleError);
    }

    // Update the number of cars sold for the current car
    function updateCarsSold(updatedCarsSold) {
        fetch(`${url}/${currentCarId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cars_sold: updatedCarsSold })
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok'); // Handle network error
            return response.json();
        })
        .then(data => {
            const available = data.capacity - updatedCarsSold;
            updateCars(available); // Update available cars
            if (available === 0) {
                markAsSoldOut(data.title); // Mark as sold out if no cars are available
            }
        })
        .catch(handleError);
    }

    // Mark a car as sold out in the carousel
    function markAsSoldOut(title) {
        document.querySelector(`#carousel img[alt="${title}"]`).classList.add('sold-out');
        alert('Sorry but this car is sold out!'); // Alert the user
    }

    // Add click event listener to the delete car button
    deleteCarButton.addEventListener('click', deleteCar);

    // Handle deleting a car
    function deleteCar() {
        if (confirm('Are you sure you want to delete this car?')) {
            fetch(`${url}/${currentCarId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok'); // Handle network error
                carDetails.classList.add('hidden'); // Hide the car details section
                alert('Car has been deleted successfully!'); // Alert the user
                loadCars(); // Reload the cars
            })
            .catch(handleError);
        }
    }

    // Handle errors by logging them to the console
    function handleError(error) {
        console.error('Error:', error);
    }
});
