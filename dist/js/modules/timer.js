function timer(id) {
	function getGenitiveMonthName(month) {
		const genitiveMonths = [
			"января",
			"февраля",
			"марта",
			"апреля",
			"мая",
			"июня",
			"июля",
			"августа",
			"сентября",
			"октября",
			"ноября",
			"декабря",
		];

		if (month >= 1 && month <= 12) {
			return genitiveMonths[month - 1];
		} else {
			throw new Error("Неверный номер месяца");
		}
	}

	const deadlineDate = document.querySelectorAll(".promotion__descr p"),
		day = getCurrentTime().getDate() + 2,
		month = getGenitiveMonthName(getCurrentTime().getMonth() + 1);

	deadlineDate.forEach((p) => {
		p.innerHTML = `Акция закончится ${day} ${month} в 00:00`;
	});

	/* Timer */

	function getCurrentTime() {
		return new Date();
	}

	// Установка дедлайна на 00:00 через два дня
	function setDeadline() {
		const currentTime = getCurrentTime();
		const year = currentTime.getFullYear();
		const month = currentTime.getMonth();
		const day = currentTime.getDate() + 2; // Добавляем два дня
		const deadlineDate = new Date(year, month, day, 0, 0, 0); // Устанавливаем на 00:00
		return deadlineDate;
	}

	const deadline = setDeadline();

	// const moscowTimezoneOffset = 3 * 60 * 60 * 1000;
	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());
		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			(days = Math.floor(t / (1000 * 60 * 60 * 24))),
				(hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
				(minutes = Math.floor((t / 1000 / 60) % 60)),
				(seconds = Math.floor((t / 1000) % 60));
		}
		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock(id, deadline);
}

export default timer;
