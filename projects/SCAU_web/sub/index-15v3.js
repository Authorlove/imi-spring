var myjson;
var isOauth;// 判断是否取得Oauth认证

var Index = function() {

	// var isOauth = Utils.getHttpParams("isOauth") == "1";

	UI.initShareTips();// 初始化分享提示

	$('.qrcode').empty().qrcode({
		render : 'image',
		width : 150,
		height : 150,
		size : 150,
		text : window.location.href,
		background : '#ffffff'
	});

	if (ismobile()) {// 判断分享朋友圈提示
		$('.button')[0].addEventListener('click', function() {
			UI.showWXShare();
		});
		$('.blocker').click(function() {
			UI.hideShare();
		})
	} else {
		$('.button').eq(0).click(function(){
			UI.showShare();
		});
		$('.button').eq(1).click(function(){
			UI.hideShare();
		});
	}

	$.ajax({
		url : './111.json',
		dataType : "json",
		callback : function(result) {
			//
		},
		success : function(result) {
			
			init(result.result);// 初始化函数
			if(result.result.contents.type == 'barrage'){//如果为弹幕，则不改变userinId
				PicUrl.shareImg = PicUrl.barrage;
				return;
			}else if(result.result.contents.type == 'wishlist'){
				PicUrl.shareImg = PicUrl.wishlist;
			}else{
				PicUrl.shareImg = PicUrl.hudong;
			}
			if(result.result.contents.userInteractions && result.result.contents.userInteractions.length>0){	
	           	userinId = result.result.contents.userInteractions[0].userinId;
	           	shareTO(userinId);
			}
		},
		error : function(result) {
			//
		}
	})

}();

function init(data) {
	myjson = data;
	isOauth = data.contents.auth;
	if(data.code != '00'){
		//获取信息失败，不做加载
		$('.main article .action').css('background','none');
		return;
	}
	function clickHandler(e){
		Submit.actionClickHandler(e);
	}
	if(data.contents.type == 'wishlist'){//状态为真心话
		if(typeof data.contents.userInteractions =='undefined' 
			|| data.contents.userInteractions.length == 0 ){//信息为空
			UI.createTalkInput(data.contents.wishlist);
	   		if(!isOauth){//判断是否带isOauth
	   			$('.action').click(clickHandler);
	   		}
	   		//绑定真心话提交
	   		$('#wish_btn').live('click',function(){
	   			if(Submit.ban()) return;
	   			Submit.delay();
	   			pushText2();
			});
		} else {
			if (data.contents.userInteractions[0].isYourself) {// 自己的信息
				$(".action .wrapper").remove();
				$(".action").append('<div class="talk-list clearfix"><ul></ul></div>');
				$(".action ul").append(UI.createTalk(data.contents.userInteractions[0]));
			} else {
				UI.createTalkInput(data.contents.wishlist);
		   		if(!isOauth){//判断是否带isOauth
		   			$('.action').click(clickHandler);
		   		}
		   		//绑定真心话提交
		   		$('#wish_btn').live('click',function(){
		   			if(Submit.ban()) return;
		   			Submit.delay();
		   			pushText2();
				});
			}
		}
	} else if (data.contents.type == 'barrage') {// 状态为弹幕
		UI.createDanmuInput();
		if (!isOauth) {
			$('.action').click(clickHandler);
		}
		// 绑定吐槽提交
		$('#ba_btn').live('click', function() {
   			if(Submit.ban()) return;
   			Submit.delay();
   			pushText();
		});
		if(typeof data.contents.userInteractions =='undefined' || data.contents.userInteractions.length == 0 ){//信息为空
			return;
		}
   		CL.cicleDM(data.contents.userInteractions);
   		showDM(CL.getDM());
	}else{//没有互动类型
		$('.main article .action').css('background','none');
	}
}

function ismobile() {
	if ((/iphone|ipad|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
		return true;
	} else {
		return false;
	}
}

// ==========
// = 创建弹幕 =
// ==========
function showDM(data) {
	clearTimeout(DMtimer);
	if(!data.length){return;}
	var len = data.length;
	for (var i = 0; i < len; i++) {
		// 调用UI类接口创建弹幕
		var dm = UI.createDanmu(data[i]);
		var position = UI.createRandomPosition(dm.width());
		UI.addDanmuToContent(dm, position);
		$('.dmitem').hide();
	}
	$('.dmitem').fadeIn();
	setTimeout(function() {
		$('.dmitem').fadeOut();
		var _len = UI._danmuList.length;
		UI._danmuList.splice(0, _len);
		// for(var i=0;i<_len;i++){
		// UI._danmuList.shift();
		// }
		DMtimer = setTimeout(function() {
			$('.dmitem').remove();
			showDM(CL.getDM())
		}, 500)
	}, 3000);

}

var shareInfo = {
	title : $('title').html(),// 分享标题
	desc : $('title').html(),// 分享正文
	url : window.location.origin + window.location.pathname + '?userinId=' + userinId,// 分享URL
	publicName : "",
	webImg : '',
	imgurl : $('.content img').eq(0).attr('src') || PicUrl.shareImg
}

window.onload = function() {

	nie.use([ "nie.util.mobiShare" ], function() {
		shareInfo.url = window.location.origin + window.location.pathname + '?userinId=' + userinId +'&n=' + ChangeURl.query['n'];
		$(function() {
			MobileShare.setting({// 设置分享文案
				title : shareInfo.title,// 分享标题
				desc : shareInfo.desc,// 分享正文
				url : shareInfo.url,// 分享URL
				imgurl : shareInfo.imgurl,
				callback:function(e){
					// ChangeURl.addN();
					// ChangeURl.sendN();
				}
			});
		});
	});
	
}


