(function () {

  // model
	function Model() {
		this.data = [
			"Прочитать учебную литературу",
			"Пересчитать затраты на ремонт",
			"Пробежка вдоль канала",
			"Поработать над проектом"
		]
	};
  // model
  
  // view
	function View() {
    this.myNodelist = document.getElementsByTagName("li");
    this.close = document.getElementsByClassName("close");
    this.edit = document.getElementsByClassName('edit');
    this.list = document.getElementById('myUL');
		this.addBtn = document.getElementById("addBtn");
		this.myInput = document.getElementById("myInput");
		
		this.addList = (data) => {
			this.list.innerHTML = "";
			data.forEach((item, i) => {
				const li = document.createElement("li");
				let value = document.createElement("span");
				value.innerHTML = item;
				value.className = "value";

				const spanEdit = document.createElement("span");
				spanEdit.innerHTML = "&#9997;";
				spanEdit.className = "edit";
				spanEdit.setAttribute("item_id", i)

				const spanDel = document.createElement("span");
				spanDel.innerHTML = "&#10006;";
				spanDel.className = "close";
				spanDel.setAttribute("item_id", i)

				li.appendChild(value);
				li.appendChild(spanEdit);
				li.appendChild(spanDel);
				this.list.appendChild(li);
			});
		}
	};
  // view
  
  // controller
	function Controller(model, view) {
		this.view = view;
    this.model = model;

    // Создаем новый LI в списке после нажатия кнопки "Добавить"
    let newElement = () => {
			if (this.view.myInput.value === '') {
				alert("Необходимо заполнить поле!");
			} else {
				this.model.data.push(this.view.myInput.value);
				this.view.addList(this.model.data);
			}
		}
		
		this.view.list.addEventListener('click', (evt) => {
			evt = evt || window.event;
			evt = evt.target || evt.srcElement;
			if (evt.classList.contains("close")) {
				this.model.data.splice(evt.getAttribute("item_id"), 1);
				this.view.addList(this.model.data);
			};
			if (evt.classList.contains("edit")) {
				this.view.myInput.value = this.model.data[evt.getAttribute("item_id")];
				this.model.data.splice(evt.getAttribute("item_id"), 1);
				this.view.addList(this.model.data);
			};
			if (evt.classList.contains("value")) {
				evt.parentElement.classList.toggle('checked');
			};
			if (evt.nodeName === "LI") {
				evt.classList.toggle('checked');
			};
		})

		this.view.addList(this.model.data);
    this.view.addBtn.addEventListener('click', newElement)
	}
  // controller
  
  const toDoList = {
		init: function () {
			model = new Model();
			view = new View();
			controller = new Controller(model, view);
		}
	}

	toDoList.init();
})();
