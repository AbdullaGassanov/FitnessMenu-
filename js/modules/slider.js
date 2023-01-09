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
	///slider

	let slideIndex = 1;
	let offSet = 0;

	fetch("http://localhost:3000/menu").then((data) => data.json());

	const slides = document.querySelectorAll(slide),
		slider = document.querySelector(container),
		prev = document.querySelector(prevArrow),
		next = document.querySelector(nextArrow),
		total = document.querySelector(totalCounter),
		current = document.querySelector(currentCounter),
		slidesWrapper = document.querySelector(wrapper),
		width = window.getComputedStyle(slidesWrapper).width,
		slidesField = document.querySelector(field);

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = `${slides.length}`;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + "%";
	slidesField.style.display = "flex";
	slidesField.style.transition = "0.5s all";

	slidesWrapper.style.overflow = "hidden";

	slides.forEach((slide) => {
		slide.style.width = width;
	});

	slider.style.position = "relative";

	const indicators = document.createElement("ol"),
		dots = [];
	indicators.classList.add("carousel-indicators");
	indicators.style.cssText = `position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 15;
	display: flex;
	justify-content: center;
	margin-right: 15%;
	margin-left: 15%;
	list-style: none;`;

	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement("li");
		dot.setAttribute("data-slide-to", i + 1);
		dot.style.cssText = `box-sizing: content-box;
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
	opacity: 0.5;
	transition: opacity 0.6s ease;`;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	next.addEventListener("click", () => {
		console.log("clicked");
		if (offSet == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offSet = 0;
		} else {
			offSet += +width.slice(0, width.length - 2);
		}
		slidesField.style.transform = `translateX(-${offSet}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex++;
		}

		dots.forEach((dot) => (dot.style.opacity = ".5"));
		dots[slideIndex - 1].style.opacity = "1";
	});

	prev.addEventListener("click", () => {
		if (offSet == 0) {
			offSet = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offSet -= +width.slice(0, width.length - 2);
		}
		slidesField.style.transform = `translateX(-${offSet}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex++;
		}

		dots.forEach((dot) => (dot.style.opacity = ".5"));
		dots[slideIndex - 1].style.opacity = "1";
	});

	dots.forEach((dot) => {
		dot.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute("data-slide-to");

			slideIndex = slideTo;
			offSet = +width.slice(0, width.length - 2) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offSet}px)`;

			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dots.forEach((dot) => (dot.style.opacity = ".5"));
			dots[slideIndex - 1].style.opacity = "1";
		});
	});
}

export default slider;
