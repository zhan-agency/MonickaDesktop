import BookingItem from "@/components/Booking/BookingItem";
import CalendarModeView from "@/components/Booking/CalendarMode";
import TableModeView from "@/components/Booking/TableMode";
import { ClinicType, SessionType, TimeType, UserType } from "@/type/monicka";
import { getSessions, timeStringToDecimal } from "@/utils";
import { useEffect, useState } from "react";



function create2DArray(a: number, b: number) {
  return Array.from({ length: a }, () => Array(b).fill(0));
}

export const DaysBar = ({ selectedDay, setSelectedDay, ultraWide= false }: { selectedDay: string, setSelectedDay: (selectedDay: string) => void, ultraWide: boolean }) => {
  const days = [0, 1, 2, 3, 4, 5, 6, 7]
  return (
    <div className={`p-4 my-2 w-full rounded-xl ${ultraWide ? "w-full" : "max-w-[1300px]"} mx-auto`} style={{ backgroundColor: "rgb(255,255,255,0.3)" }}>
      <div className="flex gap-2 justify-center">
        {days.map((day: number) => {
          const nextDay = new Date();
          nextDay.setDate(nextDay.getDate() + day);
          let formatedNextDay = nextDay.toLocaleDateString('en-US');
          formatedNextDay = `${formatedNextDay.split('/')[2]}-${formatedNextDay.split('/')[0]}-${formatedNextDay.split('/')[1]}`;
          const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "2-digit", day: "2-digit" };
          return <div key={day} className={`rounded-xl text-center p-4 text-black cursor-pointer w-[130px] ${formatedNextDay == selectedDay ? "bg-green-300" : "bg-neutral-100"}`} onClick={() => setSelectedDay(formatedNextDay)}>{nextDay.toLocaleDateString('fa-IR', options)}</div>
        })}
      </div>
    </div>
  )
}

