var CANVAS_WIDTH = 1150;
var CANVAS_HEIGHT = 650;
var MARGIN_LEFT = 10;
var MARGIN_TOP = 10;
var RADIUS = 8; //小圆的半径


var balls = []; //活动小球数组
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"] //随机颜色


var _date = new Date();
var oldTime = {
		hours: checkTime(_date.getHours()),
		minutes: checkTime(_date.getMinutes()),
		seconds: checkTime(_date.getSeconds())
	},
	curTime = {
		hours: undefined,
		minutes: undefined,
		seconds: undefined
	};

function checkTime(time) {
	if (time < 10) {
		time = '0' + time;
		time = parseInt(time);
	}
	return time;
}

function render(cxt) {
	console.log(balls.length);
	var date = new Date();

	curTime.hours = checkTime(date.getHours());
	curTime.minutes = checkTime(date.getMinutes());
	curTime.seconds = checkTime(date.getSeconds());

	cxt.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(curTime.hours / 10), cxt);
	renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curTime.hours % 10), cxt);
	renderDigit(MARGIN_LEFT + 2 * 15 * (RADIUS + 1), MARGIN_TOP, 10, cxt);

	renderDigit(MARGIN_LEFT + 3 * 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curTime.minutes / 10), cxt);
	renderDigit(MARGIN_LEFT + 4 * 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curTime.minutes % 10), cxt);
	renderDigit(MARGIN_LEFT + 5 * 15 * (RADIUS + 1), MARGIN_TOP, 10, cxt);

	renderDigit(MARGIN_LEFT + 6 * 15 * (RADIUS + 1) - 1, MARGIN_TOP, parseInt(curTime.seconds / 10), cxt);
	renderDigit(MARGIN_LEFT + 7 * 15 * (RADIUS + 1) - 1, MARGIN_TOP, parseInt(curTime.seconds % 10), cxt);

	for( var i = 0 ; i < balls.length ; i ++ ){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }

	

}


function renderDigit(x, y, num, cxt) { //循环绘制小球
	cxt.fillStyle = 'rgb(0,102,153)';
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI, false);
				cxt.closePath();

				cxt.fill();
			}
		}
	}
}

function update() {
	//判断数字是否改变
		if(parseInt(curTime.hours/10)!==parseInt(oldTime.hours/10)){
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curTime.hours/10));
		}
		if(parseInt(curTime.hours%10)!==parseInt(oldTime.hours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curTime.hours%10));
		}
		if(parseInt(curTime.minutes/10)!==parseInt(oldTime.minutes/10)){
			addBalls(MARGIN_LEFT+3*15*(RADIUS+1),MARGIN_TOP,parseInt(curTime.minutes/10));
		}
		if(parseInt(curTime.minutes%10)!==parseInt(oldTime.minutes%10)){
			addBalls(MARGIN_LEFT+4*15*(RADIUS+1),MARGIN_TOP,parseInt(curTime.minutes%10));
		}
		if(parseInt(curTime.seconds/10)!==parseInt(oldTime.seconds/10)){
			addBalls(MARGIN_LEFT+6*15*(RADIUS+1),MARGIN_TOP,parseInt(curTime.seconds/10));
		}
		if(parseInt(curTime.seconds%10)!==parseInt(oldTime.seconds%10)){
			addBalls(MARGIN_LEFT+7*15*(RADIUS+1),MARGIN_TOP,parseInt(curTime.seconds%10));
		}
	
	oldTime.hours = curTime.hours;
	oldTime.minutes = curTime.minutes;
	oldTime.seconds = curTime.seconds;
	
	
	for( var i = 0 ; i < balls.length ; i ++ ){//改变小球状态
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= CANVAS_HEIGHT-RADIUS ){
            balls[i].y = CANVAS_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }
	
	var del=0;
	for(var i=0,k=balls.length;i<k;i++){
		if( balls[i].x -RADIUS < CANVAS_WIDTH && balls[i].x +RADIUS > 0){
			balls[del++] = balls[i];
		}
	}
	while(balls.length>del){
		balls.pop();
	}
	
}


function addBalls(x, y, num) {
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] == 1) {
				var aBall = {
					x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
					y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
					g: 1.5 + Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
					vy: -5,
					color: colors[Math.floor(Math.random() * colors.length)]
				}

				balls.push(aBall);
			}
		}
	}
}









window.onload = function() {
	var canvas = document.getElementById('my');
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;

	var context = canvas.getContext('2d');
	setInterval(function() {
		render(context);
		update();
	}, 50);
}