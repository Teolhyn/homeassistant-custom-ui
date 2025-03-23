import { useEffect, useState } from "react"

function DateTimeCard() {
  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    setInterval(() => {
      const daysOfWeek: string[] = [
        "Sunnuntai",
        "Maanantai",
        "Tiistai",
        "Keskiviikko",
        "Torstai",
        "Perjantai",
        "Maanantai",
      ];

      const months: string[] = [
        "Tammikuuta",
        "Helmikuuta",
        "Maaliskuuta",
        "Huhtikuuta",
        "Toukokuuta",
        "Kesäkuuta",
        "Heinäkuuta",
        "Elokuuta",
        "Syyskuuta",
        "Lokakuuta",
        "Marraskuuta",
        "Joulukuuta",
      ]

      const dateObject = new Date();

      const month = dateObject.getMonth();
      const day = dateObject.getDay();
      const day_number = dateObject.getDate();
      const hour = dateObject.getHours();
      const minute = dateObject.getMinutes();

      const currentTime = hour.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + ':' + minute.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
      const currentDate = daysOfWeek[day] + ' ' + day_number + '. ' + months[month];

      setDate(currentDate);
      setTime(currentTime);
    }, 1000)
  })

  return (
    <div className="transition-all p-5">
      <div className="text-9xl">
        {time}
      </div>
      <div className="text-2xl text-right mt-2">
        {date}
      </div>
    </div>
  )

}

export default DateTimeCard;
