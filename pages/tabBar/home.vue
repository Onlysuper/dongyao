<template>
	<view style="background: #fff;">
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
					v-model="searchValue"
					placeholder="默认关键字"
					placeholder-style="color:#c0c0c0;"
				/>
				<image @tap="toSearch()" class="icon" style="width:13px;height:100%" src="../../static/img/icon/home_icon_search.png" mode="aspectFit"></image>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 轮播图 -->
		<view class="swiper-box">
			<uni-swiper-dot :info="swiperList" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change" :autoplay="true" :indicator-dots="false" :interval="3000" :duration="500" :circular="true">
					<swiper-item v-for="(item ,index) in swiperList" :key="index">
						<view class="swiper-item">
							<image :src="item.imgUrl" @tap="swiperChange(index)"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<!-- 超值热卖 -->
		<view class="m-container">
			<m-title title="超值热卖" labelColor="#666666" label="换一换" @titleHandle="getHotsellList">
					<image style="width:30upx;height:20upx;margin-right:10upx;" src="../../static/img/icon/home_icon_refresh.png" mode="aspectFit"></image>
			</m-title>
			<view v-if="hotProList.length>0" class="m-content m-hotsell">
				<template v-for="(item,index) in hotProList">
					<m-home-hotpro @handleFn="hotProDetail(item)"  :key="index" :rowData="item"></m-home-hotpro>
				</template>
			</view>
			<view v-else class="empty-row">
				暂无商品
			</view>
		</view>
		<view class="m-container">
			<m-title title="今日必拼" label="查看更多 >" @titleHandle="pintuanHandle"></m-title>
			<view v-if="groupsellList.length>0" class="m-content m-pin" >
				<scroll-view class="scroll-view" scroll-x="true"  scroll-left="0">
					<view class="m-togethoer">
						<template v-for="(item,index) in groupsellList">
							<m-home-pro @handleFn="groupProDetail(item)" :key="index" :rowData="item"></m-home-pro>
						</template>
					</view>
				</scroll-view>
			</view>
			<view v-else class="empty-row">
				今日暂无拼团商品
			</view>
		</view>
		<view class="m-container">
			<m-title title="附近门店" label="查看全部 >" @titleHandle="storeHandle"></m-title>
			<view v-if="nearStoreList.length>0" class="m-content m-store">
				<template v-for="(item,index) in nearStoreList">
					<m-home-store @handleFn="storeDetail" :tips="item.tips" :key="index" :rowData="item"></m-home-store>
				</template>
			</view>
			<view v-else class="empty-row">
				暂无门店
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot'
	import mTitle from '@/components/m-title'
	import mHomePro from '@/components/m-home-pro'
	import mHomeHotpro from '@/components/m-home-hotpro'
	import mHomeStore from '@/components/m-home-store'
	import mSwiper from "@/components/m-swiper/m-swiper.vue"
	export default {
		data() {
			return {
				 current: 0,
            mode: 'long',
				
				searchValue:"",
				afterHeaderOpacity: 1,//不透明度
				headerPosition: 'fixed',
				headerTop:null,
				statusTop:null,
				// 轮播图片
				swiperList: [],
				// 热卖
				hotsellPage:1,
				hotProList:[],
				// 拼团列表
				groupsellList:[],
				// 附近门店
				nearStoreList:[{}],
				current: 0,
				mode: 'long',
			};
		},
		components: {
			uniSwiperDot,
			mTitle,
			mHomePro,
			mHomeHotpro,
			mHomeStore
		},
		methods:{
			change(e) {
				this.current = e.detail.current;
			},
			
			//首页搜索
			toSearch(){
				this.linkTo("/pages/product/productlist?search="+this.searchValue)
			},
			// banner图片
			getBanners(){
				this.mGet('/server/b/banners',{}).then(res=>{
						this.swiperList=res.data;
				}).catch(err=>{
					console.log(err);
				});
			},
			//热卖列表
			getHotsellList(){
				this.mPost('/server/p/hot/products',{
					start:this.hotsellPage,
					length:6
				}).then(res=>{
					if(res.data){
						let data = res.data;
						this.hotProList = data.list;
						this.hotsellPage=data.nextPage;
					}
				}).catch(err=>{
					console.log(err);
				});
			},
			//拼团列表
			getGroupsellList(){
				let _this=this;
				this.mPost('/server/p/group/products',{
					start:this.hotsellPage,
					length:500
				}).then(res=>{
						if(res.data){
							let data = res.data;
							if(data.list){
								_this.groupsellList = data.list;
							}
						}
				}).catch(err=>{
					console.log(err);
				});
			},
			//门店列表
			getStoreList(lng,lat){
				let _this=this;
				_this.mPost('/server/s/vicinity/stores',{
					"lng":lng || 116.206845,
					"lat":lat || 39.762155,
				}).then(res=>{
					if(res.data){
						let data = res.data;
							_this.nearStoreList = data;
					}
					
				}).catch(err=>{
					console.log(err);
					// uni.stopPullDownRefresh();
				});
			},
			// 门店更多
			choseStore(){
				this.linkTo("/pages/store/list")
			},
			//点击热卖图片
			hotProDetail(item){
				this.linkTo("/pages/store/store?storeid="+item.storeId+"&typeid="+item.storeId)
			},
			// 点击拼团图片
			groupProDetail(item){
				this.linkTo("/pages/product/product?id="+item.id)
			},
			//点击门店图片
			storeDetail(id){
				this.linkTo("/pages/store/store?storeid="+id)
			},
			swiperChange(e) {
				this.current = e;
				this.current = e.detail.current;
			},
			// 拼团
			pintuanHandle(){
				this.linkTo("/pages/groupbuy/groupbuy")
			},
			//附近门店
			storeHandle(){
				this.linkTo("/pages/store/list")
				
			},
			async linkTo(url){
				let islogin = await this.globelIsLogin();
				if(islogin){ // 是否登录了
					uni.navigateTo({
						url:url
					})
				}else{
					uni.navigateTo({
						url:"/pages/login/login"
					})	
				}
			}
		},
		onLoad(){
			let _this = this;
			uni.getLocation({//获取当前的位置坐标
				type: 'wgs84',
				success: function (res) {
					_this.getStoreList(res.longitude,res.latitude);
				}
			}); 
			this.getBanners();
			this.getHotsellList();
			this.getGroupsellList();
		},
		onPullDownRefresh(){
			let _this = this;
			uni.stopPullDownRefresh();
		}
	}
