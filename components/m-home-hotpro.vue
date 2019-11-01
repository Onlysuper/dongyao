<template>
	<!-- 首页产品图文 -->
	<view class="m-hotpro-item">
		<view @tap="handleFn" class="m-content">
			<view class="m-img" >
				<image style="width: 100%;height: 100%;" :src="rowData.pictureUrl" mode="aspectFit"></image>
			</view>
			<view class="m-pro-back"></view>
			<view class="m-pro">
				<view class="m-title">
					{{rowData.synopsis}}
				</view>
				<view class="m-price">
					<view class="new">￥{{rowData.presentPrice}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:"m-home-pro",
		props:{
			rowData:{
				type:Object,
				 // 对象或数组默认值必须从一个工厂函数获取
				default: function () {
					return { 
						img:"",
						describel:"",
						price:"",
						oldPrice:""
					}
				}
			}
		},
		data() {
			return {};
		},
		methods:{
			handleFn(data){
				this.$emit("handleFn",this.rowData)
			}
		}
	}
</script>

<style lang="scss">
@import "../common/globel.scss";
.m-hotpro-item{
	flex-direction: column;
	// margin-left: 10upx;
	margin-right: 0upx;
	// margin-bottom: 30upx;
	// box-shadow: 0px 1px 3px rgba(0,0,0,0.2);
	
	box-sizing: border-box;
	border-radius: 12upx;
	flex:0 0 235upx;
	margin-top: 2px;
	box-sizing: border-box;
	position: relative;
	background:#fff;
	&:active{
		background:$color-hover
	}
	.m-content{
		position: relative;
		z-index: 10;
		width: 200upx;
		padding: 10upx 10upx; 
		height: 340upx;
		background-color: #EEEEEE;
		.m-pro-back{
			width: 91%;
			height: 100upx;
			opacity: 0.3;
			background-color: #CCC;
			position: absolute;
			z-index: 11;
			bottom: 20upx;
		}
		.m-pro{
			width: 91%;
			height: 100upx;
			position: absolute;
			z-index: 12;
			bottom: 20upx;
			// color: #FFFFFF;
			padding: 15upx;
		}
	}
	// ::before{
	// 	content: "";
	// 	display: block;
	// 	position: absolute;
	// 	left:0px;
	// 	right: 2px;
	// 	top: 1px;
	// 	bottom: 1px;
	// 	box-sizing: border-box;
	// 	box-shadow: 0px 0px 3px rgba(241,241,241,0.6);
	// 	z-index: 1;
	// 	border-radius: 12upx;
	// 	// box-shadow: 0px 1px 3px rgba(247,247,247,1);
	// }
	.m-img{
		box-sizing: border-box;
		flex:0 0 225upx;
		height: 225upx;
		image{
			border-radius: 12upx;
		}
		// background:#eee;
	}
	.m-title{
		font-size: $fontsize-9;
		// font-size: 20upx;
		// color:#4c4c4c;
		margin-top: 20upx;
		overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	}
	.m-price{
		display: flex;
		margin-top: 10upx;
		justify-content: flex-start;
		align-items: center;
		background-color:#CCC;
		border-radius:25upx;
		// opacity: 0.7;
		width:85%;
		.new{
			font-size: 28upx;
			font-weight: bold;
			color: #ff582b;
		}
		.old{
			font-size: 22upx;
			margin-left: 10upx;
			// color:#b2b2b2;
			text-decoration: line-through
		}
	}
	// position: 
}
</style>
