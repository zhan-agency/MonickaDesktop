import BookingItem from "@/components/Booking/BookingItem";
import { ClinicType, SessionType } from "@/type/monicka";
import { session } from "electron";
import { useEffect, useRef, useState } from "react";
import EmptyBookingItem from "./EmptyBookingItem";
import { decimalToTimeString, timeStringToDecimal } from "@/utils";

const TimeIndicators = () => <>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "1/2" }}></div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "2/4" }}>۸:۰۰</div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "4/6" }}>۹:۰۰</div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "6/8" }}>۱۰‍:۰۰</div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "8/10" }}>۱۱:۰۰</div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "10/12" }}>۱۲:۰۰</div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "12/14" }}>۱۳:۰۰</div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "14/16" }}>۱۴:۰۰</div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "16/18" }}>۱۵:۰۰</div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "18/20" }}>۱۶:۰۰</div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "20/22" }}>۱۷:۰۰</div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "22/24" }}>۱۸:۰۰</div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "24/26" }}>۱۹:۰۰</div>
  <div className="text-white h-full" style={{ gridColumn: "1/2", gridRow: "26/28" }}>۲۰:۰۰</div>
</>

const TableTitles = ({ clinic }: { clinic: ClinicType }) => <>
  {Array.from({ length: clinic.rooms }).map((_, index) => (
    <div key={index} className="text-center">اتاق {(index + 1).toLocaleString('fa-IR')}</div>
  ))}
</>

const Bars = ({ rooms }: { rooms: number }) => <>
  {Array.from({ length: rooms - 1 }).map((_, index) => (
    <div key={index} className="bg-neutral-50 h-full w-[100%]" style={{ opacity: "0.2", height: "100%", gridColumn: `${((index + 1) * 2) + 1}/${(index + 2) * 2}`, gridRow: "1/26" }}></div>
  ))}
</>

const CalendarModeView = ({ selectedDay, setSelectedDay, start, end, clinic, sessions }: { selectedDay: string, setSelectedDay: (selectedDay: string) => void, start: number, end: number, clinic: ClinicType, sessions: SessionType[] }) => {
  
  
const HorizontalScroll = ({ children, id, className, style }:{ children: React.ReactNode, id: string, className: string, style: {[key: string]: string} }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef?.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef?.current?.scrollLeft ?? 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 2 is the scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className={`scroll-container ${className}`}
      id={id}
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ ...style , whiteSpace: 'nowrap', cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none' }}
    >
      {children}
    </div>
  );
}
  
  
  const columns = () => String(clinic.rooms * 2 - 1)

  const gridTemplateColumns = Array.from({ length: parseInt(columns()) }).map((_, index) => {
    const template = ((((100 - clinic.rooms) / clinic.rooms)) * window.innerHeight / 100) > (window.innerHeight / 4) ?
      ((index % 2 === 0) ? `${((100 - clinic.rooms) / clinic.rooms)}%` : '1px')
      :
      ((index % 2 === 0) ? '400px' : '1px')
    return template;
  }).join(' ');

  const [currentTime, setCurrentTime] = useState(0);

  const updateTime = () => {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    setCurrentTime(minutes);
  };

  useEffect(() => {
    updateTime(); // Initial call to set the time
  
    const intervalId = setInterval(() => {
      updateTime();
    }, 60000);
  
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <HorizontalScroll id="day-session-{{forloop.counter}}" className={`grid grid-cols-${columns()} p-8 rounded-xl mb-16 ${clinic.rooms > 3 ? "w-full" : "max-w-[1300px]"} mx-auto overflow-x-scroll`} style={{ backgroundColor: "rgb(255,255,255,0.3)", gridTemplateColumns: "20px " + gridTemplateColumns, gridTemplateRows: `32px repeat(${(end - start) * 2}, 105px)` }}>
          <TableTitles clinic={clinic} />
          <TimeIndicators />
          <Bars rooms={clinic.rooms} />
          {(currentTime > 8 && currentTime < 20) && <span className="h-[2px] bg-green-300 relative col-span-5 z-index-2" style={{ top: `${-1 * (end - currentTime) * 210 - 22.5}px` }}></span>}
          {sessions.map((session: SessionType) => (
            <BookingItem session={session} start={start} key={session.id} />
          ))}
          {Array.from({ length: (end-start)*2 - 1 }).map((_, time) => (
            Array.from({ length:  clinic.rooms }).map((_, room) => (
              ((sessions.filter(session => session.room == room+1 && timeStringToDecimal(session.time) == start + (time/2)).length > 0)
              || (sessions.filter(session => session.room == room+1 && timeStringToDecimal(session.time) == start + (time/2) - 0.5).length > 0)
              || (sessions.filter(session => session.room == room+1 && timeStringToDecimal(session.time) == (start + (time/2) + 0.5)).length > 0)) ? <></> :
              <EmptyBookingItem
                isNextCellFree={true}
                key={`${room}-${time}`}
                start_time={ decimalToTimeString( start + (time/2) ) }
                end_time={ decimalToTimeString( start + (time/2) + 1 )}
                start = {time + 2}
                end = {time + 3}
                room={room+1}
              />
            ))
          ))}
      </HorizontalScroll>
    </>
  )
}

export default CalendarModeView;