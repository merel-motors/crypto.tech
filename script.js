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
