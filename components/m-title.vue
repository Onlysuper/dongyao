<template>
	<view class="m-title-box">
		<view class="m-title">
			{{title}}
		</view>
		<view class="m-right" @click="titleHandle">
			<slot name="right"></slot>
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
		font-size: 32upx;
	}
	.m-right{
		font-size: 24upx;
		color:#b5b5b5
	}
}
</style>
