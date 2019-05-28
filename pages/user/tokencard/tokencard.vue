<template>
	<view class="m-tokencard">
		<view class="fixedit">
			<m-tab @handleFn="tabChange" :tabActive="tabActive" :rowdata="tabList"></m-tab>
		</view>
		<view class="split-place"></view>
		 <m-token-card  v-for="(item) in coupons" :key="item.id" :id="item.id"
		  state="normal" :days="item.dueTime" :price="item.price" :name="item.name" :describe="item.rule"
		  downimg1="../../../static/img/icon/home_icon_down1.png"
		  downimg2="../../../static/img/icon/home_icon_down1.png"
		  ></m-token-card>
		<!-- <m-token-card state="history"></m-token-card>
		<m-token-card state="lost"></m-token-card> -->
		<view class="m-token-footer">
			以上为全部可用优惠券
		</view>
	</view>
</template>

<script>
	import mTab from "@/components/m-tab.vue";
	import mTokenCard from "@/components/m-token-card.vue";
	export default {
		data() {
			return {
				tabActive:"1",
				tabList:[
					{
						label:"未使用",
						id:"0",
					},
					{
						label:"已使用",
						id:"1",
					},
					{
						label:"已失效",
						id:"2",
					}
				],
				coupons:[],
			};
		},
		components:{
			mTab,
			mTokenCard
		},
		methods:{
			// tab栏点击
			tabChange(item){
				this.tabActive= item.id;
				this.getTokencards(item.id);
			},
			// 获取订单
			getTokencards(type){
				let _this = this;
				this.mPost('/server/co/myCoupons',{
					type:type,
					start:1,
					length:1000
				}).then(res=>{
					_this.coupons=res.data.coupons;
				}).catch(err=>{
					console.log(err);
				});
			},
		},
		onLoad(){
			this.getTokencards(0)
		}
	}
</script>

<style lang="scss">
@import "../../../common/globel.scss";
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
