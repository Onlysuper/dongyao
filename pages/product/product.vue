<template>
	<view>
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		<view class="header">
			<!-- 头部 - 默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back"><view class="icon xiangqian" @tap="back" v-if="showBack"></view></view> 
				<view class="middle"></view>
				<view class="icon-btn">
				</view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back" ><view class="icon xiangqian" @tap="back" v-if="showBack"></view></view>
				<view class="middle">
					<view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
				</view>
				<view class="icon-btn">
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<view class="box" @tap="goHome">
					<view class="icon home">
						<image style="width:38upx;height:100%" src="../../static/img/icon/goods_icon_house.png" mode="aspectFit"></image>
					</view>
					<view class="text">首页</view>
				</view>
				<view class="box" @tap="goStore">
					<view class="icon store">
						<image style="width:38upx;height:100%" src="../../static/img/icon/goods_icon_shop.png" mode="aspectFit"></image>
					</view>
					<view class="text">进店</view>
				</view>
			</view>
			<view class="btn">
				<view v-if="isAssemble" class="joinCart" @tap="pintuan">我要拼</view>
				<view v-else class="buy" @tap="buy">立即购买</view>
			</view>
		</view>
		<!-- 服务-模态层弹窗 -->
		<view class="popup service" :class="serviceClass" @touchmove.stop.prevent="discard" @tap="hideService">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="row" v-for="(item,index) in goodsData.service" :key="index">
						<view class="title">{{item.name}}</view>
						<view class="description">{{item.description}}</view>
					</view>
				</view>
				<view class="btn"><view class="button" @tap="hideService">完成</view></view>
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="title">选择规格：</view>
					<view class="sp">
						<view v-for="(item,index) in goodsData.spec" :class="[index==selectSpec?'on':'']" @tap="setSelectSpec(index)" :key="index">{{item}}</view>
					</view>
					<view class="length" v-if="selectSpec!=null">
						<view class="text">数量</view>
						<view class="number">
							<view class="sub" @tap.stop="sub">
								<view class="icon jian"></view>
							</view>
							<view class="input" @tap.stop="discard">
								<input type="number" v-model="goodsData.number" />
							</view>
							<view class="add"  @tap.stop="add">
								<view class="icon jia"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="btn"><view class="button" @tap="hideSpec">完成</view></view>
			</view>
		</view>
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="swiper in swiperList" :key="swiper.id">
					<video class="mvideo" objectFit="fill" v-if="swiper.type=='1'?true:false" :src="swiper.pictureUrl" @tap="toSwiper(swiper)" controls></video>
					<image v-if="swiper.type=='0'" :src="swiper.pictureUrl" @tap="toSwiper(swiper)"></image>
				</swiper-item>
			</swiper>
			<view class="indicator">{{currentSwiper+1}}/{{swiperList.length}}</view>
		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="title">
				{{goodsData.synopsis}}
			</view>
			<view class="tip-box">
				<view class="item">
					{{goodsData.labelName}}
				</view>
			</view>
			<view class="price-box">
				<view class="price">￥{{goodsData.presentPrice}}</view>
				<view class="oldprice">￥{{goodsData.originalPrice}}</view>
				<view class="num">
					商品库存：{{goodsData.stock}}
				</view>
				<view v-if="isAssemble == 1" class="pickTime">
					取货时间：{{goodsData.pickTimeStr}}
				</view>
			</view>
		</view>
		<!-- 拼团 -->
		<view v-if="isAssemble" class="info-box pintuan">
			<view class="m-header">
				<view class="time-box">
					<view class="">
						距结束
					</view>
					<view class="time">
						{{timeSpan}}
					</view>
				</view>
				<view class="text-box">
					已有<span class="text-num">
					{{pintunNum}}</span>人下单 可直接参与
				</view>
			</view>
			
			<view class="user-list-box" v-if="pintuanData.length > 0">
				<swiper class="swiper" :display-multiple-items='3' :indicator-dots="false" :autoplay="autoplay" :interval="interval" :duration="duration" :vertical="true">
					<swiper-item v-for="(item, index) in pintuanData" :key="item.id">
						<view class="item-box">
							<view class="img-box">
								<image style="width:80upx;height:80upx" :src="item.headAddress" mode="aspectFit"></image>
							</view>
							<view class="body-box">
								{{item.nickname}}
							</view>
							<view class="time-box">
								<view class="">
									{{item.pickingTime}}下单
								</view>
								<view class="">
									第{{pintunNum-index}}位用户
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view v-else class="empty-row">
				~暂无拼团用户~
			</view>
		</view>
		<!-- 评价 -->
		<view v-if="commentData.length > 0" class="info-box comments" id="comments">
			<view class="m-header">
				<view class="m-label">
					商品评价
				</view>
				<view class="m-detail">
					好评度 {{degreeData}}%>
				</view>
			</view>
			<view class="m-body" v-for="item in commentData" :key="item.id">
				<view class="img-box">
					<image v-if="item.anonymous==0" style="width:80upx;height:80upx" :src="item.headAddress" mode="aspectFit"></image>
					<image v-else style="width:80upx;height:80upx" src="../../static/img/icon/goods_icon_Avatar.png" mode="aspectFit"></image>
				</view>
				<view class="container">
					<view class="user-box">
						<view class="">
							<view v-if="item.anonymous==0" class="user-name">
								{{item.nickname}}
							</view>
							<view v-else class="user-name">
								匿名
							</view>
							<view class="time">
								{{item.commentTime}}
							</view>
						</view>
						<uni-rate size="18" :value="item.starLevel"></uni-rate>
					</view>
					<view class="content">
						<view class="">
							{{item.commentContent}}
						</view>
						<view v-if="item.replyContent!=''" class="m-reply">
							{{item.replyContent}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="info-box comments" id="comments">
			<view class="m-label">
				商品评价
			</view>
			<view  class="empty-row">
				~暂无品论~
			</view>
		</view>
		<view class="info-box pro-detail">
			<view class="m-header">
				<view class="m-label">
					商品介绍
				</view>
			</view>
			<view class="m-body" >
				<view class="m-row">
					<view class="m-cell">
						产地:{{details.placeOrigin}}
					</view>
					<view class="m-cell">
						储存:{{details.storageMode}}
					</view>
				</view>
				<view class="m-row">
					<view class="m-cell">
						规格:{{details.specs}}
					</view>
					<view class="m-cell">
						保质期:{{details.qualityGuaranteePeriod}}
					</view>
				</view>
			</view>
		</view>
		<!-- 详情 -->
		<view class="description">
			<!-- <view class="title">———— 商品详情 ————</view> -->
			<view class="content" style="padding: 20upx 0;text-align:center;">
				<rich-text :nodes="descriptionStr"></rich-text>
			</view>
		</view>
		<view style="height: 100upx;">
			
		</view>
	</view>
</template>

<script>
import uniRate from "@/components/uni-rate/uni-rate.vue"
export default {
	components: {uniRate},
	data() {
		return {
			indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
			details:{
				placeOrigin:"",
				specs:"",
				qualityGuaranteePeriod:"",
				storageMode:"",
			}, // 详情
			timeSpan:'',//距团购结束
			pintunNum:'',// 拼团人数
			//控制渐变标题栏的参数
			beforeHeaderzIndex: 11,//层级
			afterHeaderzIndex: 10,//层级
			beforeHeaderOpacity: 1,//不透明度
			afterHeaderOpacity: 0,//不透明度
			//是否显示返回按钮
			// #ifndef MP
			showBack:true,
			// #endif
			//轮播主图数据
			swiperList: [],
			//轮播图下标
			currentSwiper: 0,
			anchorlist:[],//导航条锚点
			selectAnchor:0,//选中锚点
			serviceClass: '',//服务弹窗css类，控制开关动画
			specClass: '',//规格弹窗css类，控制开关动画
			shareClass:'',//分享弹窗css类，控制开关动画
			// 商品信息
			storeId:"",
			goodsData:{},
			isAssemble:false,// 是否拼团
			// pintunNum:0,
			pintuanData:{},
			commentData:{},//评论列表
			degreeData:"",//好评度
			selectSpec:null,//选中规格
			//商品描述html
			descriptionStr:'<div style="text-align:center;"></div>'
		};
	},
	onReady(){
		this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
	},
	onLoad(option) {
		let _this = this;
		// #ifdef MP
		//小程序隐藏返回按钮
		_this.showBack = false;
		// #endif
		//option为object类型，会序列化上个页面传递的参数
		let id=option.id;
		// 商品基本信息
		_this.$apis.postProducts({
			id:id,
		}).then(res=>{
			if(res.code=='1'){
				if(res.data){
					let data=res.data;
					_this.goodsData=data;
					_this.descriptionStr=data.describes;
					_this.storeId = data.storeId;
					_this.timeSpan = data.timeSpan;
					_this.details=Object.assign(_this.details,data.details) ;
					// 轮播图
					if(data.pictures){
						_this.swiperList=[...data.pictures];
					}
					//是否可拼团
					_this.isAssemble=(data.isAssemble==1);
					if(_this.isAssemble){
						_this.getPintuanUsers(id);
					}
				}
			}
		})
		// 商品评论列表
		_this.getComments(id);
		//好评度
		_this.getDegree(id);
		// this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
	},
	onPageScroll(e) {
		//锚点切换
		this.selectAnchor = e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;
		//导航栏渐变
		let tmpY = 375;
		e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
		this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
		this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
		//切换层级
		this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
		this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
	},
	methods: {
		goHome(){
			uni.switchTab({  
                url: '/pages/tabBar/home'  
            });  
		},
		//进店
		goStore(){
			console.log('进店');
			uni.navigateTo({
				url:"/pages/store/store?storeid="+this.storeId
			})
		},
		// 拼团用户列表
		getPintuanUsers(id){
			let _this = this;
			this.$apis.postGroupBuyUsers({
				start:0,
				length:100,
				productId:id
			}).then(res=>{
				if(res.data){
					_this.pintunNum = res.data.endRow;
					_this.pintuanData=res.data.list;
				}
			})
		},
		//评论列表
		getComments(id){
			let _this = this;
			this.$apis.postComments({
				start:0,
				length:100,
				productId:id
			}).then(res=>{
				if(res.code=='1'){
					if(res.data){
						_this.commentData=res.data.list;
					}
				}
			})
		},
		//好评度
		getDegree(id){
			let _this = this;
			this.$apis.postDegree({
				productId:id
			}).then(res=>{
				if(res.code=='1'){
					if(res.data){
						_this.degreeData=res.data;
					}
				}
			})
		},
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
// 		//消息列表
// 		toMsg(){
// 			uni.navigateTo({
// 				url:'../msg/msg'
// 			})
// 		},
// 		// 客服
// 		toChat(){
// 			uni.navigateTo({
// 				url:"../msg/chat/chat?name=客服008"
// 			})
// 		},
		// 分享
		share(){
			this.shareClass = 'show';
		},
		hideShare(){
			this.shareClass = 'hide';
			setTimeout(() => {
				this.shareClass = 'none';
			}, 150);
		},
		//立即购买
		buy(){
			this.joinCart(2)
		},
		//拼团
		pintuan(){
			this.joinCart(2)
		},
		joinCart(type){
			let _this = this;
			var newobj={...this.goodsData};  
			newobj['describes']="";
			newobj['buyCount']='1';
			let proArr = [newobj];
			let proUrlData = encodeURI(JSON.stringify({proUrlData:proArr}));
			let totalCount = 1;
			uni.navigateTo({
				url:"/pages/order/pay?storeid="+_this.storeId+"&totalCount="+totalCount+"&type="+type+'&proUrlData='+proUrlData
			})
		},
		//跳转确认订单页面
// 		toConfirmation(){
// 			let tmpList=[];
// 			let goods = {id:this.goodsData.id,img:'../../static/img/goods/p1.jpg',name:this.goodsData.name,spec:'规格:'+this.goodsData.spec[this.selectSpec],price:this.goodsData.price,number:this.goodsData.number};
// 			tmpList.push(goods);
// 			uni.setStorage({
// 				key:'buylist',
// 				data:tmpList,
// 				success: () => {
// 					uni.navigateTo({
// 						url:'../order/confirmation'
// 					})
// 				}
// 			})
// 		},
		//跳转评论列表
// 		showComments(goodsid){
// 			
// 		},
		//选择规格
// 		setSelectSpec(index){
// 			this.selectSpec = index;
// 		},
		//减少数量
// 		sub(){
// 			if(this.goodsData.number<=1){
// 				return;
// 			}
// 			this.goodsData.number--;
// 		},
// 		//增加数量
// 		add(){
// 			this.goodsData.number++;
// 		},
		//跳转锚点
		toAnchor(index){
			this.selectAnchor = index;
			uni.pageScrollTo({scrollTop: this.anchorlist[index].top,duration: 200});
		},
		//计算锚点高度
		calcAnchor(){
			this.anchorlist=[
				{name:'主图',top:0},
				{name:'评价',top:0},
				{name:'详情',top:0}
			]
			let commentsView = uni.createSelectorQuery().select("#comments");
			commentsView.boundingClientRect((data) => {
				let statusbarHeight = 0;
				//APP内还要计算状态栏高度
				// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
				// #endif
				let headerHeight = uni.upx2px(100);
				this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
				this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;
				
			}).exec();
		},
		//返回上一页
		back() {
			uni.navigateBack();
		},
		//服务弹窗
		showService() {
			console.log('show');
			this.serviceClass = 'show';
		},
		//关闭服务弹窗
		hideService() {
			this.serviceClass = 'hide';
			setTimeout(() => {
				this.serviceClass = 'none';
			}, 200);
		},
		//规格弹窗
		showSpec(fun) {
			console.log('show');
			this.specClass = 'show';
			this.specCallback = fun;
		},
		specCallback(){
			return;
		},
		//关闭规格弹窗
		hideSpec() {
			this.specClass = 'hide';
			//回调

			this.selectSpec&&this.specCallback&&this.specCallback();
			this.specCallback = false;
			setTimeout(() => {
				this.specClass = 'none';
			}, 200);
		},
		discard() {
			//丢弃
		}
	},
	mounted () {
		
	}
};
</script>

<style lang="scss">
@import "../../common/globel.scss";
.description{
	background:#fff;
	font-size: $fontsize-4;
	padding: 30upx;
}
.mvideo{
	width: 100%;
	height: 100%;
}
page {
	background-color: #f8f8f8;
}
@keyframes showPopup {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
@keyframes hidePopup {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
@keyframes showLayer {
	0% {
		transform: translateY(0);
	}
	100% {
		transform: translateY(-100%);
	}
}
@keyframes hideLayer {
	0% {
		transform: translateY(-100%);
	}
	100% {
		transform: translateY(0);
	}
}
@font-face {
	font-family: 'HMfont-home';
	src: url('data:application/x-font-woff2;charset=utf-8;base64,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')
		format('woff2');
}
.icon {
	font-family: 'HMfont-home' !important;
	font-size: 26upx;
	font-style: normal;
	&.xiangqian {
		&:before {
			content: '\e634';
		}
	}
}
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
	background-color: #f1f1f1;
}
.header {
	width: 100%;

	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */
	.before,
	.after {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
		/*  #endif  */

		.back {
			width: 125upx;
			height: 60upx;
			flex-shrink: 0;
			.icon {
				margin-left: -10%;
				width: 60upx;
				height: 60upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 42upx;
			}
		}
		.middle {
			width: 100%;
			font-size: $fontsize-2;
		}
		.icon-btn {
			width: 125upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon {
				&:first-child{
					margin-right: 5upx;
				}
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	.before {
		.back {
			.icon {
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
			}
		}
		.icon-btn {
			.icon {
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
				
			}
		}
	}
	.after {
		background-color: #f1f1f1;
		.back {
			.icon {
				color: #666;
			}
		}
		.icon-btn {
			.icon {
				color: #666;
			}
		}
		.middle {
			font-size: 32upx;
			height: 90upx;
			display: flex;
			justify-content: center;
			align-items: center;
			view {
				padding: 0 3%;
				margin: 0 3%;
				display: flex;
				justify-content: center;
				align-items: center;
				&.on {
					margin-bottom: -4upx;
					color: #f47952;
					border-bottom: solid 4upx #f47952;
				}
			}
		}
	}
}
.swiper-box {
	position: relative;
	width: 100%;
	height: 100vw;
	swiper {
		width: 100%;
		height: 100vw;
		swiper-item {
			image {
				width: 100%;
				height: 100vw;
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
.info-box {
	width: 92%;
	padding: 20upx 4%;
	background-color: #fff;
	margin-bottom: 20upx;
}

.goods-info {
	.title {
		font-size: $fontsize-2;
		color:$color-2;
	}
	.tip-box{
		margin-top: 10upx;
		display: flex;
		flex-direction:row;
		color:$color-5;
		font-size: $fontsize-3;
		.item{
			display: inline-block;
			padding-right: 30upx;
		}
	}
	.price-box{
		display: flex;
		flex-direction: row;
		align-items: center;
		color:$color-5;
		margin-top: 10upx;
		.price{
			font-size: $fontsize-2;
			color:$color-price;
			display: inline-block;
		}
		.oldprice{
			display: inline-block;
			margin-left: 20upx;
			font-size: $fontsize-5;
			color:$color-6;
		}
		.num{
			display: inline-block;
			margin-left:30upx;
			padding-left: 20upx;
			font-size: $fontsize-5;
			border-left: 1px solid $color-3;
		}
		.pickTime{
			flex-grow:1;
			text-align: right;
			color:$color-price;
			font-size: $fontsize-3;
		}
	}
}
.spec {
	.row {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;
		.text {
			font-size: 24upx;
			color: #a2a2a2;
			margin-right: 20upx;
		}
		.content {
			font-size: 28upx;
			display: flex;
			flex-wrap: wrap;
			.serviceitem{
				margin-right: 10upx;
			}
			.sp {
				width: 100%;
				display: flex;
				view {
					background-color: #f6f6f6;
					padding: 5upx 10upx;
					color: #999;
					margin-right: 10upx;
					font-size: 20upx;
					border-radius: 5upx;
					&.on{
						border: solid 1upx #f47952;
						padding: 4upx 8upx;
					}
				}
			}
		}
		.arrow {
			position: absolute;
			right: 4%;
			.icon {
				color: #ccc;
			}
		}
	}
}
.pro-detail{
	.m-header{
		color:$color-2;
		font-size:32upx;
		padding: 30upx 0;
	}
	.m-row{
		display: flex;
		flex-direction: row;
		.m-cell{
			flex: 1;
			font-size: $fontsize-9;
			color:$color-5;
		}
	}
}
//拼团start
.pintuan{
	// padding: 0;
	background:#fff;
	.m-header{
		border-bottom: 1px solid $color-border2;
		padding: 30upx 0;
		display: flex;
		justify-content:space-between; 
		.time-box{
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size:$fontsize-9;
			color:$color-5;
		}
		.text-box{
			color:$color-7;
			font-size: $fontsize-3;
		}
		.text-num{
			color:$color-8;
			font-weight: 500;
			font-size: $fontsize-2;
		}
		.time{
			color:white;
			margin-left: 10upx;
			background-color: $color-8;
			font-size: $fontsize-2;
		}
	}
	.user-list-box{
		
		.item-box{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 30upx 0;
			font-size: $fontsize-9;
			color:$color-5;
			border-bottom: 1px solid $color-border1;
			&:last-child{
				border:0;
			}
			.img-box{
				flex:0 0 80upx;
				height: 80upx;
				border-radius: 100%;
				overflow: hidden;
			}
			.body-box{
				flex:1;
				padding-left: 20upx;
			}
			.time-box{
				flex: 1 1 200upx;
				color:$color-1;
				font-size:$fontsize-5;
				text-align:right;
				:first-of-type{
					color:#77818b;
					font-size: $fontsize-4;
					// font-weight: bold;
				}
			}
		}
	}
}
// 拼团end
// 评论start
.comments {
	.m-header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding:30upx 0;
		align-items: center;
		border-bottom: 1px solid $color-border2;
		.m-label{
			font-size: $fontsize-2;
			color:$color-2;
		}
		.m-detail{
			font-size:$fontsize-4 ;
			color:$color-4;
		}
	}
	.m-body{
		padding-top:30upx;
		padding-bottom:30upx;
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid $color-border1;
		&:last-child{
			border:0;
		}
		.img-box{
			flex:0 1 80upx;
			height: 80upx;
			border-radius: 100%;
			overflow: hidden;
		}
		.container{
			flex:1;
			padding-left:20upx;
			.user-box{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				color:$color-2;
				font-size: $fontsize-2;
				.time{
					font-size: $fontsize-7;
					color:$color-6;
				}
			}
			.content{
				padding-top: 10upx;
				color:$color-5;
				font-size: $fontsize-9;
				.m-reply{
					background:#f7f7f7;
					color:#666;
					font-size: $fontsize-4;
					padding:20upx;
					margin-top: 20upx;
				}
			}
		}
	}
}
.description {
	.title {
		width: 100%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26upx;
		color: #999;
	}
}
.footer {
	position: fixed;
	bottom: 0upx;
	width: 100%;
	height: 99upx;
	border-top: solid 1upx #eee;
	background-color: #fff;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.icons {
		flex:1;
		display: flex;
		height: 80upx;
		margin-left: 10upx;
		.box {
			flex:1;
			width: 80upx;
			height: 80upx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			position: relative;
			&:first-of-type:after{
				content:"";
				display:block;
				position: absolute;
				width: 1px;
				height: 60upx;
				background:#f0f0f0;
				
				right: 0;
				top: 10upx;
			}
			.icon {
				font-size: 40upx;
				color: #828282;
			}
			.text {
				display: flex;
				justify-content: center;
				width: 100%;
				font-size: 22upx;
				color: #666;
			}
		}
	}
	.btn {
		flex:2;
		height:100%;
		display: flex;
		.joinCart,
		.buy {
			box-sizing: border-box;
			flex:1;
			height: 100%;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			font-size: 28upx;
		}
		.joinCart {
			background-color: #4eb87d;
			text-align: center;
			border-right: 1px solid #7fc19c;
		}
		.buy {
			background-color: #4eb87d;
			text-align: center;
		}
	}
}
.popup {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 20;
	display: none;
	.mask{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 21;
		background-color: rgba(0, 0, 0, 0.6);
	}
	.layer {
		position: fixed;
		z-index: 22;
		bottom: -70%;
		width: 92%;
		padding: 0 4%;
		height: 70%;
		border-radius: 20upx 20upx 0 0;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		.content {
			width: 100%;
			padding: 20upx 0;
		}
		.btn {
			width: 100%;
			height: 100upx;
			.button {
				width: 100%;
				height: 80upx;
				border-radius: 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #f47952;
				font-size: 28upx;
			}
		}
	}
	
	&.show {
		display: block;
		.mask{
			animation: showPopup 0.2s linear both;
		}
		.layer {
			animation: showLayer 0.2s linear both;
		}
	}
	&.hide {
		display: block;
		.mask{
			animation: hidePopup 0.2s linear both;
		}
		
		.layer {
			animation: hideLayer 0.2s linear both;
		}
	}
	&.none {
		display: none;
	}
	&.service {
		.row {
			margin: 30upx 0;
			.title {
				font-size: 30upx;
				margin: 10upx 0;
			}
			.description {
				font-size: 28upx;
				color: #999;
			}
		}
	}
	&.spec {
		.title {
			font-size: 30upx;
			margin: 30upx 0;
		}
		.sp {
			display: flex;
			view {
				font-size: 28upx;
				padding: 5upx 20upx;
				border-radius: 8upx;
				margin: 0 30upx 20upx 0;
				background-color: #f6f6f6;
				&.on {
					padding: 3upx 18upx;
					border: solid 1upx #f47925;
				}
			}
		}
		.length{
			margin-top: 30upx;
			border-top: solid 1upx #aaa;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20upx;
			.text{
				font-size: 30upx;
			}
			.number{
				display: flex;
				justify-content: center;
				align-items: center;
				.input{
					width: 80upx;
					height: 60upx;
					margin: 0 10upx;
					background-color: #f3f3f3;
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					input{
						width: 80upx;
						height: 60upx;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
						font-size: 26upx;
					}
				}
				
				.sub ,.add{
					width: 60upx;
					height: 60upx;
					background-color: #f3f3f3;
					border-radius: 5upx;
					.icon{
						font-size: 30upx;
						width: 60upx;
						height: 60upx;
						display: flex;
						justify-content: center;
						align-items: center;
						
					}
				}
			}
		}
		
	}
}
.empty-row{
	text-align: center;
	font-size: $fontsize-9;
	color:$color-1;
	padding: 66upx 20px;
	// background:#f9f9f9;
}
</style>
