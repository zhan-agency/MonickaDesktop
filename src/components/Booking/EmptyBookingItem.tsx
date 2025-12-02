import { SessionType } from "@/type/monicka";
import { e2p } from "@/utils";
import { ReactNode, useState } from "react";

export default function EmptyBookingItem({isNextCellFree, start, end, room, start_time,end_time}: {isNextCellFree: boolean; room: number; start: number; end: number; start_time: string; end_time: string;}) {
  const [show, setShow] = useState(false)
  return (
    <div className={`m-2 flip-card empty text-black max-w-[380px]`} onMouseOver={() => isNextCellFree && setShow(true)} onMouseLeave={() => setShow(false)} style={{gridColumn: `${room*2}/${room*2+1}`, gridRow: `${start}/${end}` }}>
      <div className={`flip-card-inner}`}>
        <div className={`${show ? "position-relative" : "hide" } z-index-3 w-full h-[190px] m-1 rounded-xl border flex justify-center items-center text-white border-dashed`} style={{backgroundColor: 'rgb(255,255,255,0.3)' }}>
          ثبت نوبت جدید
          برای { e2p(start_time) } تا { e2p(end_time) }
        </div>
      </div>
    </div >
  )

}