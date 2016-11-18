var lastTime;
var deltaTime;

//chess.onMouseDown =function(){
//    console.log("a");
//    logo.onload=function(){
//        logo2.src="images/logo2.png";
//        context.drawImage(logo2,0,0,450,450)
//
//    }
//};
//chess.onMouseUp =function(){
//    logo.onload=function(){
//        context.drawImage(logo,0,0,450,450)
//    }
//};
function gameloop()
{
    window.requestAnimFrame(gameloop);//setInverval,setTimeout()

    var now =Date.now();
    deltaTime =now-lastTime;
    lastTime= now;
    if(deltaTime>40)deltaTime=40;
    drawBackground();
}
