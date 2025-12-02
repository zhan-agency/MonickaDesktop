import { ClinicType, SessionType } from "@/type/monicka"
import BookingItem from "./BookingItem"

const TableModeView = ({ selectedDay, setSelectedDay, sessions }: { selectedDay: string, setSelectedDay: (selectedDay: string) => void, sessions: SessionType[] }) => {
  return (
    <>
      <div id="day-session-{{forloop.counter}}" className={`grid grid-cols-3 p-8 rounded-xl mb-16 max-w-[1300px] mx-auto`} style={{ backgroundColor: "rgb(255,255,255,0.3)" , gridTemplateRows: '210px 210px 210px'}}>
        {sessions.filter((session: SessionType) => (session.date === selectedDay)).map((session: SessionType) => (
          <BookingItem session={session} key={session.id} />
        ))}
      </div>
    </>
  )
}

export default TableModeView;