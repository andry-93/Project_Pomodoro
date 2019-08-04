var tree = {

    canvas:     '',
    ctx:        '',
    height:     0,
    width:      0,
    //spread:     0.6,
    drawLeaves: true,
    leavesColor:'',
    leaveType:  this.MEDIUM_LEAVES,
    
    MAX_BRANCH_WIDTH:   20,
    BIG_LEAVES:         500,
    
    
    draw : function(ctx, h, w, spread, leaveType) {
        // Set how much the tree branches are spread
        if(spread >= 0.3 && spread <= 1) {
            this.spread = spread;
        } else {
            this.spread = 0.6;
        }
        
        this.leaveType = leaveType;

        this.ctx = ctx;
        this.height = h;
        this.width = w;
        this.ctx.clearRect(0,0,this.width,this.height);
        // Center the tree in the window
        this.ctx.translate(this.width/2,this.height);
        // Set the leaves to a random color
        this.leavesColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        // Set branch thickness
        this.ctx.lineWidth = 1 + (Math.random() * this.MAX_BRANCH_WIDTH);
        this.ctx.lineJoin = 'round';
        
        this.branch(0);
    },
    
    branch : function(depth) {
        if (depth < 12) {
            this.ctx.beginPath();
            this.ctx.moveTo(0,0);
            this.ctx.lineTo(0,-(this.height)/10);

            this.ctx.stroke();
            
            this.ctx.translate(0,-this.height/10);
            // Random integer from -0.1 to 0.1
            var randomN = -(Math.random() * 0.1) + 0.1;

            this.ctx.rotate(randomN); 

            if ((Math.random() * 1) < this.spread){
                // Draw the left branches
                this.ctx.rotate(-0.35);
                this.ctx.scale(0.7,0.7);
                this.ctx.save();
                this.branch(depth + 1);
                // Draw the right branches
                this.ctx.restore();  
                this.ctx.rotate(0.6);
                this.ctx.save();
                this.branch(depth + 1);   
                this.ctx.restore();        
            }
            else { 
                this.branch(depth);
            }

        }
       else {  
                var lengthFactor = 200;
                this.ctx.fillStyle = this.leavesColor;
                this.ctx.fillRect(0, 0, this.leaveType, lengthFactor);
                this.ctx.stroke();
            
        }
    }
};

    var height = 300;
    var width = 400;  
    var intervalId = 0;
    
    
    function start() {
        
        var canvas = document.getElementById("canvas");
        
        if(canvas.getContext("2d")) {
        canvas.height = height;
        canvas.width = width;
        ctx = canvas.getContext("2d");
        drawTree();
        
        } else {
            canvas.innerHTML = "Your browser doen't support Canvas!";
        }
    };
 
    function drawTree() {
        //var treeSpread = '0.9';
        var treeSpread = null;
        console.log(countProjAll);
        if (countProjAll < 10) {treeSpread = '0.9'};
        if (countProjAll >=10 && countProjAll < 20) {treeSpread = '0.8'};
        if (countProjAll >=20 && countProjAll <30 ) {treeSpread = '0.6'};
        if (countProjAll >=30 && countProjAll < 40) {treeSpread = '0.4'};
        if (countProjAll >=40) {treeSpread = '0.3'};
        var leaveType = tree.BIG_LEAVES;
        ctx.save();
        tree.draw(ctx,height,width,treeSpread,leaveType);
        ctx.restore();
    }
   var showTree = document.getElementById('showTree');
   showTree.addEventListener('click', start);
   //start();