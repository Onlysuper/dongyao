<template>
	<view class="m-tokencard">
		<m-token-card  v-for="(item) in tokens" :key="item.id" :id="item.id" @choseTokenFn="choseTokenFn"
		 state="normal" :days="item.dueTime" :price="item.price" :name="item.name" :describe="item.rule"
		 downimg1="../../static/img/icon/home_icon_down1.png"
		 downimg2="../../static/img/icon/home_icon_down1.png"
		 ></m-token-card>
		<view class="m-token-footer">
			以上为全部可用优惠券
		</view>
	</view>
</template>
<script>
	import Event from '../../common/event.js'; 
	var page = 0,totalpage=0;
	import mTokenCard from "@/components/m-token-card.vue";
	export default {
		name:"m-order-tokens",
		props:{},
		components:{
			mTokenCard
		},
		data(){
			return{
				storeid:'',
				tokens:[],
			}
		},
		methods:{
			getTokens(){
				let _this = this;
				uni.showLoading({});
				if(totalpage&&page > totalpage){
					uni.showToast({"title":"已经加载全部", icon:"none"});
					return ;
				}
				this.$apis.postUsableCoupons({
					storeId:_this.storeid,
					start:page,
					length:20
				}).then(res=>{
					let data = res.data;
					if(data.coupons){
						totalpage=data.pages;
						var newsList = data.coupons;
						this.tokens = this.tokens.concat(newsList);
						uni.hideLoading();
						page++;
					}
					// this.tokens=res.data.coupons;
				})
			},
			choseTokenFn(data){
				console.log('优惠券id：'+data);
				Event.noticeFun(Event.UPDATA_TOKEN, {id:data});
				uni.navigateBack({
					delta:1
				})
			}
		},
		// 加载更多()
		onReachBottom(){
			this.getTokens();
		},
		//下拉刷新
		onPullDownRefresh : function(){
			// 重置分页及数据
			page = 1;
			this.tokens =[];
			this.getTokens();
		},
		onLoad(option){
			this.storeid=option.storeid;
			page = 1;
			tokens:[];
			this.getTokens();
		}
	}
</script>
<style lang="scss">
@import "../../common/globel.scss";
.m-tokencard{
	.m-token-footer{
		color:$color-4;
		font-size: $fontsize-6;
		text-align: center;
	}
	
}
</style>
