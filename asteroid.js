//generic inheritance
Function.prototype.inherits = function(superclass) {
  function Surrogate() {};
  Surrogate.prototype = superclass.prototype;
  this.prototype = new Surrogate();
};


//start clock
function gameClock(numMilSec, listOfObjs, ctx) {
   return setInterval(function(){ moveAll(listOfObjs, ctx); }, numMilSec);
};

//returns a random int [min,max)
var gRI =  function(min, max){
   return Math.floor(Math.random() * (max - min)) + min;
};

function moveAll(objList, ctx){
   //call move
   for(var i = 0; i < objList.length; i++){
      objList[i].move();
   }
   //if(squrt((LX1-LX2)^2 + (LY1-LY2)^2) < R1+R2){colide();}
   //find overlaps
   for(var i = 0; i < objList.length; i++){
      for(var j = i + 1; j < objList.length; j++){
         if(Math.sqrt((objList[i].locX - objList[j].locX )^2 + (objList[i].locY - objList[j].locY)^2) < objList[i].radius + objList[j].radius){
            objList[i].collide(objList, j);
            objList[j].collide(objList, i);
            
         }
      }
   }
   //remove dead
   for(var i = objList.length - 1; i > 0; i--){
      if(objList[i].isDead){
         if(i === objList.length - 1){
            objList.pop();}
         else{
            objList[i] = objList.pop();}
      }
   }
   //call Draw
   ctx.fillStyle = "#777777";
   ctx.fillRect(0, 0, 500, 500);
   for(var i = 0; i < objList.length; i++){ // need to make sure that objList is the right length. seems to be staying to long
      objList[i].draw(ctx);
   }
   
};



   
function SpaceObj(sx, sy, lx, ly, r){
   this.speedX = sx;     
   this.speedY = sy;
   this.locX = lx;
   this.locY = ly;
   this.radius = r;
  /* this.move = function(){
      lx += sx; 
      ly += sy;
      lx = lx%500;
      ly = ly%500;
      if(lx < 1){
         lx += 500;}
      if(ly < 1){
         ly += 500;}
   };*/
   this.draw = function(ctx){return;};            // fix me??
   this.getType = 'SpaceObj';
   this.isDead = false;
};
SpaceObj.prototype.move = function(){
      this.locX += this.speedX; 
      this.locY += this.speedY;
      this.locX = this.locX % 500;
      this.locY = this.locY % 500;
      if(this.locX < 1){
         this.locX += 500;}
      if(this.locY < 1){
         this.locY += 500;}
   };

