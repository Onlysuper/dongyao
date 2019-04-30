<template>
	<view class="m-pay-page">
		<!-- <scroll-view  scroll-y="true" class="content" > -->
			<view class="m-top-back"></view>
			<!--  商品支付下单 -->
			<view class="m-top-map">
				<view class="m-container">
					<view class="m-title">
						到店自取
					</view>
					<view class="m-content">
						<view class="m-address">
							北京市朝阳区望京SOHO大厦A座B1层15号
							(AA大厦附近）
						</view>
						<m-map :latitude="latitude" :longitude="longitude"></m-map>
						<view class="m-footer">
							<view class="m-item">
								<view class="m-text">
									自取时间
								</view>
								<view class="m-light">
									16：30
								</view>
							</view>
							<view class="m-item">
								<view class="m-text">
									预留电话
								</view>
								<view class="m-light">
									13519195678
								</view>
							</view>
						</view>
					</view>
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
			</view>
			<!-- 价钱 -->
			<view class="m-pro-message">
				<view class="m-row">
					<view class="m-label">
						商品原价
					</view>
					<view class="m-price">
						¥55.78
					</view>
				</view>
				<view class="m-row">
					<view class="m-label">
						商品优惠
					</view>
					<view class="m-discount">
						-¥55.78
					</view>
				</view>
				<view class="m-row">
					<view class="m-label">
						优惠券
					</view>
					<view class="m-token">
						暂无可用>
					</view>
				</view>
				<view class="m-footer">
					合计<view class="count">￥40.50</view>
				</view>
			</view>
			<!-- 支付方式 -->
			<view class="m-paytype">
				<view class="m-title">
					支付方式
				</view>
				<view class="m-row">
					<view class="m-icon">
						<image style="width:34upx;height:30upx" src="../../static/img/icon/pay_wx_icon.png" mode="aspectFit"></image>
						<view class="m-text">
							微信支付
						</view>
						<!--  -->
					</view>
					<view class="m-radio" @tap="paytypeFn('wx')">
						<image v-if="paytype=='wx'" style="width:34upx;height:30upx" src="../../static/img/icon/pay_icon_ok.png" mode="aspectFit"></image>
						<image v-else style="width:34upx;height:30upx" src="../../static/img/icon/pay_icon_ok2.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		<!-- </scroll-view> -->
		<!-- 确定支付按钮 -->
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
	// position: fixed;
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
			// margin-top: 30upx;
			padding-top: 72upx;
			.m-title{
				background:url('../../static/img/icon/Apay_button10.png') no-repeat;
				background-size: 270upx 82upx;
				// height: 72upx;
				line-height: 72upx;
				font-size: $fontsize-2;
				color:$color-2;
				padding-left: 30upx;
				position: relative;
				width: 240upx;
				padding-bottom: 10upx;
				position: absolute;
				left: 0;
				top: 0;
				
				z-index: -1;
			}
			.m-content{
				background: #fff;
				box-shadow:0upx 5upx 10upx rgba(0,0,0,0.2);
				border-top-left-radius: 10upx;
				border-top-right-radius: 10upx;
				border-bottom-right-radius: 10upx;
				border-bottom-left-radius: 10upx;
				padding: 20upx;
				.m-address{
					font-size: $fontsize-9;
					color:$color-5;
					padding-bottom: 20upx;
				}
				.m-footer{
					display: flex;
					flex-direction: row;
					margin-top: 30upx;
					.m-item{
						flex: 1;
						.m-text{
							color:$color-4;
							font-size: $fontsize-6
						}
						.m-light{
							color:$color-5;
							font-size: $fontsize-6;
						}
						&:last-child{
							border-left: 1px solid $color-border2;
							padding-left: 70upx;
						}
					}
					
				}
			}
			
		}
		
		
	}
	.m-pro-container{
		padding:0 30upx;
		background:#fff;
	}
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
	.m-pro-message{
		margin-top: 30upx;
		padding:30upx 30upx;
		background:#fff;
		.m-row{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			font-size: $fontsize-4;
			color:$color-2;
			height: 52upx;
			line-height: 52upx;
			.m-price{
				font-size: $fontsize-4;
				color:$color-2
			}
			.m-discount{
				color:#ff9e87
			}
			.m-token{
				color:#a7a7a7;
			}
		}
		.m-footer{
			margin-top:20upx;
			border-top: 1px solid $color-border3;
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
			}
		}
	}
	.m-paytype{
		margin-top: 30upx;
		padding:30upx 30upx;
		background:#fff;
		.m-title{
			height: 88upx;
			line-height: 88upx;
			font-size: $fontsize-4;
			border-bottom: 1px solid $color-border3;
		}
		.m-row{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding-top: 30upx;
			font-size: $fontsize-3;
			color:$color-5;
			.m-icon{
				display: flex;
				flex-direction: row;
				align-items: center;
				.m-text{
					padding-left: 20upx;
				}
			}
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
