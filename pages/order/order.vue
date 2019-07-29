<template>
	<view class="m-pay-page">
		<!-- <scroll-view  scroll-y="true" class="content" > -->
			<view class="m-top-back"></view>
			<!-- <view v-if="state == 1" class="m-top-state">待取货</view>
			<view v-if="state == 2" class="m-top-state">待付款</view>
			<view v-if="state == 3" class="m-top-state">待评价</view>
			<view v-if="state == 4" class="m-top-state">已退款</view>
			<view v-if="state == 5" class="m-top-state">已取消</view>
			<view v-if="state == 6" class="m-top-state">已失效</view>
			<view v-if="state == 7" class="m-top-state">待发货</view>
			<view v-if="state == 8" class="m-top-state">配送中</view>
			<view v-if="state == 9" class="m-top-state">已完成</view>
			 -->
			<!-- <view class="m-top-state">订单已完成</view> -->
			<!--  商品支付下单 -->
			<view class="m-top-map">
				<view class="m-container">
					<!-- 待取货 -->
					<view v-if="state==1" class="m-content">
						<view class="m-title">
							{{order.carryCode}}
						</view>
						<view class="m-describe">
							请在取货时出示提示码
						</view>
					</view>
					<!-- 待支付 -->
					<view v-else-if="state==2" class="m-content waitepay">
						<view class="m-title" v-if="carryType == 1">
							待支付
						</view>
						<view class="m-describe" v-if="carryType == 1">
							支付成功后显示提货码 
						</view>
						<view class="m-address" v-else>
							<view class="m-address-left">
								<view>{{orderAddress.name}} </view>
								<view>收货地址:</view>
							</view>
							<view class="m-address-right">
								<view>{{orderAddress.mobile}}</view>
								<view>{{orderAddress.address}}</view>
							</view>
						</view>
					</view>
					<!-- 待评价-->
					<view v-else-if="state==3" class="m-content">
						<view class="m-comment-btn" @tap="commentGood">
							评价一下
						</view>
						<view class="m-describe">
							对我们还算满意吗?评价一下吧~
						</view>
					</view>
					<view v-else-if="state==4" class="m-content">
						<view class="m-title">
							已退款
						</view>
						<view class="m-describe">
							感谢您对东尧蔬菜的信任，您已退款成功~
						</view>
					</view>
					<view v-else-if="state==5" class="m-content">
						<view class="m-title">
							已取消
						</view>
						<view class="m-describe">
							感谢您对东尧蔬菜的信任，您的订单已取消~
						</view>
					</view>
					<view v-else-if="state==6" class="m-content">
						<view class="m-title">
							已失效
						</view>
						<view class="m-describe">
							感谢您对东尧蔬菜的信任，您的订单已失效~
						</view>
					</view>
					<view v-else-if="state==7" class="m-content">
						<view class="m-title">
							待发货
						</view>
						<view class="m-describe">
							商家已在配货，马上为您发货~
						</view>
					</view>
					<!-- 待评价-->
					<view v-else-if="state==8" class="m-content">
						<view class="m-comment-btn" @tap="receivedGoods">
							确认收货
						</view>
						<view class="m-describe">
							商品已发货，您收到了吗?
						</view>
					</view>
					<view v-else class="m-content">
						<view class="m-title">
							订单已完成
						</view>
						<view class="m-describe">
							感谢您对东尧蔬菜的信任
						</view>
					</view>
				</view>
			</view>
			<view class="m-store-box">
				<view class="m-name">
					<view class="m-body">
						{{store.name}}
					</view>
					<view class="m-phone" @tap='callPhone(store.tel)'>
						<image style="width: 40upx;height:40upx;margin-left: 20upx;" src="../../static/img/icon/shop_icon_phone.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="address">
					{{store.address}}
				</view>
				<view v-if="state==3 && carryType ==1" class="m-time">
					<!-- 已经提货 -->
					提货时间：{{order.actualPickingTime}}
				</view>
				<view v-else-if="carryType==2 && state == 7" class="m-time">
					预计配送时间：{{order.aboutPickingTime}}
				</view>
				<view v-else-if="carryType==2" class="m-time">
					<!-- 预计配送时间：{{order.actualPickingTime}} -->
				</view>
				<view v-else class="m-time">
					<!-- 预计提货 -->
					提货时间：{{order.aboutPickingTime}}
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="m-pro-container">
				<m-order-pro
				@detail="detail"
				v-for="(item) in productList" :key="item.id"
				:productid="item.productId"
				:title="item.productName"
				:price="item.presentPrice"
				:oldprice="item.originalPrice"
				:imgurl="item.pictures[0].pictureUrl"
				:num="item.buyCount"
				 ></m-order-pro>
				 <view class="m-footer">
					合计<view class="count">￥{{order.paymentPrice}}</view>
				 </view>
			</view>
			<!-- 订单明细 -->
			<view class="m-order-detail">
				<view class="m-title">
					订单信息
				</view>
				<view class="m-item">
					订单编号：{{order.id}}
				</view>
				<view class="m-item">
					支付方式：微信支付
				</view>
				<view class="m-item">
					下单时间：{{order.createTime}}
				</view>
			</view>
			
			<!-- 订单操作 -->
			<view class="m-order-opt">
				<view class="m-delete" v-if="state==2||state==3||state==4||state==5||state==6||state==9" @tap="orderDel">删除订单</view>
				<view class="m-cancel" v-if="state==1||state==7" @tap="orderCancel">申请退款</view>
			</view>
			
		<view class="place"></view>
		
		
		<!-- 分割 -->
		<!-- <view  class="m-footer-but"> -->
			<button :loading="payLoading" :disabled="payLoading" v-if="state==2" @click="payFn" class="m-footer-but" type="primary">立即支付￥{{order.totalPrice}}</button>
			
		<!-- </view> -->
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
				payLoading:false,
				order:{},// 订单详情
				productList:[],//购买的产品列表
				orderAddress:{},
				store:{},//商家详情
				state:'', // 订单状态
				isCarry:'', 
				carryType:undefined,
				orderid:"",
				paytype:"",//支付方式
				latitude: 39.909,
				longitude: 116.39742,
			};
		},
		methods:{
				//拨打电话
			callPhone(phone){
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			detail(id){
				uni.navigateTo({
					url:"/pages/product/product?id="+id
				})
			},
			async getLocation(){
				await uni.getLocation({//获取当前的位置坐标
					type: 'wgs84',
					success: function (res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});  
			},
			getOrder(){
				let _this = this;
				let orderid=_this.orderid||''
				this.$apis.postOrderDetail(orderid).then(res=>{
					let data = res.data;
					this.order=data.order,// 订单详情
					this.productList=data.productList,//购买的产品列表
					this.orderAddress = data.orderAddress,
					this.store=data.store,//商家详情
					this.state=this.order.state, //订单状态
					this.isCarry = this.order.isCarry,
					this.carryType = this.order.carryType
				}).catch(err=>{
					console.log(err)
				})
			},
			//确认收获
			receivedGoods(){
				let orderid=this.orderid||''
				this.$apis.postReceivedGoods(orderid).then(res=>{
					if(res.code == 1){
						this.getOrder();
					}
					
				}).catch(err=>{
					console.log(err)
				})
			},
			//取消订单
			orderCancel(){
				let orderid=this.orderid||''
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '您确定要取消订单吗?',
					success: function (res) {
						if (res.confirm) {
							uni.showLoading({
								title: '退款中'
							});
							_this.$apis.postOrderRefund(orderid).then(res=>{
								if(res.code == 1){
									uni.showToast({
										title: '退款成功',
										duration: 2000
									});
									_this.getOrder();
								}
								uni.hideLoading();
							}).catch(err=>{
								console.log(err)
							})
						} else if (res.cancel) {
						}
					}
				});
			},
			//删除订单
			orderDel(){
				let orderid= this.orderid||'';
				let that = this;
				uni.showModal({
					title: '提示',
					content: '您确定要删除订单吗?',
					success: function (res) {
						if (res.confirm) {
							that.$apis.postOrderDel(orderid).then(res=>{
								if(res.code == 1){
									uni.showToast({
										title: '删除订单成功~',
										duration: 2000
									});
									uni.switchTab({  
										url: '/pages/tabBar/order'  
									}); 
								}
							}).catch(err=>{
								console.log(err)
							})
						} else if (res.cancel) {
						}
					}
				});
				
			},
			// 评论
			commentGood(){
				let pData = [...this.productList];
				let ProductUrlData = encodeURI(JSON.stringify({ProductUrlData:pData}));
				uni.navigateTo({
					url:"/pages/order/comment?orderid="+this.orderid+"&ProductUrlData="+ProductUrlData
				})
			},
			// 立即支付
			payFn(){
				this.payLoading=true;
				let _this=this;
				let products=_this.productList.map(item=>{return {
					productId:item.id,
					cou:item.buyCount,
				}})
				let sendData ={
					storeId:_this.store.storeid,//门店id
					totalCount:_this.order.discount,//商品总数量
					type:_this.order.is_assemble,//标识是普通下单还是拼团下单 1：普通 2：拼团
					couponId:_this.order.couponId,//优惠券id,
					products:products,//商品数组对象
					aboutPickingTime:_this.store.aboutPickingTime,//预计取货时间 yyyy-MM-dd hh:mm
					outTradeNo:_this.order.id,
					reserveTel:_this.order.reserveTel,//预留手机号
				}
				_this.$apis.postWxpay(sendData).then(res=>{

						
						let data = res.data;
					// 调起支付
						let _package = data.prepay_id;
						let paydata = {
							provider: 'wxpay',
							timeStamp: data.timeStamp+'',
							nonceStr: data.nonceStr,
							package: data.package,
							signType: data.signType,
							paySign: data.paySign,
						}
						_this.payLoading=true;
						uni.requestPayment({
							...paydata,
							success: function(res) {
								uni.showModal({
									title: '支付成功',
									content: '可在我的订单中查看订单详情',
									// showCancel:false,
									confirmText:'查看订单',
									success: function (res) {
										if (res.confirm) {
											// uni.reLaunch({url: '/pages/tabBar/order'})
											uni.switchTab({  
												url: '/pages/tabBar/order'  
											});  
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
								_this.payLoading=false;
							},
							fail: function(err) {
								uni.showModal({
									title: '支付失败',
									content: '请您在重新尝试一下支付',
									// showCancel:false,
									confirmText:'重新支付',
									success: function (res) {
										if (res.confirm) {
											_this.payFn();
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
								_this.payLoading=false;
							},
							complete() {
								_this.payLoading=false;
							}
						});

					_this.payLoading=false;
				}).catch(err=>{
					_this.payLoading=false;
				})
			},
		},
		onLoad(options){
			this.orderid = options.orderid;
			this.getLocation();
			this.getOrder();
		},
		onShow() {
		  uni.setStorageSync('orderTab', 4);
		},
		onUnload() {
			let index = 4;
			if(this.state==1||this.state==   2||this.state==3){
				index = this.state;
			}
			uni.setStorageSync('orderTab', index);
		},
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
	// .m-top-state{
	// 	font-weight: 900;
	// 	color: #333;
	// 	font-size: 36upx;
	// 	padding: 30upx;
	// 	position: relative;
	// 	z-index: 2;
	// 	letter-spacing:2rpx;
	// 	padding-top:30upx;
	// }
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
					color:#FF7F50;
					font-weight:600;
				}
				.m-describe{
					font-size: $fontsize-9;
					color:$color-5;
					padding-bottom: 20upx;
					margin-top: 20upx;
				}
				.m-address{
					display: flex;
					flex-direction: row;
					color:$color-5;
					font-size: $fontsize-9;
					// align-content: center;
					padding: 10upx;
					align-content: flex-start;
					align-items: flex-start;
					.m-address-left{
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: flex-start;
						width: 28%;
						text-align: left;
					}
					.m-address-right{
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						justify-content: flex-start;
						text-align: left;
					}
				}
				.m-comment-btn{
					display: inline-block;
					padding: 10upx 30upx;
					border-radius: 80upx;
					color:$color-5;
					border:1px solid #34c191;
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
			margin-bottom: 10upx;
			padding:0upx 30upx;
			color:$color-5;
			font-size: 34upx;
			font-weight: 600;
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
			color:$color-5;
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
	.m-order-opt{
		margin-top: 30upx;
		padding:20upx 30upx;
		background:#fff;
		font-size:$fontsize-2;
		display: flex;
		justify-content:flex-end;
		align-items: center;
		.m-delete{
			color: red;
			width: 150rpx;
			height: 30rpx;
			padding:15rpx 15upx;
			text-align:center;
			line-height:30upx;
		}
		.m-cancel{
			color:white;
			background:#34c191;
			width:150upx;
			height:30upx;
			border-radius:30upx;
			padding:15rpx 15upx;
			text-align:center;
			line-height:30upx;
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
		border-radius: 0;
	}
}
</style>