function Asteroid(sLeft,sx,sy,lx,ly){ 
   this.splitNum = 3;
   this.splitLeft = sLeft;
   SpaceObj.call(this, sx, sy, lx, ly, this.splitNum * this.splitNum + 3);
   this.collide = function(objList, idx){
      if(objList[idx].getType === 'Ship' || objList[idx].getType === 'Pellet'){
         this.isDead = true;
//         if(this.splitLeft > 1){
//            objList.push(Asteroid(this.splitLeft - 1, sx + 10, sy + 10, lx + 10, ly + 10));
//            objList.push(Asteroid(this.splitLeft - 1, sx - 10, sy - 10, lx - 10, ly - 10));
//            objList.push(Asteroid(this.splitLeft - 1, sx - 10, sy + 10, lx - 10, ly + 10));
//            objList.push(Asteroid(this.splitLeft - 1, sx + 10, sy - 10, lx + 10, ly - 10));
//         }
      }
   };
   this.offSet = .4;
   this.getType = 'Asteroid';
   this.draw = function(ctx){
      ctx.fillStyle = '#997733';
      ctx.beginPath();
      ctx.moveTo(this.locX + Math.sin(this.direction) * this.radius, 
                 this.locY + Math.cos(this.direction) * this.radius);                          
      ctx.lineTo(this.locX + Math.sin(this.direction + this.offSet) * this.radius * .9,  
                 this.locY + Math.cos(this.direction + this.offSet) * this.radius * .9);            
      ctx.lineTo(this.locX + Math.sin(this.direction + 2 * this.offSet) * this.radius * .96, 
                 this.locY + Math.cos(this.direction + 2 * this.offSet) * this.radius * .96);       
      ctx.lineTo(this.locX + Math.sin(this.direction + 3 * this.offSet) * this.radius * .8,  
                 this.locY + Math.cos(this.direction + 3 * this.offSet) * this.radius * .8);        
      ctx.lineTo(this.locX + Math.sin(this.direction + 4 * this.offSet) * this.radius * .99,  
                 this.locY + Math.cos(this.direction + 4 * this.offSet) * this.radius * .99);       
      ctx.lineTo(this.locX + Math.sin(this.direction + Math.PI - this.offSet) * this.radius * .99,  
                 this.locY + Math.cos(this.direction + Math.PI - this.offSet) * this.radius * .99); 
      ctx.lineTo(this.locX + Math.sin(this.direction + Math.PI) * this.radius * .6,   
                 this.locY + Math.cos(this.direction + Math.PI) * this.radius * .6);           
      ctx.lineTo(this.locX + Math.sin(this.direction + Math.PI + 2 * this.offSet) * this.radius * .89,  
                 this.locY + Math.cos(this.direction + Math.PI + 2 * this.offSet) * this.radius * .89);  
      ctx.lineTo(this.locX + Math.sin(this.direction - 4 * this.offSet) * this.radius * .99,  
                 this.locY + Math.cos(this.direction - 4 * this.offSet) * this.radius * .99);  
      ctx.lineTo(this.locX + Math.sin(this.direction - 3 * this.offSet) * this.radius * .75,  
                 this.locY + Math.cos(this.direction - 3 * this.offSet) * this.radius * .75);  
      ctx.lineTo(this.locX + Math.sin(this.direction - 2 * this.offSet) * this.radius * .82,  
                 this.locY + Math.cos(this.direction - 2 * this.offSet) * this.radius * .82);  
      ctx.lineTo(this.locX + Math.sin(this.direction - this.offSet) * this.radius * .95,  
                 this.locY + Math.cos(this.direction - this.offSet) * this.radius * .95);      
      ctx.closePath();                                                   
      ctx.fill();
   };
};

