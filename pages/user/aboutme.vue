<template>
	<view class="m-about-page">
		<!-- 关于我们 -->
		<view class="m-banner">
			
		</view>
		<view class="m-title">
			东尧科技
		</view>
		<view class="m-body">
			<view class="m-item">
				...
			</view>
			<view class="m-item">
				...
			</view>
			<view class="m-item">
				...
			</view>
		</view>
		<view class="m-footer">
			<view  class="m-item">
				...
			</view>
			<view class="m-item">
				...
			</view>
			<view class="m-item">
				...
			</view>
		</view>
		
	</view>
</template>

<script>
import Event from '../../common/event.js'; 
export default {
	data() {
		return {};
		
	},
	methods:{
// 		back(){
// 			Event.noticeFun(Event.UPDATA_USER, {userdata:"一只老萌"})
// 			uni.navigateBack({
// 				delta:1
// 			})
// 		}
	}
}
</script>

<style lang="scss">
@import "../../common/globel.scss";
.m-about-page{
	 background:#fff !important;
	 min-height: 100%;
	.m-banner{
		width: 100%;
		height:300upx;
		background:url("http://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/banners/about_bg.png") no-repeat;
		background-size: 100% 100%;
	}
	.m-body{
		padding: 30upx;
		padding-top: 0;
		color:$color-2;
		font-size: $fontsize-2;
		line-height: 50upx;
		.m-item{
			margin-top: 10upx;
			text-indent: 40upx;
		}
	}
	.m-title{
		padding: 30upx;
		text-align:center;
		color:$color-2;
		font-size:$fontsize-1;
	}
	.m-footer{
		padding: 30upx;
		color:$color-2;
		font-size: $fontsize-9;
		.m-item{
			padding-left: 30upx;
			margin-top: 10upx;
			position: relative;
			&:after{
				content: "";
				display: block;
				position: absolute;
				width:16upx;
				height: 16upx;
				border-radius: 100%;
				background:#83cda4;
				left: 0;
				top:50%;
				margin-top: -8upx;
			}
		}
		
	}
}
</style>
