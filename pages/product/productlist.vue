<template> 
	<view  class="m-product-list">
		<m-empty v-if="nearStoreList.length==0"></m-empty>
		<view v-else class="">
			<view v-for="(item,index) in nearStoreList" @click="goPro(item.id)" :key="index">
				<view class="m-store-main">
					<view class="left">
						<image :src="item.imgUrl" style="width:120upx;height: 90upx;" mode="aspectFill"></image>
					</view>
					<view class="center">
						<view class="text_title">{{item.name}}</view>
						<view class="text_addr">{{item.address}}</view>
						<!-- {{item.sName}} -->
					</view>
					<view class="right"  v-if="rowData.fencingRange > 500">
						{{rowData.fencingRange/1000}}km
					</view>
					<view class="right" v-else>
						附近
					</view>
				</view>
				<template v-for="(product, pIndex) in item.products">
					<m-product-list 
					:key="pIndex"
					:title="product.synopsis" 
					:labelName="product.labelName" 
					:img="product.pictureUrl" 
					:price="product.presentPrice" 
					:oldprice="product.originalPrice"
					:isAssemble="product.isAssemble"
					></m-product-list>
				</template>
			</view>
		</view>
		 <uni-load-more :status="mloading"></uni-load-more> 
	</view>
</template>
<script>
	var page = 1,totalpage=1;
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import mProductList from '@/components/m-product-list'
	import mEmpty from "@/components/m-result/m-empty.vue";
	export default {
		components: {
			mProductList,
			mEmpty,
			uniLoadMore
		},
		data() {
			return {
				mloading:'more',
				search:"",
				// 附近门店
				nearStoreList:[]
			}
		},
		
		methods:{
			//跳转到商品详情
			goPro(id){
				// console.log(id);
				uni.navigateTo({
					url:"/pages/product/product?id="+id
				})
			},
			getProducts(){
				let _this = this;
				uni.showLoading({
					title:"加载中..."
				});
				if(totalpage&&page > totalpage){
					_this.mloading='noMore';
					uni.hideLoading();
					uni.stopPullDownRefresh();
					return ;
				}
				this.$apis.postSearchProductsHome({
					start:page,
					length:20,
					name:_this.search,
					lat:"116.342737",
					lng:"39.868725"
				}).then(res=>{
					let data = res.data;
					if(data.list){
							totalpage=data.pages|| 1;
							var newsList = data.list;
							_this.nearStoreList = _this.nearStoreList.concat(newsList);
							page++;	
					}
					uni.hideLoading();
					uni.stopPullDownRefresh();
				}).catch(err=>{
					uni.hideLoading();
					uni.stopPullDownRefresh();
				})
			}
		},
		// 加载更多
		onReachBottom(){
			this.mloading='loading';
			this.getProducts();
		},
		// 重置分页及数据
		onPullDownRefresh(){
			page = 1;
			this.nearStoreList = [];
			this.getProducts();
		},
		onLoad(option){
			this.search=option.search;
			page = 1;
			this.nearStoreList = [];
			this.getProducts();
		}
		
	}
</script>
<style lang="scss">
	@import "../../common/globel.scss";
	.m-product-list{
		// padding: 30upx;
		.m-store-main{
			margin-top: 28upx;
			// margin-bottom: 30upx;
			margin-left: 40upx;
			margin-right: 40upx;
			// border-bottom: 1px solid #ebebeb;
			padding:34upx 0;
			font-size: $fontsize-2;
			color:#333333;
			display:flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			align-content: center;
			.left{
				width: 20%;
			}
			.center{
				flex-grow: 1;
				display:flex;
				flex-direction: column;
				justify-content: flex-start;
				.text_title{
					font-size: 34upx;
					font-weight: 600;
					color: #4D4D4D;
					margin-bottom: 20upx;
				}
				.text_addr{
					font-size: 26upx;
					color: #4D4D4D;
				}
			}
			.right{
				font-size: 22upx;
				width: 8%;
				color: #3F536E;
			}
		}
	}
</style>
