<template>
	<view class="m-login-page">
		<view class="m-img-box">
			东尧蔬菜
		</view>
		<view class="">
			<!-- #ifdef MP-WEIXIN -->  
			<button @click="register" >登录/注册</button>
			
			<button style="margin-top:20upx;" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信手机号快捷登录</button>  
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
				uni.navigateTo({  
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
							if(res.code==1){
								if(res.data){
									let data = res.data;
									uni.setStorageSync('Authorization', data.authToken);
								}
							}else{
								uni.showToast({
									title:  res.message,
									icon: "none"
								});
							}
							// uni.hideLoading();
						}).catch(err=>{
							// uni.hideLoading();
						});
			        },
			    });
			},
			getPhoneNumber: function(e) {   
				let _this = this;
			    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {  
			    } else {  
					_this.mPost('/auth/wxBindPhone',{// 	储存用户信息
						...e.detail
					},"https://dy.gantangerbus.com/da").then(res=>{
						if(res.code=1){
							uni.showToast({
									title:"已授权"
							})
						}else{
							uni.showToast({
								title:  res.message,
								icon: "none"
							});
						}
						uni.hideLoading();
					}).catch(err=>{
						uni.hideLoading();
					});
			    }  
			}
		},
		onLoad(){
			this.saveCode()
		}
	}
</script>

<style lang="scss">
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
	
}
</style>
