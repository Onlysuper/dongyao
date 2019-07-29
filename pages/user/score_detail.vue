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
		</view>
		<view v-else class="empty-row">
			~暂无明细~
		</view>
		
	</view>
</template>
<script>
	export default {
		components: {
		},
		data() {
			return {
				details:[]
			};
		},
		methods:{
			getScoreDetails(){
				let _this = this;
				this.$apis.postScoeDetail({}).then(res=>{
					_this.details = res.data.details.list
				})
			}
		},
		onLoad(options){
			this.getScoreDetails();
		}
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
