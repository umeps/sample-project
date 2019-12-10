
function btn(){

    function rand(min,max){
        return (Math.floor(Math.random()*(max-min+1)+min));
    }
    let SCREEN_W = window.innerWidth;
    let SCREEN_H = 0-window.innerHeight;
    const KAMI_MAX =150;
    const COLORS =["#f55","#55f","#5c5","#fa5","#5af"];
    let kami = [];

    class Kami{

        constructor(){
            this.elm = document.createElement("div");
            document.body.appendChild(this.elm);
    
            this.sty = this.elm.style;
            
            this.x = rand(0,SCREEN_W);
            this.y = rand(0,SCREEN_H);
    
            this.vx = rand(-10,10);
            this.vy = rand(5,10);
    
            this.ang = 0;
            this.spd = rand(15,40);
            this.rX = rand(0,10)/10;
            this.rY = rand(0,10)/10;
            this.rZ = rand(0,10)/10;
    
            this.sty.position = "fixed";
            
       }
    
       updated() {
            this.x += this.vx;
            this.y += this.vy;
            // if(this.y >= SCREEN_H){
            //     this.x = rand(0,SCREEN_W);
            //     this.y = 0;
            // }

            this.ang += this.spd;
            this.sty.left = this.x + "px";
            this.sty.top  = this.y + "px";
            this.sty.width  = "20px";
            this.sty.height = "10px";
            this.sty.backgroundColor = COLORS[rand(0,rand.length)];

            this.sty.transform = "rotate3D("+this.rX+","+this.rY+","+this.rZ+","+this.ang+"deg)";
       }
    }

        for(let i =0; i<KAMI_MAX; i++){
        kami.push(new Kami());
        }

        setInterval(mainLoop,1000/20);

        function mainLoop(){
        for(let i=0; i<KAMI_MAX; i++){
            kami[i].updated()
            }
        }
}
