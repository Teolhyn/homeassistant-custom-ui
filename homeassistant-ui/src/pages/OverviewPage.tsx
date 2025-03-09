import Lightcard from "../components/lightcard.tsx";

const titles = ["Keittiö", "Olohuone", "Työhuone", "Makuuhuone"];

function OverviewPage() {

  return (
    <div className="p-4 flex flex-wrap gap-4 justify-center">
      {titles.map((title, index) => (
        <Lightcard key={index} title={title} />
      ))}
      SECOND PAGE
    </div>
  )
}

export default OverviewPage
