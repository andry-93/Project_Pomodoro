   var database = firebase.database();
   var tasks = null;
   var name = null;
   var total = null;
   var names = [];
   var totals = [];
   var countProjAll = null;
   //var names = null;
   database.ref('Tasks/').on('value', function(snapshot) {
        names.length = 0;
        totals.length = 0;
        countProjAll = 0;
        tasks = snapshot.val();
        var keys = Object.keys(tasks);
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                name = tasks[k].name;
                total = tasks[k].total;
                countProjAll += tasks[k].total;
                names.push(name);
                totals.push(total);
            }
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: names,
            datasets: [{
                label: 'Статистика по проектам',
                backgroundColor: 'rgb(30, 144, 255)',
                borderColor: 'rgb(65, 105, 225)',
                data: totals
            }]
        },

        // Configuration options go here
        options: {}
    });
    
    })