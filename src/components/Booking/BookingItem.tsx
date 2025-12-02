import { SessionType } from "@/type/monicka";
import { e2p, timeStringToDecimal } from "@/utils";
import { ReactNode, useState } from "react";
import arrow90rightIcon from "../../assets/arrow-90deg-right.svg"
import dollarIcon from "../../assets/currency-dollar.svg"
import cameraOnIcon from "../../assets/camera-video.svg"
import cameraOffIcon from "../../assets/camera-video-off.svg"
import houseCheckIcon from "../../assets/house-check.svg"
import houseSlashIcon from "../../assets/house-slash.svg"
import xLgIcon from "../../assets/x-lg.svg"
import chain45Icon from "../../assets/link-45deg.svg"
import checkIcon from "../../assets/link-45deg.svg"

export default function BookingItem({ session, start }: { session: SessionType, start?: number}) {
  const CardFront = ({ children, session }: { children: ReactNode, session: SessionType }) => {
    return (
      <div className={`flip-card-front session-item shadow  ${session.isCanceled && "canceled hide"} ${session.isIrregular && "irregular"}`}
        title={`${session.isIrregular ? "نوبت بدون قاعده" : "نوبت"}`}>
        {children}
      </div>

    )
  }
  const TimeIndicator = ({ session }: { session: SessionType }) => {
    return (
      <>
        <div className="session-time">{e2p(session.time)}</div>
        <div className="session-length">{session.length.toLocaleString('fa-IR')} دقیقه</div></>
    )
  }
  const SessionInfo = ({ session }: { session: SessionType }) => {
    return (
      <>
        <div className="session-name px-2 mb-2 bg-white hover:bg-green-400 rounded " title={`پرونده ${session.client.get_full_name}`}>
          <img src="/user.svg" className="w-[10px] ml-2" />
          {session.client.get_full_name}
        </div>
        <div className="session-therapist" title={`نام کامل مشاور: ${session.therapist.name}`}>
          {session.therapist.name}
        </div>
        <div className="session-phone-number" title="شماره تماس مراجع">۰{e2p(String(session.client.profile.phone))}
        </div>
        <div className="session-therapy-type" title="نوع مشاوره">
          {session.get_type_display}
        </div></>
    )
  }
  const Indicator = (
    { type, id, className, title, selectHandler, icon, offIcon, isSelected, selectedClass, whiteOffIcon = false }:
      {
        type: string;
        id: number;
        className: string;
        title: string;
        selectHandler: () => void,
        icon: string;
        offIcon?: string;
        isSelected: boolean;
        selectedClass: string;
        whiteOffIcon?: boolean;
      }
  ) => {
    return (
      <div className={`${className} ${isSelected && selectedClass}`} id={`${type}-${session.id}`}
        title={title} onClick={selectHandler}>
        <img src={(offIcon && !isSelected) ? offIcon : icon} className={isSelected ? "" : (whiteOffIcon ? "svg-white" : "")} />
      </div>
    )
  }

  const PaymentIndicator = ({ session }: { session: SessionType }) => {
    return (
      <div className="payment-amount" style={{gridColumn: '2/8', gridRow: '8/9', display: 'flex'}}>
        <Indicator title="پیش‌پرداخت انجام شده؟" className="session-paid" type="payment-icon" id={session.id} selectedClass="is-paid" icon="/currency-dollar.svg" selectHandler={() => ""} isSelected={session.isPaid} whiteOffIcon={true} />
        <span style={{marginRight: '4px' }}>پیش‌پرداخت: {session.payment.toLocaleString('fa-IR')} تومان</span>
      </div>
    )
  }

  const CardBack = ({ children }: { children: ReactNode }) => {
    return (
      <div className="flip-card-back session-item">
        {children}
      </div>
    )
  }

  const [flip, setFlip] = useState(false)
  const style = start ? {gridColumn: `${session.room*2}/${session.room*2 + 1}`, gridRow: `${(timeStringToDecimal(session.time) - start + 1)* 2}/${(timeStringToDecimal(session.time) - start + (session.length/30) + 1)* 2 + 1}` } : {}

  return (
    <div className={`m-2 flip-card text-black max-w-[380px] ${session.isCanceled && "canceled hide"}`} style={style}>
      <div className={`flip-card-inner ${flip && "flip"}`} id={`inner${session.id}`}>
        <CardFront session={session}>
          <TimeIndicator session={session} />
          <SessionInfo session={session} />
          <Indicator title="یادداشت و آخرین تغییرات" className="session-edit" type="payment-icon" id={session.id} selectedClass="" icon="/pencil.svg" selectHandler={() => setFlip(!flip)} isSelected={session.isPaid} whiteOffIcon={true} />
          <PaymentIndicator session={session} />
        </CardFront>
        <CardBack>
          <textarea id={`session-text-${session.id}`} className="session-note" defaultValue={session.note} />
          <Indicator title="ثبت متن جدید" className="session-submit-text" type="session-edit" id={session.id} selectedClass="" icon={checkIcon} selectHandler={() => ""} isSelected={session.isPaid} whiteOffIcon={true} />
          <Indicator title="بازگشت" className="session-flip-back" type="session-back" id={session.id} selectedClass="" icon={arrow90rightIcon} selectHandler={() => setFlip(!flip)} isSelected={session.isPaid} whiteOffIcon={true} />
          <Indicator title="پیش‌پرداخت انجام شده؟" className="session-paid" type="payment-icon" id={session.id} selectedClass="is-paid" icon={dollarIcon} selectHandler={() => ""} isSelected={session.isPaid} whiteOffIcon={true} />
          <Indicator title="نوبت آنلاین است؟" className="session-online" type="type-container" id={session.id} selectedClass="is-online" icon={cameraOnIcon} offIcon={cameraOffIcon} selectHandler={() => ""} isSelected={session.isOnline} />
          <Indicator title="نوبت نیازمند اتاقی در مرکز است؟" className="session-room" type="room-container" id={session.id} selectedClass="has-room" icon={houseCheckIcon} offIcon={houseSlashIcon} selectHandler={() => ""} isSelected={session.needRoom} />
          <Indicator title="لغو نوبت" className="session-cancel" type="cancel-container" id={session.id} selectedClass="" icon={xLgIcon} selectHandler={() => ""} isSelected={true} />
          <Indicator title={`لینک پیش‌پرداخت:  mnka.ir/s/${session.id}`} className="session-payment-link" type="link-container" id={session.id} selectedClass="" icon={chain45Icon} selectHandler={() => { navigator.clipboard.writeText(`http:// mnka.ir/s/${session.id}`); alert('لینک پیش پرداخت کپی شد. می‌توانید لینک را در نرم‌افزار مورد نظر خود ارسال کنید.') }} isSelected={true} />
          <div className="session-last-modified-by" title="چه کسی آخرین تغییر را در این نوبت ثبت کرده است؟">
            آخرین تغییر توسط:
            {session.last_modified_by?.get_full_name ?? "مراجع"}
          </div>
        </CardBack>
      </div>
    </div >
  )

}