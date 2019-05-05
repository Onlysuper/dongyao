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
				nearStoreList:[{
					img:"../../static/img/2.jpg",
					title:"东尧蔬菜002号（望京店）",
					address:"北京市海淀区中关村大街15号"
				},
				{
					img:"../../static/img/2.jpg",
					title:"东尧蔬菜002号（望京店）",
					address:"北京市海淀区中关村大街15号"
				},
				{
					img:"../../static/img/2.jpg",
					title:"东尧蔬菜002号（望京店）",
					address:"北京市海淀区中关村大街15号"
				}]
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
						type: 'wgs84',
						success: function (res) {
							_that.mPost('/server/s/vicinity/stores',{
// 								"lng":res.longitude || 116.206845,
// 								"lat":res.latitude || 39.762155
								"lng":116.206845,
								"lat":39.762155
							}).then(res=>{
								if(res.code=1){
									if(res.data){
										let data = res.data;
										// console.log(data);
										_that.nearStoreList = data;
// 										this.hotProList = data.list;
// 										this.hotsellPage=data.nextPage;
									}
								}
							}).catch(err=>{
								console.log(err);
							});
						}
					})
				}
			})
// 			uni.getLocation({//获取当前的位置坐标
// 				type: 'wgs84',
// 				success: function (res) {
// 					console.log('当前位置的经度：' + res.longitude);
// 					console.log('当前位置的纬度：' + res.latitude);
// 				}
// 			});  
			// /server/s/vicinity/stores
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
