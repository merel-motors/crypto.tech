# This .gitignore is appropriate for repositories deployed to GitHub Pages and using
# a Gemfile as specified at https://github.com/github/pages-gem#conventional

# Basic Jekyll gitignores (synchronize to Jekyll.gitignore)
_site/
.sass-cache/
.jekyll-cache/
.jekyll-metadata

# Additional Ruby/bundler ignore for when you run: bundle install
/vendor

# Specific ignore for GitHub Pages
# GitHub Pages will always use its own deployed version of pages-gem 
# This means GitHub Pages will NOT use your Gemfile.lock and therefore it is
# counterproductive to check this file into the repository.
# Details at https://github.com/github/pages-gem/issues/768
Gemfile.lock
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Premier Site Web</title>
    <!-- Tu peux ajouter un lien vers un fichier CSS ici -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- En-tête de la page -->
    <header>
        <h1>Bienvenue sur mon site !</h1>
        <nav>
            <ul>
                <li><a href="#">Accueil</a></li>
                <li><a href="#">À propos</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- Contenu principal de la page -->
    <main>
        <section>
            <h2>Qui suis-je ?</h2>
            <p>Je suis un passionné de développement web et je débute dans ce domaine !</p>
        </section>

        <section>
            <h2>Mes Projets</h2>
            <p>J'ai déjà travaillé sur quelques petits projets web, et j'espère en créer beaucoup plus !</p>
        </section>
    </main>

    <!-- Pied de page -->
    <footer>
        <p>&copy; 2025 Mon Premier Site Web</p>
    </footer>
</body>
</html>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Tech - Suivi des Crypto & Forex</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Crypto Tech</h1>
        <nav>
            <ul>
                <li><a href="#">Accueil</a></li>
                <li><a href="#">Crypto</a></li>
                <li><a href="#">Forex</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <h2>Prix en temps réel</h2>
        <section>
            <h3>Crypto-monnaies</h3>
            <table id="cryptoTable">
                <thead>
                    <tr>
                        <th>Cryptomonnaie</th>
                        <th>Prix actuel (€)</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Les lignes des crypto-monnaies seront ajoutées ici par JavaScript -->
                </tbody>
            </table>
        </section>

        <section>
            <h3>Paires de Forex</h3>
            <table id="forexTable">
                <thead>
                    <tr>
                        <th>Paires Forex</th>
                        <th>Prix actuel (€)</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Les lignes des paires Forex seront ajoutées ici par JavaScript -->
                </tbody>
            </table>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Crypto Tech</p>
    </footer>

    <script src="scripts.js"></script>
</body>
</html>
/* styles.css */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

header {
    background-color: #333;
    color: white;
    padding: 10px 0;
    text-align: center;
}

nav ul {
    list-style: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin: 0 15px;
}

nav ul li a {
    color: white;
    text-decoration: none;
}

h1, h2, h3 {
    color: #333;
}

table {
    width: 100%;
    margin: 20px 0;
    border-collapse: collapse;
}

table th, table td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
}

table th {
    background-color: #333;
    color: white;
}

footer {
    text-align: center;
    padding: 20px;
    background-color: #333;
    color: white;
}
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
