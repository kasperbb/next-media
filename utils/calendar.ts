import moment from 'moment'

export const getFirstDayOfMonth = (momentObj: moment.Moment) => {
	return +moment(momentObj).startOf('month').format('d')
}

export const getDaysInMonth = (momentObj: moment.Moment) => {
	return +moment(momentObj).daysInMonth()
}

export const getCurrentMonth = (momentObj: moment.Moment) => {
	return +momentObj.format('M')
}

export const getCurrentYear = (momentObj: moment.Moment) => {
	return +momentObj.format('YYYY')
}

export const getCurrentMonthIndex = (momentObj: moment.Moment) => {
	return getCurrentMonth(momentObj) - 1
}
