window.onload = function () {
    var dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];
    var stockChart = new CanvasJS.StockChart("chartContainer", {
        theme: "dark1",
        backgroundColor: "#0d1117",
        title: {
            text: "Évolution du Litecoin (LTC/EUR)",
            fontColor: "#ecf0f1",
            fontSize: 26,
            fontFamily: "Arial"
        },
        rangeSelector: {
            buttonStyle: {
                backgroundColor: "#151B23",
                backgroundColorOnHover: "#262C36",
                borderColor: "#3d444db3",
                labelFontColor: "#ecf0f1",
                labelFontSize: 16,
                fontFamily: "Arial"
            },
            inputFields: {
                style: {
                    backgroundColor: "#151B23",
                    borderColor: "#3d444db3",
                    fontSize: 16,
                }
            }
        },
        charts: [{
            toolTip: {
                shared: true,
                backgroundColor: "#151B23",
                fontColor: "#ecf0f1",
                borderColor: "#3d444db3",
                fontSize: 12
            },
            axisX: {
                lineThickness: 1,
                tickLength: 5,
                labelFontColor: "#ecf0f1",
                labelFontSize: 12,
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    labelFontColor: "#ecf0f1"
                }
            },
            axisY2: {
                title: "Prix en EUR",
                prefix: "€",
                labelFontColor: "#ecf0f1",
                titleFontColor: "#ecf0f1",
                gridColor: "#3d444d",
                labelFontSize: 12,
                titleFontSize: 14
            },
            legend: {
                verticalAlign: "top",
                horizontalAlign: "left",
                fontColor: "#ecf0f1",
                fontSize: 12
            },
            data: [{
                name: "Prix (EUR)",
                yValueFormatString: "€#,###.##",
                axisYType: "secondary",
                type: "candlestick",
                risingColor: "#00b894",
                fallingColor: "#d63031",
                dataPoints: dataPoints1
            }]
        }],
        navigator: {
            axisX: {
                gridColor: "#3d444d",
            },
            data: [{
                color: "#7f8c8d",
                dataPoints: dataPoints3
            }],
            slider: {
                minimum: new Date(2018, 06, 01),
                maximum: new Date(2018, 08, 01),
                handleColor: "#ecf0f1",
                maskColor: "#151B23"
            }
        }
    });

    $.getJSON("https://canvasjs.com/data/docs/ltceur2018.json", function (data) {
        for (var i = 0; i < data.length; i++) {
            dataPoints1.push({
                x: new Date(data[i].date),
                y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)],
                color: data[i].open < data[i].close ? "#00b894" : "#d63031"
            });
            dataPoints2.push({
                x: new Date(data[i].date),
                y: Number(data[i].volume_eur),
                color: "#3498db"
            });
            dataPoints3.push({
                x: new Date(data[i].date),
                y: Number(data[i].close)
            });
        }
        stockChart.render();
    });
}
