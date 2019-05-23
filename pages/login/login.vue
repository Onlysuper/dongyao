<template>
	<view class="m-login-page">
		<view class="m-img-box">
			东尧蔬菜
		</view>
		<view class="describe">
			您暂未授权'东尧蔬菜'小程序获取你的信息，讲无法正常使用小程序的功能。
			如果需要正常使用，请点击"授权"按钮，打开头像，昵称等信息的权限
		</view>
		<view class="m-but">
			<!-- #ifdef MP-WEIXIN -->  
			<button type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">授权</button>
			<!-- <button @tap="goback" style="margin-top: 20upx;">取消</button> -->
			<!-- #endif -->  
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				SessionKey: '',
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				isCanUse: uni.getStorageSync('isCanUse')||true//默认为true
			};
		},
		methods:{
			//注册
			register(){
				uni.switchTab({  
				    url: '/pages/login/register'  
				});  
			},
			// 
			 saveCode() {
			    let _this = this;
// 			    uni.showLoading({
// 			        title: '登录中...'
// 			    });
			   // 1.wx获取登录用户code
			    uni.login({
			        provider: 'weixin',
			        success: function(loginRes) {
			            let code = loginRes.code;
						//存储登录code
						_this.mPost('/auth/wxLogin',code,"https://dy.gantangerbus.com/da"
						).then(res=>{
							if(res.data){
								let data = res.data;
								uni.setStorageSync('Authorization', data.authToken);
							}
							uni.hideLoading();
						}).catch(err=>{
							uni.hideLoading();
						});
			        },
			    });
			},
			//第一授权获取用户信息===》按钮触发
			getuserinfo:function(res){
				let _this = this;
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}
				uni.showLoading({});
				uni.getUserInfo({
			        provider: 'weixin',
			        success: function(infoRes) {
						// 	储存用户信息
						uni.setStorageSync('userData', JSON.stringify(infoRes.userInfo));
						uni.showLoading({});
						_this.mPost('/auth/wxUserInfo',infoRes.userInfo,"https://dy.gantangerbus.com/da").then(res=>{
							uni.navigateTo({  
								url: '/pages/login/register'  
							}); 
							uni.hideLoading();
						}).catch(err=>{
							console.log(err);
							uni.hideLoading();
						});
						
			        },
			        fail(res) {
						uni.hideLoading();
					}
			    });
			}
		},
		onLoad(){
			this.saveCode()
		}
	}
</script>

<style lang="scss">
@import "../../common/globel.scss";
.m-login-page{
	padding:  30upx;
	.m-img-box{
		margin-top: 200upx;
		height: 200upx;
		text-align: center;
	}
	.m-but{
		background: rgb(68, 183, 141);
		margin-top: 30upx;
	}
	.describe{
		color:$color-5;
		font-size: $fontsize-4;
		padding: 20upx;
	}
	
}
</style>
