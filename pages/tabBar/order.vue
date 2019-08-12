<template>
	<view class="m-order-page">
		<view class="fixedit">
			<m-tab @handleFn="tabChange" :tabActive="tabActive" :rowdata="tabList"></m-tab>
		</view>
		<view style="height:60px;"></view>
		<m-need-login v-if="!isLogin"></m-need-login>
		<m-empty v-else-if="orderList.length==0"></m-empty>
		<view v-else class="m-order-body">
			<m-order-list v-for="(item,index) in orderList" 
			@detailGood="detailGood"
			@takeGood="takeGood"
			@payGood="payFn"
			@orderCancel="orderCancel"
			@orderDel="orderDel"
			@againGood="againGood"
			@commentGood="commentGood"
			@receivedGoods="receivedGoods"
			 :rowData="item"
			 :key="index"
			 :status="item.order.state"
			 :price="item.order.paymentPrice"
			 :num="item.order.totalCount"
			 :createTime="item.order.createTime"
			 :extrctime="item.order.actualPickingTime"
			 :carryType="item.order.carryType"
			 :aboutPickingTime="item.order.aboutPickingTime"
			 :title="item.store.name"
			 :productList="item.productList"
			 ></m-order-list>
			 <uni-load-more :status="mloading"></uni-load-more> 
		</view>
	</view>
