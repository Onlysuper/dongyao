<template>
	<view class="m-vip-page" @tap="chooseVip" :class="{actived:(chooseVipId==id)}">
		<view class="m-img-box">
			<image v-if="state=='0'" style="height:100upx;width:100upx;" src="/static/img/icon/member_icon_月卡.png" mode=""></image>
			<image v-if="state=='1'" style="height:100upx;width:100upx;" src="/static/img/icon/member_icon_季卡.png" mode=""></image>
			<image v-if="state=='2'" style="height:100upx;width:100upx;" src="/static/img/icon/member_icon_半年卡.png" mode=""></image>
			<image v-if="state=='3'" style="height:100upx;width:100upx;" src="/static/img/icon/member_icon_年卡.png" mode=""></image>
		</view>
		<view class="m-text-box">
			<view class="m-text">
				{{synopsis}}
			</view>
			<view class="m-price">
				￥{{price}}
			</view>
			<!-- <view > -->
			<image v-if="(chooseVipId==id)" class="icon"  style="height:58upx;width:58upx;" src="../../../static/img/icon/member_icon_ok.png" mode=""></image>
			<!-- </view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-vip-page",
		props:{
			id:{
				type:String,
				value:"",
			},
			chooseVipId:{
				type:String,
				value:"",
			},
			describes:{
				type:String,
				value:"",
			},
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
			chooseVip(){
				this.$emit('chooseVip',{id:this.id,describes:this.describes,synopsis:this.synopsis})
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
	padding:50upx 30upx;
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
	&.actived{
		background:#fdebc5;
		position: relative;
		overflow: hidden;
		.icon{
			content: "";
			display: block;
			position: absolute;
			right: 0;bottom: 0;
			// background:url();
			// width: 50upx;
			// height: 90upx;
		}
	}
}
</style>
