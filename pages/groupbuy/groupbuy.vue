<template>
	<view  class="m-groupbuy-page">
		<view @tap="goStore" class="m-page-title">
			<image style="width:148upx;height:46upx;" src="../../static/img/icon/purchase_icon_title.png" mode="aspectFit"></image>
		</view>
		<view  v-for="(item,index) in groupsellList" :key="index" class="m-list">
			<m-groupbuy-list 
			:title="item.synopsis" 
			:labelName="item.labelName" 
			:img="item.pictureUrl" 
			:price="item.presentPrice" 
			:oldpric="item.originalPrice"
			:isAssemble="item.isAssemble">
				<image @tap="goStore" style="width:164upx;height:60upx;" src="../../static/img/icon/purchase_button_buy.png" mode="aspectFit"></image>
			</m-groupbuy-list>
		</view>
	</view>
</template>
<script>
	var page = 0,totalpage=0;
	import mGroupbuyList from '@/components/m-groupbuy-list'
	export default {
		data() {
			return {
				// page:0,//当前页数
				// 附近门店
				groupsellList:[]
			}
		},
		components: {
			mGroupbuyList
		},
		methods:{
				getGroupsellList(){
					uni.showLoading({});
					if(totalpage&&page > totalpage){
						uni.showToast({"title":"已经加载全部", icon:"none"});
						return ;
					}
					this.mPost('/server/p/group/products',{
						start:page,
						length:20
					}).then(res=>{
						if(res.code=1){
							if(res.data){
								let data = res.data;
								if(data.list){
									totalpage=data.pages;
									var newsList = data.list;
									this.groupsellList = this.groupsellList.concat(newsList);
									uni.hideLoading();
									page++;
// 									console.log(data.list);
// 									this.groupsellList = data.list;
								}
							}
						}
					}).catch(err=>{
						console.log(err);
					});
				},
				//跳转到商家
				goStore(){
					uni.navigateTo({
						url:"/pages/store/store"
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
