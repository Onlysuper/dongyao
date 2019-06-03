<template>
	<!-- 门店列表 -->
	<view class="m-groupbuy-list" @tap="goStore">
		<view class="m-img">
			<image style="width: 100%;height: 100%;border-radius: 100%;background: #f5f5f5;" :src="img" mode="aspectFill"></image>
			<view v-if="isAssemble==1" class="m-pin">
				可拼团
			</view>
		</view>
		<view class="m-text">
			<view class="m-title">
				{{title}}
			</view>
			<view class="m-describe">
				{{labelName}}
			</view>
			<view class="m-price">
				￥{{price}}
			</view>
			<view class="m-oldprice">
				原价￥{{oldprice}}
			</view>
		</view>
		<view class="m-addition">
			<image style="width:164upx;height:60upx;" src="../../static/img/icon/purchase_button_buy.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-groupbuy-list",
		props:{
			typeid:{ // 属于哪个分类
				type:String,
				default:""
			},
			storeid:{
			 type:String,
			 default:""
			},
			productid:{
			 type:String,
			 default:""
			},
			title:{
			 type:String,
			 default:""
			},
			labelName:{
			 type:String,
			 default:""
			},
			img:{
				type:String,
				default:""
			},
			price:{
			 type:[String,Number],
			 default:""
			},
			oldprice:{
			 type:[String,Number],
			 default:""
			},
			isAssemble:{
				type:[String,Number],
				default:0
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			goStore(){
				this.$emit("goStore",{
					storeid:this.storeid,
					typeid:this.typeid,
					productid:this.productid
					
				});
			}
		}
	}
</script>

<style lang="scss">
@import "../common/globel.scss";
.m-groupbuy-list{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	padding:40upx 20upx 40upx 40upx;
	// border-bottom: 1px solid #ebebeb;
	&:last-of-type{
		border: 0px;
	}
	.m-img{
		flex: 0 0 150upx;
		height: 150upx;
		overflow: hidden; 
		position: relative;
		.m-pin{
			background:#eb5555;
			color:#fff;
			text-align: center;
			position: absolute;
			bottom: 0;
			font-size: $fontsize-7;
			width:100upx;
			left: 50%;
			margin-left:-50upx;
			border-radius: 8upx;
		}
	}
	.m-text{
		flex:1;
		padding: 0 20upx;
		.m-title{
			font-size: $fontsize-9;
			color:#333333;
		}
		.m-describe{
			font-size:$fontsize-6;
			margin-top: 5upx;
			color:#808080;
		}
		.m-price{
			color:#ff582b;
			font-size: $fontsize-9;
			margin-top:10upx;
			font-weight: bold;
		}
		.m-oldprice{
			color:#999;
			font-size: $fontsize-6;
		}
	}
}
</style>
