import { useWebSocket } from "../context/WebSocketContext"
import HeatingCard from "../components/heatingcard";
import AirHeatPump from "../components/airheatpumpcard";

function HeatingCardPage() {
  const { entities } = useWebSocket();

  if (!entities) {
    return <div>Loading entities...</div>;
  }

  const thermometers = Object.entries(entities).filter(([entityId]) =>
    entityId.startsWith("sensor.motion_sensor_air_temperature")
  );

  console.log(entities);

  const airheatpump = Object.entries(entities).filter(([entityId]) =>
    entityId.startsWith("climate.eteinen")
  );

  const titles = ["Olohuone", "Makuuhuone"];

  console.log(airheatpump);
  return (
    <div>
      <div className="p-4 flex flex-wrap gap-4 justify-center">
        {thermometers.map((device, index) => (
          <HeatingCard key={index} title={titles[index]} temperature={device[1].state} />
        ))}
      </div>
      <div>
        <AirHeatPump title={airheatpump[0][1].attributes.friendly_name ?? "Ilppi"} temperature={airheatpump[0][1].attributes.current_temperature} />
      </div>
    </div>

  )
}

export default HeatingCardPage
