let fadeInTop = (el) => {
	el.classList.add("fade-in-top");
	el.classList.remove("fade-out-base");
  };
  
  let fadeOutTop = (el) => {
	el.classList.add("fade-out-top");
	el.classList.remove("fade-in-base");
  };
  
  let fadeInBottom = (el) => {
	el.classList.add("fade-in-bottom");
	el.classList.remove("fade-out-base");
  };
  
  let fadeOutBottom = (el) => {
	el.classList.add("fade-out-bottom");
	el.classList.remove("fade-in-base");
  };
  
  let fadeInRight = (el) => {
	el.classList.add("fade-in-right");
	el.classList.remove("fade-out-base");
  };
  
  let fadeOutRight = (el) => {
	el.classList.add("fade-out-right");
	el.classList.remove("fade-in-base");
  };
  
  let fadeInLeft = (el) => {
	el.classList.add("fade-in-left");
	el.classList.remove("fade-out-base");
  };
  
  let fadeOutLeft = (el) => {
	el.classList.add("fade-out-left");
	el.classList.remove("fade-in-base");
  };
  
  let fadeInBorder = (el) => {
	el.classList.add("fade-in-border");
	el.classList.remove("fade-out-border");
  };
  
  let fadeOutBorder = (el) => {
	el.classList.add("fade-out-left");
	el.classList.remove("fade-in-base");
  };
  
  let drawLine = (el) => {
	el.classList.add("draw-line-end");
	el.classList.remove("draw-line-start");
  };
  
  let removeLine = (el) => {
	el.classList.add("draw-line-start");
	el.classList.remove("draw-line-end");
  };
  
  let fadeInBase = (el) => {
	el.classList.add("fade-in-base");
	el.className = [...el.classList]
	  .filter((i) => i.search(/^fade-out/) == -1)
	  .join(" ");
  };
  
  let fadeOutBase = (el) => {
	el.classList.add("fade-out-base");
	el.className = [...el.classList]
	  .filter((i) => i.search(/^fade-in/) == -1)
	  .join(" ");
  };
  
  let fadeContainer = document.querySelectorAll("[data-fade-container]");
  let scrollIn = [...document.querySelectorAll("[data-scroll]")];
  
  const fadeFinder = (el) => {
	switch (el.dataset.fadeIn) {
	  case "left":
		fadeOutLeft(el);
		break;
	  case "right":
		fadeOutRight(el);
		break;
	  case "top":
		fadeOutTop(el);
		break;
	  case "bottom":
		fadeOutBottom(el);
		break;
	  case "border":
		fadeOutBorder(el);
		break;
	}
  };
  
  let scrollFade = (el) => {
	let offset = (el.dataset.scroll || 20) / 100;
	let size = el.getBoundingClientRect(),
	  bottom = size.bottom - window.innerHeight * offset > 0,
	  top = size.top - window.innerHeight * (1 - offset) < 0;
	top && bottom ? fadeInBase(el) : fadeFinder(el);
  };
  
  const animations = () => {
	let hoverSwitch = [];
	if (window.innerWidth > 721) {
	  for (let i = 0; i < fadeContainer.length; i++) {
		switch (fadeContainer[i].dataset.fadeContainer) {
		  case "hover": {
			fadeContainer[i].onmouseover = () => {
			  [...fadeContainer[i].querySelectorAll("[data-fade-in]")].map((el) => fadeInBase(el));
			  [...fadeContainer[i].querySelectorAll("[data-line-animation]")].map((el) => drawLine(el));
			};
			fadeContainer[i].onmouseleave = () => {
			  [...fadeContainer[i].querySelectorAll("[data-fade-in]")].map((el) => fadeFinder(el));
			  [...fadeContainer[i].querySelectorAll("[data-line-animation]")].map((el) => removeLine(el));
			};
			break;
		  }
  
		  case "hover stay": {
			hoverSwitch.push(fadeContainer[i]);
			break;
		  }
  
		  case "click": {
			let clickItems = [
			  ...fadeContainer[i].querySelectorAll("[data-position]")
			];
			let buttons = [...fadeContainer[i].querySelectorAll("[data-button]")];
			let positionMap = [];
  
			clickItems.map((el) => {
			  let a = el.dataset.position.split(" ");
			  positionMap.push(a);
			  if (a.indexOf("1") !== -1) {
				fadeInBase(el);
			  }
			});
  
			buttons.map((btn) => {
			  btn.onclick = (el) => {
				for (let i = 0; i < clickItems.length; i++) {
				  positionMap[i].indexOf(el.target.value) != -1) ? fadeInBase(clickItems[i]) : fadeFinder(clickItems[i]);
				}
			  };
			});
			break;
		  }
		}
	  }
	  
	  if (hoverSwitch[0]) {
		[...hoverSwitch[0].querySelectorAll("[data-fade-in]")].map((el) => fadeInBase(el));
		[...hoverSwitch[0].querySelectorAll("[data-line-animation]")].map((el) => drawLine(el));
	  }
	  for (let i = 0; i < hoverSwitch.length; i++) {
		hoverSwitch[i].onmouseover = () => {
		  hoverSwitch.forEach((e) => {
			if (hoverSwitch[i] == e) {
			  [...e.querySelectorAll("[data-fade-in]")].map((el) => fadeInBase(el));
			  [...e.querySelectorAll("[data-line-animation]")].map((el) => drawLine(el));
			} else {
			  [...e.querySelectorAll("[data-fade-in]")].map((el) => fadeFinder(el));
			  [...e.querySelectorAll("[data-line-animation]")].map((el) => removeLine(el));
			}
		  });
		};
	  }
	}
	scrollIn.map((el) => {
	  scrollFade(el);
	  window.onscroll = () => {
		window.ThemeUtils.debounce(scrollFade(el));
	  };
	});
  };
  
  animations();
  