<style>
	@import "../common/css/_reset.css";
	html {
		background-color: #fff;
	}
	
	body {
		position: relative;
	}
	
	html,
	body,
	.container,
	.header {
		min-width: 980px;
		max-width: 100%;
		width: 100%;
	}
	
	
</style>
<template>
	<div class="container" id="container">
		<t-header></t-header>
		<t-main></t-main>
		
	</div>
</template>

<script>
	import header from '../components/header.vue'
	import main from '../components/main.vue'
	module.exports = {
		components: {
			't-header': header,
			't-main': main
		},
		data: {

		},
		watch: {

		},
		computed: {

		},
		methods: {

		},
		created() {
			
		},
		mounted() {
			
		}

	}
</script>