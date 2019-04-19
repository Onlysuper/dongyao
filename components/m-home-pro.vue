<template>
	<view class="m-pro-item">
		<view class="m-img">
			<!-- <image src=""></image> -->
		</view>
		<view class="m-pro">
			<view class="m-title">
				特价小白菜
			</view>
			<view class="m-price">
				<view class="new">￥2.99</view>
				<view class="old">￥3.99</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-home-pro",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.m-pro-item{
	display: flex;
	flex-direction: column;
	min-width: 214upx;
	margin-left: 30upx;
	margin-bottom: 30upx;
	box-shadow: 0px 1px 3px rgba(0,0,0,0.1);
	padding: 20upx;
	box-sizing: border-box;
	border-radius: 10upx;
	.m-img{
		flex: 0 0 173upx;
		background:#eee;
		
	}
	.m-title{
		font-size: 20upx;
		color:#4c4c4c;
		margin-top: 20upx;
	}
	.m-price{
		display: flex;
		margin-top: 10upx;
		.new{
			font-size: 26upx;
			color: #ff582b;
		}
		.old{
			font-size: 18upx;
			margin-left: 10upx;
			color:#b2b2b2
		}
	}
	// position: 
}
</style>
