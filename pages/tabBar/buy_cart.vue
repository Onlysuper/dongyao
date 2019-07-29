<template>
	<view class="">
		<view class="m_buy_cart_list" v-if="buyCartsList.length > 0">
			<view class="m_title" v-if="buyCartsList.length > 0">
				<view class=""></view>
				<view class="m_title_text"></view>
				<view v-if="isEdit" @tap="edit" class="m_opt">编辑</view>
				<view v-else class="m_opt" @tap="finish" >完成</view>
			</view>
			<view class="m_body" >
				<view class="" v-if="buyCartsList.length > 0">
					<template v-for="(item, index) in buyCartsList">
						<m-buy-carts :key="index" :rowData="item" :isDisplay="isDisplay" @toStoreState="showStoreState" @totalPrice="getTotalPrice"></m-buy-carts>
					</template>
				</view>
			</view>
			<view v-if="isDisplay && buyCartsList.length > 0" class="m_footer" >
				<view class="m_text">
					<radio value="r1" style="transform:scale(0.8)" :checked="checkedAll"  @tap="selectAll()"/>
					<view>全选</view>
					
				</view>
				<view class=""></view>
				<view class="m_opt" @tap="deleteCartProduct">删除</view>
			</view>
		</view>
		<m-empty v-else-if="buyCartsList.length == 0"></m-empty>
	</view>
</template>
<script>
	import mBuyCarts from '@/components/m-buy_cart.vue';
	import mEmpty from "@/components/m-result/m-empty.vue";
	export default {
		components:{
			mBuyCarts,
			mEmpty
		},
		data() {
			return {
				buyCartsList:[],
				checkedAll:true,
				isDisplay:false,
				isEdit:true,
			}
		},
		computed:{
		},
		methods:{
			// 购物车查询
			initBuyCars(){
				let _this = this;
				uni.showLoading({
					title: '加载中'
				});
				this.$apis.postCars({
					storeId:-1
				}).then(res=>{
					if(res.code=='1'){
						this.buyCartsList=res.data;
						this.getTotalPrice();
					}
					uni.hideLoading();
				})
			},
			getTotalPrice(){
				for (var i = 0; i < this.buyCartsList.length; i++) {
					var totalPrice = 0;
					for (var j = 0; j < this.buyCartsList[i].productList.length; j++) {
						if(this.buyCartsList[i].productList[j].checked){
							totalPrice += this.buyCartsList[i].productList[j].presentPrice * this.buyCartsList[i].productList[j].buyCount;
						}
					}	
					this.buyCartsList[i].totalPrice = totalPrice;
				}
			},
			selectAll(){
				if(this.checkedAll){
					this.checkedAll = false;
					for (var i = 0; i < this.buyCartsList.length; i++) {
						this.buyCartsList[i].checked = false;
						for (var j = 0; j < this.buyCartsList[i].productList.length; j++) {
							this.buyCartsList[i].productList[j].checked = false;
						}
					}
				}else{
					this.checkedAll = true;
					for (var i = 0; i < this.buyCartsList.length; i++) {
						this.buyCartsList[i].checked = true;
						for (var j = 0; j < this.buyCartsList[i].productList.length; j++) {
							this.buyCartsList[i].productList[j].checked = true;
						}
					}
				}
			},
			showStoreState(data){
				if(data){
					let flag = true;
					for (var i = 0; i < this.buyCartsList.length; i++) {
						if(this.buyCartsList[i].checked == false){
							flag = false;
							break;
						}
					}
					if(flag){
						this.checkedAll = true;
					}
				}else{
					this.checkedAll = false;
				}
			},
			deleteCartProduct(){
				let keys =[];
				for (var i = 0; i < this.buyCartsList.length; i++) {
					for (var j = 0; j < this.buyCartsList[i].productList.length; j++) {
						if(this.buyCartsList[i].productList[j].checked == true){
							let info =  {
								storeId : "",
								productId:""
							};
							info.storeId = this.buyCartsList[i].productList[j].storeId;
							info.productId = this.buyCartsList[i].productList[j].id;
							keys.push(info);
						}
					}
				}
				this.$apis.delShopCarByProductId(keys).then(res=>{
					if(res.code=='1'){
						this.initBuyCars();
					}
				})
			},
			edit(){
				this.isDisplay = true;
				this.isEdit = false;
				this.checkedAll = false;
				for (var i = 0; i < this.buyCartsList.length; i++) {
					this.buyCartsList[i].checked = false;
					for (var j = 0; j < this.buyCartsList[i].productList.length; j++) {
						this.buyCartsList[i].productList[j].checked = false;
					}
				}
			},
			finish(){
				this.isDisplay =false;
				this.isEdit = true;
				this.checkedAll = true;
				for (var i = 0; i < this.buyCartsList.length; i++) {
					this.buyCartsList[i].checked = true;
					for (var j = 0; j < this.buyCartsList[i].productList.length; j++) {
						this.buyCartsList[i].productList[j].checked = true;
					}
				}
			}
		},
		onLoad(){
			this.initBuyCars();
		}
	}	
</script>
<style lang="scss">
@import "@/common/globel.scss";
.m_buy_cart_list{
	background:#ebebeb;
	.m_title{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: #fff;
		padding:0 20px;
		.m_title_text{
		}
		.m_opt{
			color: #333333;
			font-size: 28upx;
		}
	}
	.m_body{
		background: #ebebeb;
	}
	.m_footer{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: #fff;
		border-top: 1upx solid #ebebeb;
		box-sizing: border-box;
		padding: 10upx 0upx;
		align-items: center;
		left: 0;
        position: fixed; 
        bottom: 0; 
		color: #333333;
		font-size: 30upx;
		width: 100%;
		.m_text{
			margin-left:20rpx;
			padding:15rpx 30rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}
		.m_opt{
			margin-right:20rpx;
			padding:10rpx 30rpx;
			background-color: #ff9900;
			color: white;
			border-radius: 35upx;
		}
	}
}
.empty-row {
	text-align: center;
	font-size: $fontsize-9;
	color: $color-1;
	padding: 66upx 20px;
	background: #f9f9f9;
}
</style>
