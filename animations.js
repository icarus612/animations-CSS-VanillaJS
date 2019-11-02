let fadeInTop = (el) => {
	el.classList.add("fade-in-top");
	el.classList.remove("fade-out-base");
}

let fadeOutTop = (el) => {
	el.classList.add("fade-out-top");
	el.classList.remove("fade-in-base");
}

let fadeInBottom = (el) => {
	el.classList.add("fade-in-bottom");
	el.classList.remove("fade-out-base");
}

let fadeOutBottom = (el) => {
	el.classList.add("fade-out-bottom");
	el.classList.remove("fade-in-base");
}

let fadeInRight = (el) => {
	el.classList.add("fade-in-right");
	el.classList.remove("fade-out-base");
}

let fadeOutRight = (el) => {
	el.classList.add("fade-out-right");
	el.classList.remove("fade-in-base");
}

let fadeInLeft = (el) => {
	el.classList.add("fade-in-left");
	el.classList.remove("fade-out-base");
}

let fadeOutLeft = (el) => {
	el.classList.add("fade-out-left");
	el.classList.remove("fade-in-base");
}

let drawLine = (el) => {
	el.classList.add("draw-line-end");
	el.classList.remove("draw-line-start");
}

let removeLine = (el) => {
	el.classList.add("draw-line-start");
	el.classList.remove("draw-line-end");
}

let fadeInBase = (el) => {
	el.classList.add("fade-in-base");
	el.className = [... el.classList].filter((i)=>  i.search(/fade-out/) == -1).join(" ");
}

let fadeOutBase = (el) => {
	el.classList.add("fade-out-base");
	el.className = [... el.classList].filter((i)=>  i.search(/fade-in/) == -1).join(" ");
}

if (document.querySelector("[data-fade-container]")) {
	let fadeContainer = document.querySelectorAll("[data-fade-container]");
	for (let i = 0; i < fadeContainer.length; i++) {
		switch(fadeContainer[i].dataset.fadeContainer) {
			case "hover":
				fadeContainer[i].onmouseover = () => {
					[... fadeContainer[i].querySelectorAll("[data-fade-in]")].map((el)=> fadeInBase(el));
					[... fadeContainer[i].querySelectorAll("[data-line-animation]")].map((el)=> drawLine(el));
				}
				fadeContainer[i].onmouseleave = () => {
					[... fadeContainer[i].querySelectorAll("[data-fade-in='top']")].map((el)=> fadeOutTop(el));
					[... fadeContainer[i].querySelectorAll("[data-fade-in='bottom']")].map((el)=> fadeOutBottom(el));
					[... fadeContainer[i].querySelectorAll("[data-fade-in='left']")].map((el)=> fadeOutLeft(el));
					[... fadeContainer[i].querySelectorAll("[data-fade-in='right']")].map((el)=> fadeOutRight(el));
					[... fadeContainer[i].querySelectorAll("[data-line-animation]")].map((el)=> removeLine(el));
				}
				break;
		}
	}
}
