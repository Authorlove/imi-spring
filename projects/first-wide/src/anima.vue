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
		display: flex;
		position: fixed;
		min-width: 980px;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		background-color: #fff;
	}
	
	.logo {
		position: relative;
		width: 246px;
		height: 70px;
		margin-right: 150px;
	}
	
	.logo img {
		width: 100%;
	}
	
	.text {
		font-size: 40px;
		margin-bottom: 15px;
	}
	
	@-webkit-keyframes fadeInDown {
		0% {
			opacity: 0;
			-webkit-transform: translateY(-20px)
		}
		100% {
			opacity: 1;
			-webkit-transform: translateY(0)
		}
	}
	
	@-moz-keyframes fadeInDown {
		0% {
			opacity: 0;
			-moz-transform: translateY(-20px)
		}
		100% {
			opacity: 1;
			-moz-transform: translateY(0)
		}
	}
	
	#animation_logo {
		-webkit-animation: fadeInDown 1s 1.5s ease both,pulse 2s 2.5s ease both infinite;
		-moz-animation: fadeInDown 1s 1.5s ease both,pulse 2s 2.5s ease both infinite;
	}
	
	@-webkit-keyframes pulse {
		0% {
			-webkit-transform: scale(1)
		}
		50% {
			-webkit-transform: scale(1.1)
		}
		100% {
			-webkit-transform: scale(1)
		}
	}
	
	@-moz-keyframes pulse {
		0% {
			-moz-transform: scale(1)
		}
		50% {
			-moz-transform: scale(1.1)
		}
		100% {
			-moz-transform: scale(1)
		}
	}
	
	.logo_a {
		position: absolute;
		height: 70px;
		top: 0;
	}
	
	.logo_a__left {
		width: 112px;
		left: 0;
	}
	
	.logo_a__right {
		width: 134px;
		right: 0;
	}
	
	#animation_top {
		-webkit-animation: fadeInLeftBig 1s .5s ease-in-out both;
		-moz-animation: fadeInLeftBig 1s .5s ease-in-out both;
	}
	
	#animation_body {
		-webkit-animation: fadeInLeftBig 1s 1.5s ease-in-out both;
		-moz-animation: fadeInLeftBig 1s 1.5s ease-in-out both;
	}
	
	#animation_bot {
		-webkit-animation: fadeInLeftBig 1s 2.5s ease-in-out both;
		-moz-animation: fadeInLeftBig 1s 2.5s ease-in-out both;
	}
	
	@-webkit-keyframes fadeInLeftBig {
		0% {
			opacity: 0;
			-webkit-transform: translateX(-2000px)
		}
		100% {
			opacity: 1;
			-webkit-transform: translateX(0)
		}
	}
	
	@-moz-keyframes fadeInLeftBig {
		0% {
			opacity: 0;
			-moz-transform: translateX(-2000px)
		}
		100% {
			opacity: 1;
			-moz-transform: translateX(0)
		}
	}
	
	#animation_line__top {
		-webkit-animation: fadeOutUpBig 1s .2s ease both;
		-moz-animation: fadeOutUpBig 1s .2s ease both;
	}
	
	#animation_line__left {
		-webkit-animation: fadeOutLeftBig 1s .2s ease both;
		-moz-animation: fadeOutLeftBig 1s .2s ease both;
	}
	
	@-webkit-keyframes fadeOutUpBig {
		0% {
			-webkit-transform: translateY(-2000px)
		}
		100% {
			-webkit-transform: translateY(0)
		}
	}
	
	@-moz-keyframes fadeOutUpBig {
		0% {
			-moz-transform: translateY(0)
		}
		100% {
			-moz-transform: translateY(-2000px)
		}
	}
	
	@-webkit-keyframes fadeOutLeftBig {
		0% {
			-webkit-transform: translateX(-2000px)
		}
		100% {
			-webkit-transform: translateX(0)
		}
	}
	
	@-moz-keyframes fadeOutLeftBig {
		0% {
			-moz-transform: translateX(0)
		}
		100% {
			-moz-transform: translateX(-2000px)
		}
	}
	
	.line_one {
		height: 200px;
		width: 5px;
		position: absolute;
		margin-left: -2.5px;
		left: 50%;
		background-color: #000;
		bottom: -200px;
	}
	
	.line_two {
		width: 200px;
		height: 5px;
		position: absolute;
		margin-top: -2.5px;
		top: 50%;
		background-color: #000;
		right: -200px;
	}
</style>
<template>

	<div class="container" id="container">
		<div class="logo" id="animation_logo">
			<img src="../images/minilogo2.png" />
			<a href="javascript:" class="logo_a logo_a__left"></a>
			<a href="javascript:" class="logo_a logo_a__right"></a>
		</div>
		<div class="text">
			<div class="text" id="animation_top">THE</div>
			<div class="text" id="animation_body">BESPOKE</div>
			<div class="text" id="animation_bot">EXPERIENCE</div>
		</div>
		<div class="line_one" id="animation_line__top"></div>
		<div class="line_two" id="animation_line__left"></div>
	</div>

</template>

<script>
	module.exports = {
		components: {

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