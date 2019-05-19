<template>
	<view class="m-login-page">
		<view class="m-img-box">
			东尧蔬菜登录
		</view>

		<view class="">
			<!-- #ifdef MP-WEIXIN -->  
			<button style="margin-top:20upx;" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信手机号快捷登录</button>
			<!-- <button type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">允许</button> -->
			<button @tap="goback" style="margin-top: 20upx;">取消</button>
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
			// 返回
			goback(){
				let pageIndex= getCurrentPages()-2;
				uni.navigateBack({
					delta:pageIndex
				})
			},
		
			//手机号储存
			getPhoneNumber: function(e) {   
				let _this = this;
			    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {  
			    } else {  
					_this.mPost('/auth/wxBindPhone',{// 	储存用户信息
						...e.detail
					},"https://dy.gantangerbus.com/da").then(res=>{
						if(res.code=1){
							uni.setStorageSync('phone', res.data.phone);
							uni.showToast({
									title:"已授权",
							})
							_this.goback()
						}else{
							uni.showToast({
								title:  res.message,
								icon: "none"
							});
						}

					}).catch(err=>{

					});
			    }  
			}
		},
		onLoad(){
			
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
