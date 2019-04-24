<template>
	<view>
		<!-- 状态栏 -->
		<view class="status" :style="{ position: headerPosition,top:statusTop,opacity: afterHeaderOpacity}"></view>
		<!-- 顶部导航栏 -->
		<view class="header" :style="{ position: headerPosition,top:headerTop,opacity: afterHeaderOpacity }">
			<!-- 定位城市 -->
			<view class="addr" @tap="choseStore">
				<view class="icon">
					<image style="width:100%;height:100%" src="../../static/img/icon/home_icon_gps.png" mode="aspectFit"></image>
				</view>
				请选择门店
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input
					placeholder="默认关键字"
					placeholder-style="color:#c0c0c0;"
				/>
				<image @tap="toSearch()" class="icon" style="width:13px;height:100%" src="../../static/img/icon/home_icon_search.png" mode="aspectFit"></image>
			</view>
		</view>
		<!-- 占位 -->
		<!-- 轮播图 -->
		<view class="swiper">
			<uni-swiper-dot :info="swiperList" :current="current" field="content" :mode="mode">
				<swiper style="height: 250upx" class="swiper-box" @change="swiperChange">
					<swiper-item style="height: auto;" v-for="(item ,index) in swiperList" :key="index">
							<image style="width: 100%;" :src="item.src" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="m-container">
			<m-title title="超值热卖" labelColor="#666666" label="换一换" @titleHandle="titleHandle">
					<image style="width:30upx;height:20upx;margin-right:10upx;" src="../../static/img/icon/home_icon_refresh.png" mode="aspectFit"></image>
			</m-title>
			<view class="m-content m-hotsell">
				<template v-for="(item,index) in hotProList">
					<m-home-pro :key="index" :rowData="item"></m-home-pro>
				</template>
			</view>
		</view>
		<view class="m-container">
			<m-title title="今日必拼" label="查看详情 >" @titleHandle="pintuanHandle"></m-title>
			<view class="m-content">
				<scroll-view class="scroll-view" scroll-x="true" @scroll="rowScroll" scroll-left="120">
					<view class="m-togethoer">
						<template v-for="(item,index) in hotProList">
							<m-home-pro :key="index" :rowData="item"></m-home-pro>
						</template>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="m-container">
			<m-title title="附近门店" label="查看全部 >" @titleHandle="storeHandle"></m-title>
			<view class="m-content m-store">
				<template v-for="(item,index) in nearStoreList">
					<m-home-store :tips="item.tips" :key="index" :rowData="item"></m-home-store>
				</template>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot'
	import mTitle from '@/components/m-title'
	import mHomePro from '@/components/m-home-pro'
	import mHomeStore from '@/components/m-home-store'
	export default {
		data() {
			return {
				afterHeaderOpacity: 1,//不透明度
				headerPosition: 'fixed',
				headerTop:null,
				statusTop:null,
				
				// 轮播图片
				swiperList: [
					{ id: 1, src: '../../static/img/2.jpg' },
					{ id: 2, src: '../../static/img/1.jpg' },
					// { id: 2, src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2042986667,2334195127&fm=26&gp=0.jpg', img: '../../static/img/2.jpg' },
					// { id: 3, src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2042986667,2334195127&fm=26&gp=0.jpg', img: '../../static/img/3.jpg' }
				],
				// 热卖
				hotProList:[
					{
						img:"../../static/img/2.jpg",
						describel:"特价小白菜",
						price:"￥2.99",
						oldPrice:"￥100"
					},
					{
						img:"../../static/img/2.jpg",
						describel:"特价小白菜",
						price:"￥2.99",
						oldPrice:"￥100"
					},
					{
						img:"../../static/img/2.jpg",
						describel:"特价小白菜",
						price:"￥2.99",
						oldPrice:"￥100"
					}
				],
				// 附近门店
				nearStoreList:[{
					img:"../../static/img/2.jpg",
					title:"老萌1号店",
					distance:"13km",
					describel:"优惠优惠优惠",
					address:"北京市海淀区中关村大街15号",
					tips:['优惠']
				}],
				current: 0,
				mode: 'long',
			};
		},
		components: {
			uniSwiperDot,
			mTitle,
			mHomePro,
			mHomeStore
		},
		methods:{
			// /server/b/banners
			getBanners(){
				uni.request({
					url: "/server/b/banners",
					method: 'GET',
					header:{
						"Cache-Control": "no-cache",
						"Content-Type": "application/json;charset=UTF-8",
					},
					data: {},
					// dataType:JSON,
					success: res => {
						console.log(res);
					},
					complete: res => {}
				});
			},
			//搜索跳转商品列表
			toSearch() {
				uni.navigateTo({
					url:"/pages/product/productlist"
				})
			},
			// 选择门店
			choseStore(){
				uni.navigateTo({
					url:"/pages/store/list"
				})
			},
			swiperChange(e) {
				this.current = e.detail.current;
			},
			titleHandle(){
				uni.showToast({ title: '换一换' });
			},
			rowScroll(e){
				 // this.old.scrollTop = e.detail.scrollTop
			},
			// 拼团
			pintuanHandle(){
				uni.navigateTo({
					url:"/pages/groupbuy/groupbuy"
				})
			},
			//附近门店
			storeHandle(){
				uni.navigateTo({
					url:"/pages/store/list"
				})
			}
		},
		onLoad(){
			this.getBanners()
		}
	}
