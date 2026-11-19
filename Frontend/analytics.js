
const API_URL = "http://127.0.0.1:5000";

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: "#cbd5e1"
            }
        }
    },
    scales: {
        x: {
            ticks: { color: "#94a3b8" },
            grid: { display: false }
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Minutes",
                color: "#94a3b8"
            },
            ticks: { color: "#94a3b8" },
            grid: { color: "#263247" }
        }
    }
};


// 1. Traffic analytics
async function loadTrafficChart() {
    const response = await fetch(`${API_URL}/api/traffic`);
    const data = await response.json();

    new Chart(document.getElementById("trafficChart"), {
        type: "bar",
        data: {
            labels: data.map(item => item.traffic || "Unknown"),
            datasets: [{
                label: "Average Delivery Time",
                data: data.map(item => Number(item.avg_time)),
                backgroundColor: "#8b5cf6",
                borderRadius: 6
            }]
        },
        options: chartOptions
    });
}


// 2. Weather analytics
async function loadWeatherChart() {
    const response = await fetch(`${API_URL}/api/weather`);
    const data = await response.json();

    new Chart(document.getElementById("weatherChart"), {
        type: "bar",
        data: {
            labels: data.map(item => item.weather || "Unknown"),
            datasets: [{
                label: "Average Delivery Time",
                data: data.map(item => Number(item.avg_time)),
                backgroundColor: "#3b82f6",
                borderRadius: 6
            }]
        },
        options: chartOptions
    });
}


// 3. Vehicle condition analytics
async function loadVehicleChart() {
    const response = await fetch(`${API_URL}/api/vehicle-condition`);
    const data = await response.json();

    new Chart(document.getElementById("vehicleChart"), {
        type: "bar",
        data: {
            labels: data.map(item => `Condition ${item.Vehicle_condition}`),
            datasets: [{
                label: "Average Delivery Time",
                data: data.map(item => Number(item.avg_delivery_time)),
                backgroundColor: "#22c55e",
                borderRadius: 6
            }]
        },
        options: chartOptions
    });
}


// Load all analytics
document.addEventListener("DOMContentLoaded", async () => {
    try {
        await Promise.all([
            loadTrafficChart(),
            loadWeatherChart(),
            loadVehicleChart()
        ]);
    } catch (error) {
        console.error("Analytics Error:", error);
    }
});
