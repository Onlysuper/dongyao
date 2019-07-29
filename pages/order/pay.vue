<template>
	<view class="m-pay-page">
		<!-- <scroll-view  scroll-y="true" class="content" > -->
			<view class="m-top-back"></view>
			<!--  商品支付下单 -->
			<view class="m-top-map">
				<view class="m-container">
					<view class="m-header test">
						<view  v-bind:class="{ 'm-title': zActive, 'm-title-unsel': unZActive }" @tap="ziqu">
							自取
						</view>
						<view v-bind:class="{ 'm-title-right': zrActive, 'm-title-right-unsel': unZrActive }" @tap="peisong">
							配送
						</view>
					</view>
					<view class="m-content" v-if="pickType == 1">
						<view class="m-address">
							{{storeData.address}}
						</view>
						<m-map v-if="showMap" :latitude="storeData.lat" :longitude="storeData.lng" :userlat="latitude" :userlng="longitude" :distance="geoDistance(latitude,longitude,storeData.lat,storeData.lng)"></m-map>
						<view class="m-footer">
							<view class="m-item">
								<view class="m-text">
									自取时间
								</view>
								<view class="m-light">
									 <picker ref="date_btn"  mode="date" :disabled="mDisabled" :value="date" :start="startDate" :end="endDate" @cancel="dateCancel" @change="bindDateChange">
										<view class="uni-input picktime_text" >{{date}}</view>
										<button v-if="showBtn==1" :loading="payLoading" :disabled="payLoading"  @tap="payFn" class="m-footer-but" type="primary">立即支付￥{{payPrice}}</button>
									 </picker>
									 <picker mode="time" :disabled="mDisabled" :value="time" start="09:01" end="21:01" @cancel="timeCancel" @change="bindTimeChange">
										<view class="uni-input picktime_text">{{time}}</view>
										<button v-if="showBtn==2" :loading="payLoading" :disabled="payLoading"  @tap="payFn" class="m-footer-but" type="primary">立即支付￥{{payPrice}}</button>
									 </picker>
								</view>
							</view>
							<view class="m-item">
								<view class="m-text">
									预留电话
								</view>
								<view class="m-light">
									<input style="" type="text" v-model="reserveTel" />
								</view>
							</view>
						</view>
					</view>
					<view class="m-sel-address" v-if="pickType == 2 && addressInfo " @tap="toAddressList">
						<view class="m-left">
							<view class="m-address">{{addressInfo.address}}</view>
							<view class="m-info">{{addressInfo.name}}&nbsp;&nbsp;{{addressInfo.mobile}}</view>
						</view>
						<view class="m-right"> 
							<image src="../../static/img/icon/order_down_icon1.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="m-un-address" v-if="pickType == 2 && !addressInfo "  @tap="toAddressEdit">
						<view>新建收获地址</view>
						<view> > </view>
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
				 >
				 
				 </m-order-pro>
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
						{{discount}}
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
				<view class="m-row m-row-bottom">
					<view class="m-label-num">
						<!-- 积分 共<view class="m-num">900</view>, 满 <view class="m-num">1000</view>可用 -->
						{{integration}}
					</view>
					<!-- <view class="m-label-num" v-else>
					</view> -->
					<view  v-if="usedIntegration" style="display: flex;justify-content: flex-end;">
						<switch v-if="usedIntegration > 0" :checked="useIntegration" @change="switchChange" class="m-switch" />
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
		<!-- <view @tap="payFn" class="m-footer-but">
			立即支付￥{{payPrice}}
		</view> -->
		<button v-if="showBtn==0" :loading="payLoading" :disabled="payLoading"  @tap="payFn" class="m-footer-but" type="primary">立即支付￥{{payPrice}}</button>
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
			const currentDate = this.getDate({
				format: true
			})
			return {
				payLoading:false,
				storeid:'',
				zActive:true,
				unZActive:false,
				zrActive:true,
				unZrActive:false,
				storeData:{},
				distance:'',
				today:dateFtt("yyyy-MM-dd hh:mm",new Date()),
				aboutPickingTime:undefined,//预约时间
				reserveTel:"",// 预约手机号
				paytype:"wx",//支付方式
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
				haveTokenCard:false,
				// 优惠券end
				date: "选择日期",
				time: "选择时间",
				pickType:1,
				addressInfo:undefined,
				proUrlData:undefined,
				flag:false,
				useIntegration:false,
				integration:"",//抵扣的描述
				usedIntegration:false,
				mDisabled:false,
				showBtn:1,
				showMap:false
			}
		},
		methods:{ 
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			 bindDateChange: function(e) {
				this.date = e.target.value;
				this.showBtn = 2;
			},
			bindTimeChange: function(e) {
				this.time = e.target.value;
				this.showBtn = 0;
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
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
				if(option){
					let where = '';
					if(option.where){
						where = option.where;
					}
					let proUrlData=decodeURI(option.proUrlData);
					_this.shopCarList=JSON.parse(proUrlData)['proUrlData'];
					if(where=='orderPage'){
						_this.shopCarList=_this.shopCarList.map(item=>{
							// console.log(item)
							return {...item,...{pictureUrl:item['pictures'][0]['pictureUrl']}}
						})
						console.log(_this.shopCarList);
					}
					
				}
				_this.orderInit()
			},
			// 优惠券
			tokenCard(){
				let _this=this;

				_this.$apis.postUsableCoupons({
					storeId:_this.storeid,
					start:1,
					length:1000,
				}).then(res=>{
					
					if(res.data.coupons&&res.data.coupons.length>0){
						_this.haveTokenCard=true
					}
				})
			},
			//生成订单
			orderInit(){
				let _this=this;
				let products=_this.shopCarList.map(item=>{return {
					productId:item.productId||item.id,
					cou:item.buyCount,
				}})
				let sendData = {
					storeId:_this.storeid,
					totalCount:_this.totalCount,
					type:_this.type,
					couponId:_this.couponId,
					products:products, 
					useIntegration:this.useIntegration, 
				}
				
				_this.$apis.postCalOrderPrice(sendData).then(res=>{
					if(res.code=='1'){
						let data= res.data;
						_this.totalPrice=data.totalPrice;
						_this.couponPrice=data.couponPrice;
						_this.yhPrice=data.yhPrice;
						_this.discount=data.discount;
						_this.payPrice=data.payPrice;
						_this.integration = data.integration;
						_this.usedIntegration = data.usedIntegration;
					}
				})
			},
			switchChange(){
				if(!this.useIntegration)
					this.useIntegration = true;
				else
					this.useIntegration = false;
				this.orderInit();
			},
			dateCancel(){
				if(this.date == '选择日期'){
					this.showBtn = 1;
				}
			},
			timeCancel(){
				if(this.date == '选择时间'){
					this.showBtn = 2;
				}
			},
			// 立即支付
			payFn(){
				let _this=this;
				this.aboutPickingTime = "";
				if(this.pickType == 1 || (this.pickType == 2 && this.type==2)){
					if(this.date == '选择日期' && this.time == '选择时间'){
						this.showBtn = 2;
						return;
					}else if( this.date != '选择日期' && this.time == '选择时间'){
						this.showBtn = 0;
						return;
					}else if( this.date == '选择日期' && this.time != '选择时间'){
						this.showBtn = 1;
						return;
					}
					this.aboutPickingTime = this.date +" "+this.time;
				}
				_this.payLoading=true;
				let products=_this.shopCarList.map(item=>{return {
					productId:item.productId||item.id,
					cou:item.buyCount,
				}})
				let sendData ={
					storeId:_this.storeid,//门店id
					totalCount:_this.totalCount,//商品总数量
					type:_this.type,//标识是普通下单还是拼团下单 1：普通 2：拼团
					couponId:_this.couponId,//优惠券id,
					aboutPickingTime:_this.aboutPickingTime?_this.aboutPickingTime+":00":"",//预计取货时间 yyyy-MM-dd hh:mm
					reserveTel:_this.reserveTel,//预留手机号
					products:products,//商品数组对象
					carryType:_this.pickType,//配送类型
					useIntegration:_this.useIntegration
				}
				if(this.pickType == 2){
					sendData.addressId = _this.addressInfo.id;
				}
				if(_this.couponId){
					sendData['couponId']=this.couponId;
				}
				if(_this.outTradeNo){
					sendData['outTradeNo']=this.outTradeNo; //订单id，第一次下单不需要，待支付订单支付时需要传入
				}
				_this.$apis.postWxpay(sendData).then(res=>{
					_this.payLoading=false;
					let data = res.data;
					if(!data.paySign){
						this.paySuccess();
						return
					}
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
					this.payLoading=true;
					uni.requestPayment({
						...paydata,
						success: function(res) {
							_this.payLoading=false;
							_this.paySuccess()
						},
						fail: function(err) {
							_this.payLoading=false;
							//取消支付
							uni.setStorageSync('orderTab', 2);
							uni.switchTab({  
								url: '/pages/tabBar/order'  
							}); 
							 // _this.clearShopcar()
						},
						complete() {
							_this.payLoading=false;
						}
					});
					
				}).catch(err=>{
					_this.payLoading=false;
				})
			},
			//支付成功
			paySuccess(){
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
			},
			// 清空购物车
			clearShopcar(){
				let _this = this;
				_this.$apis.clearShopCar({
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
				this.$apis.postStore({
					id:1
				}).then(res=>{
					this.storeData = res.data;
					this.storeLocation();
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
						_this.showMap = true;
					}
				});
			},
			// 获取到优惠券id回调
			UPDATA_TOKEN(data){
				// console.log('获取到优惠券id回调');
				this.couponId=data.id;
				this.getData();
			},
			ziqu(){
				this.zActive = true;
				this.unZActive = false;
				this.zrActive = true;
				this.unZrActive = false;
				this.pickType = 1;
				if(this.date == '选择日期'){
					this.showBtn = 1;
				}else if(this.time=='选择时间'){
					this.showBtn = 2;
				}else{
					this.showBtn = 0;
				}
			},
			peisong(){
				this.zActive = false;
				this.unZActive = true;
				this.zrActive = false;
				this.unZrActive =  true;
				this.pickType = 2;
				this.showBtn = 0;
			},
			toAddressEdit(){
				uni.navigateTo({
					url:"/pages/address/edit"
				})
			},
			getAddress(){
				let _this = this;
				this.$apis.postSelAddress(
				).then(res=>{ 
					if(res.code == 1){
						if(res.data.list.length>0){
							_this.addressInfo = res.data.list[0];
						}
					}
				}).catch(error=>{
				})
			},
			toAddressList(){
				if(this.date != '选择日期' && this.time != '选择时间'){
					this.aboutPickingTime = this.date +" "+this.time;
				}
				uni.navigateTo({
					url:"/pages/address/list?storeid="+this.storeid+"&totalCount="+this.totalCount+"&type="+this.type+"&userid="+this.userid+'&proUrlData='+this.proUrlData+'&flag=1'+'&aboutPickingTime='+this.aboutPickingTime
				})
			},
		},
		created(option){
			console.log("先执行了。。。。。。。。。。。。。。。。。。。。");
		},
		// 
		onLoad(option){
			this.ziqu()
			if(option.aboutPickingTime && option.aboutPickingTime!="undefined" && option.aboutPickingTime!="null"){
				let tempTime = option.aboutPickingTime.split(" ");
				this.date = tempTime[0];
				if(tempTime[1].length>6){
					this.time = tempTime[1].substring(0,tempTime[1].length-3);
				}else{
					this.time =tempTime[1];
				}
				this.aboutPickingTime = option.aboutPickingTime
				this.showBtn = 0;
			}
			if(option.addressInfo && option.addressInfo!="null"){
				let addressInfoTemp = decodeURI(option.addressInfo);
				this.addressInfo = JSON.parse(addressInfoTemp);
			}
			if(option.flag){
				this.flag = true;
			}
			
			if(option.carryType && option.carryType!='undefined' && option.carryType!='null'){
				if(option.carryType == 2){
					this.peisong();
				}
			}
			this.reserveTel=option.reserveTel||uni.getStorageSync('phone')||"";
			this.couponId=option.couponId|| "",
			this.storeid=option.storeid;
			this.totalCount=option.totalCount;
			this.proUrlData=option.proUrlData;
			// 位置
			this.type=option.type
			if(this.type == 2){
				this.mDisabled = true;
				this.showBtn = 0;
			}
			//店铺详情
			this.storeDetail();
			//购买商品清单
			this.getData(option);
			//商家优惠券
			this.tokenCard();
			if(!this.flag){
				//获取地址
				this.getAddress();
			}else{
				this.peisong();
			}
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
	height:350upx;
	background: linear-gradient(#34c191,#FFF);
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
			padding-top: 50upx;
			.m-header{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				background-color: #f7f7f7;
				width:100%;
				height:65upx;
				border-top-left-radius: 10upx;
				border-top-right-radius: 10upx;
				.m-title{
					background:url('../../static/img/icon/Apay_button10.png') no-repeat;
					background-size: 100% 100%;
					line-height: 100upx;
					font-size: $fontsize-2;
					color:$color-2;
					padding-left: 30upx;
					position: relative;
					width: 50%;
					padding-bottom: 10upx;
					position: absolute;
					left: 0;
					z-index: 1;
					margin-top: -12px;
				}
				.m-title-unsel{
					line-height: 72upx;
					font-size: $fontsize-2;
					color:$color-2;
					padding-left: 30upx;
					position: relative;
					width: 45%;
					padding-bottom: 10upx;
					position: absolute;
					left: 0;
					z-index: 1;
				}
				.m-title-right{
					line-height: 72upx;
					font-size: $fontsize-2;
					color:$color-2;
					padding-left: 30upx;
					position: relative;
					width: 45%;
					padding-bottom: 10upx;
					position: absolute;
					right: 0;
					z-index: 1;
				}
				.m-title-right-unsel{
					background:url('../../static/img/icon/order_button_2.png') no-repeat;
					background-size: 100% 100%;
					line-height: 100upx;
					font-size: $fontsize-2;
					color:$color-2;
					padding-left:60rpx;
					position: relative;
					width: 50%;
					padding-bottom: 20upx;
					position: absolute;
					right: 0;
					z-index: 1;
					margin-top: -12px;
					margin-right:-5px;
				}
			}
			.m-un-address{
				background: #fff;
				box-shadow:0upx 5upx 10upx rgba(0,0,0,0.2);
				border-bottom-right-radius: 10upx;
				border-bottom-left-radius: 10upx;
				display: flex;
				justify-content: space-between;
				padding:75upx 20upx;
				font-size:$fontsize-4;
			}
			.m-sel-address{
				background: #fff;
				box-shadow:0upx 5upx 10upx rgba(0,0,0,0.2);
				border-bottom-right-radius: 10upx;
				border-bottom-left-radius: 10upx;
				display: flex;
				justify-content: space-between;
				padding: 30upx;
				align-items: center;
				.m-left{
					display: flex;
					flex-direction:column;
					flex-grow: 1;
					.m-address{
						font-size: $fontsize-2;
						color: $color-black;
						margin-top: 20upx;
						margin-bottom: 20upx;
					}
					.m-info{
						margin-bottom: 30upx;
						font-size: $fontsize-4;
						color: $color-9;
					}
				}
				.m-right{
					display: flex;
					flex-direction: row;
					align-items: center;
					width:18upx;
					height:18upx;
				}
			}
			.m-content{
				background: #fff;
				box-shadow:0upx 5upx 10upx rgba(0,0,0,0.2);
				// border-top-left-radius: 10upx;
				// border-top-right-radius: 10upx;
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
							font-size: $fontsize-3
						}
						.picktime_text{
							color:$color-price;
							font-size: $fontsize-4;
						}
						.m-light{
							color: $color-5;
							font-size: $fontsize-5;
							height: 40upx;
							display: flex;
							justify-content:flex-start;
							align-items: center;
							input{
								height: 40upx;
								justify-content:flex-start;
								align-items: center;
							}
							.uni-input{
								margin-right: 15upx;
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
				color:$color-1;
				&.m-token{
					color:$color-active;
				}
			}
			.m-label-num{
				display: flex;
				flex-direction: row;
				// align-items: center;
				justify-content: space-between;
				.m-num{
					color:black;
					font-weight: 600;
					margin: 8upx;
				}
			}
			.m-switch{
				transform:scale(0.75);
			}
		}
		.m-row-bottom{
			height:65rpx;
			line-height:65rpx;
		}
		.m-footer{
			margin-top:35upx;
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
				font-weight: 600;
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
		border-radius: 0;
	}
}
.test{
	// border-bottom: 1px solid red;
}
</style>