</script>

<style lang="scss">
@import "../../common/globel.scss";
.empty-row{
	text-align: center;
	font-size: $fontsize-9;
	color:$color-1;
	padding: 66upx 20px;
	background:#f9f9f9;
}
.swiper-box {
	position: relative;
	width: 100%;
	height:300upx;
	swiper {
		width: 100%;
		height: 300upx;
		swiper-item {
			image {
				width: 100%;
				height: 300upx;
			}
		}
	}
	.indicator{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 25upx;
		height: 40upx;
		border-radius: 40upx;
		font-size: 22upx;
		position: absolute;
		bottom: 20upx;
		right: 20upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.2);
	}
}
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
	z-index: 11;
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
			right: 10upx;
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
	// padding: 10upx;
	width: 96%;
// 	margin:0 auto;
	margin-left: 2%;
	padding-top: 0;
	box-sizing: border-box;
	padding: 20upx;
	// 热
	&.m-hotsell{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		margin-left: 0;
		width: 100%;
	}
	&.m-pin{
		margin-left: 0;
		width: 100%;
	}
	&.m-store{
		display: block;
		// padding:20upx;
	}
// 	&.m-today-pin{
// 		padding-left: 20upx;
// 		padding-right: 20upx;
// 	}
	// 拼
	.m-togethoer{
		display: flex;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		// overflow: hidden;
		.m-pro-item{
// 			&:first-of-type{
// 				margin-left:0px;
// 			}
// 			&:last-of-type{
// 				margin-right:0px;
// 			}
// 			
		}
	}
}
</style>