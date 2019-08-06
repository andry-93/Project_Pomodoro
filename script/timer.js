// // Описываем работу таймера Pomodoro
//     var seconds = 0;
//     var remaining = 0;
//     var isBreak = true;
//     var isPaused = true;
//     var time;

//     const timerDisplay = document.querySelector('.timerDisplay');
//     const startBtn = document.getElementById('start-btn');
//     const resetBtn = document.getElementById('reset');
//     const workMin = document.getElementById('work-min');
//     const breakMin = document.getElementById('break-min');
//     const alarm = document.createElement('audio');
//     alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
//     const workPlus = document.getElementById('work-plus');
//     const workMinus = document.getElementById('work-minus');
//     const breakPlus = document.getElementById('break-plus');
//     const breakMinus = document.getElementById('break-minus');


//     // EventListener вешаем на кнопку, запускающую таймер 
//     startBtn.addEventListener('click', function() {
//       clearInterval(time);
//       if (isPaused) { // если таймер на паузе, то запускаем его
//         startCountdown();
//         startBtn.innerHTML = "Стоп"; // меняем текст кнопки
//         isPaused = false; // устанавливаем флаг
//       } else {
//         remaining = seconds; // запоминаем время и останавливаем таймер
//         startBtn.innerHTML = "Продолжить";
//         isPaused = true;
//       }
//     })
//     // EventListener вешаем на кнопку, обнуляющую таймер
//     resetBtn.addEventListener('click', function(){
//       clearInterval(time);
//       seconds = workMin.innerHTML * 60; // минуты на таймере * 60 = секунды
//       remaining = 0;
//       isPaused = true;
//       isBreak = true;
//       startBtn.textContent = "СТАРТ";
//       displayTimeLeft(seconds);
//     })

//     // функция таймера, уменьшающая секунды
//     function timer() { 
//       seconds --; // уменьшение секунд в таймере
//       if (seconds < 0) {
//         clearInterval(time);
//         alarm.currentTime = 0;
//         alarm.play();

//         if (isBreak) { // меняем таймер на время перерыва
//           timerDisplay.innerHTML = breakMin.innerHTML + ':00';
//           seconds = breakMin.innerHTML * 60;
//           isBreak = false;
//           isPaused = false;
//           time = setInterval(timer, 1000);

//         } else { // меняем
//           seconds = workMin.innerHTML * 60;
//           remaining = 0;
//       isPaused = true;
//       isBreak = true;
//           startBtn.textContent = "СТАРТ";
//         }
//       }
//       displayTimeLeft(seconds); // Отображение цифр в таймере
//     }
//     // получаем сколько времени необходимо отсчитывать таймеру и запускаем сам таймер
//     function startCountdown() {
//       if (remaining != 0) {
//         seconds = remaining;
//       } else {
//         seconds = workMin.innerHTML * 60;
//       }
//       time = setInterval(timer, 1000);
//       return;
//     }
//     // функция отображения таймера
//     function displayTimeLeft(seconds) {
//       var minutes = Math.floor(seconds / 60); 
//       var remaindSeconds = seconds % 60;
//       if (`${remaindSeconds}`< 10) {
//       timerDisplay.innerHTML = `${minutes}:0${remaindSeconds}`;

//       } else {
//       timerDisplay.innerHTML = `${minutes}:${remaindSeconds}`; 
//     }
//   }

//     // кнопки на увеличение и уменьшение времени помодоро
//     workPlus.addEventListener('click', function() {
//       var x = parseInt(workMin.innerHTML);          
//       if (x < 60) {
//         workMin.innerHTML = x+5;
//         timerDisplay.innerHTML = workMin.innerHTML + ':00';
//       }                       
//     })

//     workMinus.addEventListener('click', function() {
//       var x = parseInt(workMin.innerHTML);          
//       if (x > 5 ) {
//         workMin.innerHTML = x-5;
//         timerDisplay.innerHTML = workMin.innerHTML + ':00';
//       }                       
//     })

//     breakPlus.addEventListener('click', function() {
//       var y = parseInt(breakMin.innerHTML);          
//       if (y < 60) {
//         breakMin.innerHTML = y+5;
//         timerDisplay.innerHTML = breakMin.innerHTML + ':00';
//       }                       
//     })

//     breakMinus.addEventListener('click', function() {
//       var y = parseInt(breakMin.innerHTML);          
//       if (y > 5) {
//         breakMin.innerHTML = y-5;
//         timerDisplay.innerHTML = breakMin.innerHTML + ':00';
//       }                       
//     }) 

(function () {

	// model
	function Model() {
		this.changeListener = null;
		this.sec = 0;
		this.workMin = 25;
		this.breakMin = 5;
		this.isBreak = false;
		this.isPaused = true;
		this.time;
	};
	// model

	// view
	function View() {
		const timerDisplay = document.querySelector('.timerDisplay');
		const workMinItem = document.getElementById('work-min');
		const breakMinItem = document.getElementById('break-min');

		this.workPlus = document.getElementById('work-plus');
    this.workMinus = document.getElementById('work-minus');
    this.breakPlus = document.getElementById('break-plus');
    this.breakMinus = document.getElementById('break-minus');
		this.startBtn = document.getElementById('start-btn');

		this.showTimer = (min, sec) => {
			if (sec < 10) {
				timerDisplay.innerHTML = `${min}:0${sec}`;
			}
			else {
				timerDisplay.innerHTML = `${min}:${sec}`;
			}
		}

		this.showWorkMin = (model) => {
			workMinItem.innerHTML = `${model.workMin}`;
		}

		this.showBreakMin = (model) => {
			breakMinItem.innerHTML = `${model.breakMin}`;
		}

		this.modButton = (model) => {
			this.startBtn.innerHTML = (model.isPaused) ? "СТАРТ!" : "СТОП";
		}
	};
	// view

	// controller
	function Controller(model, view) {
		this.view = view;
		this.model = model;
		let timer = null;
		let min = this.model.workMin;
		let sec = this.model.sec;
		this.view.showWorkMin(this.model)
		this.view.showBreakMin(this.model)
		let timerCalc = () => {
			this.view.showTimer(min, sec);
			if (sec === 0) {
				sec = 60;
				min--;
			}
			sec--;
			if (min >= 0 && sec >= 0) {
				timer = setTimeout(timerCalc, 1000);
			}
		};
		
		this.view.startBtn.addEventListener('click', () => {
			clearTimeout(timer);
			if (this.model.isPaused) {
				this.model.isPaused = false;
				timerCalc();
			} else {
				this.model.isPaused = true;
			}
			this.view.modButton(this.model);
		});

		this.view.workPlus.addEventListener('click', () => {
			if (this.model.workMin < 25) {
				this.model.workMin += 5;
				min = this.model.workMin;
				sec = 0;
				this.view.showWorkMin(this.model);
			}
		});

		this.view.workMinus.addEventListener('click', () => {
			if (this.model.workMin > 5) {
				this.model.workMin -= 5;
				min = this.model.workMin;
				sec = 0;
				this.view.showWorkMin(this.model);
			}
		});
	}
	// controller

	var timerApp = {
		init: function () {
			model = new Model();
			view = new View();
			controller = new Controller(model, view);
		}
	}

	timerApp.init();
})();