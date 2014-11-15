var list = [
	{
		height :  1136,
		width  :  1136,
		img :  'img/1.jpg'
	},
	{
		height :  640,
		width  :  480,
		img :  'img/2.jpg'
	},
	{
		height :  600,
		width  :  600,
		img :  'img/3.jpg'
	},
	{
		height :  640,
		width  :  640,
		img :  'img/4.jpg'
	},
	{
		height :  534,
		width  :  720,
		img :  'img/5.jpg'
	},
	{
		height :  960,
		width  :  640,
		img :  'img/6.png'
	},
	{
		height :  960,
		width  :  542,
		img :  'img/7.jpg'
	},
	{
		height :  800,
		width  :  533,
		img :  'img/8.jpg'
	},
	{
		height :  600,
		width  :  600,
		img :  'img/9.jpg'
	}
];

function Builder(obj){			//构造函数，接受一个对象数组
	this.dom = obj.dom;
	this.list = obj.list;
	
	//build in 3 steps
	this.init();
	this.renderDOM();
	this.bindDOM();
}

Builder.prototype.init = function(){	//初始化，获得设备值
	this.radio = window.innerHeight/window.innerWidth;
	this.scaleW = window.innerWidth;
	
	//当前图片的索引
	this.idx = 0;
}

Builder.prototype.renderDOM = function(){	//根据传入数组生成ul,li
	var wrap = this.dom;
	var data = this.list;
	var len = data.length;
	var scale = this.scaleW;
	
	this.outer = document.createElement('ul');
	for(var i = 0; i<len; i++){
		var li = document.createElement('li');
		var item = data[i];
		
		li.style.width = scale + 'px';
		li.style.height = window.innerHeight + 'px';
		
		li.style.webkitTransform = 'translate3d('+i*scale+'px,0,0)';
		
		if(item){
			if(item['height']/item['width']>this.radio){
				li.innerHTML = '<img height="'+window.innerHeight+'" src="'+item['img']+'" />';
			}else{
				li.innerHTML = '<img width="'+window.innerWidth+'" src="'+item['img']+'" />';
			}
		}
		
		this.outer.appendChild(li);
	}
	
	this.outer.style.width = scale+'px';
	
	wrap.appendChild(this.outer);
	wrap.style.height = window.innerHeight+'px';
}

Builder.prototype.bindDOM = function(){		//事件绑定
	var self = 	this;
	var scale = self.scaleW;
	var outer = self.outer;
	var len = self.list.length;
	
	
	var startHandler = function(obj){
		self.startX = obj.touches[0].pageX;
		
		self.offsetX = 0;
		
		self.startTime = new Date()*1;
	};
	var moveHandler = function(obj){
		obj.preventDefault();//组织浏览器的默认行为
		
		self.offsetX = obj.touches[0].pageX - self.startX;
		
		//console.log(self.offsetX);
		var lis = outer.getElementsByTagName('li');
		var i = self.idx - 1;
		var m = i + 3;
		
		
		for(i;i<m;i++){			//改变translate3d实现换屏效果
			lis[i] && (lis[i].setAttribute('class','un_donghua'));//消除动画效果实现实时移动
			lis[i] && (lis[i].style.webkitTransform = 'translate3d('+((i-self.idx)*scale+self.offsetX)+'px,0,0)'); 
		}
		
	};
	var endHandler = function(obj){
		var boundary = scale/4;
		
		var endTime = new Date()*1;
		
		var lis = outer.getElementsByTagName('li');
		
		if(endTime - self.startTime > 800){
			if(self.offsetX >= boundary){
				//进入上一屏
				self.go('-1');
			}else if(self.offsetX <= -boundary){
				//进入下一屏	
				self.go('1');
			}else{
				//留在本屏
				self.go('0');
			}
		}else{						//快速操作
			if(self.offsetX > 50){
				//进入上一屏
				self.go('-1');
			}else if(self.offsetX < -50){
				//进入下一屏
				self.go('1');
			}else{
				//留在本屏
				self.go('0');
			}
		}
	};
	
	outer.addEventListener('touchstart',startHandler);
	outer.addEventListener('touchmove',moveHandler);
	outer.addEventListener('touchend',endHandler);
}


Builder.prototype.go = function(num){
	var idx = this.idx;
	var cidx;
	var lis = this.outer.getElementsByTagName('li');
	var len = lis.length;
	var scale = this.scaleW;
	
	if(typeof num === 'number'){
		cidx = num;
	}else if(typeof num === 'string'){
		cidx = idx+num*1;
	}
	
	//当索引从右边超出
	if(cidx > len-1){
		cidx = len-1;
	}else if(cidx < 0){
		cidx = 0;
	}
	
	this.idx = cidx;
	
	//增加动画效果
	lis[cidx].setAttribute('class','donghua');
	lis[cidx-1] && (lis[cidx-1].setAttribute('class','donghua'));
	lis[cidx+1] && (lis[cidx+1].setAttribute('class','donghua'));
	
	
	lis[cidx].style.webkitTransform = 'translate3d(0,0,0)';
	lis[cidx-1] && (lis[cidx-1].style.webkitTransform = 'translate3d(-'+scale+'px,0,0)');
	lis[cidx+1] && (lis[cidx+1].style.webkitTransform = 'translate3d('+scale+'px,0,0)');
	
}





new Builder({
	dom : document.getElementById('canvas'),
	list : list
});













