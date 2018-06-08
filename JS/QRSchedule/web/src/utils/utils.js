import moment from 'moment'

const url_prefix = "https://know.herzen.spb.ru/api";

const now = moment().format("HH:mm");

const week = "Пн_Вт_Ср_Чт_Пт_Сб_Вс".split("_");

const months = "Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь".split("_");

const b2i = (id) => {
	/*
	 * Base64 to Int
	 * ex.: id = Rooms:1
	 */
	return parseInt(
			Buffer.from(id, 'base64')
				.toString('ascii')
				.split(":")[1], 10
	)
}

const get_week_array = () => {
	/*
	* Creates array of dates of current week days
	*/
	let days = [];
	let startOfWeek = moment().startOf('isoWeek');
	let endOfWeek = moment().endOf('isoWeek');
	let day = startOfWeek;

	while (day <= endOfWeek) {
		days.push(day.format("YYYY-MM-DD"));
		day = day.clone().add(1, 'd');
	}

	return days
};

const upper_lower = (cur_week = null) => {
	/*
	* Counting upper and lower/ odd and even weeks.
	*/

	moment().locale("ru");

	const now = moment();

	if (!cur_week) {
		cur_week = moment(now.format("YYYY-MM-DD")).week();
	}

	const summerHolidaysWeek = moment(now.year() + '07' + '01').week();
	const firstSemesterWeek = moment(now.year() + '09' + '01').week();
	const secondSemesterWeek = moment(now.year() + '01' + '01').week();

	if (cur_week >= firstSemesterWeek) {
		let weeksDelta = cur_week - firstSemesterWeek;
		if (weeksDelta % 2 === 0) {
			return 'верхняя'
		} else {
			return 'нижняя'
		}
	} else if ((cur_week >= secondSemesterWeek) && (cur_week <= summerHolidaysWeek)) {
		let weeksDelta = cur_week - secondSemesterWeek;
		if (weeksDelta % 2 === 0) {
			return 'верхняя'
		} else {
			return 'нижняя'
		}
	} else {
		return null;
	}
};

export {get_week_array, upper_lower, week, months, now, url_prefix, b2i}
