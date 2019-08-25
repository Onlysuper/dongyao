<template>
	<view class="m-myvip-page">
		<view class="m-header">
			<swiper style="height: 200px;" :current="currentIndex" class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" previous-margin="15" next-margin="15"
			@change="handlerChange">
				<template v-for="(item,index) in members">
					<swiper-item :key="index">
						<view class="m-card m-card-A" v-if="item.type == 1">
							<m-card-vip :key="index" :item="item" ></m-card-vip>
						</view>
						<view class="m-card m-card-B" v-if="item.type == 2">
							<m-card-vip :key="index" :item="item" ></m-card-vip>
						</view>
						<view class="m-card m-card-C" v-if="item.type == 3">
							<m-card-vip :key="index" :item="item" ></m-card-vip>
						</view>
						<view class="m-card m-card-D" v-if="item.type == 4">
							<m-card-vip :key="index" :item="item" ></m-card-vip>
						</view>
					</swiper-item>
				</template>
			</swiper>
		</view>
		<view class="m-main">
			<view class="m-card-describe">
				<view class="m-title">
					<view>V{{vipName}}等级特权</view>
				</view>
				<view class="m-content">
					<!-- <rich-text :nodes="vipDescribes"></rich-text> -->
					<view class="m-name">A、生日祝福</view>
					<view class="m-describes">可享受“千畦”商城的生日祝福。</view>
					<view class="m-name">B、健康咨询</view>
					<view class="m-describes">可享受“千畦”定期免费赠送的健康知识、保健、时尚等资讯</view>
					<view class="m-name">C、节日福利</view>
					<view class="m-describes">有权参加“千畦”推出的积分抵扣现金、积分抽奖、积分换购及节假日特供等活动。</view>
					<view v-if="vipType > 1" class="m-name">D、节日礼物</view>
					<view v-if="vipType> 1" class="m-describes">会员生日当月，千畦赠送特别的生日礼物；</view>
					<view v-if="vipType > 1" class="m-name">E、积分赠送</view>
					<view v-if="vipType == 2" class="m-describes"> 购买商城中的商品可额外获得积分10%。</view>
					<view v-if="vipType >= 3" class="m-describes"> 购买商城中的商品可额外获得积分20%。</view>
					<view v-if="vipType == 3" class="m-name">F、享受会员日</view>
					<view v-if="vipType == 3" class="m-describes">每周随机抽取一位会员以其名义制定会员日的促销产品优惠，只有“千畦班委”可参与抽取。被选中的会员可以指定一款产品作为当日的促销产品。。</view>
					<view v-if="vipType == 4" class="m-name">F、会员享受感恩日</view>
					<view v-if="vipType == 4" class="m-describes">每周随机抽取一位会员，以其名义制定会员日的特价产品优惠，只有“千畦江湖”可参与抽取。感恩限购每人一套，选择2种产品组合套餐，自有品牌产品和名牌产品组合，组合为：欢乐家庭套装、关爱家庭套装、幸福家庭套装。</view>
					<view v-if="vipType == 4" class="m-name">G、亲情伙伴</view>
					<view v-if="vipType == 4" class="m-describes">可享受亲情相伴，邀请一名家属成为同级别会员，只有一个名额。</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import mTitle from '@/components/m-title'
	import mVipCard from '@/components/m-vip-card'
	import mCardVip from '@/components/m-card-vip'
	export default {
		components: {
			mTitle,
			mVipCard,
			mCardVip
		},
		data() {
			return {
				chooseVipId:0,
				isVip:false,//是否为会员
				vipInfo:{},
				currentIndex:0,
				myMember:{
					nickName:'',
					dueTime:'',
					memberType:'',
					discount:'',
					memberSynopsis:''
				},
				nextMember:{},
				members:[],
				userData:{},
				vipName:"",
				vipDescribes:"" ,//会员卡权益
				vipType:undefined,
				curIntegration:undefined
			};
		},
		methods:{
			getUser(){
				this.userData = JSON.parse(uni.getStorageSync('userData'));
				if(!this.userData.avatarUrl){
					this.$set(this.userData,'avatarUrl',this.userData.headAddress||'')
				}
				if(!this.userData.nickName){
					this.$set(this.userData,'nickName',this.userData.nickname||'')
				}
			},
			// 会员列表
			async getVips(){
				let _this = this;
				await this.$apis.postMembers({}).then(res=>{
					let temps = res.data.members
					let tempLst = [];
					let flag  = 0;
					for (var i = 0; i < temps.length; i++) {
						let info = {};
						info.type = temps[i].type;
						info.describes = temps[i].describes;
						info.childs = [];
						info.totalScore = 0;
						if(_this.vipInfo.type == temps[i].type){
							info.currentLevel = _this.vipInfo.grade;
							info.current = 1;
							_this.vipName = temps[i].type;
							_this.vipType = temps[i].type;
						}else if(_this.vipInfo.type > temps[i].type){
							info.currentLevel = info.childs.length;
							info.current = 0;
						}else{
							info.currentLevel = 0;
							info.current = 2;
						}
						if(flag ==  temps[i].type){
							continue;
						}
						flag = temps[i].type;
						for (var j = 0; j < temps.length; j++) {
							if(temps[i].type == temps[j].type){
								let d = {};
								d.name = temps[j].name;
								d.integration = temps[j].integration;
								info.totalScore += temps[j].integration;
								if(_this.nextMember.id == temps[j].id){
									let tData = ((this.curIntegration-_this.vipInfo.integration)/ (temps[j].integration-_this.vipInfo.integration))*100;
									d.showPercent = true;
									d.percent = tData;
								}
								info.childs.push(d);
							}
						}
						tempLst.push(info);
					}
					console.log(tempLst);
					_this.members = tempLst;
					_this.vipDescribes = _this.members[0].describes;
					if(_this.vipName == ""){
						_this.vipName = _this.members[0].type;
					}
				})
			},
			// 选择会员卡
			chooseVip(res){
				// console.log(res);
				this.chooseVipId=res.id,
				this.vipName=res.synopsis;
				this.vipDescribes=res.describes;
			},
			changeType(memberType){
				switch(memberType){
					case '0':
					return "月";
					case '1':
					return "季";
					case '2':
					return "半年";
					case '3':
					return "年";
				}
			},
			//我的会员
			async myVips(){
				let _this = this;
				 await this.$apis.postMyMember({}).then(res=>{
						let data = res.data.myMember;
						_this.vipInfo = data;
						_this.nextMember = res.data.nextMember;
						_this.currentIndex = data.type-1;
				})
			},
			//购买vip
			buyVipFn(){
				let _this = this;
				this.$apis.postBuyMember(_this.chooseVipId).then(res=>{
					let data =res.data;
					if(data){
						let paydata = {
							provider: 'wxpay',
							timeStamp: data.timeStamp+'',
							nonceStr: data.nonceStr,
							package: data.package,
							signType: data.signType,
							paySign: data.paySign
						}
						uni.requestPayment({
							...paydata,
							success: function(res) {
								uni.showModal({
									title: '支付成功',
									content: '恭喜哦，你已成功成为会员用户',
									showCancel:false,
									confirmText:'完成',
									success: function (res) {
										if (res.confirm) {
											_this.initData()
											uni.switchTab({  
												url: '/pages/tabBar/user'  
											});
										} 
										else if (res.cancel) {
											_this.initData()
											// console.log('用户点击取消');
										}
									}
								});
							},
							fail: function(err) {
								console.log(err);
							}
						})
					}
					
				}).catch(err=>{
					console.log(err)
				})
			},
			handlerChange(event){
				this.vipDescribes = this.members[event.detail.current].describes;
				this.vipName = this.members[event.detail.current].type;
				this.vipType = event.detail.current+1;
			},
			initData(){
				this.getUser();
				
				this.myVips();

				this.getVips();
			}
		},
		onLoad(options){
			this.initData()
			if(options.integration){
				this.curIntegration = options.integration
			}		
		}
	}
