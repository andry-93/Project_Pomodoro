(function () {

	// model
	function Model() {
		this.changeListener = null;
		this.workMin = 25;
		this.breakMin = 5;
		this.isBreak = false;
		this.isPaused = true;
		this.time;
		this.alarm = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");
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
		this.resetBtn = document.getElementById('reset');

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
		let min = this.model.isBreak ? this.model.breakMin : this.model.workMin;
		let sec = 0;

		this.view.showWorkMin(this.model)
		this.view.showBreakMin(this.model)
		this.view.showTimer(min, sec);
		
		let timerCalc = () => {
			this.view.showTimer(min, sec);
			if (sec === 0) {
				sec = 60;
				min--;
			}
			sec--;
			if (min >= 0 && sec >= 0) {
				timer = setTimeout(timerCalc, 1000);
			} else {
				this.model.alarm.currentTime = 0;
        this.model.alarm.play();
				this.model.isBreak = !this.model.isBreak;
				min = this.model.isBreak ? this.model.breakMin : this.model.workMin;
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
			if (this.model.workMin < 60) {
				this.model.workMin += 5;
				if (!this.model.isBreak) {
					min = this.model.workMin;
					sec = 0;
					this.view.showTimer(min, sec);
				}
				this.view.showWorkMin(this.model);
			}
		});

		this.view.workMinus.addEventListener('click', () => {
			if (this.model.workMin > 5) {
				this.model.workMin -= 5;
				if (!this.model.isBreak) {
					min = this.model.workMin;
					sec = 0;
					this.view.showTimer(min, sec);
				}
				this.view.showWorkMin(this.model);
			}
		});

		this.view.breakPlus.addEventListener('click', () => {
			if (this.model.breakMin < 60) {
				this.model.breakMin += 5;
				if (this.model.isBreak) {
					min = this.model.breakMin
					sec = 0;
					this.view.showTimer(min, sec);
				}
				this.view.showBreakMin(this.model);
			}
		});

		this.view.breakMinus.addEventListener('click', () => {
			if (this.model.breakMin > 5) {
				this.model.breakMin -= 5;
				if (this.model.isBreak) {
					min = this.model.breakMin
					sec = 0;
					this.view.showTimer(min, sec);
				}
				this.view.showBreakMin(this.model);
			}
		});

		this.view.resetBtn.addEventListener('click', () => {
			clearTimeout(timer);
      this.model.isPaused = true;
			this.model.isBreak = false;
			min = this.model.isBreak ? this.model.breakMin : this.model.workMin;
			sec = 0;
			this.view.showWorkMin(this.model)
			this.view.showBreakMin(this.model)
			this.view.showTimer(min, sec);
			this.view.showTimer(min, sec);
			this.view.modButton(this.model);
		});
	}
	// controller

	const timerApp = {
		init: function () {
			model = new Model();
			view = new View();
			controller = new Controller(model, view);
		}
	}

	timerApp.init();
})();