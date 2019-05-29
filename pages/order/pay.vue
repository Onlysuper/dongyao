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
							{{storeData.address}}
						</view>
						<m-map :latitude="storeData.lat" :longitude="storeData.lng" :userlat="latitude" :userlng="longitude" :distance="geoDistance(latitude,longitude,storeData.lat,storeData.lng)"></m-map>
						<view class="m-footer">
							<view class="m-item">
								<view class="m-text">
									自取时间
								</view>
								<view class="m-light">
									<!-- 16：30 -->
									<ruiDatePicker
										fields="minute"
										:start="today"
										end="2030-12-30 23:59"
										:value="aboutPickingTime"
										@change="bindChange"
										@cancel="bindCancel"
									></ruiDatePicker>
								</view>
							</view>
							<view class="m-item">
								<view class="m-text">
									预留电话
								</view>
								<view class="m-light">
									<input style="" type="text" :value="reserveTel" />
									
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="m-pro-container">
				<m-order-pro v-for="(item) in shopCarList" :key="item.id"
				:title="item.synopsis"
				:price="item.presentPrice"
				:oldprice="item.originalPrice"
				:imgurl="item.pictureUrl"
				:num="item.buyCount"
				 ></m-order-pro>
			</view>
			<!-- 价钱 -->
			<view class="m-pro-message">
				<view class="m-row">
					<view class="m-label">
						商品原价
					</view>
					<view class="m-price">
						¥{{totalPrice}}
					</view>
				</view>
				<view class="m-row">
					<view class="m-label">
						商品折扣
					</view>
					<view class="m-discount">
						-¥{{discount}}
					</view>
				</view>
				<view class="m-row">
					<view class="m-label">
						商品优惠
					</view>
					<view class="m-discount">
						-¥{{yhPrice}}
					</view>
				</view>
				<view class="m-row">
					<view class="m-label">
						优惠券抵用
					</view>
					<view class="m-discount">
						-¥{{couponPrice}}
					</view>
				</view>
				<view class="m-row">
					<view class="m-label">
						优惠券
					</view>
					<view  v-if="!haveTokenCard" class="m-token" >
						暂无可用>
					</view>
					<view @tap="choseTokenFn" v-else class="m-token active" >
						选择优惠券>
					</view>
				</view>
				<view class="m-footer">
					合计<view class="count">￥{{payPrice}}</view>
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
		<view @tap="payFn" class="m-footer-but">
			立即支付￥{{payPrice}}
		</view>
	</view>
</template>

