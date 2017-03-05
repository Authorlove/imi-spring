<style>
	.mod_wrap {
		padding: 100px 0;
		width: 980px;
		margin: 0 auto;
	}
	
	.about_logo {
		float: left;
	}
	
	.about_logo img {
		height: 34px;
	}
	
	.mod_tit {
		font-size: 36px;
		color: rgb(133, 126, 124);
		margin-bottom: 20px;
	}
	
	.mod_des {
		color: rgb(133, 126, 124);
		font-size: 20px;
		line-height: 1.5;
		margin-bottom: 100px;
	}
	
	.about_show {
		display: flex;
		margin-bottom: 80px;
	}
	
	.about_show__left {
		width: 420px;
	}
	
	.about_icon img {
		height: 40px;
	}
	
	.about_show__tit {
		font-size: 32px;
		line-height: 1.3;
		margin-bottom: 20px;
	}
	
	.about_show__tit--color {
		color: #dd846a;
	}
	.about_show__tit--colortwo {
		color: #d15f96;
	}
	.about_show__des {
		font-size: 16px;
		margin-bottom: 20px;
		line-height: 1.2;
	}
	
	.about_show__right {
		width: 540px;
		margin-left: 20px;
	}
	
	.about_show__row {
		display: flex;
	}
	
	.about_pic {
		position: relative;
		width: 270px;
		height: 320px;
		background-size: cover;
		background-position: center;
	}
	
	.about_pic__wrap {
		position: absolute;
		width: 220px;
		height: 80px;
		left: 50%;
		margin-left: -110px;
		bottom: 20px;
	}
	
	.about_pic__mask {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		opacity: .8;
		background-color: #dd846a;
	}
	.about_pic__mask--col{
		background-color: #d15f96;
	}
	
	.about_pic__text {
		padding-top: 5px;
		position: relative;
		z-index: 10;
		text-align: center;
	}
	
	.about_pic__text--top {
		
	}
	.about_pic__text--up{
		font-size: 14px;
	}
	.about_show--two .about_pic__text{
		color: #fff;
	}
