<template>
	<!-- 首页产品图文 -->
	<view class="m-pro-item">
		<view class="m-img" @tap="handleFn">
			<image style="width: 100%;height: 100%;" :src="rowData.pictureUrl" mode="aspectFit"></image>
		</view>
		<view class="m-pro">
			<view class="m-title">
				{{rowData.synopsis}}
			</view>
			<view class="m-price">
				<view class="new">{{rowData.presentPrice}}</view>
				<view class="old">{{rowData.originalPrice}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:"m-home-pro",
		props:{
			rowData:{
				type:Object,
				 // 对象或数组默认值必须从一个工厂函数获取
				default: function () {
					return { 
						img:"",
						describel:"",
						price:"",
						oldPrice:""
					}
				}
			}
		},
		data() {
			return {};
		},
		methods:{
			handleFn(data){
				this.$emit("handleFn",this.rowData)
			}
		}
	}
</script>

<style lang="scss">
@import "../common/globel.scss";
.m-pro-item{
	flex-direction: column;
	margin-left: 10upx;
	// margin-right: 8upx;
	margin-bottom: 30upx;
	// box-shadow: 0px 1px 3px rgba(0,0,0,0.2);
	padding: 20upx;
	box-sizing: border-box;
	border-radius: 10upx;
	flex:0 0 225upx;
	margin-top: 2px;
	box-sizing: border-box;
	position: relative;
	border-radius: 30upx;
	::before{
		content: "";
		display: block;
		position: absolute;
		left:0px;
		right: 2px;
		top: 1px;
		bottom: 1px;
		box-sizing: border-box;
		box-shadow: 0px 1px 3px rgba(241,241,241,0.6);
		z-index: -1;
		border-radius: 12upx;
	}
	
	&:last-of-type{
		// background:red;
		margin-right: 3px;
		flex:0 0 218upx;
	}
	&:last-of-type::after{
		// right: 3px !important;
	}
	&:active{
		background:$color-hover
	}
	.m-img{
		box-sizing: border-box;
		flex:0 0 170upx;
		height: 170upx;
		// background:#eee;
	}
	.m-title{
		font-size: $fontsize-9;
		// font-size: 20upx;
		color:#4c4c4c;
		margin-top: 20upx;
		overflow: hidden;
	  text-overflow: ellipsis;
	  display: -webkit-box;
	  -webkit-line-clamp: 2;
	  -webkit-box-orient: vertical;
	}
	.m-price{
		display: flex;
		margin-top: 10upx;
		justify-content: flex-start;
		align-items: center;
		.new{
			font-size: 26upx;
			font-weight: bold;
			color: #ff582b;
		}
		.old{
			font-size: 18upx;
			margin-left: 10upx;
			color:#b2b2b2;
			text-decoration: line-through
		}
	}
	// position: 
}
</style>
