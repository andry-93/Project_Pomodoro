// Создаем кнопку (крестик) для закрытия и располагаем в каждом LI
var myNodelist = document.getElementsByTagName("li");
for (var i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("span");
  span.innerHTML = "&#65794;";
  span.className = "close";
  myNodelist[i].appendChild(span);
}
// Создаем кнопку (пишущая рука) для исправления и располагаем в каждом LI
for (var k = 0; k < myNodelist.length; k++) {
  var spanEdit = document.createElement("span");
  spanEdit.innerHTML = "&#9997;";
  spanEdit.className = "edit";
  myNodelist[k].appendChild(spanEdit);
}

// При клике по крестику удаляем текущий LI
var close = document.getElementsByClassName("close");
for (var i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}
// При клике на "кор.руку" значение текущего LI переносим в основной INPUT с возможностью исправления, а сам LI удаляем 
var myUL = document.getElementById('myUL');
var edit = document.getElementsByClassName('edit');
for (var k = 0; k < edit.length; k++) {
  edit[k].onclick = function(){
    var divEdit = this.parentElement;
    divEdit.style.display = "none";
    let task = this.parentElement.innerHTML.split('<span')[0];
    document.getElementById("myInput").value = task;
    
  }
}
// Добавляем класс "checked" при клике по любому LI (и наоборот)
var list = document.querySelector('ul');
list.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked'); //Если класс у элемента отсутствует - добавляет, иначе - убирает. 
  }
});

// Создаем новый LI в списке после нажатия кнопки "Добавить"
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Необходимо заполнить поле!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("span");
  span.innerHTML = "&#65794;";
  span.className = "close";
  li.appendChild(span);
  var spanEdit = document.createElement("span");
  spanEdit.innerHTML = "&#9997;";
  spanEdit.className = "edit";
  li.appendChild(spanEdit);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
  for (var k = 0; k < edit.length; k++) {
    edit[k].onclick = function(){
      var divEdit = this.parentElement;
      divEdit.style.display = "none";
      let task = this.parentElement.innerHTML.split('<span')[0];
      document.getElementById("myInput").value = task;
    }
  }
  
}
