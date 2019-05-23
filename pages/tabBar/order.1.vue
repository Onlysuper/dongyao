<template>
	<view class="m-order-page">
		
		<view class="fixedit">
			<m-tab @handleFn="tabChange" :tabActive="tabActive" :rowdata="tabList"></m-tab>
		</view>
		<view style="height:60px;"></view>
		<m-need-login v-if="!isLogin"></m-need-login>
		
		<view v-else class="m-order-body">
			<view class="" v-for="(item,index) in orderList" :key="index">
				{{item.store}}
				<view>{{item.store.name}}</view>
				<view>{{item.store.imgUrl}}</view>
				<view>{{item.order.state}}</view> 
				<!-- <view>{{item.order.state}}</view> -->
			</view>
			</m-order-list>
		</view>
		<template>
			<uni-load-more :status="mloading"></uni-load-more>
		</template>
	</view>
</template>
<script>
	import mTab from "@/components/m-tab.vue";
	import mOrderList from "@/components/m-order-list.vue";
	import mNeedLogin from "@/components/m-need-login.vue";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	var page = 0,totalpage=0;
	export default {
		name:"m-footer-car",
		props:{},
		components:{
			mTab,
			uniLoadMore,
			mOrderList,
			mNeedLogin
		},
		data(){
			return{
				isLogin:false,
				tabActive:1,
				tabList:[
					{
						label:"待取货",
						id:"1",
					},
					{
						label:"待支付",
						id:"2",
					},
					{
						label:"待评价",
						id:"3",
					},
					{
						label:"全部",
						id:"4",
					},
				],
				orderList:[],
				mloading:'more'
			}
		},
		methods:{
			//是否登录了
			checkLogin(){
				let _this = this;
				_this.globelIsLogin().then(res=>{
					if(res=='success'){
						//已登录
						_this.isLogin=true;
						
					}
				}).catch(err=>{
					_this.isLogin=false
				});
			},
			// 获取订单
			getOrders(){
				let _this = this;
				uni.showLoading({});
				if(totalpage&&page > totalpage){
					uni.showToast({"title":"已经加载全部", icon:"none"});
					return ;
				}
				this.mPost('/server/o/myOrders',{
					state:_this.tabActive,
					start:page,
					length:20
				}).then(res=>{
					if(res.data){
						let data = res.data;
						if(data.orders){
							totalpage=data.pages;
							var newsList = data.orders;
							this.orderList = this.orderList.concat(newsList);
							console.log(this.orderList);
							uni.hideLoading();
							page++;
						}
					}
				}).catch(err=>{
					uni.hideLoading();
				});
			},
			// tab栏点击
			tabChange(item){
				this.tabActive= item.id;
			}
		},
		// 重置分页及数据
		onPullDownRefresh(){
			page = 1;
			this.artList = [];
			this.getNewsList();
		},
		// 加载更多
		onReachBottom(){
			this.mloading='loading';
			this.getNewsList();
		},
		onLoad(){
			this.checkLogin();
			
			//获取订单
			page = 1;
			orderList:[];
			this.getOrders();
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
