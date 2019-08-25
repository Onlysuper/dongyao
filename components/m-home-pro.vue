<template>
	<!-- 首页产品图文 -->
	<view class="m-pro-item">
		<view class="m-content" @tap="handleFn">
			<view class="m-img">
				<image style="width: 100%;height: 100%;" :src="rowData.pictureUrl" mode="aspectFull"></image>
			</view>
			<view class="m-pro">
				<view class="m-title">
					{{rowData.synopsis}}
				</view>
				<view class="m-price">
					<view class="new">￥{{rowData.presentPrice}}</view>
					<!-- <view class="old">{{rowData.originalPrice}}</view> -->
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
.m-pro-item{
	flex-direction: column;
	margin-left: 10upx;
	margin-bottom: 30upx;
	box-sizing: border-box;
	border-radius: 12upx;
	flex:0 0 160upx;
	margin-top: 20px;
	box-sizing: border-box;
	position: relative;
	background:#fff;
	.m-pro{
		text-align: center;
	}
	.m-content{
		position: relative;
		z-index: 10;
		width: 100%;
		padding: 10upx; 
		// height: 225upx;
	}
// 	::before{
// 		content: "";
// 		display: block;
// 		position: absolute;
// 		left:0px;
// 		right: 2px;
// 		top: 1px;
// 		bottom: 1px;
// 		box-sizing: border-box;
// 		box-shadow: 0px 0px 3px rgba(241,241,241,0.6);
// 		z-index: 1;
// 		border-radius: 12upx;
// 	}
	
// 	&:last-of-type{
// 		// background:red;
// 		margin-right: 3px;
// 		flex:0 0 218upx;
// 	}
// 	&:last-of-type::after{
// 		// right: 3px !important;
// 	}
	&:active{
		background:$color-hover
	}
	.m-img{
		box-sizing: border-box;
		flex:0 0 150upx;
		height: 150upx;
		// background:#eee;
		image{
			// border-radius: 100%;
		}
	}
	.m-title{
		font-size: $fontsize-9;
		// font-size: 20upx;
		color:#4c4c4c;
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
		text-align: center;
		.new{
			font-size: 28upx;
			font-weight: bold;
			color: #ff582b;
			width: 100%;
			text-align: center;
		}
		.old{
			font-size: 22upx;
			margin-left: 10upx;
			color:#b2b2b2;
			text-decoration: line-through
		}
	}
	// position: 
}
</style>
