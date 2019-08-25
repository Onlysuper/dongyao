<template>
	<view>
		 <view class="m-address-main">
            <form @submit="formSubmit" @reset="formReset">
                <view class="m-row">
                    <view class="m-title">姓名</view>
                    <view class="m-input">
                        <input class="uni-inpu" name="realName" :value="realName" placeholder="姓名" />
                    </view>
                </view>
				<view class="m-row">
				    <view class="m-title">昵称</view>
				    <view class="m-input">
				        <input class="uni-input" name="nickname" :value="nickname" placeholder="昵称" />
				    </view>
				</view>
				<view class="m-row">
				    <view class="m-title">性别</view>
				    <view class="m-input">
						<radio-group @change="radioChange" class="m-sex">
							<radio value="0" name="sex" :checked="sex_man" /><view class="m-sex-man">男</view>
							<radio value="1" name="sex" :checked="sex_woman"/><view class="m-sex-woman">女</view>
						 </radio-group>
				    </view>
				</view>
				<view class="m-row">
				    <view class="m-title">出生年月</view>
				    <view class="m-input">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
				    </view>
				</view>
				<view class="m-row-htn">
					<button formType="submit" class="m-save">保存</button>
				</view>
            </form>
        </view>
	</view>
</template>

<script>
	export default {
		 data: function () {
			 const currentDate = this.getDate({
				format: true
			})
			return {
				title: 'picker',
				date: currentDate,
				id:undefined,
				realName:"",
				nickname:"",
				sex:undefined,
				sex_man:false,
				sex_woman:false
			}
		},
		 computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.target.value
			},		
				
			//获取用户信息
			getUserInfo(){
				let _this = this;
				this.$apis.postGetUserInfo({
				}).then(res=>{
					if(res.code == 1){
						_this.id = res.data.id;
						_this.realName = res.data.realName;
						_this.nickname = res.data.nickname;
						if(res.data.birthday){
							_this.date = res.data.birthday;
						}
						if(res.data.sex == 1){
							_this.sex_man = true;
						}else{
							_this.sex_woman = true;
						}
						
					}
				})
			},
			formSubmit(event){
				let data = event.detail.value;
				if(this.id){
					data.id = this.id;
					data.birthday = this.date;
					this.$apis.postEditUser(
						data
					).then(res=>{
						uni.showToast({
							title: '编辑成功',
							icon: 'none',
							duration: 2000
						});
						uni.switchTab({
							url: '/pages/tabBar/user'  
						});  
					}).catch(error=>{
						uni.showToast({
							title: '编辑失败',
							icon: 'none',
							duration: 2000
						});
					})
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			radioChange: function(evt) {
				console.log(evt.target.value);
			}
		},
		onLoad() {
			this.getUserInfo();
		}
	}
</script>

<style lang="scss">
@import "../../common/globel.scss";
.m-address-main{
	padding: 20px;
	display: flex;
	flex-direction: column;
	color: $color-5;
	font-size: $fontsize-3;
	.m-row{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1upx solid #CCC;
		padding:25rpx 0rpx;
		margin-top:25rpx;
		.m-title{
			width: 30%;
		}
		.m-input{
			flex-grow: 1;
		}
		.m-sex{
			display: flex;
			justify-content: flex-start;
			.m-sex-man{
				margin-left: 5upx;
				margin-right: 20upx
			}
			.m-sex-woman{
				margin-left: 5upx;
			}
		}
	}
	
	.m-row-htn{
		.m-save{
			width: 100%;
			background-color: #66cc66;
			margin-top: 25px;
			color: white;
		}
		.m-del{
			width: 100%;
			margin-top: 25px;
		}
	}
}

</style>
