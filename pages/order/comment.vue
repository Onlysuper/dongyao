<template>
	<view class="m-comment-page">
		<view class="m-top">
			<view class="">
				<view class="img-box">
					<image style="width:80upx;height:80upx" src="../../static/img/icon/goods_icon_Avatar.png" mode="aspectFit"></image>
				</view>
				商品评价
			</view>
			<view class="">
				<uni-rate @change="changeStar" size="18" value="5"></uni-rate>
			</view>
			
		</view>
		<view class="m-body">
			
		</view>
	</view>
</template>

<script>
	import mMap from '@/components/m-map'
	import mOrderPro from '@/components/m-order-pro'
	export default {
		components:{
			mMap,
			mOrderPro
		},
		data() {
			return {};
		},
		methods:{},
		onLoad(options){}
	}
</script>

<style lang="scss">
@import "../../common/globel.scss";
.m-comment-page{
	padding: 20upx;
	.m-top{
		border-bottom:1px solid $color-3;
		display: flex;
		flex-direction: row;
		.img-box{
			flex:0 1 80upx;
			height: 80upx;
			border-radius: 100%;
			overflow: hidden;
		}
	}
	
}
</style>
<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
		components: {uniRate},
		methods:{
			changeStar(e){
				console.log(e);
			}
		}
	}
		
</script>
