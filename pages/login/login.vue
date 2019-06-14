<template>
	<view class="m-login-page">
		<view class="m-img-box">
			千畦优品
		</view>
		<view class="describe">
			您暂未授权'千畦优品'小程序获取你的信息，讲无法正常使用小程序的功能。
			如果需要正常使用，请点击"授权"按钮，打开头像，昵称等信息的权限
		</view>
		<view class="m-but">
			<!-- #ifdef MP-WEIXIN -->  
			<button :disabled="!needAllow" type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">授权</button>
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
				isCanUse: uni.getStorageSync('isCanUse')||true,//默认为true
				needAllow:true //是否需要授权
			};
		},
		methods:{
			//注册
			register(){
				uni.switchTab({  
				    url: '/pages/login/register'  
				});  
			},
			async saveCode() {
			    let _this = this;
			    uni.showLoading({
			        title: '登录中...'
			    });
			   // 1.wx获取登录用户code
			    await uni.login({
			        provider: 'weixin',
			        success: function(loginRes) {
			            let code = loginRes.code;
						//存储登录code
						_this.$apis.postWxLogin(code).then(res=>{
							if(res.data){
								let data = res.data;
								uni.setStorageSync('Authorization', data.authToken);
								if(data.isRegister){
									let saveData = data;
									_this.needAllow=false;
									// 	储存用户信息
									// saveData.avatarUrl=data.headAddress||"";
									uni.setStorageSync('userData', JSON.stringify(saveData.userInfo));
									uni.setStorageSync('phone',  saveData.userInfo.mobile);
									uni.showToast({
										title: "授权成功",
										icon: "none"
									});
									setTimeout(()=>{
										uni.switchTab({  
											url: '/pages/tabBar/home'  
										});
									},1000)
								}
							}
						})
			        },
			    });
			},
			//第一授权获取用户信息===》按钮触发
			
			getuserinfo:function(res){
				if(!uni.getStorageSync('Authorization')){
					this.saveCode();
				}
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
						_this.$apis.postWxUserInfo(infoRes.userInfo).then(res=>{
							uni.navigateTo({  
								url: '/pages/login/register'  
							}); 
							uni.hideLoading();
						}).catch(err=>{
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
