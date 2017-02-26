'use strict';

module.exports = {
	initImg: function(cla, size) {
		return lib.img({
			'class': cla,
			'size': size,
			'dataSrc': 'data-src',
			'sharpen': 's150',
			'q': ['q75', 'q50'],
			'enableLazyload': true,
			'enalbeIOSWifiLoadMore': true,
			'container': '#container'
		});
	},
	throttle: function(func, wait) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		var later = function() {
			previous = Date.now();
			timeout = null;
			result = func.apply(context, args);
		};
		return function() {
			var now = Date.now();
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if(remaining <= 0) {
				clearTimeout(timeout);
				timeout = null;
				previous = now;
				result = func.apply(context, args);
			} else if(!timeout) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	},
	getCookie: function(NameOfCookie) {
		if(document.cookie.length > 0) {
			var begin = document.cookie.indexOf(NameOfCookie + "=");
			if(begin != -1) {
				begin += NameOfCookie.length + 1; //cookie值的初始位置   
				var end = document.cookie.indexOf(";", begin); //结束位置   
				if(end == -1) end = document.cookie.length; //没有;则end为字符串结束位置   
				return unescape(document.cookie.substring(begin, end));
			}
		}
	},
	initAppear: function(cla, once, callback) {
		return lib.appear.init({
			cls: cla, //可选，需要遍历的元素
			once: once, //可选，是否只触发一次
			x: 0, //可选，容器右边距离x以内的元素加载，默认为0
			y: 0, //可选，容器底部距离y以内的元素加载，默认为0
			onAppear: callback
		});
	},
	goto: function(href, element, localRefresh, replace) {
		if(!href) {
			return;
		}
		var httpurl = new lib.httpurl(href);
		if(element && window.g_SPM && window.g_SPM.spm) {
			try {
				if(!httpurl.params.spm) {
					httpurl.params.spm = window.g_SPM.spm(element);
				}
			} catch(ex) {}
		}

		if(replace) {
			var pageLocation = new lib.httpurl(location.href);
			if(pageLocation.params.from && pageLocation.params.from == "1") {
				Ali.popWindow(function(result) {
					if(result.errorCode) {
						// 这里必须这样做，因为手淘旧版无法打开新的页面，异常后需要处理一下
						location.replace(httpurl.toString());
					}
				});
			} else {
				location.replace(httpurl.toString());
			}
			return;
		}

		href = httpurl.toString();

		if(localRefresh || !lib.env.aliapp) {
			setTimeout(function() {
				location.href = href;
			}, 100);
			return;
		}

		if(lib.env.aliapp) {
			//天猫环境
			if(lib.env.aliapp.appname === 'TM' && Ali) {
				Ali.pushWindow(href, function(data) {
					if(data.errorCode) {
						// 这里必须这样做，因为手淘旧版无法打开新的页面，异常后需要处理一下
						window.open(href);
					}
				});
				return;
			}
			//支付宝环境
			if(lib.env.aliapp && lib.env.aliapp.appname === 'AP') {
				setTimeout(function() {
					location.href = href;
				}, 100);
				return;
			}
		}

		//兼容支付宝等没有引入windvane
		lib.windvane.call('Base', 'openWindow', {
			url: href
		}, function(result) {}, function(result) {
			setTimeout(function() {
				location.href = href;
			}, 100);

		});
	},

	createDate: function(time) {
		var oldDate = new Date(+time)
		var oldTime = oldDate.getFullYear() + '-' + (oldDate.getMonth() + 1) + '-' + oldDate.getDate()

		var date = (+new Date) - time
		var _seconds = {
			time: '刚刚',
			interval: 1000
		}
		if(date <= 0) return _seconds;
		var seconds = date / 1000
		var minutes = 0
		var hours = 0
		var days = 0
		var years = 0
		minutes = seconds / 60
		var _minutes = {
			time: (minutes | 0) + '分钟前',
			interval: 60000
		}
		hours = minutes / 60
		var _hours = {
			time: (hours | 0) + '小时前',
			interval: 360000
		}
		days = (hours / 24) | 0

		var _days = {
			time: days > 10 ? oldTime : (days + '天前'),
			interval: -1
		}
		years = days / 365
		var _years = {
			time: (years | 0) + '年前',
			interval: -1
		}
		var _ary = [_years, _days, _hours, _minutes, _seconds]
		var ary = [years, days, hours, minutes, seconds]
		var lock = !1
		var rz = {
			time: "刚刚",
			interval: -1
		}
		ary.forEach(function(v, i) {
			if(lock) return;
			if(v >= 1) {
				lock = !0
				rz = _ary[i]
			}
		})
		ary = _ary = null
		return rz
	}
}