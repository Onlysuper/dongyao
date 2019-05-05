<template>
	<view class="m-pay-page">
		<!-- <scroll-view  scroll-y="true" class="content" > -->
			<view class="m-top-back"></view>
			<!--  商品支付下单 -->
			<view class="m-top-map">
				<view class="m-container">
					<!-- 交易完成 -->
					<!-- <view class="m-content">
						<view class="m-title">
							已完成交易
						</view>
						<view class="m-describe">
							感谢您对东尧蔬菜的信任
						</view>
					</view> -->
					<!-- 待支付 -->
					<view class="m-content waitepay">
						<view class="m-title">
							待支付
						</view>
						<view class="m-describe">
							支付成功后显示提货码
						</view>
					</view>
					<!-- 待取货 -->
					<!-- <view class="m-content">
						<view class="m-title">
							FGH3456789
						</view>
						<view class="m-describe">
							请在取货时出示提示码
						</view>
					</view> -->
				</view>
			</view>
			<view class="m-store-box">
				<view class="m-name">
					<view class="m-body">
						东尧蔬菜001号(中关村店)
					</view>
					<view class="m-phone" @tap='callPhone(storeData.tel)'>
						<image style="width: 40upx;height:40upx;margin-left: 20upx;" src="../../static/img/icon/shop_icon_phone.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="address">
					北京市朝阳区望京SOHO大厦A座B1层15号(AA大厦附近）
				</view>
				<view class="m-time">
					提货时间：2019.04.20  16:30
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="m-pro-container">
				<m-order-pro 
				title="板栗南瓜800g/份"
				price="￥4.99"
				oldprice="￥10.86"
				imgurl="../../static/img/icon/home_icon_gps.png"
				 ></m-order-pro>
				 <m-order-pro 
				 title="板栗南瓜800g/份"
				 price="￥4.99"
				 oldprice="￥10.86"
				 imgurl="../../static/img/icon/home_icon_gps.png"
				  ></m-order-pro>
				  <view class="m-footer">
				  	合计<view class="count">￥40.50</view>
				  </view>
			</view>
			<!-- 订单明细 -->
			<view class="m-order-detail">
				<view class="m-title">
					订单信息
				</view>
				<view class="m-item">
					订单编号：1286908090877680765
				</view>
				<view class="m-item">
					支付方式：微信支付
				</view>
				<view class="m-item">
					下单时间：2018.12.25 23:34:45
				</view>
			</view>
		<view class="place"></view>
		<!-- 分割 -->
		<view class="m-footer-but">
			立即支付￥40.50
		</view>
	</view>
</template>

<script>
	import mMap from '@/components/m-map'
	import mOrderPro from '@/components/m-order-pro'
	export default {
		components:{
			mMap,
			mOrderPro
		},
		data() {
			return {
				paytype:"",//支付方式
				latitude: 39.909,
				longitude: 116.39742,
			};
		},
		methods:{
			paytypeFn(type){
				this.paytype=type;
			}	
		},
		onLoad(){
			
			uni.getLocation({//获取当前的位置坐标
				type: 'wgs84',
				success: function (res) {
					alert('当前位置的经度：' + res.longitude);
					alert('当前位置的纬度：' + res.latitude);
				}
			});  
		}
	}
</script>

<style lang="scss">
@import "../../common/globel.scss";
.m-top-back{
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background:gray;
	height:204upx;
	background:#34c191;
	z-index: 1;
}
.place{
	height: 100upx;
	width: 100%;
}
.m-pay-page{
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	background:#f7f7f7;
	.m-top-map{
		padding-top:30upx;
		background:#fff;
		position: relative;
		.m-container{
			z-index: 10;
			position: relative;
			border-radius:10upx;
			margin-left: 30upx;
			margin-right: 30upx;
			.m-content{
				background: #fff;
				box-shadow:0upx 5upx 10upx rgba(0,0,0,0.2);
				border-top-left-radius: 10upx;
				border-top-right-radius: 10upx;
				border-bottom-right-radius: 10upx;
				border-bottom-left-radius: 10upx;
				padding: 30upx;
				text-align: center;
				.m-title{
					font-size: $fontsize-1;
					color:$color-2;
				}
				.m-describe{
					font-size: $fontsize-9;
					color:$color-5;
					padding-bottom: 20upx;
					margin-top: 20upx;
				}
				&.waitepay{
					.m-title,.m-describe{
						color:#fe8e4a;
					}
				}
				
			}
			
		}
	}
	.m-store-box{
		padding:30upx 30upx;
		background:#fff;
		.m-name{
			padding:0upx 30upx;
			color:$color-4;
			font-size: $fontsize-2;
			display: flex;
			flex-direction: row;
			align-items: flex-end;
			justify-content: space-between;
			.m-phone{
				flex: 0 0 40upx;
			}
		}
		.address{
			padding:0upx 30upx;
			color:$color-4;
			font-size: $fontsize-5;
		}
		.m-time{
			padding:0upx 30upx;
			font-size: $fontsize-9;
			color:$color-2;
			margin-top: 30upx;
		}
	}
	.m-pro-container{
		margin-top: 30upx;
		padding:0 30upx;
		background:#fff;
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
		.m-footer{
			text-align: right;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;
			color:$color-5;
			height: 99upx;
			line-height: 99upx;
			font-size: $fontsize-4;
			.count{
				font-size: $fontsize-1;
				color:$color-price
			}
		}
	}
	.m-order-detail{
		margin-top: 30upx;
		padding:40upx 30upx;
		background:#fff;
		.m-title{
			font-size:$fontsize-2;
			color:$color-2
		}
		.m-item{
			font-size: $fontsize-9;
			color:$color-5;
			margin-top: 20upx;
		}
	}
	.m-footer-but{
		text-align: center;
		color:#fff;
		height: 99upx;
		line-height: 99upx;
		font-size: $fontsize-2;
		font-weight: bold;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		background:$color-active;
		
	}
}
</style>
