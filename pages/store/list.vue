<template>
	<view class="">
		<view v-if="nearStoreList.length > 0" class="">
			<view v-for="(item,index) in nearStoreList" :key="index">
				<view @tap="goStore(item)"  class="m-store-list">
					<m-store-list  :title="item.name" :img="item.imgUrl" :fencingRange="item.fencingRange" :address="item.address"></m-store-list>
				</view>
			</view>
		</view>
		<m-empty v-else></m-empty>
	</view>
</template>
<script>
	import mStoreList from '@/components/m-store-list'
	import mEmpty from "@/components/m-result/m-empty.vue";
	export default {
		data() {
			return {
				// 附近门店
				nearStoreList:[]
			}
		},
		components: {
			mStoreList,
			mEmpty
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
			uni.showLoading({
				title: '正在查找门店...'
			});
			let _that=this;
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					uni.getLocation({//获取当前的位置坐标
						type: 'gcj02',
						success: function (res) {
							_that.$apis.postSelectStores({
								"lng":res.longitude || 116.206845,
								"lat":res.latitude || 39.762155,
							}).then(res=>{
									if(res.data){
										let data = res.data;
										_that.nearStoreList = data;
									}
									uni.hideLoading();
							}).catch(err=>{
								console.log(err);
								uni.hideLoading();
							});
						}
					})
				}
			})
		}
	}
</script>
<style lang="scss">
	.m-store-list{
		// padding: 30upx;
	}
</style>
