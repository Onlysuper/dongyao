<template>
	<!-- 公用商品列表 -->
	<view class="m-order-pro-list"  >
		<view class="m-header" @tap="detailGood">
			<view class="m-title">
				{{title}}
				<view class="m-time">
					{{createTime}}
				</view>
			</view>
			<view style="color:#ee6641" v-if="status==1">
				待取货
			</view>
			<view style="color:#FF4500" v-else-if="status==2">
				等待付款
			</view>
			<view style="color:#32CD32" v-else-if="status==3">
				待评论
			</view>
			<view style="color:#b2aaaa" v-else-if="status==4">
				已退款
			</view>
			<view style="color:#b2aaaa" v-else-if="status==5">
				已取消
			</view>
			<view style="color:#b2aaaa" v-else-if="status==6">
				已失效
			</view>
			<view style="color:#ee6641" v-else-if="status==7">
				待发货
			</view>
			<view style="color:#ee6641" v-else-if="status==8">
				待收货
			</view>
			<view style="color:#333333" v-else-if="status==9">
				已完成
			</view>
		</view>
		<view class="m-body" @tap="detailGood">
			<view   class="m-img-container">
				<view class="m-img-box" v-for="(item) in productListNew" :key="item.id">
					<image style="width:100%;height:100%" :src="item.pictures[0].pictureUrl" mode="aspectFit"></image>
				</view>
				<view v-if="productList.length>3" class="m-img-box">
					<image style="width:100%;height:100%" src="/static/img/icon/lve.jpg" mode="aspectFit"></image>
				</view>
				<!-- <view  @tap="detailGood" class="m-img-box">
					<image style="width:100%;height:100%" :src="productList[0].pictures[0].pictureUrl" mode="aspectFull"></image>
				</view> -->
			</view>
			<view  class="m-text-right">
				<view class="price">
					￥{{price}}
				</view>
				<view class="num">
					共{{num}}件
				</view>
			</view>
			
		</view>
		<view class="m-footer">
			<view class="footleft">
				<view class="footleft">
					<view class="m-name">
						{{proname}}
					</view>
					<view v-if="status==3" class="m-describe">
						提货时间:{{extrctime}}
					</view>
					<view v-else-if="status == 7" class="m-describe">
						预计配送时间:{{aboutPickingTime}}
					</view>
					<view v-else-if="carryType ==1" class="m-describe">
						提货时间:{{aboutPickingTime}}
					</view>
					<view class="m-describe">
						{{describe}}
					</view>
				</view> 
			</view>
			<view class="footright">
				<view  v-if="status==1">
					<view class="but m-cancel" @tap="orderCancel">
						申请退款
					</view>
					<view class="but" @tap="takeGood" style="background-color: #ff9900; color:#FFFFFF;border:1px solid #ff9900;padding: 10upx 20upx;">
						取货
					</view>
				</view>
				<view v-else-if="status==2">
					<view  class="but" @tap="payGood" style="color:#FF4500;border:1px solid #FF4500;">
						立即付款
					</view>
					<view  class="but m-delete" @tap="orderDel" >
						删除订单
					</view>
				</view>
				<view  v-else-if="status==3">
					<view @tap="commentGood" class="but" style="color:#32CD32;border:1px solid #32CD32;margin-left: 10upx;">
						评论一下
					</view>
					<view @tap="orderDel" class="but m-delete" >
						删除订单
					</view>
				</view>
				<view  v-else-if="status==7">
					<view @tap="orderCancel" class="but m-cancel">
						申请退款
					</view>
				</view>
				<view  v-else-if="status==8">
					<view @tap="receivedGoods" class="but" style="color:#32CD32;border:1px solid #32CD32;margin-left: 10upx;">
						确认收货
					</view>
				</view>
				<view  v-else-if="status== 4 || status== 5 || status==6 || status==9">
					<view @tap="orderDel" class="but m-delete" >
						删除订单
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-product-list",
		props:{
			rowData:{
				type:Object,
				 // 对象或数组默认值必须从一个工厂函数获取
				default: function () {
					return {}
				}
			},
			productList:{
				type:Object
				 // 对象或数组默认值必须从一个工厂函数获取
// 				default: function () {
// 					return []
// 				}
			},
			status:{
				type:[String,Number],
				default:""
			},
			title:{
				type:[String,Number],
				default:""
			},
// 			img:{
// 				type:[String,Number],
// 				default:""
// 			},
// 			proname:{
// 				type:[String,Number],
// 				default:""
// 			},
			createTime:{ // 下单时间
				type:[String,Number],
				default:""
			},
			extrctime:{ // 取货时间
				type:[String,Number],
				default:""
			},
			carryType:{ // 配送类型
				type:[String,Number],
				default:""
			},
			aboutPickingTime:{ // 取货时间
				type:[String,Number],
				default:""
			},
			describe:{
				type:[String,Number],
				default:""
			},
			price:{
				type:[String,Number],
				default:""
			},
			num:{
				type:[String,Number],
				default:""
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			productListNew(){
				return this.productList.slice(0,4);
			}
		},
		methods:{
		 touchOnGoods(e){
			 this.$emit("touchOnGoods",{
				 data:this.rowData,
				 elem : e,
			 })
		 },
		 // 订单详情
		 detailGood(){
			 this.$emit('detailGood',{data:this.rowData})
		 },
		 // 取货
		 takeGood(){
			this.$emit('takeGood',{data:this.rowData})
		 },
		  // 付款
		 payGood(){
		 	this.$emit('payGood',{data:this.rowData})	 
		 },
		 // 再来一单
// 		 againGood(){
// 		 	this.$emit('againGood',{data:this.rowData})	 	 
// 		 },
		 // 评论
		 commentGood(){
		 	this.$emit('commentGood',{data:this.rowData})	 	 
		 },
		 //取消订单
		 orderCancel(){
			 this.$emit('orderCancel',{data:this.rowData})	
		 },
		 //删除订单
		 orderDel(){
		 	this.$emit('orderDel',{data:this.rowData})	
		 },
		  // 评论
		 receivedGoods(){
		 	this.$emit('receivedGoods',{data:this.rowData})	 	 
		 }
		},
// 		onLoad(){
// 			console.log(this.productList);
// 		}
	}
