import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';

interface LighCardProps {
  title: string;
}

const LightCard: React.FC<LighCardProps> = ({ title }) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div onClick={() => setIsOn((prev) => !prev)} className="card card-border w-80 text-white backdrop-blur-sm drop-shadow-sm bg-gray-950/40">
      <div className="card-body">
        <h2 className="card-title mx-auto">{title}</h2>
        <FontAwesomeIcon icon={faLightbulb} size='6x' className={`transition-colors ${isOn ? "text-yellow-500" : "text-gray-400"}`} />
      </div>
    </div>
  )
}

export default LightCard;
