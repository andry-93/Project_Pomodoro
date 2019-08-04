var overlay = document.getElementsByClassName('modal-overlay');
var clockDiv = document.getElementById('clockDiv');
console.log(overlay);
console.log(clockDiv);

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('clockDiv')) {
    //event.preventDefault();
    //event.stopPropagation();
    console.log()
    showClock();
}})

function showClock() {
    console.log(hdfbsjkdfh);
    overlay.classList.remove('modal_closed');
    clockDiv.classList.remove('modal_closed'); 
}
