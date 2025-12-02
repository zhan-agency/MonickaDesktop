import { JalaliMonthInfoType, JalaliMonthType } from "@/type/monicka";

const MonthSelectorButtons = ({ month1, month2, setSelectedMonth, selectedMonth }: { month1: JalaliMonthInfoType; month2: JalaliMonthInfoType; setSelectedMonth: (month: JalaliMonthInfoType) => void; selectedMonth: JalaliMonthInfoType; }) => {
	const Button = ({ month, selectedMonth, setSelectedMonth, first }: { month: JalaliMonthType, selectedMonth: JalaliMonthInfoType, setSelectedMonth: (month: JalaliMonthInfoType) => void; first: boolean }) => {
		return (
			<div id="month_button1" className={`month-label text-center ${selectedMonth.name == month.name && "selected"}`} style={first ? { gridColumn: "1/4" } : { gridColumn: "5/8" }}
				onClick={() => setSelectedMonth(first ? month1 : month2)}>
				{month.name} ماه
			</div>
		)
	}
	return (
		<>
			<Button month={month1} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} first={true} />
			<Button month={month2} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} first={false} />
		</>
	)
}

export default MonthSelectorButtons;