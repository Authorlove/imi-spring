<style>
	.main{
		padding-top: 100px;
	}
</style>
<template>
	<div class="main">
		<t-about v-show="item == 'about'"></t-about>
		<!--<t-about></t-about>-->
		<t-case v-show="item == 'wecase'"></t-case>
		<t-clients v-show="item == 'clients'"></t-clients>
		<t-contact v-show="item == 'contact'"></t-contact>
	</div>
</template>


<script>
	import about from './about.vue'
	import wecase from './case.vue'
	import clients from './clients.vue'
	import contact from './contact.vue'
	
	module.exports = {
		components: {
			't-about': about,
			't-case': wecase,
			't-clients': clients,
			't-contact': contact
		},
		data(){
			return {
				item: "about"
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			
		},
		created() {
			EVENT_HUB.$on('headerClick',(data)=>{
				this.item = data
			})
		},
		mounted() {

		}

	}
</script>
	
