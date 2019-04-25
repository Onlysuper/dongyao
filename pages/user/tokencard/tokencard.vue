<template>
	<view class="m-tokencard">
		<view class="fixedit">
			<m-tab @handleFn="tabChange" :tabActive="tabActive" :rowdata="tabList"></m-tab>
		</view>
		<m-token-card state="normal"></m-token-card>
		<m-token-card state="history"></m-token-card>
		<m-token-card state="lost"></m-token-card>
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
						id:"1",
					},
					{
						label:"使用记录",
						id:"2",
					},
					{
						label:"已过期",
						id:"3",
					}
				]
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
			}
		}
	}
</script>

<style lang="scss">
@import "../../../common/globel.scss";
.m-tokencard{
	.fixedit{
		background:#fff;
	}
	.m-token-footer{
		color:$color-4;
		font-size: $fontsize-6;
		text-align: center;
	}
	
}
</style>
