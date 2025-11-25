import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useWebSocket } from "../context/WebSocketContext";

function ElectricityPriceCardTomorrow() {
  const [priceTomorrowSeries, setPriceTomorrowSeries] = useState<number[]>([]);
  const { entities } = useWebSocket();

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
        toolbar: { show: false }
      },
      xaxis: {
        categories: Array(24)
          .fill("")
          .map((_, i) => `${String(i).padStart(2, "0")}`),
        labels: {
          style: {
            colors: '#ffffff',
            fontSize: '16px',
            fontWeight: 600
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffffff',
            fontSize: '20px',
            fontWeight: 600
          }
        }
      },
      stroke: { curve: "smooth" as "smooth" },
      colors: ['#FF5733'],
    },
    series: [
      {
        name: "Electricity Price",
        data: Array(24).fill(0),
        color: '#6cb2eb',
      },
    ]
  });

  useEffect(() => {
    if (entities) {
      const electricityAttributes = entities["sensor.nordpool_kwh_fi_eur_2_10_0255"]?.attributes;

      if (electricityAttributes) {
        const tomorrowPrices = electricityAttributes.tomorrow || [];

        if (Array.isArray(tomorrowPrices) && tomorrowPrices.every(num => typeof num === "number")) {
          setPriceTomorrowSeries(tomorrowPrices);
        }
      }
    }
  }, [entities]);

  useEffect(() => {
    setChartData({
      options: {
        chart: {
          id: "basic-bar",
          toolbar: { show: false }
        },
        xaxis: {
          categories: Array(24)
            .fill("")
            .map((_, i) => `${String(i).padStart(2, "0")}`),
          labels: {
            style: {
              colors: '#ffffff',
              fontSize: '16px',
              fontWeight: 600
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#ffffff',
              fontSize: '20px',
              fontWeight: 600
            }
          }
        },
        stroke: { curve: "smooth" as "smooth" },
        colors: ['#FF5733'],
      },
      series: [
        {
          name: "Electricity Price",
          data: priceTomorrowSeries.length ? priceTomorrowSeries : Array(24).fill(0),
          color: '#6cb2eb'
        }
      ]
    });
  }, [priceTomorrowSeries]);


  return (
    <div>
      <div>
        <h1 className="text-2xl text-center">Sähkön hinta huomenna</h1>
      </div>
      <Chart options={chartData.options} series={chartData.series} type="line" height="300" width={500} />
    </div>
  );
}

export default ElectricityPriceCardTomorrow;

