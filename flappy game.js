// SELECT CVS
const cvs = document.getElementById("bird");
const ctx = cvs.getContext("2d");
// GAME VARS AND CONSTS
let frames = 0;
const DEGREE = Math.PI/180;
// LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = "img/baground flappy.jpg";
// LOAD SOUNDS
const SCORE_S = new Audio();
SCORE_S.src = "audio/sfx_point.wav";
const FLAP = new Audio();
FLAP.src = "audio/sfx_flap.wav";
const HIT = new Audio();
HIT.src = "audio/sfx_hit.wav";
const SWOOSHING = new Audio();
SWOOSHING.src = "audio/sfx_swooshing.wav";
const DIE = new Audio();
DIE.src = "audio/sfx_die.wav";
// GAME STATE
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}
// START BUTTON COORD
const startBtn = {
    x : 120,
    y : 263,
    w : 83,
    h : 29
}
// CONTROL THE GAME
cvs.addEventListener("click", function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            SWOOSHING.play();
            break;
        case state.game:
            if(bird.y - bird.radius <= 0) return;
            bird.flap();
            FLAP.play();
            break;
        case state.over:
            let rect = cvs.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;
            
            // CHECK IF WE CLICK ON THE START BUTTON
            if(clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h){
                pipes.reset();
                bird.speedReset();
                score.reset();
                state.current = state.getReady;
            }
            break;
    }
});
// BACKGROUND
const bg = {
    sX : 0,
    sY : 0,
    w : 275,
    h : 226,
    x : 0,
    y : cvs.height - 226,
    
    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
    
}
// FOREGROUND
const fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,
    
    dx : 2,
    
    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w);
        