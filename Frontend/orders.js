
const API_URL = "http://127.0.0.1:5000";

let allOrders = [];
let currentPage = 1;
let totalPages = 1;

async function loadOrders(page = 1) {
    const table = document.getElementById("ordersTable");

    table.innerHTML = `<tr><td colspan="6">Loading orders...</td></tr>`;

    try {
        const response = await fetch(`${API_URL}/api/orders?page=${page}`);

        if (!response.ok) {
            throw new Error("Unable to fetch orders");
        }

        const data = await response.json();

        allOrders = data.orders;
        currentPage = data.page;
        totalPages = data.total_pages;

        document.getElementById("totalCount").textContent =
            Number(data.total).toLocaleString("en-IN");

        displayOrders(allOrders);
        updatePagination();

    } catch (error) {
        console.error("Orders Error:", error);
        table.innerHTML = `
            <tr><td colspan="6">Failed to load orders.</td></tr>
        `;
    }
}

function displayOrders(orders) {
    const table = document.getElementById("ordersTable");

    if (orders.length === 0) {
        table.innerHTML = `
            <tr><td colspan="6">No orders found.</td></tr>
        `;
        return;
    }

    table.innerHTML = orders.map(order => `
        <tr>
            <td>${order.ID ?? "-"}</td>
            <td>${order.Order_Date ?? "-"}</td>
            <td>${order.Weatherconditions ?? "-"}</td>
            <td>${order.Road_traffic_density ?? "-"}</td>
            <td>${order.City ?? "-"}</td>
            <td>${order["Time_taken(min)"] ?? "-"} min</td>
        </tr>
    `).join("");
}

function updatePagination() {
    document.getElementById("pageInfo").textContent =
        `Page ${currentPage} of ${totalPages}`;

    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        loadOrders(currentPage - 1);
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentPage < totalPages) {
        loadOrders(currentPage + 1);
    }
});

document.getElementById("searchInput").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();

    const filteredOrders = allOrders.filter(order =>
        String(order.ID ?? "").toLowerCase().includes(searchText) ||
        String(order.City ?? "").toLowerCase().includes(searchText)
    );

    displayOrders(filteredOrders);
});

loadOrders();
