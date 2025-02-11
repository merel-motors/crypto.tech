document.getElementById('search').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let annonces = document.querySelectorAll('.annonce');

    annonces.forEach(annonce => {
        if (annonce.textContent.toLowerCase().includes(filter)) {
            annonce.style.display = "block";
        } else {
            annonce.style.display = "none";
        }
    });
});
async function updateMarketTrends() {
    const response = await fetch('/prix');
    const data = await response.json();
    const container = document.getElementById('market-trends');

    container.innerHTML = ''; // Efface les anciennes données

    data.forEach(asset => {
        const div = document.createElement('div');
        div.className = `trend ${asset.trend.includes("Hausse") ? "up" : "down"}`;
        div.innerHTML = `<strong>${asset.name}</strong>: ${asset.price} ${asset.trend}`;
        container.appendChild(div);
    });
}

// Mise à jour toutes les 30 secondes
setInterval(updateMarketTrends, 30000);
updateMarketTrends();
const ctx = document.getElementById('priceChart').getContext('2d');
const priceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Les dates
        datasets: [{
            label: 'Prix en USD',
            data: [], // Les valeurs
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
        }]
    }
});

async function updateChart() {
    const response = await fetch('/prix'); 
    const data = await response.json();

    priceChart.data.labels = data.map(d => d.date);
    priceChart.data.datasets[0].data = data.map(d => d.price);
    priceChart.update();
}

setInterval(updateChart, 5000); // Mise à jour toutes les 5 secondes
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

async function checkAlerts() {
    const response = await fetch('/prix');
    const data = await response.json();

    data.forEach(item => {
        if (item.name === "Bitcoin" && item.price > 50000) {
            new Notification("🚀 Bitcoin explose !", {
                body: `Le Bitcoin dépasse 50 000$ !`,
                icon: "bitcoin.png"
            });
        }
    });
}

setInterval(checkAlerts, 60000); // Vérifie toutes les 60 sec
