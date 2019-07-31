<template>
	<view class="m-user-page">
		<view class="m-header">
			<view v-if="isLogin" class="m-user" @tap="toVip">
				<view class="m-img" @tap.stop="toUserEdit">
					<image style="width:100%;height:100%" :src="userData.avatarUrl" mode="aspectFit"></image>
				</view>
				<view class="m-text">
					<view class="m-member">
						{{myMember.synopsis}}
						<view class="m-icon" v-if="myMember.type!=3">
							<template v-for="(i,index) in myMember.grade">
								<image v-if="myMember.type == 1" :key="index" class="m-item" src="../../static/img/card/icon_star1.png" mode="aspectFit"></image>
								<image v-else-if="myMember.type == 2" :key="index" class="m-item" src="../../static/img/card/icon_sterall.png" mode="aspectFit"></image>
								<image v-else-if="myMember.type == 4" :key="index" class="m-item" src="../../static/img/card/icon_Diamonds.png" mode="aspectFit"></image>
							</template>
						</view>
						<view class="m-icon" v-else-if="myMember.grade == 1 && myMember.type==3">
							<image  class="m-item" src="../../static/img/card/icon_1.png" mode="aspectFit"></image>
						</view>
						<view class="m-icon" v-else-if="myMember.grade == 2 && myMember.type==3">
							<image  class="m-item" src="../../static/img/card/icon_1.png" mode="aspectFit"></image>
							<image  class="m-item" src="../../static/img/card/icon_2.png" mode="aspectFit"></image>
						</view>
						<view class="m-icon" v-else-if="myMember.grade == 3 && myMember.type==3">
							<image  class="m-item" src="../../static/img/card/icon_1.png" mode="aspectFit"></image>
							<image  class="m-item" src="../../static/img/card/icon_2.png" mode="aspectFit"></image>
							<image  class="m-item" src="../../static/img/card/icon_3.png" mode="aspectFit"></image>
						</view>
						<view class="m-icon" v-else-if="myMember.grade == 4 && myMember.type==3">
							<image  class="m-item" src="../../static/img/card/icon_1.png" mode="aspectFit"></image>
							<image  class="m-item" src="../../static/img/card/icon_2.png" mode="aspectFit"></image>
							<image  class="m-item" src="../../static/img/card/icon_3.png" mode="aspectFit"></image>
							<image  class="m-item" src="../../static/img/card/icon_4.png" mode="aspectFit"></image>
						</view>
						<view class="m-icon" v-else-if="myMember.grade == 5 && myMember.type==3">
							<image  class="m-item" src="../../static/img/card/icon_1.png" mode="aspectFit"></image>
							<image  class="m-item" src="../../static/img/card/icon_2.png" mode="aspectFit"></image>
							<image  class="m-item" src="../../static/img/card/icon_3.png" mode="aspectFit"></image>
							<image  class="m-item" src="../../static/img/card/icon_4.png" mode="aspectFit"></image>
							<image  class="m-item" src="../../static/img/card/icon_5.png" mode="aspectFit"></image>
						</view>
						<view class="m-icon" v-else>
						</view>
					</view>
					<view class="m-nickname">
						{{userData.nickName}}
					</view>
					<!-- <image v-if="isVip" style="width:57upx;height:33upx" src="/static/img/icon/me_icon_VIP.png" mode="aspectFit"></image>
					<image v-else style="width:57upx;height:33upx" src="/static/img/icon/me_icon_VIP_lose.png" mode="aspectFit"></image> -->
				</view>
				<view class="m-qiandao">
					<view  v-if="signInfo.signed">
						已签到
					</view>
					<view @tap.stop="signing" class="m-btn" v-else>
						签到
					</view>
					<view class="m-text">
						<view>连续签到</view>
						<view class="m-num">{{signInfo.continueDay}}</view>
						<view>天</view>
					</view>
				</view>
			</view>
			
			<view  @tap="linkTo('/pages/login/login','login')" v-else class="m-user">
				<view class="m-img">
					<image style="width:100%;height:100%" src="../../static/img/icon/home_icon_gps.png" mode="aspectFit"></image>
				</view>
				<view class="m-text">
					<view class="m-username">
						<view class="m-login-but">
							登录/注册
						</view>
					</view>
				</view>
			</view>
			<view class="m-jifen" >
				<view class="m-left">
					<view class="m-text">积分</view>
					<view class="m-num">{{signInfo.curIntegration}}</view>
				</view>
				<view class="m-right" @tap="toDetail">
					<view class="m-text">积分明细</view>
					<view class="m-img">
						<image src="../../static/img/icon/order_down_icon1.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<!-- <view  class="m-card" @tap="linkTo('/pages/user/vip')">
				<m-vip-top>
					<view slot="name">{{myMember.memberDesc}}</view>
					<view slot="label"></view>
					<view slot="describe">{{myMember.memberSynopsis}}</view>
					<view slot="right">
						立即续费>
					</view>
				</m-vip-top>
			</view> -->
			<!-- <view v-else class="m-card" @tap="linkTo('/pages/user/vip')">
				<m-vip-top>
					<view slot="name">VIP会员</view>
					<view slot="label"></view>
					<view slot="describe">享受专属折扣  福利优惠  定制服务</view>
					<view slot="right">
						立即开通>
					</view>
				</m-vip-top>
			</view> -->
			<view class="m-order-chose">
				<view class="m-title">
					<view class="m-text">
						我的订单
					</view>
					<view class="right" @tap="linkToOrderTab(4)">
						查看全部 >
					</view>
				</view>
				<view class="m-slection">
					<view @tap="linkToOrderTab(1)" class="m-item">
						<view class="img-box">
							<image style="width:59upx;height:59upx" src="../../static/img/icon/me_icon_buy.png" mode="aspectFit"></image>
						</view>
						<view class="">
							待取货
						</view>
					</view>
					<view @tap="linkToOrderTab(2)" class="m-item">
						<view class="img-box">
							<image style="width:59upx;height:59upx" src="../../static/img/icon/me_icon_maney.png" mode="aspectFit"></image>
						</view>
						<view class="">
							待支付
						</view>
					</view>
					<view @tap="linkToOrderTab(3)" class="m-item">
						<view class="img-box">
							<image style="width:59upx;height:59upx" src="../../static/img/icon/me_icon_pingjia.png" mode="aspectFit"></image>
						</view>
						<view class="">
							待评价
						</view>
					</view>
				</view>
			</view>
			<view class="m-cell-list">
				<m-cell @handleFn="linkTo('/pages/address/list')" label="我的地址" :link='true'>
					<image  style="width:36upx;height:36upx;" src="/static/img/icon/me_icon_preferential.png" mode="aspectFull"></image>
				</m-cell>
				<m-cell @handleFn="linkTo('/pages/user/tokencard')" label="我的优惠券" :link='true'>
					<image  style="width:36upx;height:36upx;" src="/static/img/icon/me_icon_preferential.png" mode="aspectFull"></image>
				</m-cell>
				<!-- <m-cell @handleFn="linkTo('/pages/user/aboutme')" label="关于我们" :link='true'>
					<image style="width:36upx;height:36upx;" src="/static/img/icon/me_icon_about.png" mode="aspectFull"></image>
				</m-cell> -->
			</view>
		</view>
	</view>
