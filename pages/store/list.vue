<template>
	<view @click="goStore" class="m-store-list">
		<template v-for="(item,index) in nearStoreList">
			<m-home-store :key="index" :rowData="item"></m-home-store>
		</template>
	</view>
</template>
<script>
	import mHomeStore from '@/components/m-home-store'
	
	export default {
		data() {
			return {
				// 附近门店
				nearStoreList:[{
					img:"../../static/img/2.jpg",
					title:"老萌1号店",
					distance:"13km",
					describel:"优惠优惠优惠",
					address:"北京市海淀区中关村大街15号"
				}]
			}
		},
		methods:{
				//跳转到商家
				goStore(){
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
