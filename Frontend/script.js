
const API_URL = "http://127.0.0.1:5000";

// 1. Load dashboard statistics
async function loadDashboard() {
    try {
        const response = await fetch(`${API_URL}/api/dashboard`);

        if (!response.ok) {
            throw new Error("Dashboard API failed");
        }

        const data = await response.json();

        document.getElementById("totalOrders").textContent =
            Number(data.total_orders).toLocaleString("en-IN");

        document.getElementById("avgDelivery").textContent =
            `${data.avg_delivery_time} min`;

        document.getElementById("totalPersonnel").textContent =
            Number(data.total_personnel).toLocaleString("en-IN");

        document.getElementById("avgRating").textContent =
            `${data.avg_rating} / 5`;

    } catch (error) {
        console.error("Dashboard Error:", error);
    }
}


// 2. Load traffic analytics chart
async function loadTrafficChart() {
    try {
        const response = await fetch(`${API_URL}/api/traffic`);
        const data = await response.json();

        new Chart(document.getElementById("trafficChart"), {
            type: "bar",
            data: {
                labels: data.map(item => item.traffic || "Unknown"),
                datasets: [{
                    label: "Average Delivery Time (minutes)",
                    data: data.map(item => Number(item.avg_time)),
                    backgroundColor: "#8b5cf6",
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: "#cbd5e1" }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: "#94a3b8" },
                        grid: { display: false }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: "#94a3b8" },
                        grid: { color: "#263247" }
                    }
                }
            }
        });

    } catch (error) {
        console.error("Traffic Chart Error:", error);
    }
}


// 3. Load weather analytics chart
async function loadWeatherChart() {
    try {
        const response = await fetch(`${API_URL}/api/weather`);
        const data = await response.json();

        new Chart(document.getElementById("weatherChart"), {
            type: "doughnut",
            data: {
                labels: data.map(item =>  (item.weather || "Unknown").replace(/^conditions\s+/i, "")),
                datasets: [{
                    label: "",
                    data: data.map(item => Number(item.avg_time)),
                    backgroundColor: [
                        "#8b5cf6",
                        "#3b82f6",
                        "#22c55e",
                        "#f59e0b",
                        "#ec4899",
                        "#06b6d4",
                        "#647488"
                    ],
                    borderWidth: 2,
                    borderColor: "#151d2d"
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            color: "#cbd5e1",
                            padding: 15
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error("Weather Chart Error:", error);
    }
}


// 4. Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();
    loadTrafficChart();
    loadWeatherChart();
});
