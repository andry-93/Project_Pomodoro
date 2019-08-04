(function () {
    function AppView() {
        let appContainer = null;

        this.init = function(app) {
            appContainer = app;
            this.printTestData();
            this.addProjectForm();
        }

        this.printTestData = function () {
            appContainer.innerHTML = `
                <div id="business"></div>
                <table class="table">
                    <thead>
                        <tr>
                            <th class="name">Проект</th>
                            <th class="count">Количество помидорок</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="list-proj"></tbody>
                </table>
            `;
        }

        this.addProjectForm = function() {
            document.getElementById('business').innerHTML += `
            <div id="projects">
              <div class="header">
                <h2>Список проектов</h2>
                <input type="text" id="myProj" placeholder="Проект">
                <span class="addBtn" id="addBtn">Добавить</span>
              </div>
              <div id="projectsAll"></div>
            </div>
            `;
        }

        this.printProject = function(projectList) {
            for (var project in projectList) {
                let projectListContainer = document.getElementById('list-proj'),
                    row = document.createElement('tr'),
                    td1 = document.createElement('td'),
                    td2 = document.createElement('td'),
                    td3 = document.createElement('td');
                row.setAttribute('data-id', project);
                td1.innerHTML = `${projectList[project].name}`;
                td2.innerHTML = `<span ><i class="fa fa-arrow-down down" aria-hidden="true"></i></span>${projectList[project].total}<span><i class="fa fa-arrow-up up" aria-hidden="true"></i></span>`;
                td3.innerHTML = `<a href="#" title="удалить проект"> <i class="fa fa-window-close-o projDelete" aria-hidden="true"></i></a>`;
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);

                if (projectListContainer) {
                    projectListContainer.appendChild(row);
                } else {
                    document.getElementById('users').innerHTML += `
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="name">Проект</th>
                                <th class="count">Количество помидорок</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="list-proj"></tbody>
                    </table>
                    `;
                    projectListContainer = document.getElementById('list-proj');
                    projectListContainer.appendChild(row);
                }
            }

        }

        this.clearProjectList = function() {
            let container = document.getElementById('list-proj');
            if (container) container.innerHTML = '';
        }
    }

    function AppModel() {
        let myAppView = null,
            projectsList = [];

        this.init = function (view) {
            myAppView = view;
            this.getProjectsList();
            this.printProjectsList();
        }

        this.addProject = function(projectname, projectscore) {
            myAppDB.ref('Tasks/' + `task_${projectname.replace(/\s/g, "").toLowerCase()}`).set({
                name: `${projectname}`,
                total: 0
            })
            .then(function (projectname) {
                console.log("Проект добавлен в коллецию");
            })
            .catch(function (error) {
                console.error("Ошибка добавления проекта: ", error);
            });

            this.updateProjectsList();
        }

        this.deleteProject = function(projectid) {
            myAppDB.ref('Tasks/' + projectid).remove()
            .then(function () {
                console.log("Проект удален из коллеции");
            })
            .catch(function (error) {
                console.error("Ошибка удаления проекта: ", error);
            });

            this.updateProjectsList();
        }

        this.downAmountProjects = function(projectid) {
            var score = null;
            myAppDB.ref('Tasks/' + projectid).child('total').on('value', function(snapshot) {
                score = snapshot.val();
                score--;
               });
                if (score === -1) {
                   return;
                }
            myAppDB.ref('Tasks/' + projectid).child("total").set(score--);
            this.updateProjectsList();
        }
            
        this.upAmountProjects = function(projectid) {
            var score = null;
            myAppDB.ref('Tasks/' + projectid).child('total').on('value', function(snapshot) {
                score = snapshot.val();
                score++;
               });
            myAppDB.ref('Tasks/' + projectid).child("total").set(score++);
            this.updateProjectsList();
        }


        this.getProjectsList = function() {
             myAppDB.ref("Tasks/").once("value", function(snapshot) {
                let result = snapshot.val();
                }, function (error) {
                console.log("Error: " + error.code);
            });
        }

        this.printProjectsList = function() {
            myAppDB.ref("Tasks/").on("value", function(snapshot) {
                myAppView.printProject(snapshot.val());
                }, function (error) {
                console.log("Error: " + error.code);
            });
        }

        this.updateProjectsList = function() {
            myAppView.clearProjectList();
            this.printProjectsList();
        }
    }

    function AppController() {
        let myAppModel = null,
            appContainer = null,
            form = null,
            addBtn = null;

        this.init = function (app, model) {
            myAppModel = model;
            appContainer = app;

            document.addEventListener('click', function(event) {
                form = appContainer.querySelector('#myProj');
                addBtn = appContainer.querySelector('#addBtn');

                if (event.target && event.target.id === 'addBtn') {
                    event.preventDefault();
                    event.stopPropagation();
                    myAppModel.addProject(
                        form.value,
                    );
                    form.value = ''
                }
                if (event.target && event.target.classList.contains('down')) {
                    event.preventDefault();
                    event.stopPropagation();
                    myAppModel.downAmountProjects(event.target.parentElement.parentElement.parentElement.dataset.id);
                }
                if (event.target && event.target.classList.contains('up')) {
                    event.preventDefault();
                    event.stopPropagation();
                    myAppModel.upAmountProjects(event.target.parentElement.parentElement.parentElement.dataset.id);
                }

                if (event.target && event.target.classList.contains('projDelete')) {
                    event.preventDefault();
                    event.stopPropagation();
                    myAppModel.deleteProject(event.target.parentElement.parentElement.parentElement.dataset.id);
                }
            });
        }
    }

    let myApp = {
        init: function () {
            let myAppView = new AppView(),
                myAppModel = new AppModel(),
                myAppController = new AppController();

            myAppView.init(document.getElementById('app'));
            myAppModel.init(myAppView);
            myAppController.init(document.getElementById('app'), myAppModel);


        },
    };

    myApp.init();
})();