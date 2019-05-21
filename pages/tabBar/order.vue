<template>
	<view class="m-order-page">
		
		<view class="fixedit">
			<m-tab @handleFn="tabChange" :tabActive="tabActive" :rowdata="tabList"></m-tab>
		</view>
		<view style="height:60px;"></view>
		<!-- <m-need-login v-if="!isLogin"></m-need-login> -->
		
		<view class="m-order-body">
			<m-order-list v-for="(item,index) in artList" :key="index"
				:status="1"
				:title="item.store.name"
				:img="item.store.imgUrl"
				:proname="item.productList[0].productName"
				:extrctime="item.order.aboutPickingTime"
				:describe="item.store.notice"
				:price="item.order.totalCount"
				:num="100"
			>
			</m-order-list>
			<!-- <m-order-list v-for="(item,index) in artList" :key="index"
				:status="2"
				:title="item.name"

				:img="item.img"
				:proname="item.proname"
				:extrctime="item.extrctime"
				:describe="item.describe"
				:price="item.price"
				:num="item.num"
			>
			</m-order-list>
			<m-order-list v-for="(item,index) in artList" :key="index"
				:status="3"
				:title="item.name"
				:img="item.img"
				:proname="item.proname"
				:extrctime="item.extrctime"
				:describe="item.describe"
				:price="item.price"
				:num="item.num"
			> -->
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
	var page = 1, cate = 0;
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
				tabActive:"1",
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
				artList:[
					{
						store:"东尧生鲜001号店（中关村店）",
						name:"东尧生鲜001号店（中关村店）",
						extrctime:"18:00",
						createtime:"2018.12.25 23:34:45",
						price:"450",
						num:"4"
					},
					{
						store:"东尧生鲜001号店（中关村店）",
						name:"东尧生鲜001号店（中关村店）",
						extrctime:"18:00",
						createtime:"2018.12.25 23:34:45",
						price:"450",
						num:"4"
					}
				],
				mloading:'more'
			}
		},
		methods:{
			// 获取订单
			getOrders(){
				this.mGet('/server/o/myOrders',{
					state:4,
					start:1,
					length:1000
				}).then(res=>{
					if(res.code=1){
						this.swiperList=res.data.orders;
					}
				}).catch(err=>{
					console.log(err);
				});
			},
			// tab栏点击
			tabChange(item){
				this.tabActive= item.id;
			},
			// 数据和分页是模拟的，实际也是这样写
			getNewsList: function(){
				uni.showLoading({});
				// 假设已经到底，实际根据api接口返回值判断
				if(page >= 3){
					uni.showToast({"title":"已经加载全部", icon:"none"});
					return ;
				}
				uni.request({
					url: 'https://www.easy-mock.com/mock/5bb833775df5622d84ac87ca/example/imgnewlist?page='+page+'#!method=get&cate='+cate,
					method: 'GET',
					data: {},
					success: res => {
						console.log(res);
						var newsList = res.data.data;
						this.artList = this.artList.concat(newsList);
						uni.hideLoading();
						page++;
						this.mloading='noMore';
					},
					complete: res => {
						uni.hideLoading();
						uni.stopPullDownRefresh();
						this.mloading='noMore';
					}
				});
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
