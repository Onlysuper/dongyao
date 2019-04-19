<template>
	<view @click="goStore" class="m-store-list">
		<m-home-store></m-home-store>
	</view>
</template>
<script>
	import mHomeStore from '@/components/m-home-store'
	
	export default {
		data() {
			return {
				
			}
		},
		methods:{
				goStore(){
					console.log(111);
					uni.navigateTo({
						url:"/pages/store/store"
					})
				}
		},
		components: {
			mHomeStore
		},
	}
</script>
<style lang="scss">
	.m-store-list{
		padding: 30upx;
	}
</style>
