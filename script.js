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
    const response = await fetch('/price'); 
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
    const response = await fetch('/price');
    const data = await response.json(price);

    data.forEach(item => {
        if (item.name === "Bitcoin" && item.price > 100000) {
            new Notification("🚀 Bitcoin explose !", {
                body: `Le Bitcoin dépasse 100 000$ !`,
                icon: "bitcoin.png"
            });
        }
    });
}

setInterval(checkAlerts, 60000); // Vérifie toutes les 60 sec
const translations = {
    fr: { title: "Crypto & Forex en Temps Réel" },
    en: { title: "Crypto & Forex Live Prices" },
    es: { title: "Precios en Vivo de Crypto & Forex" }
};

document.getElementById('language').addEventListener('change', function() {
    let lang = this.value;
    document.querySelector('h1').textContent = translations[lang].title;
});
const themeButton = document.getElementById('toggle-theme');
themeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        themeButton.textContent = '🌑 Mode sombre';
    } else {
        themeButton.textContent = '🌙 Mode clair';
    }
});
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
// === 📌 Fichier : script.js (Améliorations avancées) ===

// 🎨 Mode sombre / clair
document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

// 🔍 Barre de recherche
document.getElementById('search').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    document.querySelectorAll('.crypto-row').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
});

// 📈 Mise à jour du tableau avec API
async function updateTable() {
    const response = await fetch('/prix');
    const data = await response.json();
    const table = document.getElementById('crypto-table');
    table.innerHTML = '';
    
    data.forEach(crypto => {
        let row = document.createElement('tr');
        row.className = 'crypto-row';
        row.innerHTML = `<td>${crypto.name}</td><td>${crypto.price}$</td><td class="${crypto.trend.includes("Hausse") ? "text-green" : "text-red"}">${crypto.trend}</td>`;
        table.appendChild(row);
    });
}
setInterval(updateTable, 10000);
updateTable();

// 🔔 Notifications si hausse/baisse forte
async function checkAlerts() {
    const response = await fetch('/prix');
    const data = await response.json();
    
    data.forEach(crypto => {
        if (crypto.name === "Bitcoin" && crypto.price > 50000) {
            new Notification("🚀 Bitcoin explose !", { body: `Le BTC dépasse 100 000$ !`, icon: "bitcoin.png" });
        }
    });
}
setInterval(checkAlerts, 60000);

// 📜 Historique des prix (Stockage local)
function saveHistory(data) {
    let history = JSON.parse(localStorage.getItem('priceHistory')) || [];
    history.push({ timestamp: Date.now(), prices: data });
    localStorage.setItem('priceHistory', JSON.stringify(history.slice(-10)));
}

// 📈 RSI & MACD (Exemple simple)
function calculateRSI(data) {
    let gains = [], losses = [];
    for (let i = 1; i < data.length; i++) {
        let diff = data[i] - data[i - 1];
        diff > 0 ? gains.push(diff) : losses.push(-diff);
    }
    let avgGain = gains.reduce((a, b) => a + b, 0) / gains.length || 1;
    let avgLoss = losses.reduce((a, b) => a + b, 0) / losses.length || 1;
    return 100 - (100 / (1 + avgGain / avgLoss));
}

// 🤖 Chatbot IA (Détection des tendances basiques)
function chatBot(question) {
    if (question.includes("Bitcoin")) return "Le BTC est en tendance haussière aujourd’hui !";
    return "Je ne suis pas sûr, vérifie les tendances actuelles.";
}

console.log(chatBot("Bitcoin"));
