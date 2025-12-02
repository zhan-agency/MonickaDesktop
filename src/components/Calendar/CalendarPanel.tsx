import { DayType, JalaliMonthInfoType, TimeType } from "@/type/monicka";
import { useState } from "react";
import WeekDayTitles from "./WeekdayTitles";
import Days from "./Days";
import MonthSelectorButtons from "../Booking/MonthSelectorButtons";
import { jalaliMonths } from "@/utils";

const DaysLoading = () => {
  return (
    <>
      {
        Array.from({ length: 35 }, (_, i) => 1 + i).map((day: number) => (
          <div id={`day-${day}`} className="day shadow"></div>
        ))
      }
    </>
  )
}

const CalendarPanel = ({ holidays, times }: { holidays: string[], times: TimeType[] }) => {
  const month1: JalaliMonthInfoType = {
    ...jalaliMonths[1],
    firstDay: {
      date: '2025-02-02',
      weekday: 0,
    },
  }
  const month2: JalaliMonthInfoType = {
    ...jalaliMonths[2],
    firstDay: {
      date: '2025-03-02',
      weekday: 3,
    },
  }
  const [selectedMonth, setSelectedMonth] = useState<JalaliMonthInfoType>(month1)
  const [selectedDay, setSelectedDay] = useState<DayType | undefined>(undefined)
  return (
    <div className="time-container calendar-container">
      <div className="calendar shadow">
        <MonthSelectorButtons {...{ month1, month2, setSelectedMonth, selectedMonth }} />
        <WeekDayTitles />
        <Days {...{ selectedMonth, setSelectedDay, selectedDay }} />
      </div>
    </div>
  )
}

export default CalendarPanel;