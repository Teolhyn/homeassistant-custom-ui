import Lightcard from "./components/lightcard.tsx";
import Nav from "./components/nav.tsx";

const titles = ["Keittiö", "Olohuone", "Työhuone", "Makuuhuone"];

function App() {

  return (
    <div>
      <Nav />
      <div className="p-4 flex flex-wrap gap-4 justify-center">
        {titles.map((title, index) => (
          <Lightcard key={index} title={title} />
        ))}
      </div>
    </div>
  )
}

export default App
