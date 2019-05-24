<template>
	<view class="m-myvip-page">
		<view class="m-header">
			<view class="m-user-box">
				<view class="m-container">
					<view class="m-user">
						<view class="m-img">
							<image style="width:100%;height:100%" :src="userData.avatarUrl" mode="aspectFit"></image>
						</view>
						<view class="m-text">
							<view class="m-username">
								{{userData.nickName}}
							</view>
						</view>
					</view>
					<view v-if="isVip" class="m-date">
						<view class="m-text">
							续费>
						</view>
						<view class="m-time">
							{{myMember.dueTime}}到期
						</view>
					</view>
				</view>
				<view v-if="isVip" class="m-footer">
					<view class="m-title">
						{{myMember.memberType}}{{myMember.discount}}卡
					</view>
					<view class="m-describe">
						<image style="width:59upx;height:59upx;margin-right: 10upx;" src="../../../static/img/icon/me_icon_VIP.png" mode="aspectFit"></image>
						{{myMember.memberSynopsis}}
					</view>
				</view>
			</view>
		</view>
		<view class="m-main">
			<m-title title="VIP折扣卡" label="会员权益 >" @titleHandle="vipDetails"></m-title>
			<view v-for="(item,index) in members" :key="index" style="padding-bottom: 30upx">
				<m-vip-card @chooseVip="chooseVip" :describes="item.describes" :chooseVipId="chooseVipId" :id="item.id" :state="item.type"  :synopsis="item.synopsis" :price="item.price" ></m-vip-card>
			</view>
			<view class="m-button" @tap="buyVipFn">立即续费/购买</view>
			<view class="m-card-describe">
				<view class="m-title">
					<view class="line"></view>月卡介绍<view class="line"></view>
				</view>
				<view class="m-content">
					<view class="m-list">
						{{vipDescribes}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import mTitle from '@/components/m-title'
	import mVipCard from '@/components/m-vip-card'
	export default {
		components: {
			mTitle,
			mVipCard
		},
		data() {
			return {
				chooseVipId:0,
				isVip:false,//是否为会员
				myMember:{
					nickName:'',
					dueTime:'',
					memberType:'',
					discount:'',
					memberSynopsis:''
				},
				members:[],
				userData:{},
				vipDescribes:"" //会员卡权益
			};
		},
		methods:{
			getUser(){
				this.userData = JSON.parse(uni.getStorageSync('userData'));
			},
			// 会员列表
			getVips(){
				let _this = this;
				this.mPost("/server/m/members",{}).then(res=>{
					if(res.code==1){
						_this.members=res.data.members
					}
				})
			},
			// 选择会员卡
			chooseVip(res){
				console.log('选择会员卡'+res);
				this.chooseVipId=res.id,
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
			myVips(){
				let _this = this;
				this.mPost("/server/m/myMember",{}).then(res=>{
					if(res.code==1){
						let data = res.data.myMember;
						if(data){
							// 会员
							_this.isVip = true
							if(data&&data['memberType']){
								data['memberType']= _this.changeType(data['memberType']);
							}
							if(data&&data['discount']){
								data['discount']=_this.accMul(data['discount'],10)+'折'
							}
							_this.myMember=data;
							
						}else{
							// 非会员
							_this.isVip = false
						}
					}
				})
			},
			//购买vip
			buyVipFn(){
				let _this = this;
				this.mPost("/server/m/buyMember",_this.chooseVipId).then(res=>{
					console.log(res);
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
// 											uni.setStorageSync('orderTab', 1);
// 											uni.switchTab({  
// 												url: '/pages/tabBar/order'  
// 											});
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
			initData(){
				this.getUser();
				this.getVips();
				this.myVips();
			}
		},
		onLoad(options){
			this.initData()
		}
	}
</script>

<style lang="scss">
@import "../../../common/globel.scss";
.m-myvip-page{
	.m-header{
		width: 100%;
		background: url("../../../static/img/me_bg_top.png") no-repeat top left;
		background-size: 100% 350upx;
		padding-top: 40upx;
		margin-bottom: 20upx;
	}
	.m-user-box{
		background: #4e4e4e;
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
					align-items: center;
					.m-username{
						margin-right: 10upx;
					}
				}
			}
			.m-date{
				padding-right: 30upx;
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
		.m-button{
			background: #635749;
			color:#faf1cc;
			font-size: $fontsize-2;
			text-align: center;
			border-radius: 50upx;
			height: 100upx;
			line-height: 100upx;
			margin-top: 30upx;
		}
		.m-card-describe{
			margin-top: 30upx;
			padding-bottom: 100upx;
			.m-title{
				margin-top: 58upx;
				color:$color-5;
				font-size: $fontsize-2;
				text-align: center;
				// display: inline-block;
				display: flex;
				align-items: center;
				justify-content: space-around;
				height: 88upx;
				line-height: 88upx;
				color:$color-5;
				font-size: $fontsize-5;
				.line{
					height: 1px;
					background:$color-border3;
					width: 200upx;
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
