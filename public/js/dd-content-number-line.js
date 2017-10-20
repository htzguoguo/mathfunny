/**
 * Created by Administrator on 2017/7/5.
 */
function numberlineMain(mode){
    this.version='1.10';
    this.mode=typeof mode!=='undefined'?mode:'int';w=600;h=150;var s="";s+='<div style="position:relative; width:'+ w+'px; min-height:'+ h+'px; border: none; border-radius: 20px;  margin:auto; display:block;">';s+='<canvas id="canvasId" style="position: absolute; width:'+ w+'px; height:'+ h+'px; left: 0; top:; border: none;"></canvas>';s+='<input id="clearBtn" onclick="clearMarks()" type="button" style="z-index:2; position:absolute; left:5px; bottom:5px;" value="清除"  class="togglebtn" />';s+='</div>';document.write(s);el=document.getElementById('canvasId');ratio=2;el.width=w*ratio;el.height=h*ratio;el.style.width=w+"px";el.style.height=h+"px";g=el.getContext("2d");g.setTransform(ratio,0,0,ratio,0,0);this.marks=[];document.getElementById('clearBtn').style.visibility='hidden';this.midX=300;this.midY=70;this.scale=0.044;this.width=550;el.addEventListener("mousemove",onmouseMove,false);el.addEventListener("mousedown",onmouseDown,false);el.addEventListener('touchstart',ontouchstart,false);el.addEventListener('touchmove',ontouchmove,false);go();}
function go(x){g.clearRect(0,0,el.width,el.height);drawNumLine(this.midX,this.midY,this.width,x);}
function clearMarks(){this.marks=[];go();document.getElementById('clearBtn').style.visibility='hidden';}
function ontouchstart(evt){var touch=evt.targetTouches[0];evt.clientX=touch.clientX;evt.clientY=touch.clientY;evt.touchQ=true;onmouseDown(evt)}
function ontouchmove(evt){var touch=evt.targetTouches[0];evt.clientX=touch.clientX;evt.clientY=touch.clientY;evt.touchQ=true;onmouseMove(evt);evt.preventDefault();}
function ontouchend(evt){el.addEventListener('touchstart',ontouchstart,false);window.removeEventListener("touchend",ontouchend,false);}
function onmouseDown(evt){var bRect=el.getBoundingClientRect();var mouseX=(evt.clientX- bRect.left)*(el.width/ratio/bRect.width);var mouseY=(evt.clientY- bRect.top)*(el.height/ratio/bRect.height);var m=val2x(mouseX);marks.push(m);document.getElementById('clearBtn').style.visibility='visible';go(0);if(evt.preventDefault){evt.preventDefault();}
else if(evt.returnValue){evt.returnValue=false;}
    return false;}
function onmouseMove(evt){var bRect=el.getBoundingClientRect();var mouseX=(evt.clientX- bRect.left)*(el.width/ratio/bRect.width);var mouseY=(evt.clientY- bRect.top)*(el.height/ratio/bRect.height);go(mouseX);}
function drawNumLine(x,y,wd,currX){g.strokeStyle='blue';g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x+ wd/2,y);g.stroke();g.fillStyle='blue';g.drawArrow(x+ wd/2+ 20,y,20,2,30,15,0);g.fill();g.strokeStyle='red';g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x- wd/2,y);g.stroke();g.fillStyle='red';g.drawArrow(x- wd/2- 20,y,20,2,30,15,Math.PI);g.fill();g.textAlign='center';g.lineWidth=1;g.fillStyle='black';g.font='22px Arial';g.fillText('0',x,y+ 35);g.beginPath();g.moveTo(x,y- 10);g.lineTo(x,y+ 15);g.stroke();g.font='17px Arial';g.fillStyle='blue';for(var i=1;i<=10;i++){var xp=x+ i*wd*this.scale;g.fillText(i.toString(),xp,y+ 35);g.beginPath();g.moveTo(xp,y- 10);g.lineTo(xp,y+ 15);g.stroke();}
    g.fillStyle='red';for(i=1;i<=10;i++){xp=x- i*wd*this.scale;g.fillText('-'+ i.toString(),xp- 2,y+ 35);g.beginPath();g.moveTo(xp,y- 10);g.lineTo(xp,y+ 15);g.stroke();}
    g.fillStyle='gold';g.strokeStyle=g.fillStyle;g.font='bold 17px Arial';g.lineWidth=2;for(i=0;i<marks.length;i++){var m=marks[i];if(m>=-10&&m<=10){xp=x+ m*wd*this.scale;g.fillText(m.toString(),xp,y- 40);g.beginPath();g.moveTo(xp,y);g.lineTo(xp,y- 35);g.stroke();g.drawArrow(xp,y,20,2,20,10,3*Math.PI/2);g.fill();}}
    if(currX>0&&currX<w){g.font='bold 17px Arial';g.fillStyle='orange';g.strokeStyle=g.fillStyle;m=val2x(currX);xp=x+ m*wd*this.scale;g.fillText(m.toString(),xp,y- 40);g.beginPath();g.moveTo(xp,y);g.lineTo(xp,y- 35);g.stroke();g.drawArrow(xp,y,20,2,20,10,3*Math.PI/2);g.fill();}}
function val2x(currX){if(this.mode=='int'){m=Math.round((currX- this.midX)/ (this.scale * this.width));
}else{m=(currX- this.midX)/ (this.scale * this.width);
    m=m.toFixed(7);frac=m%1;if(Math.abs(frac)<0.05)m=m>>0;}
    return m;}
function Point(x,y){this.x=x;this.y=y;}
Point.prototype.set=function(x,y){this.x=x;this.y=y;};CanvasRenderingContext2D.prototype.drawArrow=function(x0,y0,totLen,shaftHt,headLen,headHt,angle,sweep,invertQ){var g=this;var pts=[[0,0],[-headLen,-headHt/2],[-headLen+ sweep,-shaftHt/2],[-totLen,-shaftHt/2],[-totLen,shaftHt/2],[-headLen+ sweep,shaftHt/2],[-headLen,headHt/2],[0,0]];if(invertQ){pts.push([0,-headHt/2],[-totLen,-headHt/2],[-totLen,headHt/2],[0,headHt/2]);}
    for(var i=0;i<pts.length;i++){var cosa=Math.cos(-angle);var sina=Math.sin(-angle);var xPos=pts[i][0]*cosa+ pts[i][1]*sina;var yPos=pts[i][0]*sina- pts[i][1]*cosa;if(i==0){g.moveTo(x0+ xPos,y0+ yPos);}else{g.lineTo(x0+ xPos,y0+ yPos);}}};