<template>
	<view class="m-user-page">
		<view class="m-header">
			<view class="m-user">
				<view class="m-img">
					<image style="width:100%;height:100%" src="../../static/img/icon/home_icon_gps.png" mode="aspectFit"></image>
				</view>
				<view class="m-text">
					<view class="m-username">
						小白兔
					</view>
					<image style="width:57upx;height:33upx" src="../../static/img/icon/me_icon_VIP_lose.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="m-card" @tap="linkTo('/pages/user/vip/vip')">
				<m-vip-top>
					<view slot="name">VIP会员</view>
					<view slot="label">（半年卡6折）</view>
					<view slot="describe">享受专属折扣  福利优惠  定制服务</view>
					<view slot="right">
						立即开通>
					</view>
				</m-vip-top>
			</view>
			<view class="m-order-chose">
				<view class="m-title">
					<view class="">
						我的订单
					</view>
					<view class="right" @tap="linkTo('/pages/tabBar/order')">
						查看全部 >
					</view>
				</view>
				<view class="m-slection">
					<view class="m-item">
						<view class="img-box">
							<image style="width:59upx;height:59upx" src="../../static/img/icon/me_icon_buy.png" mode="aspectFit"></image>
						</view>
						<view class="">
							待取货
						</view>
					</view>
					<view class="m-item">
						<view class="img-box">
							<image style="width:59upx;height:59upx" src="../../static/img/icon/me_icon_maney.png" mode="aspectFit"></image>
						</view>
						<view class="">
							待支付
						</view>
					</view>
					<view class="m-item">
						<view class="img-box">
							<image style="width:59upx;height:59upx" src="../../static/img/icon/me_icon_pingjia.png" mode="aspectFit"></image>
						</view>
						<view class="">
							待平价
						</view>
					</view>
				</view>
			</view>
			<view class="m-cell-list">
				<m-cell @handleFn="linkTo('/pages/user/tokencard/tokencard')" label="我的优惠券" :link='true'>
					<image slot="icon" style="width:30upx;height:30upx;" src="../../static/img/icon/me_icon_preferential.png" mode="aspectFit"></image>
				</m-cell>
				<m-cell @handleFn="linkTo('/pages/user/aboutme/aboutme')" label="关于我们" :link='true'>
					<image slot="icon" style="width:30upx;height:30upx;" src="../../static/img/icon/me_icon_about.png" mode="aspectFit"></image>
				</m-cell>
			</view>
		</view>
	</view>
</template>
<script>
	import mVipTop from '@/components/m-vip-top'
	import mCell from '@/components/m-cell'
	export default {
		components:{
			mVipTop,
			mCell
		},
		methods:{
			// 优惠券
			linkTo(url){
				uni.navigateTo({
					url:url
				})
			},
			// 查看详情
			vipCardDetail(){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>
<style lang="scss">
	 @import "../../common/globel.scss";
	.m-user-page{
		.m-header{
			width: 100%;
			background: url("../../static/img/me_bg_top.png") no-repeat top left;
			background-size: 100% 238upx;
		}
		.m-user{
			display:flex;
			padding: 52upx 30upx 42upx;
			justify-items: flex-start;
			align-items: center;
			.m-img{
				margin-left: 10upx;
				width: 92upx;
				height: 92upx;
				border-radius: 100%;
				overflow: hidden;
				background: #fff;
			}
			.m-text{
				flex: 1;
				font-size: 36upx;
				color:#fff;
				margin-left: 10upx;
				display: flex;
				align-items: center;
				.m-username{
					margin-right: 10upx;
				}
			}
		}
		.m-order-chose{
			margin:30upx;
			box-shadow: 0 0 20upx rgba(0,0,0,0.3);
			padding:30upx 30upx 40upx;
			border-radius: 20upx;
			.m-title{
				display: flex;
				flex-direction: row;
				font-size: 32upx;
				justify-content: space-between;
				color: #333;
				.right{
					color:$color-1;
					font-size: 24upx;
				}
			}
			.m-slection{
				margin-top: 30upx;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				.m-item{
					flex: 1;
					text-align: center;
					font-size: 26upx;
					color: #808080;
					position: relative;
					&:after{
						content: "";
						display: block;
						position: absolute;
						width: 1px;
						background:#f3f3f3;
						right: 0;
						top: 50%;
						height: 50upx;
						margin-top: -25upx;
					}
					&:last-of-type:after{
						direction: none;
					}
					.img-box{
						height: 88upx;
						line-height: 88upx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
		.m-cell-list{
			padding: 0 30upx;
		}
		
	}
</style>
