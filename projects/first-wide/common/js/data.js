// 
//  data.js
//  评论列表数据层
//  
//  Created by 梓栋 on 2016-12-21.
//  Copyright 2016 梓栋. All rights reserved.
// 

window.api = {
	hotlist:'mtop.taobao.social.comment.hotlist',
	commentlist:'mtop.taobao.social.comment.list',
	add:'mtop.taobao.social.comment.add.h5',/*发表评论*/
	addLike:'mtop.taobao.social.like.add',/*点赞*/
	removeLike:'mtop.taobao.social.like.remove',/*取消赞*/
	report:'mtop.taobao.social.report.add',/*举报*/
	deleteComment:'mtop.taobao.social.comment.delete'/*删除评论*/
}


module.exports = {
	getHot(options,success,failure){
		var params = {
			api: api.hotlist,
			data: options,
			ecode: 0,
			v:'1.0'
		}
		this._fetchData(params, success, failure);
	},
	getList(options,success,failure){
		var params = {
			api: api.commentlist,
			data: options,
			ecode: 0,
			v:'1.0'
		}
		this._fetchData(params, success, failure);
	},
	addComment(options,success,failure){
		var params = {
			api: api.add,
			data: options,
			type: 'POST',
			ecode: 0,
			v:'1.0'
		}
		this._fetchData(params, success, failure);
	},
	addLike(options,success,failure){
		options.namespace = 1007
		var params = {
			api: api.addLike,
			data: options,
			ecode: 0,
			v:'1.0'
		}
		this._fetchData(params, success, failure);
	},
	removeLike(options,success,failure){
		options.namespace = 1007
		var params = {
			api: api.removeLike,
			data: options,
			ecode: 0,
			v:'1.0'
		}
		this._fetchData(params, success, failure);
	},
	report(options,success,failure){
		options.namespace = 6000//固定参数
		var params = {
			api: api.report,
			data: options,
			ecode: 0,
			v:'1.0'
		}
		this._fetchData(params, success, failure);
	},
	deleteComment(options,success,failure){
		var params = {
			api: api.deleteComment,
			data: options,
			ecode: 0,
			v:'1.0'
		}
		this._fetchData(params, success, failure);
	},
	
	_fetchData: function(params, success, failure) {
		if (!params.v) {
			params.v = '1.0';
		}
		//FIXME:不加这两句代码，ecode=1,请求被mtop拦截后，输入用户名密码，返回到业务页面，不能刷新，防备此天坑
		params.timeout = 300000;
		params.timer = 300000;


		lib.mtop.request(params, function(json) {
			if (json.ret && (json.ret[0] === "SUCCESS::调用成功")) {
				success && success(json.data);
			} else {
				if (json && json.data) {
					success && success(json.data);
				} else {
					failure && failure(json);
				}
			}
		}, function(json) {
			if (json && json.ret && json.retType === lib.mtop.RESPONSE_TYPE.SESSION_EXPIRED) {
				console.warn('SESSION失效，请重新登录');
				lib.login.goLogin();
			} else {
				failure && failure(json);
			}
		});
	}
}