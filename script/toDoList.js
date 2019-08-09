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

    // Создаем кнопку (крестик) для закрытия и располагаем в каждом LI
    this.addClose = () => {
      for (let i = 0; i < this.myNodelist.length; i++) {
        if (this.myNodelist[i].querySelectorAll(".close").length === 0) {
          let span = document.createElement("span");
          span.innerHTML = "&#128465;";
          span.className = "close";
          this.myNodelist[i].appendChild(span);
        }
      }
    }

    // Создаем кнопку (пишущая рука) для исправления и располагаем в каждом LI
    this.addEdit = () => {
      for (let i = 0; i < this.myNodelist.length; i++) {
        if (this.myNodelist[i].querySelectorAll(".edit").length === 0) {
          let spanEdit = document.createElement("span");
          spanEdit.innerHTML = "&#9997;";
          spanEdit.className = "edit";
          this.myNodelist[i].appendChild(spanEdit);
        }
      }
		}
		
		this.addList = (data) => {
			this.list.innerHTML = "";
			data.forEach((item, i) => {
				const li = document.createElement("li");
				let value = document.createElement("span");
				value.innerHTML = item;

				const spanEdit = document.createElement("span");
				spanEdit.innerHTML = "&#9997;";
				spanEdit.className = "edit";
				spanEdit.setAttribute("item_id", i)

				const spanDel = document.createElement("span");
				spanDel.innerHTML = "&#128465;";
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

    // При клике по крестику удаляем текущий LI
    let delLi = function() {
      for (let i = 0; i < this.view.close.length; i++) {
        this.view.close[i].onclick = function() {
          let div = this.parentElement;
          div.remove();
        }
      }
    }

    // При клике на "кор.руку" значение текущего LI переносим в основной INPUT с возможностью исправления, а сам LI удаляем 
    let clickPen = () => {
      for (let k = 0; k < this.view.edit.length; k++) {
        this.view.edit[k].onclick = function(){
          let divEdit = this.parentElement;
          divEdit.style.display = "none";
          let task = this.parentElement.innerHTML.split('<span')[0];
          document.getElementById("myInput").value = task;
        }
      }
    }

    // Добавляем класс "checked" при клике по любому LI (и наоборот)
    let checked = () => {
      this.view.list.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
          e.target.classList.toggle('checked'); //Если класс у элемента отсутствует - добавляет, иначе - убирает. 
        }
      });
    }

    // Создаем новый LI в списке после нажатия кнопки "Добавить"
    let newElement = () => {
			let inputValue = document.getElementById("myInput").value;
			if (inputValue === '') {
				alert("Необходимо заполнить поле!");
			} else {
				this.model.data.push(inputValue);
				this.view.addList(this.model.data);
			}
      delLi();
      clickPen();
    }

		this.view.addList(this.model.data);
    delLi();
    clickPen();
    checked();
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
