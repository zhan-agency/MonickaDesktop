import CalendarPanel from "@/components/Calendar/CalendarPanel";
import { TimeType, UserType } from "@/type/monicka";

export default function Calendar({user}: {user: UserType}) {
  const props: {
    holidays: string[]
    times: TimeType[]
    user: UserType,
  } = {
    holidays: [],
    times: [],
    user: user,
  }
  return (
    <main id="main" className="w3-main-padding px-16">
      <CalendarPanel {...props} />
    </main>
  )
}