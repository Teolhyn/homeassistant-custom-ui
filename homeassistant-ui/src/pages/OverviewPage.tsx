import DateTimeCard from "../components/datetimecard"
import WeatherCard from "../components/weathercard"
import ElectricityPriceCard from "../components/electricitypricegraph"

function OverviewPage() {
  return (
    <div className="p-4 m-7 flex-col bg-gray-950/40 backdrop-blur-sm rounded-2xl flex-wrap gap-4 justify-between">
      <div className="flex justify-between">
        <WeatherCard />
        <DateTimeCard />
      </div>
      <div>
        <ElectricityPriceCard />
      </div>
    </div>
  )
}

export default OverviewPage
