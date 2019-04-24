<template>
	<view @click="goStore" class="m-product-list">
		<view class="m-page-title">
			东尧蔬菜001号（中关村店）
		</view>
		<template v-for="(item,index) in nearStoreList">
			<m-groupbuy-list :key="index" :rowData="item"></m-groupbuy-list>
		</template>
		<!-- <view class="m-page-title">
			东尧蔬菜001号（中关村店）
		</view> -->
		<!-- <template v-for="(item,index) in nearStoreList">
			<m-groupbuy-list :key="index" :rowData="item">
				<image style="width:164upx;height:60upx;" src="../../static/img/icon/purchase_button_buy.png" mode="aspectFit"></image>
			</m-groupbuy-list>
		</template> -->
	</view>
</template>
<script>
	import mGroupbuyList from '@/components/m-groupbuy-list'
	
	export default {
		data() {
			return {
				// 附近门店
				nearStoreList:[{
					img:"../../static/img/2.jpg",
					title:"精品秋葵600g",
					describe:"特价小白菜",
					price:"￥2.99",
					oldprice:"￥100"
				},
				{
					img:"../../static/img/2.jpg",
					title:"精品秋葵600g",
					describe:"特价小白菜",
					price:"￥2.99",
					oldprice:"￥100"
				},
				{
					img:"../../static/img/2.jpg",
					title:"精品秋葵600g",
					describe:"特价小白菜",
					price:"￥2.99",
					oldprice:"￥100"
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
			mGroupbuyList
		},
	}
</script>
<style lang="scss">
	.m-product-list{
		// padding: 30upx;
		.m-page-title{
			margin-top: 28upx;
			// margin-bottom: 30upx;
			margin-left: 20upx;
			margin-right: 20upx;
			border-bottom: 1px solid #ebebeb;
			padding:34upx 0;
			font-size: 32upx;
			color:#333333;
		}
	}
</style>