</script>

<style lang="scss">
@import "../../common/globel.scss";
.m-myvip-page{
	.m-header{
		width: 100%;
		// background: url("../../static/img/me_bg_top.png") no-repeat top left;
		// background-size: 100% 350upx;
		padding:45upx 0upx;
		// margin-bottom: 20upx;
		// padding-bottom: 55upx;
		background-color:#FFFAF0;
		// box-shadow: 0px 10px 10px #FFFAF0;
		.m-card-A{
			background: url("https://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/bg1.png") no-repeat top left;
		}
		.m-card-B{
			background: url("https://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/bg2.png") no-repeat top left;
		}
		.m-card-C{
			color: 	#6495ED;
			background: url("https://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/bg3.png") no-repeat top left;
		}
		.m-card-D{
			background: url("https://dongyaoxiaoxiaochegnxu.oss-cn-beijing.aliyuncs.com/bg4.png") no-repeat top left;
		}
		.m-card{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding:60upx 30upx;
			width:90%;
			background-size: cover;
			font-size: 18upx;
			height: 270upx;
		}
	}
	.m-user-box{
		// background: #4e4e4e;
		margin: 0 30upx;
		// padding-bottom: 58upx;
		border-radius: 10upx;
		box-shadow:0upx 2upx 20upx rgba(0,0,0,0.3);
		.m-container{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.m-user{
				display:flex;
				padding: 48upx 30upx 56upx;
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
					align-items: right;
					.m-username{
						margin-right: 10upx;
					}
				}
			}
			.m-date{
				padding-right: 30upx;
				text-align: right;
				.m-text{
					font-size: $fontsize-6;
					color:#dcbc8d;
				}
				.m-time{
					font-size: $fontsize-8;
					color:#dcbc8d;
				}
			}
		}
		
		.m-footer{
			padding:0 30upx;
			padding-bottom: 58upx;
			.m-title{
				color:#dbbb8d;
				font-weight: bold;
				font-size: 34upx;
			}
			.m-describe{
				font-size: $fontsize-6;
				color:#fff;
				display: flex;
				flex-direction: row;
				align-items: center;
				
			}
		}
	}
	.m-main{
		padding:30upx 30upx;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		margin-top: -10upx;
		box-shadow:0px -3px 3px #D3D3D3;
		.m-button{
			background: #635749;
			color:#faf1cc;
			font-size: $fontsize-2;
			text-align: center;
			border-radius: 50upx;
			height: 100upx;
			line-height: 100upx;
			// margin-top: 30upx;
		}
		.m-card-describe{
			// margin-top: 30upx;
			padding-bottom: 100upx;
			.m-title{
				// margin-top: 58upx;
				color:#303030;
				font-size:36upx;
				// display: inline-block;
				display: flex;
				align-items: flex-start;
				// justify-content: space-around;
				height: 88upx;
				line-height: 88upx;
				font-weight: 600;
				width: 100%;
				// border-bottom:#303030 1upx solid;
				// .line{
				// 	height: 1px;
				// 	background:$color-border3;
				// 	width: 200upx;
				// }
			}
			.m-content{
				color:$color-5;
				font-size: $fontsize-5;
				.m-name{
					font-size:32upx;
					color:#474747;
					font-weight:600;
					padding:25rpx 0rpx;

				}
				.m-describes{
					font-size: 28upx;
					color: #303030;
					padding-left:50rpx;
				}
			}
			.m-list{
				position: relative;
				padding-left: 30upx;
				margin-top: 30upx;
				color:$color-5;
				font-size: $fontsize-5;
				&:before{
					content: "";
					display: block;
					width:10upx;
					height: 10upx;
					background:#ddb46f;
					position: absolute;
					left: 0;
					top: 10upx;
					
				}
			}
		}
	}
}
</style>