</script>

<style lang="scss">
@import "../common/globel.scss";
.m-order-pro-list{
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
			white-space:nowrap
		}
		.m-title{
			font-size: $fontsize-1;
		}
		.m-time{
			font-size: $fontsize-4;
			color:$color-5;
			display: inline;
			padding-left: 20upx;
		}
	}
	.m-body{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 40upx;
		
		.m-text-box{
			flex:1;
			padding-left: 15upx;
			.m-name{
				font-size: $fontsize-3;
				color:#4c4c4c;
			}
			.m-describe{
				font-size: $fontsize-8;
				color:#999999; 
			}
		}
		.m-text-right{
			text-align: right;
			.price{
				color:$color-price;
			}
			.num{
				font-size: $fontsize-4;
				color:$color-5;
			}
		}
		.m-img-container{
			display: flex;
			flex-direction: row;
			.m-img-box{
				width: 100upx;
				height: 100upx;
				border-radius: 100%;
				overflow: hidden;
				margin-right: 8upx;
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
			.m-describe{
				white-space:nowrap;
				font-size: 28upx;
				color:$color-5;
			}
		}
		.footright{
			flex:1;
			font-size: 26upx;
			// text-align: right;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			.but{
				display: inline-block;
				padding: 10upx 20upx;
				border-radius: 80upx;
				border: 1px solid $color-border2;
				color:$color-5;
			}
			.m-cancel{
				color:#555;
				border:1px solid #CCC;
				margin-right: 5upx;
			}
			.m-delete{
				color:red;
				border: 1px solid red;
				margin-left: 5upx;
			}
		}
	}
}
</style>
