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
const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/annonces", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const annonceSchema = new mongoose.Schema({
  type: String, // "crypto" ou "forex"
  message: String,
  date: { type: Date, default: Date.now },
});

const Annonce = mongoose.model("Annonce", annonceSchema);

// Fonction pour générer des annonces aléatoires
const generateAnnonces = async () => {
  await Annonce.deleteMany({}); // Suppression des anciennes annonces

  const cryptoMessages = [
    "Bitcoin atteint un nouveau sommet !",
    "Ethereum voit une augmentation de 5%",
    "Solana en forte croissance aujourd'hui",
  ];

  const forexMessages = [
    "EUR/USD en légère baisse",
    "Le GBP/USD montre des signes de reprise",
    "USD/JPY en tendance haussière",
  ];

  const annonces = [];
  for (let i = 0; i < 5; i++) {
    annonces.push({ type: "crypto", message: cryptoMessages[Math.floor(Math.random() * cryptoMessages.length)] });
    annonces.push({ type: "forex", message: forexMessages[Math.floor(Math.random() * forexMessages.length)] });
  }

  await Annonce.insertMany(annonces);
  console.log("Annonces mises à jour");
};

// Tâche cron pour mettre à jour les annonces toutes les 12 heures
cron.schedule("0 */12 * * *", generateAnnonces);

// Route API pour récupérer les annonces
app.get("/annonces", async (req, res) => {
  const annonces = await Annonce.find();
  res.json(annonces);
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
  generateAnnonces(); // Générer des annonces au démarrage
});
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let previousPrices = {}; // Stocke les prix précédents

// Simule des données de prix (en réalité, utilise une API de marché)
const getFakePrices = () => {
    return [
        { name: "Bitcoin", price: Math.random() * (55000 - 48000) + 48000 },
        { name: "Ethereum", price: Math.random() * (4000 - 3500) + 3500 },
        { name: "EUR/USD", price: Math.random() * (1.20 - 1.10) + 1.10 }
    ];
};

app.get('/prix', (req, res) => {
    const prices = getFakePrices();
    const trends = prices.map(asset => {
        const previousPrice = previousPrices[asset.name] || asset.price; // Si pas de prix précédent, on prend l’actuel
        previousPrices[asset.name] = asset.price; // Mise à jour du prix précédent

        return {
            name: asset.name,
            price: asset.price.toFixed(2),
            trend: asset.price > previousPrice ? "📈 Hausse" : "📉 Baisse"
        };
    });

    res.json(trends);
});

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));
