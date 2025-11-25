import { useWebSocket } from "../context/WebSocketContext"
import HeatingCard from "../components/heatingcard";

function HeatingCardPage() {
  const { entities } = useWebSocket();

  if (!entities) {
    return <div>Loading entities...</div>;
  }

  const thermometers = Object.entries(entities).filter(([entityId]) =>
    entityId.startsWith("sensor.motion_sensor_air_temperature")
  );

  console.log(thermometers);

  const titles = ["Olohuone", "Makuuhuone"];

  return (
    <div className="p-4 flex flex-wrap gap-4 justify-center">
      {thermometers.map((device, index) => (
        <HeatingCard key={index} title={titles[index]} temperature={device[1].state} />
      ))}
    </div>
  )
}

export default HeatingCardPage
