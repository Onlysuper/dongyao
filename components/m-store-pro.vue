<template>
	<!-- 门店商品图文 -->
	<view class="m-store-item">
		<view class="m-img" @tap="proDetail">
			<image style="width: 100%;height: 100%;" :src="pictureUrl" mode="aspectFill"></image>
			<view v-if="isAssemble==1" class="m-pin">
				拼团商品
			</view>
		</view>
		<view class="m-text">
			<view @tap="proDetail" class="m-title">
				{{synopsis}}
			</view>
			<view @tap="proDetail" class="m-descripe">
				{{labelName}}
			</view>
			<view @tap="proDetail" class="m-price">
				{{presentPrice}}
			</view>
			<view @tap="proDetail" class="m-old-price">
				<view class="">
					<!-- 非会员价 -->
				</view>
				<view class="m-num">
					<!-- {{originalPrice}} -->
				</view>
			</view>
		</view>
		<view class="m-distance" v-if="isAssemble == 0">
			<image v-if="!isAdd" @tap="touchOnGoods" style="width:40upx;height: 40upx;" src="../../static/img/icon/shop_icon_buy.png" mode="aspectFit"></image>
			<image v-else @tap="touchOnGoods" style="width:40upx;height: 40upx;" src="../../static/img/icon/shop_icon_buy_chose.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-store-pro",
		props:{
			rowData:{
				type:Object,
				rowData:{}
			},
			pictureUrl:{
				type:[String,Number],
				default:""
			},
			isAssemble:{
				type:[String,Number],
				default:""
			},
			synopsis:{
				type:[String,Number],
				default:""
			},
			labelName:{
				type:[String,Number],
				default:""
			},
			presentPrice:{
				type:[String,Number],
				default:""
			},
			originalPrice:{
				type:[String,Number],
				default:""
			},
			isadd:{
				type:[String,Number],
				default:""
			}
		},
		methods:{
			proDetail(e){
				this.$emit("proDetail",this.rowData)
			},
			touchOnGoods(e){
				 this.$emit("touchOnGoods",{
					 data:this.rowData,
					 elem : e,
				 })
			}
		},
		data() {
			return {
				isAdd:false
			};
		}
	}
</script>

<style lang="scss">
@import "../common/globel.scss";
.m-store-item{
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	align-items: flex-end;
	margin-top: 30upx;
	margin-bottom: 30upx;
	.m-img{
		flex: 0 0 170upx;
		height: 170upx;
		background: $back1;
		border-radius: 100%;
		// overflow: hidden;
		position: relative;
		.m-pin{
			background:#eb5555;
			color:#fff;
			text-align:center;
			position:absolute;
			bottom:0;
			font-size:20rpx;
			width:100rpx;
			left:50%;
			margin-left:-50rpx;
			border-radius:5rpx;
		}
	}
	.m-text{
		flex:1;
		padding: 0 20upx;
		.m-title{
			font-size: 32upx;
			color:#4c4c4c;
		}
		.m-descripe{
			font-size: 24upx;
			color:#999999;
			margin-top: 10upx;
		}
		.m-price{
			font-size: 28upx;
			color:#ff582b;
			font-weight: bold;
			margin-top: 5upx;
		}
		.m-old-price{
			display: flex;
			flex-direction: row;
			font-size: 18upx;
			color:#999999;
			margin-top: 5upx;
			align-items: center;
			.m-num{
				// font-size:  20upx;
			}
		}
	}
	.m-distance{
		flex: 0 1 30upx;
		color:#b2b2b2;
		font-size: 20upx;
		text-align: right
	}
}
</style>
