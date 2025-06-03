const informations = {
    "wedding": {
        "map-placeholder-name": "wedding-map-placeholder",
        "latitude": 40.886179,
        "longitude": 29.196197,
        "startDate": "20250705",
        "endDate": "20250705",
        "startTime": "1230",
        "endTime": "1330",
        "title": "Enes-Nilay Kayhan Nikah",
        "description": "Nikah salonunu 'Nikah Sarayı' tabelalarını takip ederek bulabilirsiniz.",
        "location_name": "İBB Bülent Ecevit Kültür Merkezi Nikah Sarayı"
    },
    "ceremony": {
        "map-placeholder-name": "ceremony-map-placeholder",
        "latitude": 41.071331,
        "longitude": 28.999592,
        "startDate": "20250615",
        "endDate": "20250615",
        "startTime": "1900",
        "endTime": "2300",
        "title": "Enes-Nilay Kayhan Düğün",
        "description": "Düğün yerinin tarifi",
        "location_name": "ceremony_location_name"
    }
}

// Calendar functionality
document.getElementById('add-to-calendar-wedding').addEventListener('click', function (e) {
    e.preventDefault();

// Event details - UPDATE THESE VALUES
    const eventDetails = {
        title: informations.wedding.title,
        startDate: informations.wedding.startDate,
        endDate: informations.wedding.endDate,
        startTime: informations.wedding.startTime,
        endTime: informations.wedding.endTime,
        location: informations.wedding.location_name,
        description: informations.wedding.description,
    };

// Create calendar URL (Google Calendar format)
    const startDateTime = eventDetails.startDate + 'T' + eventDetails.startTime + '00';
    const endDateTime = eventDetails.endDate + 'T' + eventDetails.endTime + '00';
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${startDateTime}/${endDateTime}&location=${encodeURIComponent(eventDetails.location)}&details=${encodeURIComponent(eventDetails.description)}`;

    window.open(calendarUrl, '_blank');
});
document.getElementById('add-to-calendar-ceremony').addEventListener('click', function (e) {
    e.preventDefault();

// Event details - UPDATE THESE VALUES
    const eventDetails = {
        title: informations.ceremony.title,
        startDate: informations.ceremony.startDate,
        endDate: informations.ceremony.endDate,
        startTime: informations.ceremony.startTime,
        endTime: informations.ceremony.endTime,
        location: informations.ceremony.location_name,
        description: informations.ceremony.description,
    };

// Create calendar URL (Google Calendar format)
    const startDateTime = eventDetails.startDate + 'T' + eventDetails.startTime + '00';
    const endDateTime = eventDetails.endDate + 'T' + eventDetails.endTime + '00';

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${startDateTime}/${endDateTime}&location=${encodeURIComponent(eventDetails.location)}&details=${encodeURIComponent(eventDetails.description)}`;

    window.open(calendarUrl, '_blank');
});


// Maps functionality
document.getElementById('wedding-map-placeholder').addEventListener('click', function () {
    const mapsUrl = `https://www.google.com/maps?q=${informations.wedding.latitude},${informations.wedding.longitude}`;
    window.open(mapsUrl, '_blank');
});
document.getElementById('ceremony-map-placeholder').addEventListener('click', function () {
    const mapsUrl = `https://www.google.com/maps?q=${informations.ceremony.latitude},${informations.ceremony.longitude}`;
    window.open(mapsUrl, '_blank');
});

// Optional: Replace placeholder with actual embedded map
function loadGoogleMap(data) {
    const mapContainer = document.getElementById(data["map-placeholder-name"]);

// Replace placeholder with embedded map iframe
    mapContainer.innerHTML = `
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${data.longitude}!3d${data.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDBCMDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890"
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
loadGoogleMap(informations.ceremony);
loadGoogleMap(informations.wedding);

