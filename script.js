const Boardlength = 500;
const Boardwidth = 500;
const CoorDX = 500;
const CoorDy = 500;
const length = 70;
const breadth = 15;
const paddleSpeed = 20;
let ballXDirection = 0;
let ballYDirection= 0;
let setIntervalID = null;
let player1Score = 0;
let player2Score = 0;
const paddle1 = {

      length : 70,
      breadth : 15,
      color : "red",
      X : 0,
      Y : CoorDy/2

}

const paddle2 = {

    length : 70,
    breadth : 15,
    color : "blue",
    X : CoorDX-15,
    Y : CoorDy/2

}

const ball = {
    X : Boardlength/2,
    y : Boardwidth/2,
    color : "yellow",
    radius: 10,
    speed: 1
}



startgame();
window.addEventListener("keydown",changeDirection);

function render(){
    setIntervalID = setInterval(()=>{
        clearBoard();    
        DrawBall(ball);
        moveBall(ball);
        checkCollision(paddle1 , paddle2 , ball);
        updateScore();
        Drawpaddle1(paddle1);
        Drawpaddle2(paddle2);
        
    },5);

}
let btn = document.getElementById("btn");
btn.addEventListener("click",()=>{
         clearInterval(setIntervalID);
         player1Score=0;
         player2Score=0;
         startgame();
});
function clearBoard(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,CoorDX,CoorDy);
}
function createBall(ball){
   
    if(Math.round(Math.random())==1)
          ballXDirection=1;
    else
          ballXDirection=-1;
    if(Math.round(Math.random())==1)
          ballYDirection=1;
    else
          ballYDirection=-1;    
          
    ball.X = Boardwidth/2;
    ball.y = Boardlength/2;
    DrawBall(ball);      

}
function moveBall(ball){
    ball.X += ball.speed * ballXDirection;
    ball.y += ball.speed * ballYDirection; 

                
}
function checkCollision(paddle1 , paddle2 , ball){
    if(ball.y <= 0+ball.radius){
         ballYDirection*=-1;
        }
         
    if(Boardlength<= ball.y+ball.radius){
        ballYDirection*=-1;
    }
          
    if(ball.X <= 0){
        player2Score+=1;
        updateScore();
        createBall(ball)
        return;
    }
    if(ball.X>=Boardwidth){
        player1Score+=1;
        updateScore();
        createBall(ball)
        return;
    }
    if(ball.X< (paddle1.X+paddle1.breadth+ball.radius) ){
        if(ball.y >paddle1.Y && ball.y< paddle1.Y+paddle1.length){
             ballXDirection*=-1;

        }
             
    }     

    if(ball.X >= (paddle2.X-ball.radius) ){
        if(ball.y >paddle2.Y && ball.y < paddle2.Y + paddle2.length){
             ballXDirection *= -1;

        }        
    } 
    
                  
}
function updateScore(){
       let score = document.getElementById("Score");
       score.textContent = `${player1Score}:${player2Score}`;

}
function Drawpaddle1(paddle1){
    const can  = document.querySelector("#canvas");
    const ctx = can.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(paddle1.X, paddle1.Y, paddle1.breadth, paddle1.length);
}
function Drawpaddle2(paddle2){
    const can  = document.querySelector("#canvas");
    const ctx = can.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(paddle2.X, paddle2.Y, paddle2.breadth, paddle2.length);
}
function DrawBall(ball){
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.arc(ball.X, ball.y, ball.radius, 0, 2 * Math.PI);
ctx.fillStyle = ball.color;
ctx.fill();
ctx.closePath();
}
function startgame(){
   
   createBall(ball);
   render();
}

function changeDirection(event){
      const keypressed = event.keyCode
      const Paddle1_keyUp = 38;
      const paddle1_keyDown = 40;
      const Paddle2_KeyUp = 87;
      const Paddle2_KeyDown = 83;
      
      switch(keypressed){
        case (Paddle1_keyUp ):
            if(paddle1.Y > 0){
                paddle1.Y-=paddleSpeed;
            }
           
            console.log(paddle1.Y);
            break;
        case (paddle1_keyDown):
            if(paddle1.Y < CoorDy-paddle1.length){
                paddle1.Y+=paddleSpeed;
            }
            
            break;
        case (Paddle2_KeyUp):
            if(paddle2.Y > 0){
                paddle2.Y-=paddleSpeed;
            }
            break;
        case (Paddle2_KeyDown):
            if(paddle2.Y < CoorDy-paddle2.length){
                paddle2.Y+=paddleSpeed;  
            }
                            
            break;
        
      }
     
}




