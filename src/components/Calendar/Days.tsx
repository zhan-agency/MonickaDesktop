import { DayType, JalaliMonthInfoType } from "@/type/monicka";
import { addDaysToStringDate } from "@/utils";

const Days = ({ selectedMonth, setSelectedDay, selectedDay }: { selectedMonth: JalaliMonthInfoType, setSelectedDay: (day: DayType) => void, selectedDay?: DayType }) => {
    const weeksCount = () => {
      const month = selectedMonth
      const daysInFirstWeek = month.firstDay.weekday > 4 ? 12 - month.firstDay.weekday : 5 - month.firstDay.weekday;
      return (1 + Math.ceil((month.length - daysInFirstWeek) / 7))
    }
  
    const jalaliFirstDayWeekday = selectedMonth.firstDay.weekday < 5 ? selectedMonth.firstDay.weekday + 2 : 5 - selectedMonth.firstDay.weekday;
    
    const daysOffset = () => {
      return Object.fromEntries(
        Array.from({ length: weeksCount() * 7 }, (_, i) => [i + 1, (i >= jalaliFirstDayWeekday && i < selectedMonth.length + jalaliFirstDayWeekday) ?
          {
            date: addDaysToStringDate(selectedMonth.firstDay.date, i - jalaliFirstDayWeekday),
            day: i - jalaliFirstDayWeekday + 1,
          } :
          { date: undefined, day: "" }
        ])
      );
    }
  
    return (
      <>
        {Object.entries(daysOffset()).map(([key, day]) => (
          <div key={key} id={`day-${key}`} onClick={() => day.date ? setSelectedDay({ ...day, isAvailable: false }) : null} className={`day shadow ${parseInt(key) % 7 == 0 ? "off" : "text-black comming"} ${(day.date && selectedDay?.date == day.date) ? "selected" : ""}`}>{day.day.toLocaleString('fa-IR')}</div>
        ))}
      </>
    )
  }

export default Days;