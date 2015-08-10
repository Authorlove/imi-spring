window.onload = function() {
	
	MobileAnima.createTopic({
		warper: "#container",
		containerDiv: "#wrap",
		stages: ".item",
		duration: 550,
		isAutoToNextStage: true,
		isReplay: true,
		isHorizontal: false,
		stageBgs: [],
		swipeCallback: function(param) {
			//console.log(param)
		},
		initedCallback: function() {
			console.log('success');
		}
	});
	MobileAnima.init();




	//事件添加
	//	$('.share_btn--close').on('click', function() {
	//		$('.mod_mask').hide();
	//	})
	//	$('.baoming_btn-bm').live('click', function() {
	//		$('.mod_mask').show();
	//	});
	//	$('.click_btn,.click_tip').live('click', function() {
	//		$('.item--click').addClass('hide');
	//	})
	//	$('.baoming_btn-small,.baoming_btn-share,.share_btn--share').live('click', function() {
	//		$('.mod_dialog').show();
	//	});
	//	$('.dialog_mask').live('click', function() {
	//		$('.mod_dialog').hide();
	//	});
	//	var _play = {
	//		'sy': 0,
	//		'ey': 0,
	//		'len': ''
	//	}
	//	$('.box--click').live('touchstart', function(e) {
	//		_play.len = event.touches.length;
	//		if (_play.len == 1) {
	//			_play.sy = event.targetTouches[0].pageY;
	//		}
	//	})
	//	$('.box--click').live('touchmove', function(e) {
	//		e.preventDefault();
	//		e.stopPropagation();
	//		_play.ey = event.targetTouches[0].pageY;
	//	});
	//	$('.box--click').live('touchend', function(e) {
	//		if (_play.len == 1) {
	//			var aaa = _play.sy - _play.ey;
	//			if (aaa > 50 && _play.len == 1) {
	//				myslider.next();
	//			}
	//		}
	//	})
}