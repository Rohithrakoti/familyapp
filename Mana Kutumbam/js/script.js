// This file contains JavaScript functionality for the Mana Kutumbam family website.

// Function to create a new event
function createEvent() {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const whatsapp = document.getElementById('whatsapp').value;

    if (name && date) {
        const event = { name, date, whatsapp };
        // Here you would typically send the event to a server or save it in local storage
        console.log('Event created:', event);
        alert('Event created successfully!');
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to upload images
function uploadImages() {
    const eventId = document.getElementById('eventIdUpload').value;
    const images = document.getElementById('images').files;

    if (eventId && images.length > 0) {
        // Here you would typically upload the images to a server
        console.log('Images uploaded for event ID:', eventId);
        alert('Images uploaded successfully!');
    } else {
        alert('Please enter an Event ID and select images to upload.');
    }
}

// Function to display events (placeholder for future implementation)
function displayEvents() {
    const eventsDiv = document.getElementById('events');
    // Here you would typically fetch events from a server and display them
    eventsDiv.innerHTML = '<p>No events available.</p>';
}

// Call displayEvents on page load
window.onload = displayEvents;