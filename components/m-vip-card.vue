<template>
	<view class="m-vip-card">
		<view class="m-content">
			<view class="m-left">
				<view class="m-title">
					<view class="name">
						<slot name="name"></slot>
					</view>
					<view class="label">
						<slot name="label"></slot>
					</view>
				</view>
				<view class="m-describe">
					<slot name="describe"></slot>
				</view>
			</view>
			<view class="m-right">
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-vip-card",
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
.m-vip-card{
	width: 695upx;
	height: 166upx;
	margin:0 auto;
	border-radius: 15upx;
	position: relative;
	&::before{
		display: block;
		content: "";
		width: 695upx;
		height: 166upx;
		background: #4e4e4e;
		margin:0 auto;
		border-radius: 15upx;
		position: absolute;
		left:0;
		top:0;
		z-index: 3;
	}
	&::after{
		display: block;
		content: "";
		height: 166upx;
		background: #977a58;
		margin:0 auto;
		border-radius: 15upx;
		position: absolute;
		left:10upx;
		right: 0;
		top:-10upx;
		z-index: 0;
		box-shadow: 0upx 20upx 30upx rgba(78,78,78,0.7);
	}
	.m-content{
		position: relative;
		z-index: 5;
		padding:10upx;
		padding-left: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height:100%;
		box-sizing: border-box;
		.m-title{
			display: flex;
			flex-direction: row;
			color:#dbbb8d;
			align-items: center;
			.name{
				font-size: 32upx;
			}
			.label{
				font-size: 22upx;
			}
		}
		.m-describe{
			margin-top: 5upx;
			font-size: 22upx;
			color:#fff;
		}
		.m-right{
			text-align: right;
			font-size: 22upx;
			color:#dcbc8d;
		}
	}
	
}
</style>
