var common = document.getElementById('calendarDiv');
common.style.paddingTop = '5px';

	function getValue() {
		var currentDate = new Date;
		var month = currentDate.getMonth();
		var year = currentDate.getFullYear();
		var date = currentDate.getDate();
		var elem = document.createElement('div');
		createCalendar(year, month, date, elem);
	}
	
	function createCalendar(year, month, date, elem) {
		
		this.month=month;
		this.year=year;
		this.date=date;
		this.elem=elem;
		self.month=this.month;
		self.year=this.year;
		self.date=this.date;
		self.elem=this.elem;
		
		if (+this.month>11) {this.month=0; +this.year++;}
		if (+this.month<0) {this.month=11; +this.year--;}

		//var title=document.getElementById('title');
		var currentCal = new Date(this.year, this.month); /* Создаем новый объект по классу Date и передаем год и месяц; затем определяем первый месяц, так как в JS месяцы обозначаются от 0 до 11 */
		var previousMonth = new Date (this.year, this.month-1,0);
		var nextMonthInCal = new Date (this.year, this.month+1);
		var mon;
		var monthinwords = String(this.month);
		switch(monthinwords) {
			case '0':
			mon='ЯНВАРЬ';
			break;
			case '1':
			mon='ФЕВРАЛЬ';
			break;
			case '2':
			mon='МАРТ';
			break;
			case '3':
			mon='АПРЕЛЬ';
			break;
			case '4':
			mon='МАЙ';
			break;
			case '5':
			mon='ИЮНЬ';
			break;
			case '6':
			mon='ИЮЛЬ';
			break;
			case '7':
			mon='АВГУСТ';
			break;
			case '8':
			mon='СЕНТЯБРЬ';
			break;
			case '9':
			mon='ОКТЯБРЬ';
			break;
			case '10':
			mon='НОЯБРЬ';
			break;
			case '11':
			mon='ДЕКАБРЬ';
			break;
			default:
			alert('Неправильно указан месяц');
		}
		
		
		var table = '<table><tr class="first"><th class="pry"></th><th class="prm"></th><th colspan="3" class="mon">' + mon +/*' '+ this.year + */'</th><th class="nm"></th><th class="ny"></th></tr><tr>'; /* Начинаем рисовать таблицу */
		
		previousMonth.setDate(previousMonth.getDate()-getDay(currentCal)); /* Находим число предыдущего месяца, с которого начнем отчет */

		for (var i=0; i < getDay(currentCal); i++) { /* Вызываем первое число месяца и получаем его символ в JS, затем уменьшаем его на 1, чтобы отображалось в нужном нам виде */
			previousMonth.setDate(previousMonth.getDate()+1); /* увеличиваем дату на единицу */
			
			table +='<td class="opacity">' + previousMonth.getDate() + '</td>'; /* Рисуем пустые ячейки, если месяц начался не с понедельника.  */
				
		}

		while(currentCal.getMonth()==(this.month)) { /* Продолжаем заполнять календарь датами текущего месяца через цикл while */
			if (currentCal.getDate()==this.date){
				table +='<td class="necDate">'+currentCal.getDate()+'</td>';
			}
			else {table +='<td>'+currentCal.getDate()+'</td>';}

		
			if(currentCal.getDay()==0) { /* Если день выпадает на воскресенье, то используем перенос строки */
				table +='</tr><tr>';

		}
		currentCal.setDate(currentCal.getDate()+1); /* Шаг на 1 день вперед в цикле */
		}
		if (getDay(currentCal) !=0) {
			for (var j = getDay(currentCal); j < 7; j++) {

				table += '<td class="opacity">'+ nextMonthInCal.getDate() +'</td>';
				nextMonthInCal.setDate(nextMonthInCal.getDate()+1);
			}
		}
		
		table += '</tr></table>'; // Заканчиваем рисовать таблицу

		//this.elem.innerHTML = table; // Вставляем таблицу в DOC
		elem.innerHTML = table;

		function getDay(date) { /* доп.функция на уменьшение индекса дня недели для корректного отображения в календаре */ 
			var day = date.getDay();
			if (day == 0) {day = 7;}
			return day - 1;
		}
		common.appendChild(elem);		
		var prevYear=document.createElement('button');
		prevYear.innerHTML = '<<';
		prevYear.setAttribute('onclick', 'createCalendar(year-1, self.month, +date, self.elem)');
		var r = document.getElementsByClassName("pry");
		for (var i=0; i<r.length; i++) {
			r[i].appendChild(prevYear);
		}
		var prevMonth=document.createElement('button');
		prevMonth.innerText='<';
		prevMonth.setAttribute('onclick', 'createCalendar(year, self.month-1, +date, self.elem)');
		var prm = document.getElementsByClassName("prm")
		for (i=0; i<prm.length; i++) {prm[i].appendChild(prevMonth);}
		var nextMonth=document.createElement('button');
		nextMonth.innerText = '>';
		nextMonth.setAttribute('onclick', 'createCalendar(year, +self.month+1, +date, self.elem)');
		var nm = document.getElementsByClassName("nm")
		for (i=0; i<nm.length; i++) {nm[i].appendChild(nextMonth);}
		var nextYear=document.createElement('button');
		nextYear.innerText = '>>';
		nextYear.setAttribute('onclick', 'createCalendar(year+1, self.month, +date, self.elem)');
		var ny = document.getElementsByClassName("ny")
		for (i=0; i<ny.length; i++) {ny[i].appendChild(nextYear);}

		var tr = document.getElementsByTagName("td");
		for (var i=0; i<tr.length; i++) {
		tr[i].style.backgroundColor='#e8f5fa'; 
		}
		var grey1 = document.querySelectorAll('td:nth-of-type(6n)');
		for (var j=0; j<grey1.length; j++) {
			grey1[j].style.backgroundColor='#008c7c';
			grey1[j].style.color='white';
		}
		var grey2 = document.querySelectorAll('td:nth-of-type(7n)');
		for (var k=0; k<grey2.length; k++) {
			grey2[k].style.backgroundColor='#008c7c';
			grey2[k].style.color='white';
		}
		 
		var necDate=document.getElementsByClassName("necDate");
		for (i=0; i<necDate.length; i++) {
			necDate[i].style.backgroundColor='red';
			necDate[i].style.color='white';
	}

		var opacity = document.getElementsByClassName("opacity");
		for (var m=0; m<opacity.length; m++) {
			opacity[m].style.opacity="0.3";
		}

		var currentElem = null;
		var x = elem.innerHTML;
		elem.onmouseover = function(event) {

		  // определяем цель наведения курсора
		  var target = event.target;

		  // проверяем наведение: на TD или нет
		  while (target != this) {
		    if (target.tagName == 'TD') break;
		    target = target.parentNode;
		  }
		  if (target == this) return;
		  currentElem = target; // когда мы навели на определенную TD, с которой и будем работать
		  target.setAttribute('id', 'hover');
		};


		elem.onmouseout = function(event) {
		  // если курсор и так снаружи - игнорируем это событие
		  if (!currentElem) return;

		  // произошёл уход с элемента - проверим, куда, может быть на потомка?
		  var relatedTarget = event.relatedTarget;
		  if (relatedTarget) { // может быть relatedTarget = null
		    while (relatedTarget) {
		      // идём по цепочке родителей и проверяем,
		      // если переход внутрь currentElem - игнорируем это событие
		      if (relatedTarget == currentElem) return;
		      relatedTarget = relatedTarget.parentNode;
		    }
		  }

		  // произошло событие mouseout, курсор ушёл
		  currentElem.removeAttribute('id', 'hover');
		  currentElem = null;
		};

		var selectedTd;

		elem.onclick = function(event) {
		  var target = event.target; // где был клик?

		  if (target.tagName != 'TD') return; // не на TD? тогда не интересует

		  highlight(target); // подсветить TD
		};

		function highlight(node) {
		  if (selectedTd) {
		    selectedTd.classList.remove('highlight');
		  }
		  selectedTd = node;
		  selectedTd.classList.add('highlight');
		}

		}
		
	getValue();