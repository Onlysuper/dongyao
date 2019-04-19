<template>
	<!-- 首页门店图文 -->
	<view class="m-store-item">
		<view class="m-img">
			<!-- <image src=""></image> -->
		</view>
		<view class="m-text">
			<view class="m-title">
				东尧蔬菜001号（中关村店）
			</view>
			<view class="m-discount">
				 买就送  优惠多多
			</view>
			<view class="m-address">
				北京市海淀区中关村大街15号
			</view>
		</view>
		<view class="m-distance">
			1.3km
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-home-store",
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
		flex: 0 0 200upx;
		height: 200upx;
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
		flex: 0 1 100upx;
		color:#b2b2b2;
		font-size: 20upx;
		text-align: right
	}
}
</style>