</style>
<template>
	<div class="mod_wrap">
		<div class="about_logo">
			<img src="../images/us.png" alt="" />
		</div>
		<div class="mod_tit">/ About Us</div>
		<div class="mod_des">
			A multi-solution agency, joined together with two brands: iMi and Spring, with the primary goal on creating the bespoke solutions that for your targeting audiences. The sky is never the limit, we understand the requirements from your targeted audiences, create the solution that cater to your needs. Through sales outreach programs, performance improvements, incentive program, travel and live events. No matter whether it is your consumer or key accounts you trying to impress, or your dealers distributor or your elite sales team you trying to engage up to another level, we will keep it humming.
		</div>
		
		<!--show one-->
		<div class="about_show">
			<div class="about_show__left">
				<!--<div class="about_icon">
					<img src="../images/logo.jpg" />
				</div>-->
				<div class="about_show__tit">The Bespoke<br /><span class="about_show__tit--color">ENGAGEMENT</span><br />Solution </div>
				<p class="about_show__des">You have so many audiences that you want to inspire, to engage, to get them in the loop. Your employees, your customers, your channel distributors, and further the massive market audiences out there. But how to turn around the theory and the your blueprint into something that is practicable and visible, is our expertise.
				</p>
				<p class="about_show__des">Our solutions can be everywhere without your noticing them, but that is how wonder of engagement is working. We look into people’s daily consuming / behaving habits, how people browse the internet, how people like / dislike about social network, how people fill up their grocery bags when shopping…
				</p>
				<p class="about_show__des">The great solutions always come from a solid foundation of people’s daily life.</p>
			</div>

			<div class="about_show__right">
				<div class="about_show__row">
					<div class="about_pic" style="background-image: url(../images/pic1.png);">
						<div class="about_pic__wrap">
							<div class="about_pic__mask"></div>
							<div class="about_pic__text">
								<div class="about_pic__text--top">Training Facilitation</div>
								<div class="about_pic__text--up">Delivering your messages, your brand essentials, your product advantages in the right format, to the right people in the right way</div>
							</div>
						</div>
					</div>
					<div class="about_pic" style="background-image: url(../images/pic2.png);">
						<div class="about_pic__wrap">
							<div class="about_pic__mask"></div>
							<div class="about_pic__text">
								<div class="about_pic__text--top">Customer Engagement</div>
								<div class="about_pic__text--up">Customer loyalty comes with insightful   solutions with clear measurements and  yet all ties up to a digital way today</div>
							</div>
						</div>
					</div>
				</div>
				<div class="about_show__row">
					<div class="about_pic" style="background-image: url(../images/pic3.png);">
						<div class="about_pic__wrap">
							<div class="about_pic__mask"></div>
							<div class="about_pic__text">
								<div class="about_pic__text--top">Service Enhancement</div>
								<div class="about_pic__text--up">Everyone says customer excellence is critical but what to do to make it more        insightful and self-motived in China?</div>
							</div>
						</div>
					</div>
					<div class="about_pic" style="background-image: url(../images/pic4.png);">
						<div class="about_pic__wrap">
							<div class="about_pic__mask"></div>
							<div class="about_pic__text">
								<div class="about_pic__text--top">Team Engagement</div>
								<div class="about_pic__text--up">Enable your employees into a true united team that always targeting for better results.</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
		<!--show two-->
		<div class="about_show about_show--two">
			<div class="about_show__left">
				<!--<div class="about_icon">
					<img src="../images/imi.png" />
				</div>-->
				<div class="about_show__tit">The Bespoke<br /><span class="about_show__tit--colortwo">EVENT &amp; TRAVEL</span><br />Experience</div>
				<p class="about_show__des">We simply don’t like the term of ‘Event’, as we believe deep-in, that putting your audience into a place with food &amp; beverage is NOT what is defined us. It is the messaging we will create together with you, and the methods, the adaptions we make that key messaging cross through the entire way.
				</p>
				<p class="about_show__des">That is why we re-define ourselves as COMMUNICATION, as by the end of the day, event serves the best way to deliver your message to your target audiences.
				</p>
			</div>

			<div class="about_show__right">
				<div class="about_show__row">
					<div class="about_pic" style="background-image: url(../images/pic5.png);">
						<div class="about_pic__wrap">
							<div class="about_pic__mask about_pic__mask--col"></div>
							<div class="about_pic__text">
								<div class="about_pic__text--top">Training Facilitation</div>
								<div class="about_pic__text--up">Delivering your messages, your brand essentials, your product advantages in the right format, to the right people in the right way</div>
							</div>
						</div>
					</div>
					<div class="about_pic" style="background-image: url(../images/pic6.png);">
						<div class="about_pic__wrap">
							<div class="about_pic__mask about_pic__mask--col"></div>
							<div class="about_pic__text">
								<div class="about_pic__text--top">Customer Engagement</div>
								<div class="about_pic__text--up">Customer loyalty comes with insightful   solutions with clear measurements and  yet all ties up to a digital way today</div>
							</div>
						</div>
					</div>
				</div>
				<div class="about_show__row">
					<div class="about_pic" style="background-image: url(../images/pic7.png);">
						<div class="about_pic__wrap">
							<div class="about_pic__mask about_pic__mask--col"></div>
							<div class="about_pic__text">
								<div class="about_pic__text--top">Service Enhancement</div>
								<div class="about_pic__text--up">Everyone says customer excellence is critical but what to do to make it more        insightful and self-motived in China?</div>
							</div>
						</div>
					</div>
					<div class="about_pic" style="background-image: url(../images/pic8.png);">
						<div class="about_pic__wrap">
							<div class="about_pic__mask about_pic__mask--col"></div>
							<div class="about_pic__text">
								<div class="about_pic__text--top">Team Engagement</div>
								<div class="about_pic__text--up">Enable your employees into a true united team that always targeting for better results.</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	module.exports = {
		components: {},
		data() {
			return {

			}
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