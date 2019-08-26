//ゲームスピード(ms)
const GAME_SPEED = 1000/60;

//画面サイズ
const SCREEN_W = 180;
const SCREEN_H = 320;

//キャンバスサイズ
const CANVAS_W = SCREEN_W * 2;
const CANVAS_H = SCREEN_H * 2;

//フィールドサイズ
const FIELD_W = SCREEN_W * 2;
const FIELD_H = SCREEN_H * 2;

//星の数
const STAR_MAX = 300;

//キャンバス
let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;

function rand(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;

}

class Star
{
    constructor()
    {
        this.x = rand(0, FIELD_W)<<8;
        this.y = rand(0, FIELD_H)<<8;
        this.vx = 0;
        this.vy = rand(30,500);
        this.sz = rand(1,2);

    }

    draw()
    {
        let x =this.x>>8;
        let y =this.y>>8;

        con.fillStyle=rand(0,2)!=0?"66f":"#8af";
        con.fillRect(x, y, this.sz, this.sz);
    }

    updated()
     {
        this.x += this.vx;
        this.y += this.vy;
        if(this.y>FIELD_H<<8)
        {
            this.y=0;
            this.x=rand(0,FIELD_W)<<8;
        }   
    }
}
//星を描画
let star =[];
for(let i =0; i<STAR_MAX; i++)star[i] = new Star();
con.fillStyle ="black";
con.fillRect(0,0,SCREEN_W,SCREEN_H);
for(let i =0; i<STAR_MAX;i++)star[i].draw();

setInterval(gameLoop,GAME_SPEED);

//ゲームループ
function gameLoop(){

    //移動の処理
    for(let i =0; i<STAR_MAX; i++)star[i].updated();

    //描画の処理
    con.fillStyle ="black";
    con.fillRect(0,0,SCREEN_W,SCREEN_H);
    for(let i =0; i<STAR_MAX;i++)star[i].draw();

}