</template>
<script>
	import mVipTop from '@/components/m-vip-top'
	import mCell from '@/components/m-cell'
	import Event from '../../common/event.js';  
	export default {
		components:{
			mVipTop,
			mCell
		},
		data(){
			return {
				isLogin:false,
				isVip:false, // 是否是会员
				myMember:{}, // 会员信息
				userData:{},
				signInfo:{}
			}
		},
		methods:{
			//我的会员
			myVips(){
				let _this = this;
				this.$apis.postMyMember({}).then(res=>{
					
					let data = res.data.myMember;
					if(data){
						// 会员
						_this.myMember=data;
						_this.isVip = true;
					}else{
						// 非会员
						_this.isVip = false
					}
				
				})
			},
			//签到信息
			mySigns(){
				let _this = this;
				this.$apis.postMySign({}).then(res=>{
						let data = res.data;
						console.log(data)
						this.signInfo = data;
				})
			},
			//签到
			signing(){
				let _this = this;
				this.$apis.postSigning({}).then(res=>{
					uni.showToast({
						title: '您已签到成功~',
						duration: 2000
					});
					let data = res.data;
					this.signInfo = data;
				})
			},
			toDetail(){
				uni.navigateTo({
					url:"/pages/user/score_detail"
				})
			},
			toVip(){
				uni.navigateTo({
					url:"/pages/user/vip?integration="+this.signInfo.integration
				})
			},
			linkToOrderTab(index){
				uni.setStorageSync('orderTab', index);
				uni.switchTab({
					url:'/pages/tabBar/order'
				})
			},
			linkToTab(url){
				uni.switchTab({
					url:url
				})
			},
			// 跳转
			linkTo(url,name){
				if(name=='login'){
					let backurl = encodeURI("/pages/tabBar/user");
					uni.redirectTo({
						url:url+'?back='+backurl 
					})
				}else{
					uni.navigateTo({
						url:url
					})
				}
				
			},
			// 查看详情
			vipCardDetail(){
				uni.navigateTo({
					url:url
				})
			},
			initData(){
				this.userData = JSON.parse(uni.getStorageSync('userData'));
				if(!this.userData.avatarUrl){
					this.$set(this.userData,'avatarUrl',this.userData.headAddress||'')
				}
				if(!this.userData.nickName){
					this.$set(this.userData,'nickName',this.userData.nickname||'')
				}
				this.myVips();	
				this.mySigns();
			},
			//是否登录了
			async checkLogin(){
				let islogin = await this.globelIsLogin();
				this.isLogin = islogin;
				if(islogin){
					this.initData();
				}
			},
			toUserEdit(){
				uni.navigateTo({
					url:"/pages/user/edit"
				})
			}
		},
		onLoad(){
			this.checkLogin();
		},
		onShow(){
			this.checkLogin();
		}
	}
