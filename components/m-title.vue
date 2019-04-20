<template>
	<view class="m-title-box">
		<view class="m-title">
			{{title}}
		</view>
		<view class="m-right" @click="titleHandle">
			<!-- <image style="width:30upx;height:20upx;margin-right:10upx;" src="../../static/img/icon/home_icon_refresh.png" mode="aspectFit"></image> -->
			<slot></slot>
		 <!-- <slot name="lefticon"></slot> -->
			<view :style="{color:labelColor?labelColor:'#999999'}">
				{{label}}
			</view>
			 <!-- <slot name="righticon"></slot> -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-title",
		props:{
			title:{
				type:String,
				value:"",
			},
			label:{
				type:String,
				value:"",
			},
			labelColor:{
				type:String,
				value:"",
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			titleHandle(){
				this.$emit("titleHandle")
			}
		}
	}
</script>

<style lang="scss">
.m-title-box{
	padding: 20upx 20upx;
	display: flex;
	justify-content: space-between;
	.m-title{
		color:#333333;
		font-size: 32upx;
	}
	.m-right{
		display: flex;
		flex-direction: row;
		font-size: 24upx;
		color:#666;
		cursor: pointer;
		justify-content: center;
		align-items: center;
	}
}
</style>
