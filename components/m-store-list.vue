<template>
	<!-- 首页门店图文 -->
	<view class="m-store-list-box">
		<view class="m-img">
			<image style="width: 100%;height: 100%;" :src="img" mode="aspectFit"></image>
		</view>
		<view class="m-text">
			<view class="m-title">
				{{title}}
			</view>
			<view class="m-address">
				{{address}}
			</view>
		</view>
		<view class="m-distence">
			{{fencingRange}}km
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-store-list",
		props:{
			img:{
				type:String,
				default:"",
			},
			title:{
				type:String,
				default:"",
			},
			address:{
				type:String,
				default:"",
			},
			fencingRange:{
				type:String,
				default:""
			},
// 			rowData:{
// 				type:Object,
// 				 // 对象或数组默认值必须从一个工厂函数获取
// 				default: function () {
// 					return { 
// 						img:"",
// 						title:"",
// 						distance:"",
// 						describel:"",
// 						address:"",
// 					}
// 				}
// 			},
// 			tips:{
// 				type:Array,
// 				default:function () {
// 					return []
// 				}
// 			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.m-store-list-box{
	display: flex;
	flex-direction: row;
	// width: 100%;
	justify-content:space-between;
	align-items: center;
	margin-left: 20upx;
	margin-right: 20upx;
	padding: 40upx 0;
	.m-img{
		flex: 0 0 120upx;
		height: 120upx;
		background: #eee;
	}
	.m-text{
		flex:1;
		padding: 0 20upx;
		.m-title{
			font-size: 32upx;
			color:#333333;
		}
		.m-address{
			font-size: 24upx;
			margin-top: 10upx;
			color:#808080;
		}
	}
	.m-distence{
		flex: 0 1 100upx;
		color:#b2b2b2;
		font-size: 20upx;
		text-align: right
	}
}
</style>
