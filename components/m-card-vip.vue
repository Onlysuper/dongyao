<template>
	<view>
		<view v-if="item.current == 1" class="m-current m-huode">当前</view>
		<view v-if="item.current == 2" class="m-current m-weihuode">未解锁</view>
		<view class="m-top">
			<view class="m-left">
				<view class="m-text" v-if="item.type == 1">VIP会员</view>
				<view class="m-text" v-if="item.type == 2">千畦同学</view>
				<view class="m-text-3" v-if="item.type == 3">千畦班委</view>
				<view class="m-text-4" v-if="item.type == 4">千畦江湖</view>
				<view class="m-img" v-if="item.currentLevel > 1 && item.type!=3">
					<template v-for="(i,index) in item.currentLevel">
						<image  v-if="item.type == 2" :key="index" class="m-item" src="../../static/img/card/icon_sterall.png" mode="aspectFit"></image>
						<image  v-if="item.type == 4" :key="index" class="m-item" src="../../static/img/card/icon_Diamonds.png" mode="aspectFit"></image>
					</template>
				</view>
				<view class="m-img" v-else-if="item.currentLevel == 1 && item.type==3">
					<image  class="m-item" src="../../static/img/card/icon_1.png" mode="aspectFit"></image>
				</view>
				<view class="m-img" v-else-if="item.currentLevel == 2 && item.type==3">
					<image  class="m-item" src="../../static/img/card/icon_1.png" mode="aspectFit"></image>
					<image  class="m-item" src="../../static/img/card/icon_2.png" mode="aspectFit"></image>
				</view>
				<view class="m-img" v-else-if="item.currentLevel == 3 && item.type==3">
					<image  class="m-item" src="../../static/img/card/icon_1.png" mode="aspectFit"></image>
					<image  class="m-item" src="../../static/img/card/icon_2.png" mode="aspectFit"></image>
					<image  class="m-item" src="../../static/img/card/icon_3.png" mode="aspectFit"></image>
				</view>
				<view class="m-img" v-else-if="item.currentLevel == 4 && item.type==3">
					<image  class="m-item" src="../../static/img/card/icon_1.png" mode="aspectFit"></image>
					<image  class="m-item" src="../../static/img/card/icon_2.png" mode="aspectFit"></image>
					<image  class="m-item" src="../../static/img/card/icon_3.png" mode="aspectFit"></image>
					<image  class="m-item" src="../../static/img/card/icon_4.png" mode="aspectFit"></image>
				</view>
				<view class="m-img" v-else-if="item.currentLevel == 5 && item.type==3">
					<image  class="m-item" src="../../static/img/card/icon_1.png" mode="aspectFit"></image>
					<image  class="m-item" src="../../static/img/card/icon_2.png" mode="aspectFit"></image>
					<image  class="m-item" src="../../static/img/card/icon_3.png" mode="aspectFit"></image>
					<image  class="m-item" src="../../static/img/card/icon_4.png" mode="aspectFit"></image>
					<image  class="m-item" src="../../static/img/card/icon_5.png" mode="aspectFit"></image>
				</view>
				<view class="m-img" v-else>
					<image v-if="item.current == 0"  class="m-item" src="../../static/img/card/icon_star1.png" mode="aspectFit"></image>
				</view>
				<view class="m-total-score">
					共需要积分{{item.totalScore}}
				</view>
			</view>
			<view class="m-right">
				<view class="m-img">
					<image v-if="item.type == 1" style="width: 260upx;height: 260upx;" src="https://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/huizhang1.png" mode="aspectFit"></image>
					<image v-if="item.type == 2" style="width: 260upx;height: 260upx;" src="https://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/huizhang2.png" mode="widthFix"></image>
					<image v-if="item.type == 3" style="width: 260upx;height: 260upx;" src="https://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/huizhang3.png" mode="widthFix"></image>
					<image v-if="item.type == 4" style="width: 260upx;height: 260upx;" src="https://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/huizhang4.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="m-bottom">
			<view class="m-left" v-if="item.current == 0">
				<view class="m-text">已经达到该等级</view>
			</view>
			<view class="m-left" v-else>
				<view class="m-text"><!-- 还需要XXX积分升级到下个等级 --></view>
				<view class="m-member">
					<!-- <view>
						<icon class="m-icon-circle"></icon>
					</view>	 -->
					<template v-for="(data,index) in item.childs">
						<view :key="index" class="m-progress-main">
							<view> 
								<!-- <view class="m-num">
									<view>{{data.integration}}</view>
								</view> -->
								<view class="m-progress-row">
									<view class="m-progress" v-if="item.current == 1 && item.currentLevel >= (index+1)">
										
										<progress v-if="item.type == 3"  stroke-width="4" percent="100" activeColor="#6495ED" backgroundColor="#ADD8E6" />
										<progress v-else-if="item.type == 4"  stroke-width="4" percent="100" activeColor="#8A2BE2" backgroundColor="#E6E6FA" />
										<progress v-else  stroke-width="4" percent="100" activeColor="#F0A860" backgroundColor="#D8D8D8" />
									</view>
									<view class="m-progress" v-else-if="data.showPercent">
										<progress v-if="item.type == 3"  stroke-width="4" :percent="data.percent" activeColor="#6495ED" backgroundColor="#ADD8E6" />
										<progress v-else-if="item.type == 4"  stroke-width="4" :percent="data.percent" activeColor="#8A2BE2" backgroundColor="#E6E6FA" />
										<progress v-else  stroke-width="4" :percent="data.percent" activeColor="#F0A860" backgroundColor="#D8D8D8" />
									</view>
									<view class="m-progress" v-else>
										<progress v-if="item.type == 3" stroke-width="4" percent="0" activeColor="#6495ED" backgroundColor="#ADD8E6" />
										<progress v-else-if="item.type == 4" stroke-width="4" percent="0" activeColor="#8A2BE2" backgroundColor="#E6E6FA" />
										<progress v-else  stroke-width="4" percent="0" activeColor="#F0A860" backgroundColor="#CCC" />
									</view>
									
									<view  v-if="item.current == 1 && item.currentLevel >= (index+1)">
										<icon v-if="item.type == 3" class="m-icon-circle m-icon-circle-3"></icon>
										<icon v-else-if="item.type == 4" class="m-icon-circle m-icon-circle-4"></icon>
										<icon v-else class="m-icon-circle"></icon>
									</view>
									<view  v-else>
										<icon  v-if="item.type == 3" class="m-icon-circle-un m-icon-circle-un-3"></icon>
										<icon  v-else-if="item.type == 4" class="m-icon-circle-un m-icon-circle-un-4"></icon>
										<icon  v-else class="m-icon-circle-un"></icon>
									</view>
								</view>
								<view class="m-shengji">
									<view class="m-sj-text">{{data.name}}</view>
									<view>{{data.integration}}</view>
								</view>
							</view>
							
						</view>
					</template>
				</view>
			</view>
			<view class="m-right">
				<view class="m-btn" @tap="toStrategy">升级攻略</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:"m-card-vip",
		props:{
			item:{
				type:Object,
				 // 对象或数组默认值必须从一个工厂函数获取
				default: function () {
					return { 
						id:undefined,
						synopsis:"",
						grade:0,
						type:undefined,
						percent:undefined
					}
				}
			}
		},
		data() {
			return {
			}
		},
		methods:{
			toStrategy(){
				uni.navigateTo({
					url:"/pages/user/strategy"
				})
			}
		}
	}
