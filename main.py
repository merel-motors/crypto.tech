import plotly.graph_objects as go
import requests
import time

# Fonction pour obtenir les données de Binance (cryptomonnaies)
def get_binance_data(symbol="BTCUSDT", interval="1m"):
    url = f"https://api.binance.com/api/v1/klines?symbol={symbol}&interval={interval}&limit=100"
    response = requests.get(url)
    data = response.json()
    time_series = [item[0] for item in data]  # Timestamp
    close_prices = [float(item[4]) for item in data]  # Prix de clôture
    return time_series, close_prices

# Fonction pour afficher un graphique en temps réel
def plot_crypto_graph(symbol="BTCUSDT", interval="1m"):
    time_series, close_prices = get_binance_data(symbol, interval)
    
    # Créer un graphique Plotly
    fig = go.Figure(data=[go.Candlestick(
        x=[time.strftime('%H:%M:%S', time.gmtime(t / 1000)) for t in time_series],
        open=close_prices,
        high=close_prices,
        low=close_prices,
        close=close_prices
    )])
    
    fig.update_layout(title=f"Prix en temps réel de {symbol}", xaxis_title="Temps", yaxis_title="Prix (USDT)")
    fig.show()

# Exemple d'affichage
plot_crypto_graph(symbol="BTCUSDT", interval="1m")
from forex_python.converter import CurrencyRates
import plotly.graph_objects as go

# Récupérer le taux de change en temps réel
currency = CurrencyRates()

def plot_forex_graph(base_currency="EUR", target_currency="USD"):
    rates = []
    times = []

    # Récupérer les données pendant quelques minutes
    for _ in range(30):  # Par exemple, 30 minutes de données
        rate = currency.get_rate(base_currency, target_currency)
        rates.append(rate)
        times.append(time.strftime('%H:%M:%S'))
        time.sleep(60)  # Attendre une minute avant de récupérer à nouveau
    
    # Créer un graphique avec Plotly
    fig = go.Figure(data=[go.Scatter(x=times, y=rates, mode='lines+markers')])
    fig.update_layout(title=f"Taux de change {base_currency} / {target_currency}",
                      xaxis_title="Temps", yaxis_title=f"Prix de {base_currency} en {target_currency}")
    fig.show()

# Exemple d'affichage pour EUR/USD
plot_forex_graph(base_currency="EUR", target_currency="USD")
