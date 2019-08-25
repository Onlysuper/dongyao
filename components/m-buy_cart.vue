<template>
	<view class="m_content">
		<view class="m_header"> 
			<radio value="r1" class="m-radio" :checked="rowData.checked" @tap="changeStore(rowData)"/>
			<view class="store_name">{{rowData.sName}}</view>
		</view>
		<template v-for="(item,index) in rowData.productList">
			<view class="m_product" :key="index">
				<view class="m_select" @tap="changeProduct(item,rowData)">
					 <radio value="r1"  class="m-radio" :checked="item.checked" />
				</view>
				<view class="m_img">
					<image :src="item.pictureUrl" mode="aspectFit"></image>
				</view>
				<view class="m_product_info">
					<view>{{item.synopsis}}</view>
					<view class="buy_count">x{{item.buyCount}}</view>
					<view class="price">￥{{item.presentPrice}}/份</view>
				</view>
				<view class="m_num">
					 <view  class="m_buy_opt_del" @tap="handleFn(item,rowData,index)">-</view>
					 <input class="m_input" type="number" :value="item.buyCount" >
					 <view class="m_buy_opt_add" @tap="handAddFn(item,rowData,index)">+</view>
				</view>
			</view>
		</template>
		<view v-if="isDisplay != 1" class="m_peisong">
			<view>配送</view>
			<view>到付</view>
		</view>
		<view v-if="isDisplay != 1 " class="m_zhifu">
			<view class="z_price">￥{{rowData.totalPrice}}</view>
			<view class="but" @tap="payFun(rowData)">
				去结算
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:"m-buy-carts",
		props:{
			isDisplay:{
				type:Number,
				value:1
			},
			rowData:{
				type:Object,
				 // 对象或数组默认值必须从一个工厂函数获取
				default: function () {
					return { 
						sId:undefined,
						sName:"",
						checked:true,
						productList:[{
							buyCount:undefined,
							pictureUrl:"",
							presentPrice:undefined,
							originalPrice:undefined,
							synopsis:"",
							checked:true
						}]
					}
				}
			}
		},
		data() {
			return {
				inputValue: 1,
				totalPrice:undefined
			};
			
		},
		methods:{
			handleFn(item,rowData,index){
				let that = this;
				if(item.buyCount == 1){
					uni.showModal({
						title: '提示',
						content: '确定要删除吗？',
						success: function (res) {
							if (res.confirm) {
								that.$apis.postSubCars({
									storeId:item.storeId,
									productId:item.id,
									buyCount:0
								}).then(res=>{
									if(res.code=='1'){
										rowData.totalPrice-=item.presentPrice;
										rowData.productList.splice(index,1);
										that.$emit("totalPrice",true);
									}
								})
							} else if (res.cancel) {
							}
						}
					});
				}else{
					that.$apis.postSubCars({
						storeId:item.storeId,
						productId:item.id,
						buyCount:item.buyCount-1
					}).then(res=>{
						if(res.code=='1'){
							item.buyCount-=1;
							rowData.totalPrice-=item.presentPrice;
							that.$emit("totalPrice",true);
						}
					})
				}
				
			},
			handAddFn(item,rowData){
				var this_ = this;
				this.$apis.postAddCars({
					storeId:item.storeId,
					productId:item.id,
					buyCount:item.buyCount+1
				}).then(res=>{
					if(res.code=='1'){
						item.buyCount+=1;
						rowData.totalPrice+=item.presentPrice;
						this_.$emit("totalPrice",true);
					}
				})
			},
			changeProduct(item,rowData){
				if(item.checked){
					item.checked = false;
					rowData.checked = false;
				}else{
					item.checked = true;
					var flag = true;
					for (var i = 0; i < rowData.productList.length; i++) {
						if(rowData.productList[i].checked == false){
							flag = false;
							break;
						}
					}
					if(flag){
						rowData.checked = true;
					}
				}
				this.$emit("toStoreState",rowData.checked);
			},
			changeStore(rowData){
				if(rowData.checked){
					rowData.checked = false;
					for (var i = 0; i < rowData.productList.length; i++) {
						rowData.productList[i].checked = false;
					}
				}else{
					rowData.checked = true;
					for (var i = 0; i < rowData.productList.length; i++) {
						rowData.productList[i].checked = true;
					}
				}
				this.$emit("toStoreState",rowData.checked);
			},
			payFun(rowData){
				let storeId = rowData.sId; 
				let type=1; 
				let totalCount=0;
				let tProductList = [];
				for (var i = 0; i < rowData.productList.length; i++) {
					if(rowData.productList[i].checked){
						tProductList.push(rowData.productList[i]);
					}
				}
				let proArr = tProductList.map((val,index,arrs)=>{  
					  var obj={...val};  
					  obj['describes']="";
					  totalCount+=obj.buyCount;
					  return obj  
				});  
				if(totalCount<1){
					uni.showToast({
						title:  "购物车没有商品",
						icon: "none"
					});
					return false
				}
				let proUrlData = encodeURI(JSON.stringify({proUrlData:proArr}));
				uni.navigateTo({
					url:"/pages/order/pay?storeid="+storeId+"&totalCount="+totalCount+"&type="+type+"&userid="+undefined+'&proUrlData='+proUrlData
				})
			},
			getTotalPrice(rowData){
				console.log(rowData)
			}
		}
	}
