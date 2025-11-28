interface HeatingCardProps {
  title: string;
  temperature: string;
}

const HeatingCard: React.FC<HeatingCardProps> = ({ title, temperature }) => {

  return (
    <div className="card card-border w-60 text-white backdrop-blur-sm drop-shadow-sm bg-gray-950/40">
      <div className="card-body">
        <h2 className="card-title mx-auto">{title}</h2>
        <p className="card mx-auto text-5xl">{temperature} °C</p>
      </div>
    </div>
  );
};

export default HeatingCard;

