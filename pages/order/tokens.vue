<template>
	<view class="m-tokencard">
		<m-token-card
		 state="normal" days="10" price="92" name="通用卷" describe="只在北京可以使用"
		 downimg1="../../static/img/icon/home_icon_down1.png"
		 downimg2="../../static/img/icon/home_icon_down1.png"
		 ></m-token-card>
		<!-- <m-token-card state="history"></m-token-card>
		<m-token-card state="lost"></m-token-card> -->
		<view class="m-token-footer">
			以上为全部可用优惠券
		</view>
	</view>
</template>
<script>
	import mTokenCard from "@/components/m-token-card.vue";
	export default {
		name:"m-order-tokens",
		props:{},
		components:{
			mTokenCard
		},
		data(){
			return{
				
			}
		},
		methods:{
		
		},
		onLoad(option){
			this.mPost('/server/co/usableCoupons',{
				storeId:option.storeid,
				start:1,
				length:1000
			}).then(res=>{
				console.log(res)
			})
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
