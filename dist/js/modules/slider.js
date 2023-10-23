function slider({
	container,
	slide,
	nextArrow,
	prevArrow,
	totalCounter,
	currentCounter,
	wrapper,
	field,
}) {
	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container),
		prev = document.querySelector(prevArrow),
		next = document.querySelector(nextArrow),
		total = document.querySelector(totalCounter),
		current = document.querySelector(currentCounter),
		slidesWrapper = document.querySelector(wrapper),
		width = window.getComputedStyle(slidesWrapper).width,
		slidsField = document.querySelector(field);

	let touchStartX = 0;
	let touchEndX = 0;
	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidsField.style.width = 100 * slides.length + "%";
	slidsField.style.display = "flex";
	slidsField.style.transition = "0.5s all";

	slidesWrapper.style.overflow = "hidden";

	slides.forEach((slide) => {
		slide.style.width = width;
	});

	slidesWrapper.addEventListener("touchstart", (e) => {
		touchStartX = e.touches[0].clientX;
	});

	slidesWrapper.addEventListener("touchmove", (e) => {
		touchEndX = e.touches[0].clientX;
	});

	slidesWrapper.addEventListener("touchend", () => {
		const deltaX = touchEndX - touchStartX;

		if (deltaX > 50) {
			prev.click();
		} else if (deltaX < -50) {
			next.click();
		}
	});

	// Создание точек для слайдера

	slider.style.position = "relative";

	const indicators = document.createElement("ol"),
		points = [];
	indicators.classList.add("carousel-indicators");
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;

	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const point = document.createElement("li");
		point.setAttribute("data-slide-to", i + 1);
		point.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;

		if (i == 0) {
			point.style.opacity = 1;
		}
		indicators.append(point);
		points.push(point);
	}

	function pointActive(index) {
		points.forEach((point) => {
			point.style.opacity = ".5";
		});
		points[index - 1].style.opacity = 1;
	}

	function currentSlideCount(index) {
		if (slides.length < 10) {
			current.textContent = `0${index}`;
		} else {
			current.textContent = index;
		}
	}

	function strToNumber(str) {
		return +str.replace(/\D/g, "");
	}

	next.addEventListener("click", () => {
		if (offset == strToNumber(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += strToNumber(width);
		}
		slidsField.style.transform = `translateX(${-offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex += 1;
		}

		currentSlideCount(slideIndex);

		pointActive(slideIndex);
	});

	prev.addEventListener("click", () => {
		if (offset == 0) {
			offset = strToNumber(width) * (slides.length - 1);
		} else {
			offset -= strToNumber(width);
		}
		slidsField.style.transform = `translateX(${-offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex -= 1;
		}

		currentSlideCount(slideIndex);

		pointActive(slideIndex);
	});

	points.forEach((point) => {
		point.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute("data-slide-to");

			slideIndex = slideTo;
			offset = strToNumber(width) * (slideTo - 1);

			slidsField.style.transform = `translateX(${-offset}px)`;

			currentSlideCount(slideIndex);

			pointActive(slideIndex);
		});
	});
}

export default slider;