</script>

<style lang="scss">
.icon {
	width: 30upx;
	height: 25upx;
	padding-right: 10upx;
	&.yuyin {
		&:before {
			content: '\e64e';
		}
	}
	&.tongzhi {
		&:before {
			content: '\e729';
		}
	}
	&.search {
		&:before {
			content: '\e628';
		}
	}
	&.location {
		&:before {
			content: '\e611';
		}
	}
	&.xia {
		&:before {
			content: '\e689';
		}
	}
}
.pullDown-effects{
	position: fixed;
	//top: calc(100upx - 36vw);
	top: 0;
	z-index: 9;
	width: 100%;
	height: 36vw;
	/*  #ifdef  APP-PLUS  */
	padding-top: var(--status-bar-height);
	/*  #endif  */
	image{
		width: 100%;
		height: 36vw;
	}
}
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	background-color: #fff;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
}
.header {
	box-sizing: border-box;
	width: 100%;
	padding: 0 20upx;
	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #fff;

	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */

	.addr {
		margin-right: 20upx;
		// width: 120upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		font-size: 26upx;
		color:#4c4c4c;
		.icon {
			height: 35upx;
			margin-right: 5upx;
			display: flex;
			align-items: center;
			font-size: 42upx;
			color: #6aba4e;
		}
	}
	.input-box {
		width: 100%;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 30upx;
		position: relative;
		display: flex;
		align-items: center;
		.icon {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			right: 0;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}
		input {
			padding-left: 28upx;
			height: 28upx;
			font-size: 28upx;
		}
	}
}
.place {
	background-color: #ffffff;
	height: 100upx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
}
.swiper {
	width: 100%;
	margin-top: 100upx;
	display: flex;
	justify-content: center;
}

.category-list {
	width: 92%;
	margin: 0 4%;
	padding: 0 0 30upx 0;
	border-bottom: solid 2upx #f6f6f6;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.category {
		width: 25%;
		margin-top: 50upx;
		display: flex;
		flex-wrap: wrap;
		.img {
			width: 100%;
			display: flex;
			justify-content: center;
			image {
				width: 9vw;
				height: 9vw;
			}
		}
		.text {
			margin-top: 16upx;
			width: 100%;
			display: flex;
			justify-content: center;
			font-size: 24upx;
			color: #3c3c3c;
		}
	}
}
.banner {
	width: 92%;
	margin: 40upx 4%;
	image {
		width: 100%;
		height: 20vw;
		border-radius: 10vw;
		box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
	}
}
.promotion {
	width: 92%;
	margin: 0 4%;
	.text {
		width: 100%;
		height: 60upx;
		font-size: 34upx;
		font-weight: 600;
		margin-top: -10upx;
	}
	.list {
		width: 100%;
		display: flex;
		justify-content: space-between;
		.column {
			width: 43%;
			padding: 15upx 3%;
			background-color: #ebf9f9;
			border-radius: 10upx;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.top {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;
				margin-bottom: 5upx;
				.title {
					font-size: 30upx;
				}
				.countdown {
					margin-left: 20upx;
					display: flex;
					height: 40upx;
					display: flex;
					align-items: center;
					font-size: 20upx;
					view {
						height: 30upx;
						background-color: #f06c7a;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fff;
						border-radius: 4upx;
						margin: 0 4upx;
						padding: 0 2upx;
					}
				}
			}
			.left {
				width: 50%;
				height: 18.86vw;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				.ad {
					margin-top: 5upx;
					width: 100%;
					font-size: 22upx;
					color: #acb0b0;
				}
				.into {
					width: 100%;
					font-size: 24upx;
					color: #aaa;
					margin-bottom: 5upx;
				}
			}
			.right {
				width: 18.86vw;
				height: 18.86vw;
				image {
					width: 18.86vw;
					height: 18.86vw;
				}
			}
		}
	}
}
.goods-list {
	// background-color: #f4f4f4;
	.title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		color: #f47825;
		font-size: 30upx;
		margin-top: 10upx;
		image {
			width: 30upx;
			height: 30upx;
		}
	}
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
	.product-list {
		width: 92%;
		padding: 0 4% 3vw 4%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.product {
			width: 48%;
			border-radius: 20upx;
			background-color: #fff;
			margin: 0 0 15upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				border-radius: 20upx 20upx 0 0;
			}
			.name {
				width: 92%;
				padding: 10upx 4%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
				overflow: hidden;
				font-size: 30upx;
			}
			.info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 92%;
				padding: 10upx 4% 10upx 4%;

				.price {
					color: #e65339;
					font-size: 30upx;
					font-weight: 600;
				}
				.slogan {
					color: #807c87;
					font-size: 24upx;
				}
			}
		}
	}
}
.scroll-view{
}
.m-content{
	padding: 10upx;
	padding-top: 0;
	box-sizing: border-box;
	// 热
	&.m-hotsell{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}
	&.m-store{
		display: block;
	}
	// 拼
	.m-togethoer{
		display: flex;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
}
</style>