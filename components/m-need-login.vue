<template>
	<view class="m-empty-page">
		<view class="m-conainer">
			<image style="width:500upx;height:300upx" src="../../static/img/icon/img_nothave.png" mode="aspectFit"></image>
			<view @tap="goLogin" class="m-text">
				点击登录，畅享更好服务
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goLogin(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
@import "../common/globel.scss";
.m-empty-page{
	padding-top: 300upx;
	.m-conainer{
		text-align: center;
		color:#808080;
		font-size: 30upx;
		.m-text{
			padding-top: 30upx;
		}
	}
}

</style>
