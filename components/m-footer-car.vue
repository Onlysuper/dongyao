<template>
	<view class="m-footer-car">
		<view @tap="handleFn" :class="['m-icon',{animation:animation}]">
			<view :class="['m-num']">
				{{num}}
			</view>
			<image style="width: 120upx;height:120upx;" src="../../static/img/icon/shop_button_buy.png" mode="aspectFit"></image>
		</view>
		<view class="m-price">
			{{price}}
		</view>
		<view @tap="payFn" class="m-but">
			{{title}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-footer-car",
		props:{
			title:{
				type:String,
				value:"",
			},
			price:{
				type:String,
				value:"",
			},
			num:{
				type:String,
				value:"",
			}
		},
		data() {
			return {
				animation:false
			};
		},
		watch:{
			num(){
				this.animation=true
			}
		},
		methods:{
			handleFn(){
				this.$emit("handleFn")
			},
			payFn(){
				this.$emit("payFn")
			}
		}
	}
</script>


<style lang="scss">
// 底部
	.m-footer-car {
		position: fixed;
		bottom: 0upx;
		width: 100%;
		height: 99upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		transition: all 2s;
// 		transform: scale(1,1);
// 		.animation{
// 			 animation: myfirst 5s;
// 		}
		.m-but{
			background: #4eb87d;
			color:#fff;
			height: 100%;
			line-height: 99upx;
			padding: 0 80upx;
		}
		.m-icon{
			margin-left: 30upx;
			margin-bottom: 20upx;
			position: relative;
			
			.m-num{
				color:#ff582b;
				font-size: 28upx;
				position: absolute;
				left: 60upx;
				top: 20upx;
				z-index: 100
			}
		}
		.m-price{
			color:#333333;
			font-size: 30upx;
			text-align: left;
			flex:1;
			padding-left: 20upx;
		}
	}
</style>
