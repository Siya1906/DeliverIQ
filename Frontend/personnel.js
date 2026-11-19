
const API_URL = "http://127.0.0.1:5000";

let personnelData = [];

async function loadPersonnel() {
    const table = document.getElementById("personnelTable");

    try {
        const response = await fetch(`${API_URL}/api/personnel`);

        if (!response.ok) {
            throw new Error("Unable to fetch personnel data");
        }

        personnelData = await response.json();

        updatePersonnelStats(personnelData);
        displayPersonnel(personnelData);

    } catch (error) {
        console.error("Personnel Error:", error);

        table.innerHTML = `
            <tr><td colspan="4">Failed to load personnel.</td></tr>
        `;
    }
}

function updatePersonnelStats(data) {
    const total = data.length;

    const avgRating = total
        ? data.reduce((sum, person) => sum + Number(person.avg_rating || 0), 0) / total
        : 0;

    const avgDeliveries = total
        ? data.reduce((sum, person) => sum + Number(person.total_deliveries || 0), 0) / total
        : 0;

    document.getElementById("totalPersonnel").textContent =
        total.toLocaleString("en-IN");

    document.getElementById("averageRating").textContent =
        `${avgRating.toFixed(2)} / 5`;

    document.getElementById("averageDeliveries").textContent =
        avgDeliveries.toFixed(1);
}

function displayPersonnel(data) {
    const table = document.getElementById("personnelTable");

    if (data.length === 0) {
        table.innerHTML = `
            <tr><td colspan="4">No personnel found.</td></tr>
        `;
        return;
    }

    table.innerHTML = data.map(person => `
        <tr>
            <td>${person.Delivery_person_ID ?? "-"}</td>
            <td>${person.total_deliveries ?? 0}</td>
            <td>${person.avg_age ?? "-"}</td>
            <td>${person.avg_rating ?? "-"}</td>
        </tr>
    `).join("");
}

// Search personnel by ID
document.getElementById("searchPersonnel").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();

    const filteredData = personnelData.filter(person =>
        String(person.Delivery_person_ID ?? "").toLowerCase().includes(searchText)
    );

    displayPersonnel(filteredData);
});

loadPersonnel();