</template>
<script>
	import Event from '../../common/event.js'; 
	import mTab from "@/components/m-tab.vue";
	import mOrderList from "@/components/m-order-list.vue";
	import mNeedLogin from "@/components/m-need-login.vue";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import mEmpty from "@/components/m-result/m-empty.vue";
	var page = 1,totalpage=1;
	export default {
		name:"m-footer-car",
		props:{},
		components:{
			mTab,
			uniLoadMore,
			mOrderList,
			mNeedLogin,
			mEmpty
		},
		data(){
			return{
				isLogin:false,
				tabActive:1,
				tabList:[
					{
						label:"待取货",
						id:1,
					},
					{
						label:"待支付",
						id:2,
					},
					{
						label:"待评价",
						id:3,
					},
					{
						label:"全部",
						id:4,
					},
				],
				orderList:[],
				mloading:'more'
			}
		},
		methods:{
			// 商品详情
			detailGood(res){
				let orderid = res.data.order.id;
				let type=1;
				uni.navigateTo({
					url:`/pages/order/order?orderid=${orderid}&type=${type}`
				})
			},
			// 付款
			payGood(res){
				let _this = this;
				let data = res.data;
				let newOrder={...data.order}; 
				let newStore ={...data.store};
				let storeId= newStore.id; // 店铺id
				let totalCount = newOrder.totalCount; // 商品件数
				let type= newOrder.paymentType; // 是团购还是直接购买
				let couponId = newOrder.couponId; // 优惠券id
				let reserveTel=newOrder.reserveTel;//预留电话
				let aboutPickingTime = newOrder.aboutPickingTime; //取货时间
				let carryType = newOrder.carryType;
				let proArr = [...data.productList];
				let proUrlData = encodeURI(JSON.stringify({proUrlData:proArr}));
				let adUrlData = null;
				if(carryType==2){
					 adUrlData = {
						id:undefined
					};
					adUrlData = Object.assign({},data.orderAddress);
					adUrlData.id = data.orderAddress.addressId;
					adUrlData = encodeURI(JSON.stringify(adUrlData));
					uni.navigateTo({
						url:`/pages/order/pay?storeid=${storeId}&totalCount=${totalCount}&type=${type}&couponId=${couponId}&where=orderPage&reserveTel=${reserveTel}&aboutPickingTime=${aboutPickingTime}&proUrlData=${proUrlData}&flag=1&addressInfo=${adUrlData}&carryType=${carryType}`
					})
				}else{
					uni.navigateTo({
						url:`/pages/order/pay?storeid=${storeId}&totalCount=${totalCount}&type=${type}&couponId=${couponId}&where=orderPage&reserveTel=${reserveTel}&aboutPickingTime=${aboutPickingTime}&proUrlData=${proUrlData}&carryType=${carryType}`
					})
				}
			
			},
			// 评论
			commentGood(res){
				let data = res.data;
				let orderid = data.order.id;
				let newProduct = [...data.productList];
				console.log(newProduct)
				let ProductUrlData = encodeURI(JSON.stringify({ProductUrlData:newProduct}));
				uni.navigateTo({
					url:"/pages/order/comment?orderid="+orderid+"&ProductUrlData="+ProductUrlData
				})
			},
			//确认收获
			receivedGoods(res){
				let that = this;
				let orderid = res.data.order.id;
				this.$apis.postReceivedGoods(orderid).then(res=>{
					if(res.code == 1){
						page = 1;
						this.orderList = [];
						this.getOrders();
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			 // 取货
			takeGood(res){
				let orderid = res.data.order.id;
				uni.navigateTo({
					url:"/pages/order/order?orderid="+orderid
				})
			},
			//取消订单
			orderCancel(res){
				let orderid = res.data.order.id;
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
									page = 1;
									_this.orderList = [];
									_this.getOrders();
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
			orderDel(res){
				let orderid = res.data.order.id;
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
									page = 1;
									that.orderList = [];
									that.getOrders();
								}
							}).catch(err=>{
								console.log(err)
							})
						} else if (res.cancel) {
						}
					}
				});
				
			},
			//是否登录了
			async checkLogin(){
				let islogin = await this.globelIsLogin();
				this.isLogin = islogin;
				if(islogin){
					console.log("获取订单列表")
					//获取订单
					page = 1;
					this.orderList = [];
					this.getOrders();
				}
			},
			// 获取订单
			async getOrders(){
				let _this = this;
				uni.showLoading({});
				if(totalpage&&page > totalpage){
					// uni.showToast({"title":"已经加载全部", icon:"none"});
					_this.mloading='noMore';
					uni.hideLoading();
					uni.stopPullDownRefresh();
					return ;
				}
				await this.$apis.postMyOrders({
					state:_this.tabActive,
					start:page,
					length:20
				}).then(res=>{
					if(res.data){
						let data = res.data;
						if(data.orders){
							totalpage=data.pages|| 1;
							var newsList = data.orders;
							_this.orderList = _this.orderList.concat(newsList);
							page++;
						}
					}
					uni.hideLoading();
					uni.stopPullDownRefresh();
				}).catch(err=>{
					uni.hideLoading();
					uni.stopPullDownRefresh();
				});
			},
			// tab栏点击
			tabChange(item){
				console.log("// tab栏点击")
				this.tabActive= item.id;
				page = 1;
				this.orderList = [];
				this.getOrders();
			},
			// 立即支付
			payFn(res){
				// _this.payLoading=false;
				let _this= this;
				let torder = res.data.order;
				let tstore =  res.data.store;
				let products=res.data.productList.map(item=>{return {
					productId:item.id,
					cou:item.buyCount,
				}})
				let sendData ={
					storeId:torder.storeId,//门店id
					totalCount:torder.discount,//商品总数量
					type:torder.is_assemble,//标识是普通下单还是拼团下单 1：普通 2：拼团
					couponId:torder.couponId,//优惠券id,
					products:products,//商品数组对象
					aboutPickingTime:tstore.aboutPickingTime,//预计取货时间 yyyy-MM-dd hh:mm
					outTradeNo:torder.id,
					reserveTel:torder.reserveTel,//预留手机号
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
								// uni.showModal({
								// 	title: '支付失败',
								// 	content: '请您在重新尝试一下支付',
								// 	// showCancel:false,
								// 	confirmText:'重新支付',
								// 	success: function (fRes) {
								// 		if (fRes.confirm) {
								// 			_this.payFn(res);
								// 		} else if (fRes.cancel) {
								// 			console.log('用户点击取消');
								// 		}
								// 	}
								// });
								// _this.payLoading=false;
							},
							complete() {
								// _this.payLoading=false;
							}
						});
					// _this.payLoading=false;
				}).catch(err=>{
					// _this.payLoading=false;
				})
			}
			
		},
		onLoad(option){
			//this.tabActive=uni.getStorageSync('orderTab')|| 1;
			//this.checkLogin();
		},
		onReachBottom(){
			this.mloading='loading';
			this.getOrders();
		},
		// 重置分页及数据
		onPullDownRefresh(){
			page = 1;
			this.orderList = [];
			this.getOrders();
		},
		onShow(){
			this.tabActive= uni.getStorageSync('orderTab')||1;
			this.checkLogin();
		}
	}
</script>
<style lang="scss">
.m-order-page{
	backgroun:#f9f9f9;
	.fixedit{width:100%; position:fixed; z-index:99; left:0; top:0;background: #fff;
	// border-top:10upx solid #f9f9f9;
	box-sizing: border-box;
	}
}

</style>
