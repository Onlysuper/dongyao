<template>
	<view class="m-token-card">
		<view :class="['m-body',state]">
			<view class="m-price">
				￥
				<view class="num">
					25
				</view>
			</view>
			<view class="m-time">
				<view class="m-text">
					通用卷
				</view>
				<view class="">
					<view class="status">
						还有4天到期
					</view>
				</view>
			</view>
		</view>
		<view class="m-footer">
			<view class="m-header">
				<view class="">
					使用规则
				</view>
				<view @tap="describeVisible=!describeVisible"class="">
					<image v-if="describeVisible" style="width: 26upx;height: 12upx;" src="../../../static/img/icon/home_icon_down1.png" mode=""></image>
					<image v-if="!describeVisible" style="width: 26upx;height: 12upx;" src="../../../static/img/icon/home_icon_down1.png" mode=""></image>
				</view>
			</view>
			<view v-show="describeVisible" class="m-describe">
				<view class="">
					1.请在北京限定地区范围进行使用
				</view>
				<view class="">
					2.请在北京限定地区范围进行使用
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-token-card",
		props:{
			state:{
				type:String,
				value:"",
			}
		},
		data() {
			return {
				describeVisible:false
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
.m-token-card{
	background:#fff;
	border-radius: 10upx;
	box-shadow: 0 0 15upx rgba(0,0,0,0.2);
	margin: 30upx;
	padding:30upx;
	.m-body{
		display: flex;
		flex-direction: row;
		height: 140upx;
		align-items: center;
		border-bottom: 1px dashed $color-border1;
		.m-price{
			flex: 1 1 100upx;
			color:$color-active;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			font-size: $fontsize-1;
			text-align: center;
			padding-left: 40upx;
			box-sizing: border-box;
			border-right: 1px solid $color-border2;
			.num{
				font-size: 70upx;
			}
		}
		.m-time{
			flex: 3;
			color:$color-2;
			font-size: $fontsize-3;
			padding-left: 30upx;
			.m-text{
				padding-left: 20upx;
			}
			.status{
				color:$color-active;
				background:#ecf7f1;
				display: inline-block;
				padding:3upx 20upx;
				border-radius: 80upx;
				font-size: $fontsize-7;
				margin-top: 5upx;
			}
		}
		// 不同状态颜色修改
		&.normal{
			
		}
		&.history{
			.m-price{
				color:#4c4c4c !important;
			}
			.m-time .status{
				color:#707070 !important;
				background:#f4f4f4 !important;
			}
		}
		&.lost{
			.m-price{
				color:#b3b3b3 !important;
			}
			.m-time{
				color:#b2b2b2 !important;
				.status{
					color:#b2b2b2 !important;
					background:#f5f2f2 !important;
				}
			}
		}
	}
	.m-footer{
		// 
		.m-header{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			font-size: $fontsize-6;
			color:$color-4;
			padding:20upx 0;
		}
		.m-describe{
			font-size: $fontsize-7;
			color:$color-4;
		}
	}
}
</style>
