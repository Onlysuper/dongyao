<template>
	<view class="m-order-page">
		<view class="fixedit">
			<m-tab @handleFn="tabChange" :tabActive="tabActive" :rowdata="tabList"></m-tab>
		</view>
		<view style="height:60px;"></view>
		<m-need-login v-if="!isLogin"></m-need-login>
		<m-empty v-else-if="orderList.length==0"></m-empty>
		<view v-else class="m-order-body">
			<m-order-list v-for="(item,index) in orderList" 
			@detailGood="detailGood"
			@takeGood="takeGood"
			@payGood="payGood"
			@againGood="againGood"
			@commentGood="commentGood"
			 :rowData="item"
			 :key="index"
			 :status="item.order.state"
			 :price="item.order.totalPrice"
			 :num="item.order.totalCount"
			 :createTime="item.order.createTime"
			 :extrctime="item.order.actualPickingTime"
			 :aboutPickingTime="item.order.aboutPickingTime"
			 :title="item.store.name"
			 :productList="item.productList"
			 ></m-order-list>
			 <uni-load-more :status="mloading"></uni-load-more> 
		</view>
	</view>
</template>
<script>
	import Event from '../../common/event.js'; 
	import mTab from "@/components/m-tab.vue";
	import mOrderList from "@/components/m-order-list.vue";
	import mNeedLogin from "@/components/m-need-login.vue";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import mEmpty from "@/components/m-result/m-empty.vue";
	var page = 1,totalpage=1;
	export default {
		name:"m-footer-car",
		props:{},
		components:{
			mTab,
			uniLoadMore,
			mOrderList,
			mNeedLogin,
			mEmpty
		},
		data(){
			return{
				isLogin:false,
				tabActive:1,
				tabList:[
					{
						label:"待取货",
						id:1,
					},
					{
						label:"待支付",
						id:2,
					},
					{
						label:"待评价",
						id:3,
					},
					{
						label:"全部",
						id:4,
					},
				],
				orderList:[],
				mloading:'more'
			}
		},
		methods:{
			// 商品详情
			detailGood(res){
				let orderid = res.data.order.id;
				let type=1;
				uni.navigateTo({
					url:`/pages/order/order?orderid=${orderid}&type=${type}`
				})
			},
			// 付款
			payGood(res){
				let _this = this;
				let data = res.data;
				let newOrder={...data.order}; 
				let newStore ={...data.store};
				let storeId= newStore.id; // 店铺id
				let totalCount = newOrder.totalCount; // 商品件数
				let type= newOrder.paymentType; // 是团购还是直接购买
				let couponId = newOrder.couponId; // 优惠券id
				let reserveTel=newOrder.reserveTel;//预留电话
				let proArr = [...data.productList];
				let proUrlData = encodeURI(JSON.stringify({proUrlData:proArr}));
				uni.navigateTo({
					url:`/pages/order/pay?storeid=${storeId}&totalCount=${totalCount}&type=${type}&couponId=${couponId}&where=orderPage&reserveTel=${reserveTel}&proUrlData=${proUrlData}`
				})
			},
			// 评论
			commentGood(res){
				let data = res.data;
				let orderid = data.order.id;
				let newProduct = [...data.productList];
				let ProductUrlData = encodeURI(JSON.stringify({ProductUrlData:newProduct}));
				uni.navigateTo({
					url:"/pages/order/comment?orderid="+orderid+"&ProductUrlData="+ProductUrlData
				})
			},
			 // 取货
			takeGood(res){
				let orderid = res.data.order.id;
				uni.navigateTo({
					url:"/pages/order/order?orderid="+orderid
				})
			},
		
			//是否登录了
			async checkLogin(){
				let islogin = await this.globelIsLogin();
				this.isLogin = islogin;
				if(islogin){
					//获取订单
					page = 1;
					this.orderList = [];
					this.getOrders();
				}
			},
			// 获取订单
			getOrders(){
				let _this = this;
				uni.showLoading({});
				if(totalpage&&page > totalpage){
					// uni.showToast({"title":"已经加载全部", icon:"none"});
					_this.mloading='noMore';
					uni.hideLoading();
					uni.stopPullDownRefresh();
					return ;
				}
				this.$apis.postMyOrders({
					state:_this.tabActive,
					start:page,
					length:20
				}).then(res=>{
					if(res.data){
						let data = res.data;
						if(data.orders){
							totalpage=data.pages|| 1;
							var newsList = data.orders;
							_this.orderList = _this.orderList.concat(newsList);
							page++;
						}
					}
					uni.hideLoading();
					uni.stopPullDownRefresh();
				}).catch(err=>{
					uni.hideLoading();
					uni.stopPullDownRefresh();
				});
			},
			// tab栏点击
			tabChange(item){
				this.tabActive= item.id;
				page = 1;
				this.orderList = [];
				this.getOrders();
			}
		},
	
		onLoad(option){
			this.tabActive=uni.getStorageSync('orderTab')|| 1;
			this.checkLogin();
		
		},
		// 加载更多
		onReachBottom(){
			this.mloading='loading';
			this.getOrders();
		},
		// 重置分页及数据
		onPullDownRefresh(){
			page = 1;
			this.orderList = [];
			this.getOrders();
		},
		onShow(){
			this.tabActive=uni.getStorageSync('orderTab')||1;
			this.checkLogin();
			
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
