<template>
	<!-- 首页产品图文 -->
	<view class="m-pro-item">
		<view class="m-img">
			<image style="width: 100%;height: 100%;" :src="rowData.img" mode="aspectFit"></image>
		</view>
		<view class="m-pro">
			<view class="m-title">
				{{rowData.describel}}
			</view>
			<view class="m-price">
				<view class="new">{{rowData.price}}</view>
				<view class="old">{{rowData.oldPrice}}</view>
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
		}
	}
</script>

<style lang="scss">
.m-pro-item{
	display: flex;
	flex-direction: column;
	min-width: 217upx;
	margin-left: 10upx;
	margin-right: 10upx;
	margin-bottom: 30upx;
	box-shadow: 0px 1px 3px rgba(0,0,0,0.1);
	padding: 20upx;
	box-sizing: border-box;
	border-radius: 10upx;
	.m-img{
		box-sizing: border-box;
		flex: 1;
		height: 170upx;
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
			font-weight: bold;
			color: #ff582b;
		}
		.old{
			font-size: 18upx;
			margin-left: 10upx;
			color:#b2b2b2;
			text-decoration: line-through
		}
	}
	// position: 
}
</style>
