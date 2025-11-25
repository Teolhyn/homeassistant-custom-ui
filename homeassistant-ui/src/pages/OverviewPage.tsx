import { useState, useEffect, useRef } from "react";
import DateTimeCard from "../components/datetimecard";
import WeatherCard from "../components/weathercard";
import ElectricityPriceCardTomorrow from "../components/electricitypricegraphtomorrow";
import ElectricityPriceCardToday from "../components/electricitypricegraphtoday";
import { motion } from "framer-motion";

function OverviewPage() {
  const [isFirstElement, setIsFirstElement] = useState(true);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setIsFirstElement(prev => !prev);
    }, 10000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="px-10 pt-10 m-7 flex-col bg-gray-950/40 backdrop-blur-sm rounded-2xl flex-wrap gap-4 justify-between">
      <div className="flex justify-between">
        <WeatherCard />
        <div>
          <DateTimeCard />
          <div className="mx-10 my-10 p-2">
            <motion.div
              key={isFirstElement ? "first" : "second"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              {isFirstElement ? (
                <ElectricityPriceCardToday />
              ) : (
                <ElectricityPriceCardTomorrow />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewPage
