
const API_URL = "http://127.0.0.1:5000";

let locationData = [];

// Calculate distance using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const toRadians = degrees => degrees * Math.PI / 180;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}


// Load location data
async function loadLocations() {
    const table = document.getElementById("locationsTable");

    try {
        const response = await fetch(`${API_URL}/api/locations`);

        if (!response.ok) {
            throw new Error("Unable to fetch location data");
        }

        locationData = await response.json();

        updateLocationStats(locationData);
        displayLocations(locationData);

    } catch (error) {
        console.error("Location Error:", error);

        table.innerHTML = `
            <tr><td colspan="6">Failed to load locations.</td></tr>
        `;
    }
}


// Update summary cards
function updateLocationStats(data) {
    document.getElementById("locationCount").textContent =
        data.length.toLocaleString("en-IN");

    const validDistances = data.map(item =>
        calculateDistance(
            Number(item.Restaurant_latitude),
            Number(item.Restaurant_longitude),
            Number(item.Delivery_location_latitude),
            Number(item.Delivery_location_longitude)
        )
    ).filter(distance =>
    Number.isFinite(distance) && distance <= 5);

    const average = validDistances.length
        ? validDistances.reduce((sum, distance) => sum + distance, 0) / validDistances.length
        : 0;

    document.getElementById("averageDistance").textContent =
        `${average.toFixed(2)} km`;
}


// Display location records
function displayLocations(data) {
    const table = document.getElementById("locationsTable");

    if (data.length === 0) {
        table.innerHTML = `
            <tr><td colspan="6">No locations found.</td></tr>
        `;
        return;
    }

    table.innerHTML = data.map(item => {
        const distance = calculateDistance(
            Number(item.Restaurant_latitude),
            Number(item.Restaurant_longitude),
            Number(item.Delivery_location_latitude),
            Number(item.Delivery_location_longitude)
        );

        return `
            <tr>
                <td>${item.ID ?? "-"}</td>
                <td>${item.City ?? "-"}</td>
                <td>${item.Restaurant_latitude}, ${item.Restaurant_longitude}</td>
                <td>${item.Delivery_location_latitude}, ${item.Delivery_location_longitude}</td>
                <td>${item.delivery_time ?? "-"} min</td>
                <td>${Number.isFinite(distance) ? distance.toFixed(2) : "-"} km</td>
            </tr>
        `;
    }).join("");
}


// Search by order ID or city
document.getElementById("locationSearch").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();

    const filteredData = locationData.filter(item =>
        String(item.ID ?? "").toLowerCase().includes(searchText) ||
        String(item.City ?? "").toLowerCase().includes(searchText)
    );

    displayLocations(filteredData);
});

loadLocations();
