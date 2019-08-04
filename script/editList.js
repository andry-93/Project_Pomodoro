var myList=['Прочитать учебную литературу', 'Пробежка вдоль канала', 'Перебрать старые вещи'];
		var ol = document.createElement('ol');
		ol.setAttribute('id', 'ol');
		function createList(myList){ /* Создаем функцию, которая получает массив элементов и строит из них список */
			
			for (var i=0; i<myList.length; i++) {
				var li = document.createElement('li');
				li.setAttribute('class','li');
				li.innerHTML = myList[i];
				ol.appendChild(li);
			}

			document.getElementById("list").appendChild(ol);
		
			var addLi = document.createElement('input'); /* строим текстовое поле для ввода данных */
			addLi.setAttribute('type', 'text');
			addLi.setAttribute('id', 'addLi');
			addLi.setAttribute('class', 'li');
			addLi.setAttribute('value','');
			document.getElementById("list").appendChild(addLi);
			addLi.setAttribute('name', 'addLi');
			var btn = document.createElement('input'); /* строим кнопку для сохранения новых данных в списке */
			btn.setAttribute('type', 'button');
			btn.setAttribute('value', 'Добавить к списку');
			btn.setAttribute('onclick', 'add()');
			document.getElementById("list").appendChild(btn);
	
	}
		
	 function add(){ /* Проверяем на содержимое поле ввода и, если оно заполнено, добавляем новый пункт в список */
				if (document.getElementById('addLi').value=='') {
					alert('Вы ничего не ввели в поле ввода');
				}
					else {
					var newLi = document.createElement("li");
					newLi.setAttribute('class', 'li');
				    newLi.innerHTML = document.getElementById("addLi").value;
				    ol.appendChild(newLi);
				}
				if (ol.firstChild) {
				deleteLi.removeAttribute('disabled', 'disabled');
			}	

    	}

		createList(myList); // запускаем/вызываем функцию
		
			var deleteLi = document.createElement('input'); /* Создаем кнопку на удаление пункта из списка и вставляем ее на страницу */
			deleteLi.setAttribute('type', 'button');
			deleteLi.setAttribute('id', 'deleteLi');
			deleteLi.setAttribute('onclick', 'deleteLastLi()')
			deleteLi.setAttribute('value','Удалить из списка');
			document.getElementById("detetebtn").appendChild(deleteLi);
			document.getElementById("detetebtn").style.padding='10px';
			console.log(document.getElementById("ol"))

		function deleteLastLi() { /* Функция для кнопки удаления последнего пункта из списка. Если удалять больше нечего, то кнопка становится неактивной */
			
			 if (ol.firstChild) {
				ol.removeChild(ol.lastChild);
			}	
			/*	else {
				deleteLi.setAttribute('disabled', 'disabled');
			} */
			 if (!ol.firstChild) {
				deleteLi.setAttribute('disabled', 'disabled');
			}	
					
		}

		
		console.log(ol);
		ol.onclick=function(event) { /* По клику на элемент списка прячется значение и на его месте появляется текстовое поле ввода с этим значением в атрибуте value, которое мы можем модифицировать. При потере фокуса (blur) текстовое поле исчезает, а его значение записывается в элемент списка. */
			var target = event.target;
			if (!target.classList.contains('li')) {return};
			var correctLi=document.createElement('input');
			correctLi.setAttribute('type', 'text');
			correctLi.setAttribute('class', 'correctLi');
			correctLi.setAttribute('value', target.innerHTML);
			ol.replaceChild(correctLi,target);
			console.log(target);
			console.log(correctLi);
			
		ol.addEventListener("blur", function() {
			var correctedLi = document.createElement('li');	
			correctedLi.setAttribute('class', 'li');
			correctedLi.innerHTML = correctLi.value;
			ol.replaceChild(correctedLi,correctLi);   
			}, true);
		}