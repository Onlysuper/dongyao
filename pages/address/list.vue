<template>
	<view class="m-main">
		<template v-for="(item,index) in addressList">
			<view class="m-content" :key="index">
				<view class="m-left" @tap="toDetil(item)">
					<view class="m-address">{{item.address}}</view>
					<view class="m-info">{{item.name}}&nbsp;&nbsp;{{item.mobile}}</view>
				</view>
				<view class="m-right" @tap="toDetil(item)"> 
					<image src="../../static/img/icon/order_down_icon1.png" mode="aspectFit"></image>
				</view>
			</view>
		</template>
		<view class="but" @tap="toDetil">
			<!-- <view class="m-icon">
				<image src="../../static/img/icon/shop_icon_add.png" mode="aspectFit"></image>
			</view> -->
			+ 新增收获地址
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList:[],
				addressInfo:{},
				flag:false,
				reserveTel:"",
				couponId:"",
				storeid:"",
				totalCount:"",
				proUrlData:"",
				aboutPickingTime:undefined,
				type:""
			}
		},
		methods: {
			getAddress(){
				this.$apis.postSelAddress(
				).then(res=>{ 
					if(res.code == 1){
						this.addressList = res.data.list;
					}
				}).catch(error=>{
				})
			},
			toDetil(item){
				let adUrlData = null;
				if(item){
					adUrlData = encodeURI(JSON.stringify(item));
				}
				if(this.flag){
					uni.navigateTo({
						url:"/pages/order/pay?storeid="+this.storeid+"&totalCount="+this.totalCount+"&type="+this.type+"&userid="+this.userid+'&proUrlData='+this.proUrlData+'&addressInfo='+adUrlData+"&flag=1"+"&aboutPickingTime="+this.aboutPickingTime
						
					})
				}else{
					uni.navigateTo({
						url:"/pages/address/edit?adUrlData="+adUrlData
					})
				}
			}
		},
		onLoad(option) {
			if(option.flag){
				this.reserveTel=option.reserveTel||uni.getStorageSync('phone')||"";
				this.couponId=option.couponId|| "";
				this.storeid=option.storeid;
				this.totalCount=option.totalCount;
				this.proUrlData=option.proUrlData;
				this.type=option.type;
				this.aboutPickingTime = option.aboutPickingTime;
				this.flag =  true;
				
			}
			this.getAddress();
		}
	}
</script>


<style lang="scss">
@import "../../common/globel.scss";
.m-content{
	margin-top: 10upx;
	background: #fff;
	box-shadow:0upx 5upx 10upx rgba(0,0,0,0.2);
	border-radius: 10upx;
	// border-bottom-left-radius: 10upx;
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
		margin-left:30upx;
	}
}
.but{
	background-color: darkseagreen;
	margin: 10px;
	padding: 15upx;
	color: white;
	border-radius: 35upx;
	text-align: center;
	position:fixed;
	bottom:0;
	font-size:28rpx;
	width:90%;
	text-align:center;
}


</style>
