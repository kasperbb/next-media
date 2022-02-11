import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'

import moment from 'moment'
import { useState } from 'react'

export default function CalendarPage() {
	const [momentObj, setMomentObj] = useState(moment())
	const [currentDay] = useState(+momentObj.format('D'))
	const [currentMonth] = useState(new Date().getMonth())

	const weekDays = moment.weekdaysShort()

	const getFirstDayOfMonth = () => {
		return +moment(momentObj).startOf('month').format('d')
	}

	const getDaysInMonth = () => {
		return +moment(momentObj).daysInMonth()
	}

	const getCurrentMonthIndex = () => {
		return +momentObj.format('M') - 1
	}

	const setMonth = (index: number) => {
		let dateObject = Object.assign({}, momentObj)
		dateObject = moment(dateObject).set('month', index)
		setMomentObj(dateObject)
	}

	const weekDaysNames = weekDays.map(day => (
		<th key={day} className="p-3 font-medium border">
			{day}
		</th>
	))

	const blanks = Array.from({ length: getFirstDayOfMonth() }, (_, i) => i).map(_ => <td className="p-3 font-medium border bg-gray-50"></td>)

	const daysInMonth = Array.from({ length: getDaysInMonth() }, (_, i) => i + 1).map(el => (
		<td
			key={el}
			className={`p-3 font-medium text-center border ${el === currentDay && getCurrentMonthIndex() === currentMonth ? 'bg-accent text-white' : ''}`}
		>
			{el}
		</td>
	))

	const totalSlots = [...blanks, ...daysInMonth]
	const rows: any[] = []
	let cells: any[] = []

	totalSlots.forEach((row, i) => {
		if (i % 7 !== 0) {
			cells.push(row)
		} else {
			rows.push(cells)
			cells = []
			cells.push(row)
		}
		if (i === totalSlots.length - 1) {
			rows.push(cells)
		}
	})

	let tableBody = rows.map(day => {
		return <tr>{day}</tr>
	})

	return (
		<div className="max-w-6xl px-10 mx-auto my-20">
			<div className="flex items-center justify-between mb-5">
				<h1 className="text-3xl font-heading">
					{momentObj.format('MMMM')} {momentObj.format('YYYY')}
				</h1>

				<div className="flex gap-2">
					<button
						className="p-2 text-gray-500 border rounded hover:bg-gray-50"
						onClick={() => {
							setMonth(getCurrentMonthIndex() - 1)
						}}
					>
						<ArrowLeftIcon className="w-4 h-4" />
					</button>
					<button
						className="p-2 text-gray-500 border rounded hover:bg-gray-50"
						onClick={() => {
							setMonth(getCurrentMonthIndex() + 1)
						}}
					>
						<ArrowRightIcon className="w-4 h-4" />
					</button>
				</div>
			</div>
			<table className="w-full">
				<thead>
					<tr>{weekDaysNames}</tr>
				</thead>
				<tbody>{tableBody}</tbody>
			</table>
		</div>
	)
}
