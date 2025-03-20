import Lightcard from "../components/lightcard.tsx";

const titles = ["Keittiö", "Olohuone", "Työhuone", "Makuuhuone"];
const entities = ["light.vierashuoneen_valo_light", "light.vierashuoneen_valo_light", "light.vierashuoneen_valo_light", "light.vierashuoneen_valo_light",];

function LightCardPage() {

  return (
    <div className="p-4 flex flex-wrap gap-4 justify-center">
      {titles.map((title, index) => (
        <Lightcard key={index} title={title} entityId={entities[index]} />
      ))}
    </div>
  )
}

export default LightCardPage
