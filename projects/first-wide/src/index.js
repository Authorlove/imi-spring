
addEventListener('DOMContentLoaded', function() {
	let opt = require('./index.vue');
	
	window.EVENT_HUB = new Vue();
	let app = new Vue(opt).$mount('#app');
	window.app = app;
	


});