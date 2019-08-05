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
		this.workMin = 5;
		this.breakMin = 5;
		this.remaining = 0;
		this.isBreak = true;
		this.isPaused = true;
		this.time;
	};

	function View() {
		const timerDisplay = document.querySelector('.timerDisplay');
		const workMin = document.getElementById('work-min');
		const breakMin = document.getElementById('break-min');
		const alarm = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

		this.render = function (model) {
			timerDisplay.innerHTML = (model.sec < 10) ? `${model.workMin}:0${model.sec}` : `${model.workMin}:${model.sec}`;
			if (model.workMin <= 0 && model.sec <= 0) {
					alarm.play();
			}
		}

		this
	};

	function Controller(model, view) {
		this.view = view;
		this.model = model;
		this.view.render(this.model);
		let timer = setInterval(() => {
			if (this.model.sec === 0) {
				this.model.sec = 60;
				this.model.workMin--;
			}
			this.model.sec--;
			this.view.render(this.model);
			if (this.model.workMin <= 0 && this.model.sec <= 0) {
				clearInterval(timer);
			}
		}, 100);
	}

	var timerApp = {
		init: function () {
			model = new Model();
			view = new View();
			controller = new Controller(model, view);
		}
	}

	timerApp.init();
})();