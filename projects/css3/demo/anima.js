;
var MobileAnima = function() {
	//后面会用到的变量
	var _broswer,
		_startP,
		$warper, $containerDiv, $stages,
		_ua = navigator.userAgent.toLowerCase(),
		_css3pre = '',
		_isScrolling = false,
		_count = 0,
		_curStageIndex = 0,
		_stagesEles = {},
		_imglist = [],
		_preloading = false,
		_options = null;

	//判断当前浏览器类型
	if (_ua.match(/msie([\d.]+)/)) {
		_broswer = "ie";
	}
	if (_ua.match(/firefox([\d.]+)/)) {
		_broswer = "firefox";
	}
	if (_ua.match(/chrome([\d.]+)/)) {
		_broswer = "chrome";
	}
	if (_ua.match(/opera([\d.]+)/)) {
		_broswer = "opera";
	}
	if (_ua.match(/version\/([\d.]+).*safari/)) {
		_broswer = "safari";
	}

	//加上浏览器前缀
	switch (_broswer) {
		case "ie":
			_css3pre = "-ms-";
			break;
		case "firefox":
			_css3pre = "-moz-";
			break;
		case "chrome":
			_css3pre = "-webkit-";
			break;
		case "opera":
			_css3pre = "-o-";
			break;
		case "safari":
			_css3pre = "-webkit-";
			break;
		default:
			_css3pre = "";
			break;
	}



	//创建每一屏的动画元素,内部类
	function _createAnimateEle(options) {
		this.options = $.extend({
			stageIndex: null, //当前元素所属屏的索引值
			ele: null, //动画元素的Id
			imgUrl: "", //动画元素的背景图，可不填
			forwardInClass: "", //className,从上一场屏到当前屏时，给动画元素添加的样式表名，可选，不填则场景加载不对元素进行处理，仅设置其背景图
			backInClass: "", //className,从下一屏返回到当前屏时，给动画元素添加的样式表，若不传，且isReplay为true,则取值与forwardInClass参数一致，
			outClass: "", //className,退出当前场景时给元素添加的样式表名，若不传，则仅根据实际情况去掉当前forwardInClass或backInClass,，可选
			finishCallback: null //回调
		}, options || {});

		this.init();

		if (this.options.imgUrl && this.options.imgUrl != "") {
			_imglist.push(this.options.imgUrl);
		}
		if (typeof _stagesEles[this.options.stageIndex] == "undefined") {
			_stagesEles[this.options.stageIndex] = [];
		}
		_stagesEles[this.options.stageIndex].push(this);
	}

	_createAnimateEle.prototype = { //对象私有方法
		constructor: _createAnimateEle,

		init: function() { //对象初始化
			var csstrans = {};

			if (this.options.imgUrl && this.options.imgUrl != "") {
				csstrans["background-image"] = "url(" + this.options.imgUrl + ")";
				$(this.options.ele).css(csstrans);
			}
		},

		reset: function() {
			if ($(this.options.ele).hasClass(this.options.forwardInClass)) {
				$(this.options.ele).removeClass(this.options.forwardInClass)
			}
			if ($(this.options.ele).hasClass(this.options.backInClass)) {
				$(this.options.ele).removeClass(this.options.backInClass)
			}
			if (this.options.outClass != "") {
				$(this.options.ele).addClass(this.options.outClass);
				var self = this;
				var st = setTimeout(function() {
					$(self.options.ele).removeClass(self.options.outClass);
				}, _duration)
			}
		},

		play: function(isBackIn) {
			//return;
			if ($(this.options.ele).hasClass(this.options.outClass)) {
				$(this.options.ele).removeClass(this.options.outClass)
			}
			if (isBackIn) {
				var aniClass = "";
				if (this.options.backInClass != "") {
					aniClass = this.options.backInClass;
				} else {
					aniClass = this.options.forwardInClass;
				}
				$(this.options.ele).addClass(aniClass)
			} else {
				$(this.options.ele).addClass(this.options.forwardInClass)
			}
			if (typeof this.options.finishCallback == "function") {
				this.options.finishCallback();
			}

		}
	}

	function _scrollNext(isHand) {
		if (!_options.isAutoToNextStage && !isHand) {
			_options.swipeCallback({
				curStageIndex: _curStageIndex,
				swipeTo: 1
			});
			return;
		}
		if (!_isScrolling) {
			var csstrans = {};
			if (_curStageIndex == _count - 1) {
				return false;
			}
			_curStageIndex++;
//			if (!$stages.eq(_curStageIndex).hasClass("inited")) {
//				$stages.eq(_curStageIndex).addClass("inited")
//			}
			var translate = 0;
			//横屏or竖屏
			if (_options.isHorizontal) {
				translate = -$containerDiv[0].offsetWidth / _count * _curStageIndex;
				//csstrans[_css3pre + "transform"] = "translate(" + translate + "px,0)";
				$containerDiv.css({"-webkit-transform": "translate("+translate+"px,0)"});
			} else {
				translate = -$containerDiv[0].offsetHeight / _count * _curStageIndex;
				//csstrans[_css3pre + "transform"] = "translate(0," + translate + "px)";
				$containerDiv.css({"-webkit-transform": "translate(0,"+translate+"px)"});
			}
			_isScrolling = true;
			if (_options.isReplay) {
				$(_stagesEles[_curStageIndex - 1]).each(function(index, item) {
					item.reset();
				})
			}
			$(_stagesEles[_curStageIndex]).each(function(index, item) {
				setTimeout(function() {
					item.play();
				}, _options.duration);
			})
			var st = setTimeout(function() {
				_isScrolling = false;
			}, _duration);
			if (typeof _options.swipeCallback == "function") {
				_options.swipeCallback({
					preStageIndex: _curStageIndex - 1,
					curStageIndex: _curStageIndex
				})
			}
		}
	}

	function _scorllBack(isHand) {
		if (!_options.isAutoToNextStage && !isHand) {
			_options.swipeCallback({
				curStageIndex: _curStageIndex,
				swipeTo: -1
			});
			return;
		}
		if (!_isScrolling) {
			var csstrans = {};
			if (_curStageIndex == 0) {
				return false;
			}
			_curStageIndex--;
			var translate = 0;
			if (_options.isHorizontal) {
				translate = -$containerDiv[0].offsetWidth / _count * _curStageIndex;
//				csstrans[_css3pre + "transform"] = "translate(" + translate + "px,0)";
				$containerDiv.css({"-webkit-transform": "translate("+translate+"px,0)"});
			} else {
				translate = -$containerDiv[0].offsetHeight / _count * _curStageIndex;
//				csstrans[_css3pre + "transform"] = "translate(0," + translate + "px)";
				$containerDiv.css({"-webkit-transform": "translate(0,"+translate+"px)"});
			}
			_isScrolling = true;
			if (_options.isReplay) {
				$(_stagesEles[_curStageIndex + 1]).each(function(index, item) {
					item.reset();
				})
				$(_stagesEles[_curStageIndex]).each(function(index, item) {
					setTimeout(function() {
						item.play(true);
					}, _options.duration);
				})
			}
			var st = setTimeout(function() {
				_isScrolling = false;
			}, _duration);
			if (typeof _options.swipeCallback == "function") {
				_options.swipeCallback({
					preStageIndex: _curStageIndex + 1,
					curStageIndex: _curStageIndex
				})
			}

		}
	}

	function _scrollTo(stageIndex) {
		if (!_isScrolling) {
			var csstrans = {};
			var isBack = false;
			if (stageIndex < _curStageIndex) {
				isBack = true;
			}
			var translate = 0;
			if (_options.isHorizontal) {
				translate = -$containerDiv[0].offsetWidth / _count * stageIndex;
//				csstrans[_css3pre + "transform"] = "translate(" + translate + "px,0)"
				$containerDiv.css({"-webkit-transform": "translate("+translate+"px,0)"});
			} else {
				translate = -$containerDiv[0].offsetHeight / _count * stageIndex;
//				csstrans[_css3pre + "transform"] = "translate(0," + translate + "px)"
				$containerDiv.css({"-webkit-transform": "translate(0,"+translate+"px)"});
			}
			$containerDiv.css(csstrans);
			_isScrolling = true;
			if (_options.isReplay) {
				$(_stagesEles[_curStageIndex]).each(function(index, item) {
					item.init();
				})
			}
			$(_stagesEles[stageIndex]).each(function(index, item) {
				setTimeout(function() {
					item.play(isBack);
				}, _options.duration);
			})
			_curStageIndex = stageIndex;
			var st = setTimeout(function() {
				_isScrolling = false;
			}, _duration);
			if (typeof _options.swipeCallback == "function") {
				//_options.swipeCallback({curStageIndex:stageIndex,swipeTo:isBack?-1:1})
			}
		}
	}



	//事件处理程序
	var _events = {
		click_target: "",
		isScrolling: false,
		startP: {
			x: 0,
			y: 0,
			time: undefined
		},
		endP: {
			x: 0,
			y: 0,
			time: undefined
		},

		handleEvent: function(event) {
			switch (event.type) {
				case 'touchstart':
					this.start(event);
					break;
				case 'touchmove':
					this.move(event);
					break;
				case 'touchend':
					this.end(event);
					break;
			}
		},

		start: function(event) {
			var touches = event.touches[0];
			this.startP = {
				x: touches.pageX,
				y: touches.pageY,
				time: +new Date
			}
		},

		move: function(event) {
			if (event.touches.length > 1 || event.scale && event.scale !== 1) {
				return;
			}
			event.preventDefault();
			var touches = event.touches[0];
			this.endP.x = touches.pageX - this.startP.x;
			this.endP.y = touches.pageY - this.startP.y;
			//console.log(this.endP.y)
		},

		end: function(event) {
			var click_time = this.endP.time - this.startP.time;
			var isChgX, isChgY;
			if (click_time > 800) {
				isChgX = Math.abs(this.endP.x) > $warper.width() / 4;
				isChgY = Math.abs(this.endP.y) > $warper.height() / 4;
			} else {
				isChgX = Math.abs(this.endP.x) > 50;
				isChgY = Math.abs(this.endP.y) > 50;
			}
			if (isChgX && isChgY) {
				if (Math.abs(this.endP.x) > Math.abs(this.endP.y)) {
					isChgY = false;
				} else {
					isChgX = false;
				}
			}
			if (isChgX) {
				if (_options.isHorizontal) {
					if (this.endP.x < 0) { //向右
						_scrollNext();

					} else { //向左
						_scorllBack();
					}
				}
			}

			if (_options.isHorizontal) {
				return;
			}
			if (isChgY) {
				if (this.endP.y < 0) { //向下
					_scrollNext();
				} else { //向上
					_scorllBack();
				}
			}
		}
	}


	//绑定事件
	function _addEvent() {
		$warper[0].addEventListener('touchstart', _events, false);
		$warper[0].addEventListener('touchmove', _events, false);
		$warper[0].addEventListener('touchend', _events, false);
		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function(e) {
			_onorientationchange(e);
		}, false);
		window.addEventListener("resize", function(e) {
			_resize(e);
		}, false)
	}




	function _onorientationchange(e) {
		if (window.orientation == 90 || window.orientation == -90) {
			$("#forhorview").css("display", "-webkit-box");
			$("#content").css({
				"height": $(window).height(),
				"width": $(window).height() * 2 / 3,
				"margin": "auto"
			});
			$stages.css({
				"height": "480px"
			})
		} else {
			$("#content").css({
				"width": "auto",
				"margin": "auto",
				"height": "100%"
			});
			$stages.css({
				"height": $("#content")[0].offsetHeight
			})
			$("#forhorview").css("display", "none");
		}
		_resize(e);
	}

	function _resize(event) {
		if (window.orientation == 90 || window.orientation == -90) {
			return;
		}
		if (_options.isHorizontal) {
			$containerDiv.css("width", $(window).width() * _count);
			$stages.css({
				"width": $(window).width()
			});
			var left = 0 - $containerDiv[0].offsetWidth / _count * _curStageIndex;
			var csstrans = {};
			csstrans[_css3pre + "transform"] = "translate(" + left + "px,0)";
			$containerDiv.css(csstrans);//微信下不能加
		} else {
			$containerDiv.css("height", $(window).height() * _count);
			$stages.css({
				"height": $(window).height()
			});
			var top = 0 - $containerDiv[0].offsetHeight / _count * _curStageIndex;
			var csstrans = {};
			csstrans[_css3pre + "transform"] = "translate(0," + top + "px)";
			$containerDiv.css(csstrans);//微信下不能加
		}
	}



	function _preLoadImages(callback) {
		var loadedCount = 0;

		function preLoadImg(imgurl) {
			var img = new Image();
			img.onload = function() {
				loadedCount++
				if (loadedCount == _imglist.length) {
					callback();
				}
			}
			img.src = imgurl;
		}

		if (_imglist.length > 0) {
			$(_imglist).each(function(index, imgurl) {
				preLoadImg(imgurl);
			})

		} else {
			callback();
		}
	}

	function _createTopic(options) {

		_options = $.extend({
			warper: "",
			containerDiv: "",
			stages: "",
			duration: 800,
			stageBgs: [],
			isHorizontal: false,
			isAutoToNextStage: true,
			swipeCallback: function(param) {},
			initedCallback: function() {

			}
		}, options || {});
		$warper = $(_options.warper);
		$containerDiv = $(_options.containerDiv),
			$stages = $containerDiv.find(_options.stages);
		_duration = _options.duration;
		_count = $stages.length;
		
		$containerDiv.css("-webkit-transition", "-webkit-transform " + _options.duration + "ms ease-in-out");
		
		if (_options.isHorizontal) {
			$containerDiv.css("width", $("#content")[0].offsetWidth * _count);
			$stages.css({
				"width": $("#content")[0].offsetWidth,
				"float": "left"
			});
		} else {
			$containerDiv.css("height", $("#content")[0].offsetHeight * _count);
		}
		$stages.css("height", $("#content")[0].offsetHeight);
		$stages.each(function(index, item) {
			_stagesEles[index] = [];
		})
		if (_options.stageBgs.length > 0) {
			$(_options.stageBgs).each(function(index, item) {
				_imglist.push(item);
			})
		}
		//$stages.eq(0).addClass("inited");
	}

	function _init() {
		if (window.orientation == 90 || window.orientation == -90) {
			$("#forhorview").css("display", _css3pre + "box");
		}
		var stageBgs = _options.stageBgs;
		_preLoadImages(function() {
			$stages.each(function(index, item) {
				if (stageBgs.length > index && stageBgs[index] != "") {
					$(item).css({
						"background-image": "url(" + stageBgs[index] + ")"
					});
				}
			})
			$("#loading").hide();
			//if(this.options.isAutoToNextStage){
			_scrollTo(0)
				//}
		})
		_addEvent();
		if (typeof _options.initedCallback == "function") {
			_options.initedCallback();
		}
	}







	return {
		createTopic: function(options) {
			_createTopic(options)
		},
		createAnimateEle: function(options) {
			new _createAnimateEle(options)
		},
		init: function() {
			_init();
		},
		getAinmateEles: function() {
			return _stagesEles;
		},
		scorllTo: function(stageIndex) {
			_scrollTo(stageIndex);
		},
		next: function() {
			_scrollNext(true);
		},
		back: function() {
			_scorllBack(true);
		}
	}


}();