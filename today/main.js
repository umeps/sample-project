

// function lot(){
    
//     rand = Math.floor(Math.random()*4)+1;
//     let ans = rand ;
//     alert(rand);
//     if(ans==1){
//         alert("大吉");
//     }
//     else if(ans==2){
//         alert("中吉");
//     }
//     else if(ans==3){
//         alert("吉");
//     }
//     else{
//         alert("大凶");
//     }
// };

function lot(){

   let unsei =["大吉","中吉","吉","凶","大凶"];
   let unsei2 = Math.floor( Math.random()* unsei.length);

    alert(unsei[unsei2]);

}