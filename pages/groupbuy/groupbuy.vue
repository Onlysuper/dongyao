<template>
	<view @click="goStore" class="m-store-list">
		<view class="m-page-title">
			<image style="width:148upx;height:46upx;" src="../../static/img/icon/purchase_icon_title.png" mode="aspectFit"></image>
		</view>
		<template v-for="(item,index) in nearStoreList">
			<m-groupbuy-list :key="index" :rowData="item">
				<image style="width:164upx;height:60upx;" src="../../static/img/icon/purchase_button_buy.png" mode="aspectFit"></image>
			</m-groupbuy-list>
		</template>
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
	.m-store-list{
		// padding: 30upx;
		.m-page-title{
			margin-bottom: 30upx;
			padding-left: 40upx;
		}
	}
</style>
