<template>
	<view class="">
		<view v-for="(item,index) in nearStoreList" :key="index">
			<view @tap="goStore(item)"  class="m-store-list">
				<m-store-list  :title="item.name" :img="item.imgUrl" :address="item.address"></m-store-list>
			</view>
		</view>
	</view>
	
</template>
<script>
	import mStoreList from '@/components/m-store-list'
	
	export default {
		data() {
			return {
				// 附近门店
				nearStoreList:[]
			}
		},
		methods:{
				//跳转到商家
				goStore(item){
					uni.navigateTo({
						url:"/pages/store/store?storeid="+item.id
					})
				}
		},
		onLoad(){
			let _that=this;
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					uni.getLocation({//获取当前的位置坐标
						type: 'gcj02',
						success: function (res) {
							_that.mPost('/server/s/vicinity/stores',{
								"lng":res.longitude || 116.206845,
								"lat":res.latitude || 39.762155
							}).then(res=>{
									if(res.data){
										let data = res.data;
										_that.nearStoreList = data;
									}
							}).catch(err=>{
								console.log(err);
							});
						}
					})
				}
			})
		},
		components: {
			mStoreList
		},
	}
</script>
<style lang="scss">
	.m-store-list{
		// padding: 30upx;
	}
</style>
