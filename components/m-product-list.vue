<template>
	<!-- 公用商品列表 -->
	<view class="m-pro-list">
		<view class="m-header">
			<slot name="title"></slot>
			<slot name="topbut"></slot>
		</view>
		<view class="m-body">
			<view class="m-img-box">
				<slot name="img"></slot>
			</view>
			<view class="m-text-box">
				<view class="m-name">
					<slot name="proname"></slot>
				</view>
				<view class="m-describe">
					<slot name="describe"></slot>
				</view>
			</view>
		</view>
		<view class="m-footer">
			<view class="footleft">
				<slot name="footleft"></slot>
			</view>
			<view class="footright">
				<view class="but">
					<slot name="footright"></slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-product-list",
		props:{
			rowdata:{
				type:Array,
				default: function () {
					return []
				}
			}
		},
		methods:{
		 touchOnGoods(e){
			 this.$emit("touchOnGoods",{
				 data:this.rowData,
				 elem : e,
			 })
		 }
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
@import "../common/globel.scss";
.m-pro-list{
	background:#fff;
	padding:0 30upx;
	margin-bottom:20upx;
	.m-header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		color:#333333;
		font-size: $fontsize-2;
		height: 86upx;
		line-height: 86upx;
		border-bottom:1px solid #ebebeb;
		.but{
			color:#4eb87d;
		}
	}
	.m-body{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 40upx;
		.m-img-box{
			flex: 0 0 130upx;
			height: 130upx;
			background: #eee;
		}
		.m-text-box{
			flex:1;
			padding-left: 15upx;
			.m-name{
				font-size: $fontsize-3;
				color:#4c4c4c;
			}
			.m-describe{
				font-size: $fontsize-4;
				color:#999999;
			}
		}
		
	}
	.m-footer{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 30upx 0;
		align-items: center;
		.footleft{
			flex:1;
			font-size: 26upx;
			color:#333333;
		}
		.footright{
			flex:1;
			font-size: 26upx;
			text-align: right;
			.but{
				display: inline-block;
				padding: 10upx 20upx;
				border-radius: 80upx;
				border: 1px solid #cfcfcf;
				color:#333333;
			}
		}
	}
// 	display: flex;
// 	flex-direction: row;
// 	width: 100%;
// 	justify-content: space-between;
// 	align-items: flex-end;
// 	margin-top: 30upx;
// 	margin-bottom: 30upx;

// 	.m-img{
// 		flex: 0 0 170upx;
// 		height: 170upx;
// 		background: #eee;
// 	}
// 	.m-text{
// 		flex:1;
// 		padding: 0 20upx;
// 		.m-title{
// 			font-size: 32upx;
// 			color:#4c4c4c;
// 		}
// 		.m-descripe{
// 			font-size: 24upx;
// 			color:#999999;
// 			margin-top: 10upx;
// 		}
// 		.m-price{
// 			font-size: 28upx;
// 			color:#ff582b;
// 			font-weight: bold;
// 			margin-top: 5upx;
// 		}
// 		.m-old-price{
// 			display: flex;
// 			flex-direction: row;
// 			font-size: 18upx;
// 			color:#999999;
// 			margin-top: 5upx;
// 			.m-num{
// 				// font-size:  20upx;
// 			}
// 		}
// 	}
// 	.m-distance{
// 		flex: 0 1 30upx;
// 		color:#b2b2b2;
// 		font-size: 20upx;
// 		text-align: right
// 	}
}
</style>