</script>

<style lang="scss">
@import "../common/globel.scss";
.m_content{
	background-color: #fff;
	margin-bottom: 20upx;
	padding:5upx 20upx;
	.m-radio{
		transform:scale(0.8);
	}
	.m_header{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color:#333333;
		font-size: 34upx;
		height: 80upx;
		line-height: 80upx;
		border-bottom:1px solid #ebebeb;
		.store_name{
		}
	}
	.m_product{
		display: flex;
		justify-content: space-between;
		font-size:  $fontsize-3;
		color: $color-5;
		align-items: center;
		margin:15px 0px;
		.m_img{
			display: flex;
			flex-direction: row;
			align-items: center;
			width:120upx;
			height:120upx;
			padding: 15upx;
		}
		.m_product_info{
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			text-align: left;
			padding-left: 15upx;
			.buy_count{
				margin: 20upx 0upx;
				font-size: $fontsize-3;
			}
			.price{
				font-size: $fontsize-3;
				color: #ff6633;
			}	
			
		}
		.m_num{
			display: flex;
			flex-direction: row;
			height:155rpx;
			align-items:flex-end;
			.ord_price{
				font-size: 25upx;
				margin-right: 15upx;
				color:#b2b2b2;
				text-decoration: line-through
			}
			.m_buy_opt_add{
				padding:6upx 20upx;
				border: 1upx solid #ebebeb;
				box-sizing: border-box;
				border-left: 0px;
			}
			.m_buy_opt_del{
				padding:6upx 20upx;
				border: 1upx solid #ebebeb;
				box-sizing: border-box;
				border-right: 0px;
			}
			.m_input{
				width: 80upx;
				border: 1upx solid #ebebeb;
				box-sizing: border-box;
				// min-height:50rpx;
				// height:50rpx;
				padding:6upx 20upx;
			}
		}
	}
	.m_peisong{
		display: flex;
		justify-content: space-between;
		height:70rpx;
		line-height:70rpx;
		color: #333333;
		font-size: $fontsize-2;
	}
	.m_zhifu{
		display: flex;
		justify-content: flex-end;
		color:#333333;
		font-size: $fontsize-2;
		padding: 30upx 0upx;
		border-top:1px solid #ebebeb;
		.z_price{
			color: #ff6633;
			padding: 10upx;
			font-weight: 600;
		}
		.but{
			background-color: #ff9900;
			padding: 10upx 20upx;
			color: white;
			border-radius: 35upx;
			font-size: 28upx;
			// line-height: 30upx;
		}
	}
	
}
</style>
