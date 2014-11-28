/*加载数据*/
function displayInfo (argument) {
	var headPictury=document.getElementsByClassName('head_img')[0].firstChild;
	var background=document.body.getElementsByTagName('img')[0];
	var wrap_name=document.getElementsByClassName('wrap_name')[0];
	wrap_name.innerHTML=data.name;
	background.setAttribute("src",''+data.headimg);
	headPictury.setAttribute("src",data.headimg);
	var headline_up = document.getElementById('headline_up');
	var headline_bot=document.getElementById('headline_bot');
/*判断教务处*/
if (data.jwc) {
		if(data.course!=='暂无数据'){
			header_bot.innerHTML=
			'<li class="fl">'+
				'<div class="st">'+
					'今日课程<span class="r_line"></span>'+
					'<br/><span class="wrap_num">'+data.course+'<span>门</span></span>'+
				'</div>'+
			'</li>';
		}else{
			header_bot.innerHTML=
			'<li class="fl">'+
				'<div class="st">'+ 
					'今日课程<span class="r_line"></span>'+
					'<br/><span class="no_wrap_num">暂无数据</span>'+
				'</div>'+	
			'</li>';
		}
		headline_up.innerHTML='<li class="on"><a href="/'+aid+'/user/jwc">我的教务处</a></li>';

		headline_bot.innerHTML='<li><a href="javascript:void(0)">成绩分析</a></li>';
	}else{
		header_bot.innerHTML=
		'<li class="fl">'+
			'<div class="st">'+
				'今日课程<span class="r_line"></span>'+
				'<br/><span class="no_wrap_num">未登录</span>'+
			'</div>'+
		'</li>';

		headline_up.innerHTML='<li><a href="/'+aid+'/jwc/show?state=home">我的教务处<div class="denglu">登陆</div></a></li>';
	}
	/*判断一卡通*/
	if (data.ecard) {
		if(data.balance!=='暂无数据'){
			var errorcode = JSON.parse(data.balance);
			if(errorcode.errcode){
				header_bot.innerHTML+=
				'<li class="fl">'+
					'<div class="nd">'+
						'校园卡余额<span class="r_line"></span>'+
						'<br/><span class="no_wrap_num">暂无数据</span>'+
					'</div>'+
				'</li>';
			}else{
				header_bot.innerHTML+=
				'<li class="fl">'+
					'<div class="nd">'+
						'校园卡余额<span class="r_line"></span>'+
						'<br/><span class="wrap_num">'+data.balance+'<span>元</span></span>'+
					'</div>'+	
				'</li>';
			}
		}else{
			header_bot.innerHTML+=
			'<li class="fl">'+
				'<div class="nd">'+
					'校园卡余额<span class="r_line"></span>'+
					'<br/><span class="no_wrap_num">暂无数据</span>'+
				'</div>'+
			'</li>';
		}
		

		headline_up.innerHTML+='<li class="on"><a href="/'+aid+'/user/ecard">我的一卡通</a></li>';

		headline_bot.innerHTML+='<li><a href="javascript:void(0)">消费统计</a></li>';

	}else{
		header_bot.innerHTML+=
		'<li class="fl">'+
			'<div class="nd">'+
				'校园卡余额<span class="r_line"></span>'+
				'<br/><span class="no_wrap_num">未登录</span>'+
			'</div>'+		
		'</li>';

		headline_up.innerHTML+='<li><a href="/'+aid+'/ecard/show?state=home">我的一卡通<div class="denglu">登陆</div></a></li>';
	}
	/*判断图书馆*/
	if (data.library) {
		if(data.lending!=='暂无数据'){
			header_bot.innerHTML+=
			'<li class="fl">'+
				'<div class="rd">'+
					'图书馆借阅'+
					'<br/><span class="wrap_num">'+data.lending+'<span>本</span></span>'+
				'</div>'+
			'</li>';
		}else{
			header_bot.innerHTML+=
			'<li class="fl">'+
				'<div class="rd">'+
					'图书馆借阅'+
					'<br/><span class="no_wrap_num">暂无数据</span>'+
				'</div>'+	
			'</li>';
		}
		

		headline_up.innerHTML+='<li class="on"><a href="/'+aid+'/user/library">我的图书馆</a></li>';

		headline_bot.innerHTML+='<li><a href="javascript:void(0)">借阅统计</a></li>';
	}else{
		header_bot.innerHTML+=
		'<li class="fl">'+
			'<div class="rd">'+
				'图书馆借阅'+
				'<br/><span class="no_wrap_num">未登录</span>'+
			'</div>'+
		'</li>';

		headline_up.innerHTML+='<li><a href="/'+aid+'/library/show?state=home">我的图书馆<div class="denglu">登陆</div></a></li>';
	}

	if (!data.jwc&!data.ecard&!data.library) {
		document.getElementsByClassName('nav')[1].style.border='0';
		document.getElementsByClassName('no_login')[0].innerHTML='您还没有登陆<br/>暂时没有相关数据'
		//document.body.innerHTML+='<div class="no_login"></div>';
	}

}
/*end*/
	displayInfo();
	window.onload = function(){
		stackBlurImage('blur-bgc','canvas',20,true);
		document.getElementsByClassName('loading_page')[0].style.display = 'none';
	}
