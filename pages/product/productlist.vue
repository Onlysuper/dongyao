<template> 
	<view  class="m-product-list">
		<m-empty v-if="nearStoreList.length==0"></m-empty>
		<view v-else class="">
			<view v-for="(item,index) in nearStoreList" @click="goPro(item.id)" :key="index">
				<view class="m-page-title">
					{{item.sName}}
				</view>
				<m-product-list 
				:title="item.synopsis" 
				:labelName="item.labelName" 
				:img="item.pictureUrl" 
				:price="item.presentPrice" 
				:oldprice="item.originalPrice"
				:isAssemble="item.isAssemble"
				></m-product-list>
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
				uni.showLoading({});
				if(totalpage&&page > totalpage){
					_this.mloading='noMore';
					uni.hideLoading();
					uni.stopPullDownRefresh();
					return ;
				}
				this.mPost("/server/p/search/products",{
					start:page,
					length:20,
					name:_this.search,
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
		.m-page-title{
			margin-top: 28upx;
			// margin-bottom: 30upx;
			margin-left: 40upx;
			margin-right: 40upx;
			border-bottom: 1px solid #ebebeb;
			padding:34upx 0;
			font-size: $fontsize-2;
			color:#333333;
		}
	}
</style>
