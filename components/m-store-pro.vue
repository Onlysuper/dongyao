<template>
	<!-- 门店商品图文 -->
	<view class="m-store-item">
		<view class="m-img">
			<!-- <image src=""></image> -->
		</view>
		<view class="m-text">
			<view class="m-title">
				{{rowData}}
			</view>
			<view class="m-discount">
				精品秋葵600g
			</view>
			<view class="m-prece">
				￥9.99
			</view>
			<view class="m-address">
				非会员价￥9.99
			</view>
		</view>
		<view class="m-distance">
			1.3km
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-store-pro",
		props:{
			rowData:{
				type:Object,
				rowData:{}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.m-store-item{
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: center;
	align-items: center;
	margin-bottom: 20upx;
	.m-img{
		flex: 0 0 100upx;
		height: 100upx;
		background: #eee;
	}
	.m-text{
		flex:1;
		padding: 0 20upx;
		.m-title{
			font-size: 32upx;
			color:#333333;
		}
		.m-discount{
			font-size: 20upx;
			color:#808080;
		}
		.m-address{
			font-size: 24upx;
			color:#808080;
		}
	}
	.m-distance{
		flex: 0 1 30upx;
		color:#b2b2b2;
		font-size: 20upx;
		text-align: right
	}
}
</style>
