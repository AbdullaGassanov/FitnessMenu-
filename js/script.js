/* "use strict"; */

window.addEventListener("DOMContentLoaded", () => {
	///
	///TABS-CHANGING
	///

	const tabsParent = document.querySelector(".tabheader__items"),
		tabsContent = document.querySelectorAll(".tabcontent"),
		tabs = document.querySelectorAll(".tabheader__item");

	function hideTabContent() {
		tabsContent.forEach((item) => {
			item.style.display = "none";
		});

		tabs.forEach((item) => {
			item.classList.remove("tabheader__item_active");
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].style.display = "block";
		tabs[i].classList.add("tabheader__item_active");
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener("click", (event) => {
		const target = event.target;

		if (target && target.classList.contains("tabheader__item")) {
			/* console.log(` ${target} `); */
			tabs.forEach((item, i) => {
				/* console.log(` ${item} `); */
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	///
	///TIMER
	///
	const deadLine = "2023-03-21";

	function getTimeRemaining(endTime) {
		const t = Date.parse(endTime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

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

	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector("#hours"),
			minutes = timer.querySelector("#minutes"),
			seconds = timer.querySelector("#seconds"),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endTime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock(".timer", deadLine);

	///
	///MODAL-WINDOW
	///

	const btnModal = document.querySelectorAll("[data-modal]");
	const modal = document.querySelector(".modal");
	const dataClose = modal.querySelector("[data-close]");

	function closeModal() {
		modal.classList.remove("show");
		modal.classList.add("hide");
		document.body.style.overflow = "";
	}

	function openModal() {
		modal.classList.add("show");
		modal.classList.remove("hide");

		document.body.style.overflow = "hidden";
	}

	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	btnModal.forEach((btn) => {
		btn.addEventListener("click", openModal);
	});

	dataClose.addEventListener("click", closeModal);

	document.addEventListener("keydown", (e) => {
		if (e.code == "Escape" && modal.classList.contains("show")) {
			closeModal();
		}
	});

	window.addEventListener("scroll", showModalByScroll);

	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			openModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	///
	/// ИСПОЛЬЗОВАНИЕ КЛАССОВ ДЛЯ КАРТОЧЕК
	///

	/* const menuItem = document.querySelectorAll(".menu__item");

	class MenuItem {
		constructor(title, text, price) {
			(this.title = title), (this.text = text), (this.price = price);
		}
	}

	const fitness = new MenuItem(
		`Меню "Фитнес"`,
		`	Меню "Фитнес" - это новый подход к приготовлению блюд: больше
							свежих овощей и фруктов. Продукт активных и здоровых людей. Это
							абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
		`229 грн/день`
	);

	const premium = new MenuItem(
		`Меню “Премиум”`,
		`	В меню “Премиум” мы используем не только красивый дизайн упаковки,
							но и качественное исполнение блюд. Красная рыба, морепродукты,
							фрукты - ресторанное меню без похода в ресторан!`,
		`550 грн/день`
	);

	const simple = new MenuItem(
		` Меню "Постное"`,
		`	Меню “Постное” - это тщательный подбор ингредиентов: полное
							отсутствие продуктов животного происхождения, молоко из миндаля,
							овса, кокоса или гречки, правильное количество белков за счет тофу
							и импортных вегетарианских стейков.!`,
		`430 грн/день`
	);

	const content = [fitness, premium, simple];

	menuItem.forEach((item, index) => {
		item.querySelector(".menu__item-subtitle").innerHTML = content[index].title;
		item.querySelector(".menu__item-descr").innerHTML = content[index].text;
		item.querySelector(".menu__item-total").innerHTML = content[index].price;

		item.querySelector(".menu__item-total").style.fontWeight = "600";
	}); */

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement("div");

			if (this.classes.length <= 0) {
				element.classList.add("menu__item");
			} else {
				this.classes.forEach((className) => element.classList.add(className));
			}
			element.innerHTML = `
				<img src=${this.src} alt=${this.alt} />
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span>грн/день</div>
				</div>
			`;

			this.parent.append(element);
		}
	}

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	/* getResource("http://localhost:3000/menu").then((data) => {
		data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(
				img,
				altimg,
				title,
				descr,
				price,
				".menu .container"
			).render();
		});
	}); */

	axios.get("http://localhost:3000/menu").then((data) => {
		data.data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(
				img,
				altimg,
				title,
				descr,
				price,
				".menu .container"
			).render();
		});
	});

	/* new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		`Меню "Фитнес"`,
		`Меню "Фитнес" - это новый подход к приготовлению блюд: больше
							свежих овощей и фруктов. Продукт активных и здоровых людей. Это
							абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
		9,
		`.menu .container`
	).render();

	new MenuCard(
		"img/tabs/elite.jpg",
		`elite`,
		`Меню “Премиум”`,
		`В меню “Премиум” мы используем не только красивый дизайн упаковки,
							но и качественное исполнение блюд. Красная рыба, морепродукты,
							фрукты - ресторанное меню без похода в ресторан!`,
		11,
		`.menu .container`
	).render();

	new MenuCard(
		"img/tabs/post.jpg",
		"vegy",
		`Меню "Постное"`,
		`Меню “Постное” - это тщательный подбор ингредиентов: полное
							отсутствие продуктов животного происхождения, молоко из миндаля,
							овса, кокоса или гречки, правильное количество белков за счет тофу
							и импортных вегетарианских стейков.!`,
		7,
		`.menu .container`,
		`menu__item`,
		"big",
		`small`
	).render(); */

	///
	///FORMS
	///

	const forms = document.querySelectorAll("form");

	const message = {
		loading: "img/form/spinner.svg",
		success: "Thank you!",
		failure: "Error",
	};

	forms.forEach((item) => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: data,
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const statusMessage = document.createElement("img");
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
			display:block;
			margin: 0 auto;`;
			form.insertAdjacentElement("afterend", statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData("http://localhost:3000/requests", json)
				.then((data) => {
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
				});

			/* const object = {};

			formData.forEach(function (value, key) {
				object[key] = value;
			});

			const json = JSON.stringify(object);

			xhr.send(json);

			xhr.addEventListener("load", () => {
				if (xhr.status === 200) {
					console.log(xhr.response);
					showThanksModal(message.success);
					form.reset();
					statusMessage.remove();
				} else {
					showThanksModal(message.failure);
				}
			}); */
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector(".modal__dialog");
		prevModalDialog.classList.add("hide");
		openModal();

		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");

		thanksModal.innerHTML = `
				<div class="modal__content">
					
						<div data-close class="modal__close">&times;</div>
						<div class="modal__title">
							${message}
						</div>
						
						
					</form>
				</div>
		`;
		document.querySelector(".modal").append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add("show");
			prevModalDialog.classList.add("hide");
			closeModal();
		}, 4000);
	}

	fetch("https://jsonplaceholder.typicode.com/posts", {
		id: "201",
		method: "POST",
		body: JSON.stringify({ name: "Verss" }),
		headers: { "Content-type": "application/json" },
	}).then((response) => response.json());
	/* .then((json) => console.log(json)); */

	fetch("http://localhost:3000/menu").then((data) => data.json());
	/* .then((res) => console.log(res)); */

	const slides = document.querySelectorAll(".offer__slide"),
		slider = document.querySelector(".offer__slider"),
		prev = document.querySelector(".offer__slider-prev"),
		next = document.querySelector(".offer__slider-next"),
		total = document.querySelector("#total"),
		current = document.querySelector("#current"),
		slidesWrapper = document.querySelector(".offer__slider-wrapper"),
		slidesField = document.querySelector(".offer__slider-inner"),
		width = window.getComputedStyle(slidesWrapper).width;
	let slideIndex = 1;
	let offSet = 0;

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
		dot.style.cssText = `	box-sizing: content-box;
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

	/* showSlides(slideIndex);

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
	} else {
		total.textContent = `${slides.length}`;
	}

	function showSlides(n) {
		if (n > slides.length) {
			slideIndex = 1;
		}

		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach((item) => (item.style.display = "none"));

		slides[slideIndex - 1].style.display = "block";

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function plusSlides(n) {
		showSlides((slideIndex += n));
	}

	prev.addEventListener("click", () => {
		plusSlides(-1);
	});

	next.addEventListener("click", () => {
		plusSlides(1);
	}); */

	/* 	offerSliders[0].classList.add("show");

	offerSliders.forEach((slider) => {
		slider.classList.add("hide");
	});

	function changeSliderImg(obj) {
		if (obj.classList.contains("offer__slider-next")) {
			offerSliders[0].classList.toggle("show");
			offerSliders[1].classList.remove("hide");
			offerSliders[1].classList.add("show");
		} else if (obj.classList.contains("offer__slider-prev")) {
			offerSliders[0].classList.toggle("show");
			offerSliders[3].classList.remove("hide");
			offerSliders[3].classList.add("show");
		}
	}

	offerSlider.addEventListener("click", (event) => {
		const target = event.target;

		console.log(target);

		changeSliderImg(target);
	}); */
});
