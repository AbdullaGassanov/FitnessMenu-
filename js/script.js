"use strict";

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
			console.log(` ${target} `);
			tabs.forEach((item, i) => {
				console.log(` ${item} `);
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

	new MenuCard(
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
	).render();

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
		postData(item);
	});

	function postData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const statusMessage = document.createElement("img");
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
			display:block;
			margin: 0 auto;`;
			form.insertAdjacentElement("afterend", statusMessage);

			/* 	fetch("js/server.php", {
				method: "POST",
				headers: { "Conent-type": "application/json" },
			})
				.then((response) => response.json())
				.then((json) => console.log(json)); */

			/* 			const xhr = new XMLHttpRequest();
			xhr.open("POST", "js/server.php"); */

			/* 	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
			 */
			const formData = new FormData(form);

			const object = {};

			formData.forEach(function (value, key) {
				object[key] = value;
			});

			fetch("js/server2.php", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(object),
			})
				.then((data) => data.text())
				.then((data) => {
					console.log(data);
					showThanksModal(message.success);
					form.reset();
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
	})
		.then((response) => response.json())
		.then((json) => console.log(json));
});
