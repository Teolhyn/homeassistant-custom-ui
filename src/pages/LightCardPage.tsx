import Lightcard from "../components/LightCard.tsx";
import { useWebSocket } from "../context/WebSocketContext.tsx";

function LightCardPage() {

  const { entities } = useWebSocket();

  if (!entities) {
    return <div>Loading entities...</div>;
  }

  const lights = Object.entries(entities).filter(([entityId]) =>
    entityId.startsWith("light.")
  );

  return (
    <div className="p-4 flex flex-wrap gap-4 justify-center">
      {lights.map((light, index) => (
        <Lightcard key={index} title={light[1].attributes.friendly_name ?? light[1].entity_id} entityId={light[1].entity_id} />
      ))}
    </div>
  )
}

export default LightCardPage
