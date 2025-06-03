// Calendar functionality
document.getElementById('add-to-calendar').addEventListener('click', function (e) {
    e.preventDefault();

// Event details - UPDATE THESE VALUES
    const eventDetails = {
        title: 'Special Event Invitation', startDate: '20240615', // YYYYMMDD format
        endDate: '20240615',   // YYYYMMDD format
        startTime: '1900',     // HHMM format (24hr)
        endTime: '2300',       // HHMM format (24hr)
        location: 'Event Venue Address', description: 'Join us for a special celebration!'
    };

// Create calendar URL (Google Calendar format)
    const startDateTime = eventDetails.startDate + 'T' + eventDetails.startTime + '00';
    const endDateTime = eventDetails.endDate + 'T' + eventDetails.endTime + '00';

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${startDateTime}/${endDateTime}&location=${encodeURIComponent(eventDetails.location)}&details=${encodeURIComponent(eventDetails.description)}`;

    window.open(calendarUrl, '_blank');
});

// Maps functionality
document.getElementById('map-placeholder').addEventListener('click', function () {
    const latitude = 41.071331;  // Istanbul coordinates
    const longitude = 28.999592; // Istanbul coordinates

    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapsUrl, '_blank');
});

// Optional: Replace placeholder with actual embedded map
function loadGoogleMap() {
    const mapContainer = document.getElementById('map-placeholder');

    const latitude = 41.071331;  // Istanbul coordinates
    const longitude = 28.999592; // Istanbul coordinates

// Replace placeholder with embedded map iframe
    mapContainer.innerHTML = `
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDBCMDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="250"
                style="border:0; border-radius: 5px;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        `;
}

// Uncomment the line below to automatically load the embedded map
loadGoogleMap();
