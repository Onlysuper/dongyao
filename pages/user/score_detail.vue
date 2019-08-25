<template>
	<view class="m-content">
		<view v-if="details.length > 0">
			<template v-for="(item,index) in details">
				<view class="m-row" :key="index">  
					<view class="m-left">
						<view class="m-text">{{item.opTypeStr}}</view>
						<view class="m-time">{{item.createTime}}</view>
					</view>
					<view class="m-right" v-if="item.addSub == 1">
						+ {{item.integration}}
					</view>
					<view class="m-right" v-if="item.addSub == 2">
						- {{item.integration}}
					</view>
				</view>
			</template>
			<uni-load-more :status="mloading"></uni-load-more> 
		</view>
		<view v-else class="empty-row">
			~暂无明细~
		</view>
	</view>
</template>
<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	var page = 1,totalpage=1;
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				details:[],
				mloading:'more'
			};
		},
		methods:{
			getScoreDetails(){
				let _this = this;
				uni.showLoading({});
				if(totalpage&&page > totalpage){
					// uni.showToast({"title":"已经加载全部", icon:"none"});
					_this.mloading='noMore';
					uni.hideLoading();
					uni.stopPullDownRefresh();
					return ;
				}
				this.$apis.postScoeDetail({
					start:page,
					length:15
				}).then(res=>{
					_this.details = _this.details.concat(res.data.details.list);
					page++;
					uni.hideLoading();
					uni.stopPullDownRefresh();
				}).catch(err=>{
					uni.hideLoading();
					uni.stopPullDownRefresh();
				});
			}
		},
		onLoad(options){
			page = 1;
			this.getScoreDetails();
		},
		onReachBottom(){
			this.mloading='loading';
			this.getScoreDetails();
		},
		// 重置分页及数据
		onPullDownRefresh(){
			page = 1;
			this.details = [];
			this.getScoreDetails();
		},
	}
</script>

<style lang="scss">
@import "../../common/globel.scss";
.m-content{
	padding: 30upx;
	background-color: #fff;
	.m-row{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 32upx;
		padding: 20upx 0upx;
		align-content: center;
		align-items: center;
		border-bottom: 1px solid #eee;
		.m-left{
			display: flex;
			flex-direction: column;
			.m-time{
				color: $color-5;
				font-size: 26upx;
				margin-top: 10upx;
			}
		}
		.m-right{
			font-size: 38upx;
			color: red;
			font-weight: 600;
		}
	}
	.empty-row {
		text-align: center;
		font-size: $fontsize-9;
		color: $color-1;
		padding: 66upx 20px;
		background: #f9f9f9;
	}
}

</style>
