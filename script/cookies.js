	var userName = null;
	function getCookie(name) { //стандартная функция получения куки
			var matches = document.cookie.match(new RegExp(
			    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			  ));
			return matches ? decodeURIComponent(matches[1]) : undefined;
			}
		function deleteCookie(name) { //стандартная функция по удалению куки
	    setCookie(name, "", {
	        expires: -1
	    })
		}

	function setCookie(name, value, options) { // стандартная функция по записи куки
	  options = options || {};

	  var expires = options.expires;

	  if (typeof expires == "number" && expires) {
	    var d = new Date();
	    d.setTime(d.getTime() + expires * 0);
	    expires = options.expires = d;
	  }
	  if (expires && expires.toUTCString) {
	    options.expires = expires.toUTCString();
	  }

	  value = encodeURIComponent(value);

	  var updatedCookie = name + "=" + value;

	  for (var propName in options) {
	    updatedCookie += "; " + propName;
	    var propValue = options[propName];
	    if (propValue !== true) {
	      updatedCookie += "=" + propValue;
	    }
	  }

	  document.cookie = updatedCookie;
	}
	
	function checkNames() {
	// спрашиваем у пользователя его имя и ДР
	if (!getCookie('userName')) { // если в куках ничего нет 
		userName = prompt('Pomodoro приветствует Вас! Введите Ваше имя');
		// проверка: если пользователь нажал CANCEL или ввел буквы
		if (!userName) {
			alert('Для дальнейшей работы с сайтом Вам необходимо ввести Ваше имя');
			checkNames();
		}
		// записываем инф в куки
		setCookie('userName', userName);
		document.getElementById('userName').innerHTML = userName; // выводим приветствие на страницу браузера
	}
		else { // если в куках УЖЕ хранится информация о пользователе
			userName = getCookie('userName'); // получаем инф
			document.getElementById('userName').innerHTML = userName; // отображаем приветствие 
		}
	}
	function deleteUser() { // при нажатии на кнопку удаляем имеющуюся информацию в куки
		deleteCookie('userName');
		checkNames();
	}
	checkNames();