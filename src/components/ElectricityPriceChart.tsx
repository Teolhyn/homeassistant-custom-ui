import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid } from 'recharts';
import { useWebSocket } from "../context/WebSocketContext";
import { useEffect, useState } from 'react';

interface BarChartProps {
  title: string,
  sensor: string,
  day: "today" | "tomorrow",
}

const PositiveAndNegativeBarChart: React.FC<BarChartProps> = ({ title, sensor, day }) => {
  const [priceTodaySeries, setPriceTodaySeries] = useState<number[]>([]);
  const { entities } = useWebSocket();

  useEffect(() => {
    if (entities) {
      const electricityAttributes = entities[sensor]?.attributes;

      if (electricityAttributes) {
        const todayPrices = electricityAttributes[day] || [];

        if (Array.isArray(todayPrices) && todayPrices.every(num => typeof num === "number")) {
          setPriceTodaySeries(todayPrices);
        }
      }
    }
  }, [entities]);

  const chartData = priceTodaySeries.map((v, i) => ({ index: i, value: v }));

  return (
    <div className='text-white w-130'>
      <h2 className='ml-15 flex justify-center items-center text-2xl font-light'>{title}</h2>
      <BarChart
        style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
        data={chartData}
        margin={{
          top: 5,
          right: 0,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} fillOpacity={0.2} />
        <XAxis stroke='#fff' tickSize={10} fontSize={24} tickMargin={5} interval={6} tickFormatter={(v) => Math.round(v / 4).toFixed(0)} />
        <YAxis stroke='#fff' tickSize={10} fontSize={24} tickMargin={5} />
        <Tooltip />
        <ReferenceLine y={0} stroke="#fff" />
        <Bar dataKey="value" fill="#56A0EE" />
      </BarChart>
    </div>
  );
};

export default PositiveAndNegativeBarChart;
