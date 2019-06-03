<template>
	<view  class="m-groupbuy-page">
		<view  class="m-page-title">
			<image style="width:148upx;height:46upx;" src="../../static/img/icon/purchase_icon_title.png" mode="aspectFit"></image>
		</view>
		<m-empty v-if="groupsellList.length==0"></m-empty>
		<view v-else class="">
			<view  v-for="(item,index) in groupsellList" :key="index" class="m-list">
				<m-groupbuy-list 
				@goStore="goStore"
				:storeid="item.storeId"
				:typeid="item.typeId"
				:productid="item.id"
				:title="item.synopsis" 
				:labelName="item.labelName" 
				:img="item.pictureUrl" 
				:price="item.presentPrice" 
				:oldprice="item.originalPrice"
				:isAssemble="item.isAssemble">
				</m-groupbuy-list>
			</view>
		</view>
		 <uni-load-more :status="mloading"></uni-load-more>
	</view>
</template>
<script>
	var page = 0,totalpage=0;
	import mEmpty from "@/components/m-result/m-empty.vue";
	import mGroupbuyList from '@/components/m-groupbuy-list'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	export default {
		data() {
			return {
				// 附近门店
				groupsellList:[],
				mloading:'more'
			}
		},
		components: {
			mGroupbuyList,
			uniLoadMore,
			mEmpty
		},
		methods:{
			getGroupsellList(){
				uni.showLoading({});
				if(totalpage&&page > totalpage){
					this.mloading='noMore';
					uni.hideLoading();
					uni.stopPullDownRefresh();
					return ;
				}
				this.mPost('/server/p/group/products',{
					start:page,
					length:20
				}).then(res=>{
						if(res.data){
							let data = res.data;
							if(data.list){
								totalpage=data.pages;
								var newsList = data.list;
								this.groupsellList = this.groupsellList.concat(newsList);
								uni.hideLoading();
								page++;
							}
						}
				}).catch(err=>{
					uni.hideLoading();
				});
			},
			//跳转到商家
			goStore(res){
				uni.navigateTo({
					url:"/pages/product/product?id="+res.productid
				})
			}
		},
		// 加载更多
		onReachBottom(){
			this.getGroupsellList();
		},
		//下拉刷新
		onPullDownRefresh : function(){
			// 重置分页及数据
			page = 1;
			this.groupsellList =[];
			this.getGroupsellList();
		},
		onLoad(){
			page = 1;
			groupsellList:[];
			this.getGroupsellList();
		}
	}
</script>
<style lang="scss">
	.m-groupbuy-page{
		// padding: 30upx;
		.m-page-title{
			margin-top: 30upx;
			margin-bottom: 30upx;
			padding-left: 40upx;
		}
		.m-list{
			border-bottom: 1px solid #ebebeb;
		}
	}
</style>
