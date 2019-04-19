<template>
	<view class="m-title-box">
		<view class="m-title">
			{{title}}
		</view>
		<view class="m-right" @click="titleHandle">
			<slot name='leftIcon'></slot>
			<view :style="{color:labelColor?labelColor:'#999999'}">
				{{label}}
			</view>
			<slot name='rightIcon'></slot>
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
	padding: 30upx 4%;
	/* width:100%; */
	display: flex;
	justify-content: space-between;
	.m-title{
		color:#333333;
		font-size: 32upx;
	}
	.m-right{
		display: flex;
		font-size: 24upx;
		color:#666;
		cursor: pointer;
		justify-content: center;
		align-items: center;
	}
}
</style>
