<template>
	<!-- 首页门店图文 -->
	<view class="m-groupbuy-list">
		<view class="m-img">
			<image style="width: 100%;height: 100%;" :src="rowData.img" mode="aspectFit"></image>
		</view>
		<view class="m-text">
			<view class="m-title">
				{{rowData.title}}
			</view>
			<view class="m-describe">
				{{rowData.describe}}
			</view>
			<view class="m-price">
				{{rowData.price}}
			</view>
			<view class="m-oldprice">
				非会员价{{rowData.oldprice}}
			</view>
		</view>
		<view class="m-addition">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-groupbuy-list",
		props:{
			rowData:{
				type:Object,
				 // 对象或数组默认值必须从一个工厂函数获取
				default: function () {
					return { 
						img:"",
						title:"",
						distance:"",
						describel:"",
						address:"",
					}
				}
			},
			tips:{
				type:Array,
				default:function () {
					return []
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.m-groupbuy-list{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	padding:40upx 20upx 40upx 40upx;
	border-bottom: 1px solid #ebebeb;
	&:last-of-type{
		border: 0px;
	}
	.m-img{
		flex: 0 0 150upx;
		height: 150upx;
		background: #f5f5f5;
		border-radius: 100%;
		overflow: hidden;
	}
	.m-text{
		flex:1;
		padding: 0 20upx;
		.m-title{
			font-size: 32upx;
			color:#333333;
		}
		.m-describe{
			font-size: 24upx;
			// margin-top: 10upx;
			color:#808080;
		}
		.m-price{
			color:#ff582b;
			font-size: 26upx;
			margin-top:10upx;
		}
		.m-oldprice{
			color:#999;
			font-size: 18upx;
		}
	}
}
</style>