<script>
	import Event from '../../common/event.js'; 
	/**************************************时间格式化处理************************************/
	function dateFtt(fmt,date)   
	{ //author: meizz   
	  var o = {   
		"M+" : date.getMonth()+1,                 //月份   
		"d+" : date.getDate(),                    //日   
		"h+" : date.getHours(),                   //小时   
		"m+" : date.getMinutes(),                 //分   
		"s+" : date.getSeconds(),                 //秒   
		"q+" : Math.floor((date.getMonth()+3)/3), //季度   
		"S"  : date.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
		fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
		if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
	}
	import mMap from '@/components/m-map'
	import mOrderPro from '@/components/m-order-pro'
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	export default {
		components:{
			mMap,
			mOrderPro,
			ruiDatePicker
		},
		data() {
			return {
				storeid:'',
				storeData:{},
				distance:'',
				today:dateFtt("yyyy-MM-dd hh:mm",new Date()),
				aboutPickingTime:dateFtt("yyyy-MM-dd hh:mm",new Date()),//预约时间
				reserveTel:"17600802360",// 预约手机号
				paytype:"wx",//支付方式
				// userid:"",
				type:"",//是否是拼团订单
				latitude: 39.909,
				longitude: 116.39742,
				
				shopCarList:[],
				totalCount:0,
				//结算start
				totalPrice:"",
				couponPrice:"",
				yhPrice:"",
				discount:0,
				payPrice:0,
				couponId:0,
				// 结算end
				// 优惠券start
				haveTokenCard:false
				// 优惠券end
			};
		},
		methods:{
			// 选择优惠券
			choseTokenFn(){
				uni.navigateTo({
					url:"/pages/order/tokens?storeid="+this.storeid
				})
			},
			paytypeFn(type){
				this.paytype=type;
			},
			// 支付数据
			getData(option){
				let _this= this;
				let proUrlData=decodeURI(option.proUrlData);
				_this.shopCarList=JSON.parse(proUrlData)['proUrlData'];
				_this.orderInit()
			},
			// 优惠券
			tokenCard(){
				let _this=this;
				_this.mPost("/server/co/usableCoupons",{
					storeId:_this.storeid,
					start:1,
					length:1000,
				}).then(res=>{
					if(res.code==1){
						if(res.data.coupons&&res.data.coupons.length>0){
							_this.haveTokenCard=true
						}
					}
				})
			},
			//生成订单
			orderInit(){
				let _this=this;
				let sendData = {
					storeId:_this.storeid,
					totalCount:_this.totalCount,
					type:_this.type,
					products:_this.shopCarList,
					couponId:_this.couponId,
				}
				_this.mPost("/server/pay/calOrderPrice",sendData).then(res=>{
					if(res.code=='1'){
						let data= res.data;
						_this.totalPrice=data.totalPrice;
						_this.couponPrice=data.couponPrice;
						_this.yhPrice=data.yhPrice;
						_this.discount=data.discount;
						_this.payPrice=data.payPrice;
					}
				})
			},
			// 立即支付
			payFn(){
				let _this=this;
				let products=_this.shopCarList.map(item=>{return {
					productId:item.id,
					cou:item.buyCount,
				}})
				let sendData ={
					storeId:_this.storeid,//门店id
					totalCount:_this.totalCount,//商品总数量
					type:_this.type,//标识是普通下单还是拼团下单 1：普通 2：拼团
					couponId:_this.couponId,//优惠券id,
					aboutPickingTime:_this.aboutPickingTime?_this.aboutPickingTime+":00":"",//预计取货时间 yyyy-MM-dd hh:mm
					reserveTel:_this.reserveTel,//预留手机号
					products:products//商品数组对象
				}
				if(_this.couponId){
					sendData['couponId']=this.couponId;
				}
				if(_this.outTradeNo){
					sendData['outTradeNo']=this.outTradeNo; //订单id，第一次下单不需要，待支付订单支付时需要传入
				}
				_this.mPost("/server/pay/wxpay",sendData).then(res=>{
					if(res.code==1){
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
							uni.requestPayment({
								...paydata,
								success: function(res) {
									uni.showModal({
										title: '支付成功',
										content: '可在我的订单中查看详情',
										showCancel:false,
										confirmText:'查看订单',
										success: function (res) {
											if (res.confirm) {
												uni.setStorageSync('orderTab', 1);
												uni.switchTab({  
													url: '/pages/tabBar/order'  
												});
											} 
											else if (res.cancel) {
												console.log('用户点击取消');
											}
										}
									});
									 
									// _this.clearShopcar()
								},
								fail: function(err) {
									//取消支付
									uni.setStorageSync('orderTab', 2);
									uni.switchTab({  
										url: '/pages/tabBar/order'  
									}); 
									 // _this.clearShopcar()
								}
							});
					}
				})
			},
			// 清空购物车
			clearShopcar(){
				let _this = this;
				_this.mPost("/server/sc/delete/all",{
					// userId:this.userid
				}).then(res=>{
					if(res.code=='1'){
						console.log('这里');
							_this.shopCarList=[];
							// 购物车总商品数，与总价格计算
							_this.shopCarCountClear();
							_this.hideSpec();
					}
				})
			},
			//门店详情
			storeDetail(){
				this.mPost("/server/s/storeById",{
					id:this.storeid
				}).then(res=>{
					this.storeData = res.data;
					console.log(res)
				}).catch(error=>{
					console.log(error)
				})
			},
			
			storeLocation(){
				let _this = this;
				uni.getLocation({//获取当前的位置坐标
					type: 'gcj02',
					success: function (res) {
						_this.latitude=res.latitude;
						_this.longitude=res.longitude;
					}
				});
			},
			// 获取到优惠券id回调
			UPDATA_TOKEN(data){
				// console.log('获取到优惠券id回调');
				this.couponId=data.id;
				this.getData();
			}
		},
		// 
		onLoad(option){
			console.log(111111);
			this.couponId=option.couponId|| "",
			this.storeid=option.storeid;
			this.totalCount=option.totalCount,
			this.type=option.type
			// 位置
			this.storeLocation();
			//店铺详情
			this.storeDetail();
			//购买商品清单
			this.getData(option);
			//商家优惠券
			
			this.tokenCard();
			Event.addNoticeFun(Event.UPDATA_TOKEN, "UPDATA_TOKEN", this)
		},
		onUnload(){
				Event.removeNoticeFun(Event.UPDATA_TOKEN)
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
							height: 40upx;
							display: flex;
							justify-content:flex-start;
							align-items: center;
							input{
								height: 40upx;
								justify-content:flex-start;
								align-items: center;
							}
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
				&.m-token{
					color:$color-active;
				}
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
