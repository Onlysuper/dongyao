<template>
	<view style="background: #fff;">
		<!-- 状态栏 -->
		<view class="status" :style="{ position: headerPosition, top: statusTop, opacity: afterHeaderOpacity }"></view>
		<!-- 顶部导航栏 -->
		<view class="header header-nv" :style="{ position: headerPosition, top: headerTop, opacity: afterHeaderOpacity }">
			<!-- 定位城市 -->
			<view class="addr" @tap="chooseLocation">
				<!-- <view class="icon"><image style="width:100%;height:100%" src="../../static/img/icon/home_icon_gps.png" mode="aspectFit"></image></view> -->
				<uni-icons type="location" size="22"></uni-icons>
				<text style="text-overflow: ellipsis;white-space: nowrap; overflow: hidden;">{{addressName}}</text>
				<view class="top"></view>
			</view>
			<view class="store" @tap="choseStore">
				<!-- <view class="icon"><image style="width:100%;height:100%" src="../../static/img/icon/home_icon_gps.png" mode="aspectFit"></image></view> -->
				当前门店:{{storeName}}
				<view class="top" style="margin-top: 10upx;"></view>
			</view>
			
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 搜索框 -->
		<view class="input-main">
			<view class="input-box">
				<input style="width: 100%;" v-model="searchValue" placeholder="默认关键字" placeholder-style="color:#c0c0c0;" />
				<!-- <image @tap="toSearch()" class="icon" style="width:13px;height:360upx;" src="../../static/img/icon/home_icon_search.png" mode="aspectFit"></image> -->
				<uni-icons type="search" @tap="toSearch()" size="22"></uni-icons>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-box">
			<uni-swiper-dot :info="swiperList" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change" :autoplay="true" :indicator-dots="false" :interval="3000" :duration="500" :circular="true">
					<swiper-item v-for="(item, index) in swiperList" :key="index">
						<view class="swiper-item"><image :src="item.imgUrl" @tap="swiperChange(item)"></image></view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="my-swiper">
			<swiper  style="height: 35px;" :display-multiple-items='1' :indicator-dots="false" circular="true" autoplay="true" interval="1500" duration="500" vertical="false">
				<swiper-item v-for="(item, index) in pintuanData" :key="item.id">
					<view class="m-swiper-content">
						<view class="body-box">
							{{item.nickname}}
						</view>
						<view class="body-box">
							{{item.pickingTime}}
						</view>
						<view class="body-box">
							预购了
						</view>
						<view class="body-box" style="flex-grow: 1;">
							{{item.pName}}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 净菜购买 -->
		<view class="m-container new-pin">
			<!-- <view class="m-header" style="background: url('https://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/jincai.jpg') center;"> -->
			<view class="m-header header-jcai">
				<view  style="font-weight: bold;color: #228B22;">还原自然味道</view>
				<view class="text-small" style="color: #2F4F4F;">
					<!-- <view class="text-btn" style="border: 0.5px solid #228B22;">换一换</view> -->
					<view style="padding: 5px 10px;" >更多 >
					</view>
				</view>
			</view>
			<view v-if="jcProList.length > 0" class="m-content .m-chaozhi">
				<scroll-view class="scroll-view" scroll-x="true" @scrolltolower="nextNexList()">
					<view class="m-togethoer">
						<template v-for="(item, index) in jcProList">
							<m-home-hotpro @handleFn="hotProDetail(item)" :key="index" :rowData="item"></m-home-hotpro>
						</template>
					</view>
				</scroll-view>
			</view>
			<view v-else class="empty-row">~暂无商品~</view>
		</view>
		<view class="m-container-center">
			<view class="item item-left" >
				<view class="" style="font-size: 30upx;;color: #663366;">限时抢券</view>
				<view class="" style="font-size: 34upx; font-weight: 600;color: #663366;margin-top:8upx;">满169减50神券</view>
				<view style="margin-top:15upx;">限量领 ></view>
			</view>
			<view class="item item-right" >
				<view class="" style="font-size: 30upx;;color: #8B4513;">今日特价</view>
				<view class="" style="font-size: 34upx; font-weight: 600;color: #8B4513;margin-top:8upx;">食材特惠，抓紧抢购</view>
				<view style="margin-top:15upx;">立即抢购 ></view>
			</view>
		</view>
		<view class="m-container new-pin">
			<!-- <view class="m-header" style="background: url('https://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/css/home_list_bg.png') center;justify-content: flex-start;"> -->
				<view class="m-header header-pintuan" style="">
				<view  style="font-weight: bold;">时令优品预选</view>
				|
				<view class="text-small">地理标识产品  产地直供到家</view>
			</view>
			<view class="m-container" v-if="jcProList.length > 0">
				<view class="m-together">
					<template v-for="(item, index) in groupsellList">
						<m-home-pro @handleFn="groupProDetail(item)" :key="index" :rowData="item"></m-home-pro>
					</template>
				</view>
				<view @click="pintuanHandle" class="m-operation">
					<view style="margin-bottom: 15upx;">
						立即
						<br />
						预购
					</view>
					<image style="width: 40upx;height: 40upx;" src="/static/img/home_icon_down1.png" mode="aspectFull"></image>
				</view>
			</view>
			<view v-else class="empty-row">~暂无拼团商品~</view>
		</view>
		<!-- 超值热卖 -->
		<view class="m-container new-pin">
			<m-title title="极致好货抢先购" labelColor="#666666" label="换一换" @titleHandle="getHotsellList">
				<image style="width:30upx;height:20upx;margin-right:10upx;" src="../../static/img/icon/home_icon_refresh.png" mode="aspectFit"></image>
			</m-title>
			<!-- <view class="m-header" style="background: url('https://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/chaozhi.jpg') center;">
				<view  style="font-weight: bold;color:#8A2BE2;">极致好货抢先购</view>
				<view class="text-small" style="color: #8A2BE2;" @tap="getHotsellList">
					<view class="text-btn">换一换</view>
				</view>
			</view> -->
			<view v-if="hotProList.length > 0" class="m-content m-hotsell">
				<template v-for="(item, index) in hotProList">
					<m-home-jinmai @handleFn="hotProDetail(item)" :key="index" :rowData="item"></m-home-jinmai>
				</template>
			</view>
			<view v-else class="empty-row">~暂无商品~</view>
		</view>
		<view class="m-container">
			<m-title title="附近门店" label="查看全部 >" @titleHandle="storeHandle"></m-title>
			<view v-if="nearStoreList.length > 0" class="m-content m-store">
				<template v-for="(item, index) in nearStoreList">
					<m-home-store @handleFn="storeDetail" :tips="item.tips" :key="index" :rowData="item"></m-home-store>
				</template>
			</view>
			<view v-else class="empty-row">~暂无门店~</view>
		</view>
	</view>
