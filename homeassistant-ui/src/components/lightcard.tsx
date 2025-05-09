import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';
import { useWebSocket } from "../context/WebSocketContext";

interface LightCardProps {
  title: string;
  entityId: string;
}

const LightCard: React.FC<LightCardProps> = ({ title, entityId }) => {
  const { entities, sendServiceCommand } = useWebSocket();
  const isOn = entities?.[entityId]?.state === "on";

  const toggleLight = () => {
    if (isOn) {
      sendServiceCommand("light", "turn_off", entityId);
    } else {
      sendServiceCommand("light", "turn_on", entityId, { brightness: 200 }); // Example: Set brightness
    }
  };

  return (
    <div onClick={toggleLight} className="card card-border w-80 text-white backdrop-blur-sm drop-shadow-sm bg-gray-950/40">
      <div className="card-body">
        <h2 className="card-title mx-auto">{title}</h2>
        <FontAwesomeIcon icon={faLightbulb} size='6x' className={`transition-colors ${isOn ? "text-yellow-500" : "text-gray-400"}`} />
      </div>
    </div>
  );
};

export default LightCard;

