<template>
	<view class="m-about-page">
		<!-- 关于我 -->
		<view class="m-banner">
			
		</view>
		<view class="m-title">
			东尧科技
		</view>
		<view class="m-body">
			<view class="m-item">
				致力于通过创新的信息化技术来推动社会的发展与变革，为个人创造新的生活方式，为社会创造价值公司创立于1991年，
			</view>
			<view class="m-item">
				目前拥有近20000名员工，在中国建立了8个区域总部，10个软件研发基地， 
			</view>
			<view class="m-item">
				16个软件开发与技术支持中心，在60多个城市建立营销与服务网络; 
			</view>
		</view>
		<view class="m-footer">
			<view  class="m-item">
				联系人：王先生
			</view>
			<view class="m-item">
				联系方式：15686789008
			</view>
			<view class="m-item">
				公司地址：北京市海淀区发展大厦A座301
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