function Ship(){ 
   this.lifeCounter = 5;
   this.direction = 1 * Math.PI;
   SpaceObj.call(this, 0, 0, 250, 250, 10);
   this.collide = function(objList, idx){
      if(objList[idx].getType === 'Asteroid'){
         this.lifeCounter -= 1;}
      if(this.lifeCounter < 1){
         this.isDead = true;}// triger game over here... somehow //GO: stop timer, show score, give playagain option //pass GO function earlyer and then call it now?
   };
   this.fire = function(spaceObjList){
      var plx = this.locX + Math.sin(this.direction) * this.radi;
      var ply = this.locY + Math.cos(this.direction) * this.radi;
      var psx = this.speedX + Math.sin(this.direction) * 15;
      var psy = this.speedY + Math.cos(this.direction) * 15; // 15 IS ARBETRARY FOR PELLET SPEED, TINKER WITH IT TO FINE TOON
      spaceObjList.push(new Pellet(psx, psy, plx, ply));};

   this.changeHeading = function(delta){
      this.direction += delta;};

   this.changeSpeed = function(delta){
      this.speedX += Math.sin(this.direction) * delta;
      this.speedY += Math.cos(this.direction) * delta;};

   this.getType = 'Ship';
   this.radi = 13;
   this.offSetTail = .75;
   this.offSet = .4;
   this.draw = function(ctx){
      ctx.fillStyle = '#337799';
            ctx.beginPath();
      ctx.moveTo(this.locX + Math.sin(this.direction) * this.radi, 
                 this.locY + Math.cos(this.direction) * this.radi);                              //top
      ctx.lineTo(this.locX + Math.sin(this.direction + 2 * this.offSet) * this.radi / 2,  
                 this.locY + Math.cos(this.direction + 2 * this.offSet) * this.radi / 2);        //in1  left
      ctx.lineTo(this.locX + Math.sin(this.direction + this.offSet) * this.radi, 
                 this.locY + Math.cos(this.direction + this.offSet) * this.radi);                //out1 left
      ctx.lineTo(this.locX + Math.sin(this.direction + 3 * this.offSet) * 2 * this.radi / 3,  
                 this.locY + Math.cos(this.direction + 3 * this.offSet) * 2 * this.radi / 3);    //out2 left
      ctx.lineTo(this.locX + Math.sin(this.direction + 4 * this.offSet) * this.radi / 2,  
                 this.locY + Math.cos(this.direction + 4 * this.offSet) * this.radi / 2);        //in2  left
      ctx.lineTo(this.locX + Math.sin(this.direction + Math.PI - this.offSetTail) * this.radi,  
                 this.locY + Math.cos(this.direction + Math.PI - this.offSetTail) * this.radi);  //wing left
      ctx.lineTo(this.locX + Math.sin(this.direction + Math.PI) * this.radi / 2,   
                 this.locY + Math.cos(this.direction + Math.PI) * this.radi / 2);                //bot
      ctx.lineTo(this.locX + Math.sin(this.direction + Math.PI + this.offSetTail) * this.radi,  
                 this.locY + Math.cos(this.direction + Math.PI + this.offSetTail) * this.radi);  //wing right
      ctx.lineTo(this.locX + Math.sin(this.direction - 4 * this.offSet) * this.radi / 2,  
                 this.locY + Math.cos(this.direction - 4 * this.offSet) * this.radi / 2);        //in2  left
      ctx.lineTo(this.locX + Math.sin(this.direction - 3 * this.offSet) * 2 * this.radi / 3,  
                 this.locY + Math.cos(this.direction - 3 * this.offSet) * 2 * this.radi / 3);    //out2 left
      ctx.lineTo(this.locX + Math.sin(this.direction - this.offSet) * this.radi,  
                 this.locY + Math.cos(this.direction - this.offSet) * this.radi);                //out1 left
      ctx.lineTo(this.locX + Math.sin(this.direction - 2 * this.offSet) * this.radi / 2,  
                 this.locY + Math.cos(this.direction - 2 * this.offSet) * this.radi / 2);        //in1  left
      ctx.closePath();                                                                           //back to top
      ctx.fill();
   };
   this.move = function(){
      SpaceObj.prototype.move()/*.call(this)*/;
      //other things keep spining? angular momentum
   };
};  

function Pellet(sx, sy, lx, ly){ 
   //ask bud how to call the parent move, also need to have them die at some point
   SpaceObj.call(this, sx, sy, lx, ly, 2);
   this.collide = function(objList, idx){
      if(objList[idx].getType === 'Asteroid'){
         this.isDead = true;}};
   this.getType = 'Pellet';
   this.draw = function(ctx){
      ctx.fillStyle = '#993333';
      ctx.beginPath();
      ctx.arc(locX, locY, 2, 0, 2 * Math.PI);
      ctx.fill();
   };
};  







$(document).ready(function(){
   Ship.inherits(SpaceObj);
   Asteroid.inherits(SpaceObj);
   Pellet.inherits(SpaceObj);


   var moveList = [new Ship()];
   for(var i = 1; i < 11; i++){
      moveList.push(new Asteroid(3, gRI(-5, 6), gRI(-5, 6), gRI(5, 495), gRI(5, 495)))};

   var canva = document.getElementById('mainCanvas');
   canva.height = 500;
   canva.width = 500;
   var ctx = canva.getContext("2d");
   ctx.fillStyle = "#777777";
   ctx.fillRect(0, 0, canva.width, canva.height);


   


   var gameTimer = gameClock(1000, moveList, ctx);




   //direction key-press events
   $(document).keydown(function(e) {
      switch(e.which) {
         case 32: // space
            moveList[0].fire(moveList);//FIX THIS
         break;

         case 37: // left
            moveList[0].changeHeading(Math.pi/10);// in radians!
         break;

         case 39: // right
            moveList[0].changeHeading(-Math.pi/10); /////may be wrong
         break;
         
         case 38: // up
            moveList[0].changeSpeed(3);
         break;

         case 40: // down
            moveList[0].changeSpeed(-3);
         break;

         default: return; 
      }
      e.preventDefault(); 
   });

});