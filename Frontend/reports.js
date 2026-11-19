
const API_URL = "http://127.0.0.1:5000";

// Convert data into downloadable CSV
function downloadCSV(data, filename) {
    if (!data || data.length === 0) {
        alert("No data available for this report.");
        return;
    }

    const headers = Object.keys(data[0]);

    const csv = [
        headers.join(","),
        ...data.map(row =>
            headers.map(header =>
                `"${String(row[header] ?? "").replace(/"/g, '""')}"`
            ).join(",")
        )
    ].join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
}

// Generate performance report
document.getElementById("performanceReport").addEventListener("click", async () => {
    try {
        const response = await fetch(`${API_URL}/api/dashboard`);
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Report data:", data);

        if (!response.ok) throw new Error("Unable to generate report");

        downloadCSV([data], "Delivery_Performance_Report.csv");

        document.getElementById("performanceResult").textContent =
            "Performance report downloaded successfully.";

    } catch (error) {
        alert(error.message);
    }
});

// Generate traffic report
document.getElementById("trafficReport").addEventListener("click", async () => {
    try {
        const response = await fetch(`${API_URL}/api/traffic`);
        const data = await response.json();

        if (!response.ok) throw new Error("Unable to generate report");

        downloadCSV(data, "Traffic_Analysis_Report.csv");

        document.getElementById("trafficResult").textContent =
            "Traffic report downloaded successfully.";

    } catch (error) {
        alert(error.message);
    }
});

// Generate personnel report
document.getElementById("personnelReport").addEventListener("click", async () => {
    try {
        const response = await fetch(`${API_URL}/api/personnel`);
        const data = await response.json();

        if (!response.ok) throw new Error("Unable to generate report");

        downloadCSV(data, "Personnel_Performance_Report.csv");

        document.getElementById("personnelResult").textContent =
            "Personnel report downloaded successfully.";

    } catch (error) {
        alert(error.message);
    }
});
