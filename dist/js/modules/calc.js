function calc() {
	const result = document.querySelector(".calculating__result span");

	let sex = "female",
		height,
		weight,
		age,
		ratio = 1.375;

	if (localStorage.getItem("sex")) {
		sex = localStorage.getItem("sex");
	} else {
		sex = "female";
		localStorage.setItem("sex", "female");
	}

	if (localStorage.getItem("ratio")) {
		ratio = localStorage.getItem("ratio");
	} else {
		ratio = "female";
		localStorage.setItem("ratio", 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((e) => {
			e.classList.remove(activeClass);
			if (e.getAttribute("id") === localStorage.getItem("sex")) {
				e.classList.add(activeClass);
			}
			if (e.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
				e.classList.add(activeClass);
			}
		});
	}

	initLocalSettings("#gender div", "calculating__choose-item_active");
	initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

	function calaTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = "0";
			return;
		}

		if (sex === "female") {
			result.textContent = Math.round(
				// (655.1 + 9.563 * weight + 1.85 * height - 4.676 * age) * ratio,
				(10 * weight + 6.25 * height - 5 * age - 161) * ratio,
			);
		} else {
			result.textContent = Math.round(
				// (66.5 + 13.75 * weight + 5.003 * height - 6.775 * age) * ratio,
				(10 * weight + 6.25 * height - 5 * age + 5) * ratio,
			);
		}
	}

	console.log((10 * 5 + 6.25 * 5 - 5 * 5 + 5) * 1.375);

	calaTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((elem) => {
			elem.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {
					ratio = +e.target.getAttribute("data-ratio");
					localStorage.setItem("ratio", ratio);
				} else {
					sex = e.target.getAttribute("id");
					localStorage.setItem("sex", sex);
				}

				elements.forEach((elem) => {
					elem.classList.remove(activeClass);
				});

				e.target.classList.add(activeClass);

				calaTotal();
			});
		});
	}

	getStaticInformation("#gender div", "calculating__choose-item_active");
	getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener("input", () => {
			if (input.value.match(/\D/g)) {
				input.style.border = "1px solid red";
			} else {
				input.style.border = "none";
			}

			switch (input.getAttribute("id")) {
				case "height":
					height = +input.value;
					break;
				case "weight":
					weight = +input.value;
					break;
				case "age":
					age = +input.value;
					break;
			}

			calaTotal();
		});
	}

	getDynamicInformation("#height");
	getDynamicInformation("#weight");
	getDynamicInformation("#age");
}

export default calc;