</template>

<script>
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot';
import mTitle from '@/components/m-title';
import mHomePro from '@/components/m-home-pro';
import mHomeHotpro from '@/components/m-home-hotpro';
import mHomeJinmai from '@/components/m-home-jinmai';
import mHomeStore from '@/components/m-home-store';
import mSwiper from '@/components/m-swiper/m-swiper.vue';
import amap from '../../common/amap-wx.js';  
import uniIcons from "@/components/uni-icon/uni-icon.vue"
export default {
	data() {
		return {
			current: 0,
			mode: 'long',
			afterHeaderOpacity: 1, //不透明度
			headerPosition: 'fixed',
			upperThreshold:50,
			lowerThreshold:0,
			headerTop: null,
			statusTop: null,
			// 轮播图片
			swiperList: [],
			// 热卖
			hotsellPage: 1,
			jcsellPage: 1,
			hotProList: [],
			jcProList: [],
			// 拼团列表
			groupsellList: [],
			// 附近门店
			nearStoreList: [],
			pintuanData:{},
			searchValue:"",
			myLat:"",
			myLng:"",
			amapPlugin: null,  
			key: '3b083182f608fc7ea5739e570d2b00f9',
			addressName: '正在获取位置...',
			storeName:'正在获取门店名称...'
		};
	},
	filters:{
		addressNameTemp(value){
			if (!value) return '';
			if (value.length > 18) {
				return value.slice(0,18) + '...'
			}
			return value
		}
	},
	components: {
		uniSwiperDot,
		mTitle,
		mHomePro,
		mHomeHotpro,
		mHomeStore,
		mHomeJinmai,
		uniIcons
	},
	methods: {
		change(e) {
			this.current = e.detail.current;
		},

		//首页搜索
		toSearch() {
			this.linkTo('/pages/product/productlist?search=' + this.searchValue);
		},
		// 拼团用户列表
		getPintuanUsers(){
			let _this = this;
			this.$apis.postGroupBuyUsers({
				start:0,
				length:100
			}).then(res=>{
				if(res.data){
					_this.pintuanData=res.data.list;
				}
			})
		},
		// banner图片
		getBanners() {
			this.$apis
				.getBanners({})
				.then(res => {
					this.swiperList = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
		//净菜列表
		getJcsellList(page) {
			uni.showLoading({
				title: '加载中'
			});
			let _this = this;
			this.$apis
				.postJCProduct({
					start: page,
					length: 5,
					lng:_this.myLng,
					lat:_this.myLat
				})
				.then(res => {
					if (res.data) {
						let data = res.data;
						// this.jcProList = data.list;
						// this.jcsellPage = data.nextPage;
						//滑动分页开始
						this.jcProList = this.jcProList.concat(data.list);
						this.jcsellPage = data.nextPage;
						if(data.nextPage == data.page){
							this.jcsellPage = 1;
							this.jcProList=[];
						}
						//滑动分页结束
					}
					 uni.hideLoading();
				})
				.catch(err => {
					console.log(err);
					 uni.hideLoading();
				});
		},
		nextNexList(){
			 this.getJcsellList(this.jcsellPage++);
		},
		upHotList(){
			let tPage =  this.hotsellPage-1;
			if(tPage < 1){
				tPage = 1;
			}
			this.getHotsellList(tPage);
		},
		HandleScroll(event){
			console.log(event.detail);
			this.lowerThreshold =  event.detail.scrollWidth;
		},
		//热卖列表
		getHotsellList() {
			uni.showLoading({
				title: '加载中'
			});
			let _this = this;
			this.$apis
				.postHotProduct({
					start: this.hotsellPage,
					length: 6,
					lng:_this.myLng,
					lat:_this.myLat
				})
				.then(res => {
					if (res.data) {
						let data = res.data;
						this.hotProList = data.list;
						this.hotsellPage = data.nextPage;
					}
					 uni.hideLoading();
				})
				.catch(err => {
					console.log(err);
				});
		},
		//拼团列表
		getGroupsellList() {
			let _this = this;
			this.$apis
				.postGroupProducts({
					start: this.hotsellPage,
					length: 3,
					lng:_this.myLng,
					lat:_this.myLat
				})
				.then(res => {
					console.log(res);
					if (res.data) {
						let data = res.data;
						if (data.list) {
							_this.groupsellList = data.list;
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		//门店列表
		getStoreList(lng, lat) {
			let _this = this;
			_this.$apis
				.postStoreList({
					lng: lng || 116.206845,
					lat: lat || 39.762155
				})
				.then(res => {
					if (res.data && res.data.length) {
						let data = res.data;
						_this.nearStoreList = data;
						_this.storeName = data[0].name;
					}else{
						uni.showModal({
						    title: '提示',
						    content: '当前区域暂未开放服务,选择其他门店~',
						    success: function (res) {
						        if (res.confirm) {
									_this.linkTo('/pages/store/list');
						        }
						    }
						});
					}
				})
				.catch(err => {
					console.log(err);
					// uni.stopPullDownRefresh();
				});
		},
		// 门店更多
		choseStore() {
			this.linkTo('/pages/store/list');
		},
		//点击热卖图片
		hotProDetail(item) {
			this.linkTo('/pages/store/store?storeid=' + item.storeId + '&typeid=' + item.typeId);
		},
		// 点击拼团图片
		groupProDetail(item) {
			this.linkTo('/pages/product/product?id=' + item.id);
		},
		//点击门店图片
		storeDetail(id) {
			this.linkTo('/pages/store/store?storeid=' + id);
		},
		swiperChange(item) {
			this.current = item;
			if(item.forwardUrl){
				this.linkTo('/pages/product/product?id=' + item.forwardUrl);
			}
			// this.current = e.detail.current;
		},
		// 拼团
		pintuanHandle() {
			this.linkTo('/pages/groupbuy/groupbuy?lng='+this.myLng+'&lat='+this.myLat);
		},
		//附近门店
		storeHandle() {
			this.linkTo('/pages/store/list');
		},
		async linkTo(url) {
			let islogin = await this.globelIsLogin();
			if (islogin) {
				// 是否登录了
				uni.navigateTo({
					url: url
				});
			} else {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
		},
		getRegeo() {  
			this.amapPlugin.getRegeo({  
				success: (data) => {
					console.log(data)  
					this.addressName = data[0].name+"("+data[0].desc+")";  
				}  
			});  
		}, 
		chooseLocation(){
			var _this = this;
			// this.linkTo('/pages/address/choosemap');
			uni.chooseLocation({
			    success: function (res) {
					_this.addressName = res.name+"("+res.address+")";
					_this.getStoreList(res.longitude, res.latitude);
					_this.myLng = res.longitude;
					_this.myLat = res.latitude;
					_this.getHotsellList();
					_this.getJcsellList(1);
					_this.getGroupsellList();
			        console.log('位置名称：' + res.name);
			        console.log('详细地址：' + res.address);
			        console.log('纬度：' + res.latitude);
			        console.log('经度：' + res.longitude);
			    }
			});
		},
	},
	onShareAppMessage(res) {
	    if (res.from === 'button') {// 来自页面内分享按钮
	    }
	    return {
	      title: '千畦优品首页',
	      path: '/pages/tabBar/home'
	    }
	},
	onLoad() {
		let _this = this;
		this.amapPlugin = new amap.AMapWX({  
		     key: this.key  
		});  
		uni.getLocation({
			//获取当前的位置坐标
			type: 'wgs84',
			success: function(res) {
				_this.getStoreList(res.longitude, res.latitude);	
				_this.myLng = res.longitude;
				_this.myLat = res.latitude;
				_this.getHotsellList();
				_this.getJcsellList(1);
				_this.getGroupsellList();
				_this.getRegeo();
			}
		});
		this.getBanners();
		this.getPintuanUsers();
		// this.getHotsellList();
		// this.getJcsellList(1);
		// this.getGroupsellList();
			
		
	},
	onPullDownRefresh() {
		let _this = this;
		uni.stopPullDownRefresh();
	}
};
</script>

<style lang="scss">
@import '../../common/globel.scss';
.my-swiper{
	padding:10px 20upx;
	height: 60upx;
	// color: red;
	font-size: 28upx;
	line-height: 60upx;
	margin: 10upx 20upx;
	background-color: #F5F5F5;
	border-radius: 15upx;
	.m-swiper-content{
		display: flex;
		flex-direction: row;
		.body-box{
			margin-right: 10upx;
		}
	}
}
.m-container-center{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 20upx;
	align-items: center;
	align-content: center;
	font-size: 24upx;
	.item{
		padding: 20upx;
		width: 44%;
		background-color: #EEEEEE;
		border-radius: 15upx;
		
	}
	.item-left{
		background: linear-gradient(to right, #E6E6FA 0%, #FFF 100%);
	}
	.item-right{
		background: linear-gradient(to right, #FFEFD5 0%, #FFF 100%);
	}
}
.new-pin {
	// display: flex;
	border-radius: 20upx;
	margin: 20upx 20upx;
	box-shadow: 0px 0px 10px #eee;
	overflow: hidden;
	.m-header {
		display: flex;
		flex-direction: row;
		color: #fff;
		// background:url('~@static/img/home_list_bg1.png') center;
		background:#3c3c3c;
		background-size: cover;
		align-items: center;
		justify-content: space-between;
		//background: linear-gradient(to bottom, #000000 0%,#ffffff 100%);
		// padding: 20upx;
		
		view {
			padding: 20upx;
		}
		.text-small {
			font-size: 30upx;
			.text-btn{
				border: 0.5px solid #8A2BE2;
				background-color: #FFFFFF;
				border-radius: 25px 8px;
				padding: 5px 10px;
			}
		}
	}
	.header-jcai{
		background: linear-gradient(to left, #98F898 0%, #F0FFF0 100%);
	}
	.header-pintuan{
		background-color:#4CD964;
		justify-content: flex-start;
	}
	
	.m-container {
		display: flex;
		flex-direction: row;
		.m-together {
			flex: 1;
			display: flex;
			flex-direction: row;
		}
		.m-operation {
			flex: 0 0 140rpx;
			text-align: center;
			font-weight: bold;
			font-size: 32upx;
			color: $color-5;
			line-height: 1.2;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			// margin-left: 30upx;
			&:after {
				content: '';
				display: block;
				width: 1px;
				height: 100upx;
				background: #eee;
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -50upx;
				// 				top: 50upx;
				// 				bottom: 50upx;
			}
		}
	}
}
.empty-row {
	text-align: center;
	font-size: $fontsize-9;
	color: $color-1;
	padding: 66upx 20px;
	background: #f9f9f9;
}
.swiper-box {
	position: relative;
	width: 100%;
	height: 300upx;
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
	.indicator {
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
.pullDown-effects {
	position: fixed;
	//top: calc(100upx - 36vw);
	top: 0;
	z-index: 9;
	width: 100%;
	height: 36vw;
	/*  #ifdef  APP-PLUS  */
	padding-top: var(--status-bar-height);
	/*  #endif  */
	image {
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
	.store{
		margin-right: 20upx;
		flex-shrink: 0;
		display: flex;
		font-size: 30upx;
		// font-weight: 600;
		color: #003300;
		margin-top: 20upx;
		border-radius: 15upx;
		padding: 8upx 20upx;
		background-color: #009966;
		
	}
	.addr {
		// margin-right: 20upx;
		// width: 120upx;
		// height: 60upx;
		flex-shrink: 0;
		display: flex;
		font-size: 36upx;
		// font-weight: 600;
		color: #003300;
		align-items: center;
		width: 98%;
		.icon {
			height: 35upx;
			margin-right: 5upx;
			display: flex;
			align-items: center;
			font-size: 42upx;
			color: #6aba4e;
		}
	}
	
}
.input-main{
	background: #4EB87D;
	padding: 20upx 20upx;
	.input-box {
		width: 98%;
		// height: 60upx;
		background-color: #f5f5f5;
		border-radius: 30upx;
		// position: relative;
		padding-right: 10upx;
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
			height: 60upx;
			font-size: 28upx;
		}
	}
}

.header-nv{
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: center;
	background: #4EB87D;
	height: 130upx;
	.top {
		display: inline-block;
		width: 12upx;
		height: 12upx;
		border-top: 1upx solid #003300;
		border-right: 1upx solid #003300;
		transform: rotate(135deg);
		margin-left: 15upx;
		margin-top: -8upx;
	}
}
.place {
	background: #4EB87D;
	height: 130upx;
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
				margin-bottom: 8upx;
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
.scroll-view {
}
.m-content {
	// padding: 10upx;
	width: 96%;
	// 	margin:0 auto;
	margin-left: 2%;
	padding-top: 0;
	box-sizing: border-box;
	padding: 10upx;
	// 净
	&.m-hotsell {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content:space-between;
		margin-left: 0;
		width: 100%;
	}
	&.m-pin {
		margin-left: 0;
		width: 100%;
	}
	&.m-store {
		display: block;
		// padding:20upx;
	}
	// 超值
	&.m-chaozhi {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		// background: #f5f5f5;
		justify-content: flex-start;
		margin-left: 0upx;
		// align-items: center;
		// padding:20upx 0upx;
		padding-top: 0upx;
	}
	// 	&.m-today-pin{
	// 		padding-left: 20upx;
	// 		padding-right: 20upx;
	// 	}
	// 拼
	.m-togethoer {
		display: flex;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		// overflow: hidden;
		.m-pro-item {
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