</script>
<style lang="scss">
	 @import "../../common/globel.scss";
	.m-user-page{
		.m-header{
			width: 100%;
			background: url("http://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/banners/me_bg_top.png") no-repeat top left;
			background-size: 100% 238upx;
		}
		.m-user{
			display:flex;
			padding: 52upx 30upx 42upx;
			justify-items: flex-start;
			align-items: center;
			.m-img{
				margin-left: 10upx;
				width: 92upx;
				height: 92upx;
				border-radius: 100%;
				overflow: hidden;
				background: #fff;
				
			}
			.m-text{
				flex: 1;
				font-size: 36upx;
				color:#fff;
				margin-left: 10upx;
				display: flex;
				flex-direction: column;
				.m-username{
					margin-right: 10upx;
					.m-login-but{
						// border:1px solid #fff;
						padding:5upx 30upx;
						font-size: 32upx;
						margin-left: 10upx;
						background:rgba(255,255,255,0.2)
					}
				}
				.m-member{
					margin-right: 10upx;
					color: #333;
					font-size: 30upx;
					margin-bottom: 8upx;
					display: flex;
					align-items: center;
					align-content: center;
					.m-icon{
						display: flex;
						align-items: center;
						align-content: center;
					}
					.m-item{
						width:30upx;
						height: 30upx;
					}
				}
				.m-nickname{
					color: #FFF;
					font-size: 26upx;
				}
			}
			.m-qiandao{
				display: flex;
				flex-direction: column;
				align-items: center;
				.m-btn{
					background:#f9ad39;
					border-radius:35upx;
					padding:8upx 35upx;
					color:#FFF;
					font-size:28upx;
					margin-bottom: 8upx;
				}
				.m-text{
					display: flex;
					flex-direction: row;
					align-items: center;
					color: #333;
					font-size: 26upx;
					.m-num{
						color: #f9ad39;
						margin-top: 8upx;
						margin-right: 8upx;
						font-size: 36upx;
					}
				}
			}
		}
		.m-jifen{
			display: flex;
			justify-content:space-between;
			align-items: center;
			padding: 60upx 60upx;
			background:url('../../static/img/icon/me_bg.png') no-repeat;
			background-size: 100% 100%;
			font-size: 28upx;
			.m-left{
				display: flex;
				flex-direction: column;
				align-items: center;
				.m-num{
					font-size:34upx;
					margin-top:8upx;
				}
			}
			.m-right{
				display: flex;
				flex-direction: row;
				align-items: center;
				align-content: center;
				font-size: 24upx;
				.m-img{
					display: flex;
					flex-direction: row;
					align-items: center;
					width:13upx;
					height:13upx;
					margin-left: 10upx;
				}
			}
		}
		.m-order-chose{
			margin:30upx;
			box-shadow: 0 0 20upx rgba(0,0,0,0.3);
			padding:30upx 30upx 40upx;
			border-radius: 20upx;
			.m-title{
				display: flex;
				flex-direction: row;
				font-size: 32upx;
				justify-content: space-between;
				color: #333;
				.m-text{
					font-weight: bold;
				}
				.right{
					color:$color-1;
					font-size: 24upx;
				}
			}
			.m-slection{
				margin-top: 30upx;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				.m-item{
					flex: 1;
					text-align: center;
					font-size: 26upx;
					color: #808080;
					position: relative;
					&:active{
						background:$color-hover;
					}
					&:after{
						content: "";
						display: block;
						position: absolute;
						width: 1px;
						background:#f3f3f3;
						right: 0;
						top: 50%;
						height: 50upx;
						margin-top: -25upx;
					}
					&:last-of-type:after{
						direction: none;
					}
					.img-box{
						height: 88upx;
						line-height: 88upx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
		.m-cell-list{
			padding: 0 30upx;
		}
		
	}
</style>