export default function Booking({ user }: { user: UserType }) {

  function fitSessionsIntoChart(sessions: SessionType[], totalRooms: number, timeSlots: number, chart: number[][]) {

    // Sort sessions based on start time
    sessions.sort((a, b) => timeStringToDecimal(a.time) - timeStringToDecimal(b.time));
    let refinedSessions: SessionType[]= []
  
    // Fit sessions into the chart
    sessions.forEach(session => {
      const startSlot = Math.floor(timeStringToDecimal(session.time) * 2); // Convert hour to half-hour slot
      const lengthSlots = session.length === 60 ? 2 : 3; // 60 mins = 2 slots, 90 mins = 3 slots
  
      for (let room = 0; room < totalRooms; room++) {
        let canFit = true;
        
        // Check if the session fits in the current room
        for (let slot = startSlot; slot < startSlot + lengthSlots; slot++) {
          if (slot >= timeSlots || chart[room][slot] !== 0) {
            canFit = false; // Not a valid slot
            break;
          }
        }
  
        // If it fits, place the session in the chart
        if (canFit) {
          for (let slot = startSlot; slot < startSlot + lengthSlots; slot++) {
            chart[room][slot] = session.id; // Fill the slot with session ID
            const newSession: SessionType = { ...session, room: room + 1 };
            if (refinedSessions.filter(s => s.id == newSession.id).length == 0) {
              refinedSessions = [...refinedSessions, newSession];
            }
          }
          break;
        }
      }
    });
    return refinedSessions;
  }
  const [updateSessions, setUpdateSessions] = useState(true)
  const [updateSessionsError, setUpdateSessionsError] = useState(false)
  const today = new Date(); // Current date
  const formattedToday = `${today.toLocaleDateString('en-US').split('/')[2]}-${today.toLocaleDateString('en-US').split('/')[0]}-${today.toLocaleDateString('en-US').split('/')[1]}`;
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1); // Add one day to today

  const [sessions, setSessions] = useState<SessionType[]>([])
  const [selectedDaySessions, setSelectedDaySessions] = useState<SessionType[]>([])
  const [selectedDay, setSelectedDay] = useState(formattedToday)
  const [clinic, setClinic] = useState<ClinicType>(user.clinics[0])
  const [start, setStart] = useState(8)
  const [end, setEnd] = useState(20)
  const [calendarMode, setCalendarMode] = useState(true)

  useEffect(() => {
    if (updateSessions) {
      setUpdateSessionsError(false);
      getSessions()
        .then((sessions) => {setSessions(sessions); setUpdateSessions(false); console.log('Sessions updated')})
        .catch(error => {console.error('Error fetching session:', error); setUpdateSessionsError(true); setUpdateSessions(false)});
    }
    setSelectedDaySessions(
      fitSessionsIntoChart(sessions.filter(session => session.date === selectedDay && session.clinic.id == clinic.id && session.isCanceled == false),
      clinic.rooms,
      48,
      create2DArray(clinic.rooms, 48)))

  }, [selectedDay, sessions, updateSessions, updateSessionsError])

  //const sessions = [
  //  session,
  //  { ...session, id: 2, time: "18:00" },
  //  { ...session, id: 3, time: "13:30" },
  //  { ...session, id: 4 },
  //  { ...session, id: 5, time: "14:00" },
  //  { ...session, id: 6, time: "17:00" },
  //  { ...session, id: 7, time: "14:30" },
  //  { ...session, id: 11, time: "8:00", date: formattedTomorrow },
  //  { ...session, id: 12, time: "8:00", date: formattedTomorrow },
  //  { ...session, id: 8, time: "14:00", date: formattedTomorrow },
  //  { ...session, id: 9, time: "13:00", date: formattedTomorrow },
  //  { ...session, id: 10, time: "14:30", date: formattedTomorrow },
  //  { ...session, id: 11, time: "9:30" },
  //  { ...session, id: 12, time: "10:30" },
  //  { ...session, id: 13, time: "11:30" },
  //  { ...session, id: 14, time: "12:30" },
  //  { ...session, id: 15, time: "10:30" },
  //]
  const ModeBar = ({ setCalendarMode, calendarMode, setUpdateSessions, updateSessions, ultraWide = false }: { calendarMode: boolean, setCalendarMode: (calendarMode: boolean) => void, updateSessions: boolean, setUpdateSessions: (updateSessions: boolean) => void, ultraWide: boolean }) =>
    <div className={`my-2 w-full rounded-xl flex justify-center ${ultraWide ? "w-full" : "max-w-[1300px]"} mx-auto`} style={{ backgroundColor: "rgb(255,255,255,0.3)" }}>
      <div className={`p-4 m-8 pointer text-center text-black rounded-xl cursor-pointer w-[250px] ${calendarMode ? "bg-yellow-400" : "bg-white"}`} onClick={() => setCalendarMode(true)}>نمایش برنامه روز</div>
      <div className={`p-4 m-8 pointer text-center text-black rounded-xl cursor-pointer w-[250px] ${calendarMode ? "bg-white" : "bg-yellow-400"}`} onClick={() => setCalendarMode(false)}>نمایش جدولی نوبت‌ها</div>
      <div className={`p-4 m-8 pointer text-center text-black ${updateSessions ? 'bg-green-300' : (updateSessionsError ? '  bg-red-300' :'bg-white') } cursor-pointer rounded-xl w-[200px]`} onClick={() => setUpdateSessions(true)}>{ (updateSessions && !updateSessionsError) && "در حال "}{ updateSessionsError && "↻ مشکل در "}به روز رسانی</div>
    </div>

  if (!clinic) return <></>
  return (
    <main id="main" className="w3-main-padding px-16">
      <span className={`week-container ${clinic.rooms > 3 ? "w-full" : "max-w-[1300px]"}`}>
        <ModeBar setCalendarMode={setCalendarMode} calendarMode={calendarMode} setUpdateSessions={setUpdateSessions} updateSessions={updateSessions} ultraWide={clinic.rooms > 3} />
        <DaysBar selectedDay={selectedDay} setSelectedDay={setSelectedDay} ultraWide={clinic.rooms > 3}/>
        {calendarMode ?
          <CalendarModeView sessions={selectedDaySessions} clinic={clinic} selectedDay={selectedDay} setSelectedDay={setSelectedDay} start={start} end={end} /> :
          <TableModeView sessions={sessions.filter(session => session.date === selectedDay && session.clinic.id == clinic.id ).sort((a, b) => timeStringToDecimal(a.time) - timeStringToDecimal(b.time))} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        }
      </span>
    </main>
  )
}