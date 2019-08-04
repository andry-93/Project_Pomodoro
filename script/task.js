
(function () {
// model
function Model(view) {
   
    this.openModal = function(modal, modal_overlay) {
        view.showModal(modal, modal_overlay);
    }

    this.closeModal = function(modal, modal_overlay) {
        view.hideModal(modal, modal_overlay);
    }
};

// view
function View(func) {

    this.showModal = function(modal, modal_overlay) {
        var modal = modal;
        var modal_overlay = modal_overlay;
        modal.classList.remove('modal_closed');
        modal_overlay.classList.remove('modal_closed');
    }

    this.hideModal = function(modal, modal_overlay) {
        var modal = modal;
        var modal_overlay = modal_overlay;
        modal.classList.add('modal_closed');
        modal_overlay.classList.add('modal_closed');

    }
};


// controller
function Controller(model) {
    var modal;

    var modal_overlay = document.getElementById('modal-overlay');
    var btncloseModal = document.getElementsByClassName('modal__close');

    this.handlerControllerOpen = function(event) {
        var target = event.target;
        var id = target.getAttribute('data-supermodal');
        modal = document.getElementById(id);
        model.openModal(modal, modal_overlay);
    }
    

    this.handlerControllerClose = function() {
        model.closeModal(modal, modal_overlay);
    }

    var btncloseModal = document.querySelectorAll(' .mod_cl'); //коллекция кнопок закрыть
    Array.from(btncloseModal).forEach(btn => btn.addEventListener('click', this.handlerControllerClose));
    var links = document.getElementsByClassName('pluginModal'); 
    Array.from(links).forEach(link => link.addEventListener('click', this.handlerControllerOpen)); //переводим к массиву и для каждого link вешаем событие click

}
    var modalApp = {
        init: function() {
                view = new View();
                model = new Model(view);
                controller = new Controller(model);


        }
    }
    modalApp.init();
})();
