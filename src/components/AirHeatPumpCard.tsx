interface AirHeatPumpProps {
  title: string,
  temperature: string,
}

const AirHeatPump: React.FC<AirHeatPumpProps> = ({ title, temperature }) => {
  return (
    <div>
      <div className="card card-border w-lg mx-auto text-white backdrop-blur-sm drop-shadow-sm bg-gray-950/40">
        <div className="card-body">
          <h2 className="card-title mx-auto">{title}</h2>
          <p className="card mx-auto text-5xl">{temperature} °C</p>
        </div>
      </div>
    </div>
  )
}

export default AirHeatPump;
