
    var form = document.getElementById('parentPosition');
    var canvas = document.getElementById('clock');
    //form.appendChild(canvas);
    var CColor = "white";
    var i = 0;
    var CCenter = 150.5;
    var CTSize = 120;
    var CMSize = CTSize * 0.7; //Длинна минутной стрелки
    var CSSize = CTSize * 0.8; //Длинна секундной стрелки
    var CHSize = CTSize * 0.5; //Длинна часовой стрелки 

    function drawClock() {

    //canvas.setAttribute('onload', 'showTime()');
      
    if (canvas && canvas.getContext('2d')){
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(150.5,150.5,140,0,Math.PI*2,true);
    //ctx.stroke();
    ctx.fillStyle = '#4ac3ff';
    ctx.fill();
    
    var redCenterX=150.5;
    var redCenterY=150.5;
    var angleFirst=0;
    var a = 1;

    for (var i=1; i<13; i++) {
        angleFirst += 30;
        var radius = 110;     
        var angle = angleFirst/180*Math.PI;
        var greenCenterX=redCenterX+radius*Math.sin(angle);
        var greenCenterY=redCenterY-radius*Math.cos(angle);
            
        ctx.beginPath();
        ctx.arc(greenCenterX, greenCenterY, 5, 0, Math.PI*2,true);
        ctx.fillStyle = '2b0354';
        ctx.fill();
        ctx.beginPath();
        /*ctx.fillStyle = 'white';
        ctx.font = "italic 17px Arial";
        ctx.fillText(a, greenCenterX-8, greenCenterY+5);
        a++;*/
    }
}}
function ctxline(x1,y1,len,angle,color,wid){//Функция рисования линии под углом
    if (canvas && canvas.getContext('2d')){
    let ctx = canvas.getContext('2d');
    var x2 = (CCenter + (len * Math.cos(angle)));
    var y2 = (CCenter + (len * Math.sin(angle)));
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = wid; 
    ctx.lineCap = 'round';
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}}

    function showTime() {
        drawClock();
        if (canvas && canvas.getContext('2d')){
        let ctx = canvas.getContext('2d');
        i = 360/3600 * ((new Date().getMinutes()*60)+new Date().getSeconds());
    //Рисуем стрелку
    ctxline(CCenter,CCenter,CMSize,((i-90) / 180 * Math.PI),CColor,5);//Минутная

    i = 360/720*((new Date().getHours()*60)+ new Date().getMinutes());
    ctxline(CCenter,CCenter,CHSize,((i-90) / 180 * Math.PI),CColor,7);// Часовая


    i = 360/(60*1000)* ((new Date().getSeconds()*1000)+ new Date().getMilliseconds());
    ctxline(CCenter,CCenter,CSSize,((i-90) / 180 * Math.PI),CColor,4);//Секундная

    //рисуем красный центральный круг
    ctx.beginPath();
    ctx.arc(150.5,150.5,5,0,Math.PI*2,true);
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.fill();
}
    //рисуем электронные часы
    /*var dt = new Date();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var seconds = dt.getSeconds();
            
    clock.style.left = "120px";
    clock.style.top = "90px";
    clock.style.position = "absolute";
    clock.style.fontSize = '23px';
    if (hours < 10) {hours = '0' + hours};
    if (minutes < 10) {minutes = '0' + minutes};
    if (seconds < 10) {seconds = '0' + seconds};
    clock.innerHTML = hours + ':' + minutes + ':' + seconds;*/
    }

    setInterval(showTime,1000);
