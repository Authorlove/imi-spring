function move(x, y) {
    this.x += x;
    this.y += y;
}



Function.prototype.mbind = function(obj,x,y){
	var self = this;
	return function(){
		self.call(obj,x,y);
	}
	
	
}

var point = {x:1, y:2};
var pointmove = move.mbind(point, 2, 2);


pointmove();
alert(point.x);
