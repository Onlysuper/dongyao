<template>
	<view class="m-pro-list">
		<view class="img-box">
			<image style="width:130upx;height:130upx;" :src="imgurl" mode="aspectFit"></image>
		</view>
		<view class="m-text-box">
			<view class="m-body">
				<view class="m-pro-title">
					{{title}}
				</view>
				<view class="m-price-box">
					<view class="m-price">
					{{price}}
					</view>
					<view class="m-oldprice">
					{{oldprice}}
					</view>
				</view>
			</view>
			<view class="m-num-box">
				X3
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-order-pro",
		props:{
			title:{
				type:String,
				value:"",
			},
			price:{
				type:String,
				value:"",
			},
			oldprice:{
				type:String,
				value:"",
			},
			imgurl:{
				type:String,
				value:"",
			},
			
		},
		data() {
			return {
				
			};
		},
		methods:{
			titleHandle(){
				this.$emit("titleHandle")
			}
		}
	}
</script>

<style lang="scss">
@import "../common/globel.scss";
.m-pro-list{
	background:#fff;
	display: flex;
	flex-direction: row;
	padding:30upx;
	align-items: center;
	border-bottom: 1px solid $color-border2;
	&:last-child{
		border:0;
	}
	.m-img-box{
		flex:0 0 130upx;
		height: 130upx;
	}
	.m-text-box{
		flex:1;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		padding-left:20upx;
		.m-body{
			flex:1;
			.m-pro-title{
				font-size: $fontsize-2;
				color:$color-2;
			}
			.m-price-box{
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 20upx;
				.m-price{
					color:$color-price;
					font-size: $fontsize-5;
				}
				.m-oldprice{
					padding-left: 20upx;
					color:$color-4;
					font-size: $fontsize-6;
					text-decoration: line-through;
				}
			}
		}
		.m-num-box{
			flex:0;
			font-size: $fontsize-2;
			color:$color-7
		}
	}
	
}
</style>