</script>

<style lang="scss">
@import "../common/globel.scss";
.m-current{
		position: absolute;
		color: #483018;
		top: 0upx;
		left: 0upx;
		font-size: 28upx;
		width: 120upx;
		height: 45upx;
		text-align: center;
		line-height: 45upx;
		
}
.m-huode{
	background:linear-gradient(to left, #DEB887, #FFF8DC);
}
.m-weihuode{
	background:linear-gradient(to right, #D3D3D3, #F5F5F5);	
}
	
.m-top{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	.m-left{
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		color:#483018;
		.m-text{
			font-style: oblique;
			font-size: 36upx;
			font-weight : 900;
		}
		.m-text-3{
			font-style: #6495ED;
			font-size: 36upx;
			font-weight : 900;
		}
		.m-text-4{
			font-style: #9400D3;
			font-size: 36upx;
			font-weight : 900;
		}
		.m-img{
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 5px;
			.m-item{
				width:30upx;
				height: 30upx;
			}
		}
		.m-total-score{
			margin-top: 5px;
			font-size: 24upx;
		}
	}
	.m-right{
		width: 160upx;
		text-align: center;
		align-self:center;
		.m-img{
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			height: 160upx;
		}
	}
	
}
.m-bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top:50upx;
	.m-left{
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		padding-right: 30upx;
		.m-text{
			color:#483018;
			font-size: 28upx;
		}
		.m-member{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.m-progress-main{
				width: 100%;
				.m-progress-row{
					margin: 10upx 0upx;
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					align-content: center;
					.m-progress{
						width: 100%;
					}
					.m-icon-circle{
						height:18rpx;
						width:18rpx;
						background:chocolate;
						border-radius:50%;
					}
					.m-icon-circle-3{
						background:#4169E1;
					}
					.m-icon-circle-4{
						background:#9932CC;
					}
					.m-icon-circle-un{
						height:18rpx;
						width:18rpx;
						background:#CCC;
						border-radius:50%;
					}
					.m-icon-circle-un-3{
						background:#ADD8E6;
					}
					.m-icon-circle-un-4{
						background:#E6E6FA;
					}
				}
				// .m-num{
				// 	display: flex;
				// 	flex-direction: row;
				// 	justify-content: center;
				// 	color: #635749;
				// 	font-size: 18upx;
				// }
				.m-shengji{
					display: flex;
					flex-direction: row;
					flex-direction: column;
					justify-content: flex-end;
					align-items: flex-end;
					color: #635749;
					font-size: 20upx;
					.m-sj-text{
						margin-bottom: 8upx;
					}
				}
			}
		}
		
	}
	.m-right{
		width: 150upx;
		align-self:center;
		.m-btn{
			background-color:#ddb46f;
			border-radius: 20upx;
			color: white;
			font-size: 28upx;
			width: 150upx;
			height: 50upx;
			text-align: center;
			line-height: 50upx;
		}
	}
}

</style>
