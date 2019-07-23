<template>
	<view>
		 <view class="m-address-main">
            <form @submit="formSubmit" @reset="formReset">
                <view class="m-row">
                    <view class="m-title">收件人</view>
                    <view class="m-input">
                        <input class="uni-inpu" name="name" :value="name" placeholder="请输入收件人姓名" />
                    </view>
                </view>
				<view class="m-row">
				    <view class="m-title">手机号</view>
				    <view class="m-input">
				        <input class="uni-input" name="mobile" :value="mobile"  placeholder="请输入收件人手机号" />
				    </view>
				</view>
				<view class="m-row">
				    <view class="m-title">收件地址</view>
				    <view class="m-input">
				        <input class="uni-input" name="address" :value="address" placeholder="请输入收件地址" />
				    </view>
				</view>
				<view class="m-row-htn">
					<button formType="submit" class="m-save">保存</button>
					<button v-if="id" type="default" class="m-del" @tap="delAddress">删除</button>
				</view>
            </form>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:undefined,
				name:"",
				mobile:undefined,
				address:""
			}
		},
		methods: {
			formSubmit(event){
				debugger;
				let data = event.detail.value;
				if(data && data.name == "" && data.mobile == "" &&  data.address == ""){
					uni.showToast({
						icon:'none',
						title: '请正确填写收货信息!',
						duration: 2000
					});
					return;
				}
				if(this.id){
					data.id = this.id;
					this.$apis.postEditAddress(
						data
					).then(res=>{
						uni.showToast({
							title: '修改成功',
							icon: 'none',
							duration: 2000
						});
						uni.navigateTo({
							url:"/pages/address/list"
						})
					}).catch(error=>{
					})
				}else{
					this.$apis.postSaveAddress(
						data
					).then(res=>{
						uni.showToast({
							title: '保存成功',
							icon: 'none',
							duration: 2000
						});
						uni.navigateTo({
							url:"/pages/address/list"
						})
					}).catch(error=>{
					})
				}
			},
			delAddress(){
				this.$apis.postDelAddress({
					"id":this.id
					}).then(res=>{
					uni.showToast({
						title: '删除成功',
						icon: 'none',
						duration: 2000
					});
					uni.navigateTo({
						url:"/pages/address/list"
					})
				}).catch(error=>{
				})
			}
			
		},
		onLoad(option) {
			if(option){
				let adUrlData = decodeURI(option.adUrlData);
				let temp = JSON.parse(adUrlData);
				this.id = temp.id;
				this.name = temp.name;
				this.mobile = temp.mobile;
				this.address = temp.address;
			}
			
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
			flex-grow: 0.3;
		}
		.m-input{
			flex-grow: 1;
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
