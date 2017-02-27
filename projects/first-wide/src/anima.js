addEventListener('DOMContentLoaded', function() {
	let opt = require('./anima.vue');
	
	let app = new Vue(opt).$mount('#app');
	window.app = app;
	


});