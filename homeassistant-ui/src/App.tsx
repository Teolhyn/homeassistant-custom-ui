import { useState } from "react";
import { useSwipeable } from "react-swipeable";

import LightCardPage from "./pages/LightCardPage";
import OverviewPage from "./pages/OverviewPage";
import Nav from "./components/nav";
import { WebSocketProvider } from "./context/WebSocketContext";

const pages = [<LightCardPage />, <OverviewPage />];

export default function App() {
  const [index, setIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex((prev) => Math.min(prev + 1, pages.length - 1)),
    onSwipedRight: () => setIndex((prev) => Math.max(prev - 1, 0)),
    trackMouse: true,
  });

  return (
    <WebSocketProvider>
      <Nav />
      <div {...handlers} className="w-full h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center">
        <div className="w-full h-full transition-transform duration-300 flex" style={{ transform: `translateX(-${index * 100}%)` }}>
          {pages.map((Page, i) => (
            <div key={i} className="w-full h-full flex-shrink-0">
              {Page}
            </div>
          ))}
        </div>
      </div>
    </WebSocketProvider>
  );
}

