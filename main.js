// scripts.js

// Liste des crypto-monnaies à afficher
const cryptoList = [
    "bitcoin", "ethereum", "ripple", "litecoin", "bitcoin-cash",
    "cardano", "polkadot", "binancecoin", "dogecoin", "solana"
];

// Liste des paires de Forex à afficher (exemples EUR/USD, GBP/USD, etc.)
const forexList = [
    "EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCHF",
    "USDCAD", "NZDUSD", "EURGBP", "EURJPY", "GBPJPY"
];

// Fonction pour récupérer les prix des cryptomonnaies via l'API CoinGecko
async function fetchCryptoPrices() {
    const cryptoPrices = {};
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoList.join(',')}&vs_currencies=eur`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Ajouter les prix des crypto-monnaies dans le tableau
        cryptoList.forEach(crypto => {
            if (data[crypto]) {
                cryptoPrices[crypto] = data[crypto].eur;
            }
        });

        updateCryptoTable(cryptoPrices);
    } catch (error) {
        console.error("Erreur lors de la récupération des prix des cryptos", error);
    }
}

// Fonction pour récupérer les prix des paires Forex via l'API ExchangeRate
async function fetchForexPrices() {
    const forexPrices = {};
    const url = `https://v6.exchangeratesapi.io/latest?base=EUR&symbols=${forexList.join(',')}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Ajouter les prix des paires Forex dans le tableau
        forexList.forEach(pair => {
            if (data.rates[pair]) {
                forexPrices[pair] = data.rates[pair];
            }
        });

        updateForexTable(forexPrices);
    } catch (error) {
        console.error("Erreur lors de la récupération des prix des Forex", error);
    }
}

// Fonction pour mettre à jour le tableau des crypto-monnaies
function updateCryptoTable(prices) {
    const tableBody = document.getElementById("cryptoTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; // Effacer le contenu existant

    Object.keys(prices).forEach(crypto => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);

        cell1.textContent = crypto.charAt(0).toUpperCase() + crypto.slice(1);
        cell2.textContent = prices[crypto].toFixed(2) + " €";
    });
}

// Fonction pour mettre à jour le tableau des paires Forex
function updateForexTable(prices) {
    const tableBody = document.getElementById("forexTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; // Effacer le contenu existant

    Object.keys(prices).forEach(pair => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);

        cell1.textContent = pair;
        cell2.textContent = prices[pair].toFixed(4) + " €";
    });
}

// Initialiser les données
fetchCryptoPrices();
fetchForexPrices();

// Rafraîchir les prix toutes les 60 secondes
setInterval(() => {
    fetchCryptoPrices();
    fetchForexPrices();
}, 60000);
