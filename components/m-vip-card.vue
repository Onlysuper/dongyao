<template>
	<view class="m-vip-page">
		<view class="m-img-box">
			<image v-if="state=='0'" style="height:100upx;width:100upx;" src="../../../static/img/icon/member_icon_月卡.png" mode=""></image>
			<image v-if="state=='1'" style="height:100upx;width:100upx;" src="../../../static/img/icon/member_icon_季卡.png" mode=""></image>
			<image v-if="state=='2'" style="height:100upx;width:100upx;" src="../../../static/img/icon/member_icon_半年卡.png" mode=""></image>
			<image v-if="state=='3'" style="height:100upx;width:100upx;" src="../../../static/img/icon/member_icon_年卡.png" mode=""></image>
		</view>
		<view class="m-text-box">
			<view class="m-text">
				{{synopsis}}
			</view>
			<view class="m-price">
				￥{{price}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-vip-page",
		props:{
			state:{
				type:String,
				value:"",
			},
			synopsis:{
				type:String,
				value:"",
			},
			price:{
				type:String,
				value:"",
			}
		},
		data() {
			return {
				// describeVisible:false
			};
		},
		methods:{
			titleHandle(){
				// this.$emit("titleHandle")
			}
		}
	}
</script>

<style lang="scss">
@import "../common/globel.scss";
.m-vip-page{
	background:#fff;
	border-radius: 10upx;
	box-shadow: 0 0 10upx rgba(0,0,0,0.1);
	padding:30upx;
	display: flex;
	// justify-content: center;
	align-items: center;
	.m-text-box{
		margin-left: 20upx;
		color:#4f3a18;
		font-size: $fontsize-2;
		.m-text{
			// font-size: $fontsize-2;
		}
		.m-price{
			
		}
	}
	
}
</style>
