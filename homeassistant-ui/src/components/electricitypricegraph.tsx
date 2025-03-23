import { useEffect, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import Chart from "react-apexcharts";

interface HassEntityAttributeBase {
  friendly_name?: string;
  entity_id?: string;
  last_changed?: string;
  last_updated?: string;
}

type HassEntityAttributes = HassEntityAttributeBase & { [key: string]: any };


function ElectricityPriceCard() {
  const [electricityAttributes, setElectricityAttributes] = useState<HassEntityAttributes | null>(null);
  const { entities } = useWebSocket();
  const [chartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false
        }
      },
      xaxis: {
        categories: ["00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00", "00:00",]
      },
      stroke: {
        curve: "smooth" as "smooth",
      }
    },
    series: [
      {
        name: "series-1",
        data: electricityAttributes?.today.data
      }
    ],

  });

  useEffect(() => {
    setInterval(() => {
      if (entities) {
        const elcectricityAttributes = entities["sensor.nordpool_kwh_fi_eur_2_10_0255"]?.attributes;
        setElectricityAttributes(elcectricityAttributes);
      }
    }, 1000)
  })

  return (
    <div className="text-2xl">
      <h1>Electricity Price</h1>
      {electricityAttributes?.max}
      <Chart options={chartData.options} series={chartData.series} type="line" width="500" />
    </div>
  )

}

export default ElectricityPriceCard;
