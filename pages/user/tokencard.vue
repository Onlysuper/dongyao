<template>
	<view class="m-tokencard">
		<view class="fixedit">
			<m-tab @handleFn="tabChange" :tabActive="tabActive" :rowdata="tabList"></m-tab>
		</view>
		<view class="split-place"></view>
		<m-empty v-if="coupons.length==0"></m-empty>
		<view v-else class="">
			 <m-token-card  v-for="(item) in coupons" :key="item.id" :id="item.id"
			 state="normal" :days="item.dueTime" :price="item.price" :name="item.name" :describe="item.rule"
			 downimg1="../../static/img/icon/home_icon_down1.png"
			 downimg2="../../static/img/icon/home_icon_down1.png"
			 ></m-token-card>
			 <uni-load-more :status="mloading"></uni-load-more> 
		</view>
		
	</view>
</template>

<script>
	import mEmpty from "@/components/m-result/m-empty.vue";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import mTab from "@/components/m-tab.vue";
	import mTokenCard from "@/components/m-token-card.vue";
	var page = 1,totalpage=1;
	export default {
		data() {
			return {
				mloading:'more',
				tabActive:0,
				tabList:[
					{
						label:"未使用",
						id:0,
					},
					{
						label:"已使用",
						id:1,
					},
					{
						label:"已失效",
						id:2,
					}
				],
				coupons:[],
			};
		},
		components:{
			mEmpty,
			mTab,
			mTokenCard
		},
		methods:{
			// tab栏点击
			tabChange(item){
				console.log('我的优惠券')
				this.tabActive= item.id;
				page = 1;
				this.coupons = [];
				this.getTokencards(item.id);
			},
			// 获取订单
			getTokencards(type){
				let _this = this;
				uni.showLoading({});
				if(totalpage&&page > totalpage){
					_this.mloading='noMore';
					uni.hideLoading();
					uni.stopPullDownRefresh();
					return ;
				}
				this.$apis.postMyCoupons({
					type:type,
					start:page,
					length:20
				}).then(res=>{
					let data = res.data;
					if(data.coupons){
						totalpage=data.pages|| 1;
						var newsList = data.coupons;
						_this.coupons = _this.coupons.concat(newsList);
						page++;	
					}
					uni.hideLoading();
					uni.stopPullDownRefresh();
				}).catch(err=>{
					uni.hideLoading();
					uni.stopPullDownRefresh();
				});
			},
		},
		// 加载更多
		onReachBottom(){
			this.mloading='loading';
			this.getTokencards(0);
		},
		// 重置分页及数据
		onPullDownRefresh(){
			page = 1;
			this.coupons = [];
			this.getTokencards(0);
		},
		onLoad(){
			page = 1;
			this.coupons = [];
			this.getTokencards(0)
		}
	}
</script>

<style lang="scss">
@import "../../common/globel.scss";
.m-tokencard{
	.fixedit{
		background:#fff;
		width:100%; position:fixed; z-index:99; left:0; top:0;background: #fff;
	}
	.m-token-footer{
		color:$color-4;
		font-size: $fontsize-6;
		text-align: center;
		padding: 30upx;
	}
	
}
</style>
