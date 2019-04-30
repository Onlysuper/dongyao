<template>
	<view class="m-login-page">
		<view class="m-img-box">
			东尧蔬菜
		</view>
		<view class="">
			<button class='m-but' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
				授权登录
			</button>
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
			 loginFn() {
			    let _this = this;
			    uni.showLoading({
			        title: '登录中...'
			    });
			   // 1.wx获取登录用户code
			    uni.login({
			        provider: 'weixin',
			        success: function(loginRes) {
			            let code = loginRes.code;
						uni.showToast({
							title: code,
							icon: "none"
						});
						_this.mPost('/auth/wxLogin',{
							code:code
						}).then(res=>{
							uni.showToast({
									title:JSON.stringify(res)
							})
							// if(res.code=1){
								if(res.data){
									let data = res.data;
									uni.setStorageSync('authToken', data.authToken);
									uni.showToast({
										title:  'authToken'+uni.getStorageSync('authToken'),
										icon: "none"
									});
								}
							// }
							uni.hideLoading();
						}).catch(err=>{
							console.log(err);
							uni.hideLoading();
						});
			        },
			    });
			},
			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo:function(res){
				let _this = this;
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}
				uni.getUserInfo({
			        provider: 'weixin',
			        success: function(infoRes) {
			            let nickName = infoRes.userInfo.nickName; //昵称
			            let avatarUrl = infoRes.userInfo.avatarUrl; //头像
						uni.showToast({
							title: nickName,
							icon: "none"
						});
			            try {
			                uni.setStorageSync('isCanUse', false);//记录是否第一次授权  false:表示不是第一次授权
			                _this.updateUserInfo();
			            } catch (e) {}
			        },
			        fail(res) {}
			    });
			},
			 //向后台更新信息
			updateUserInfo() {
			}
		},
		onLoad(){
			this.loginFn()
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
