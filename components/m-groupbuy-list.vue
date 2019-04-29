<template>
	<!-- 门店列表 -->
	<view class="m-groupbuy-list">
		<view class="m-img">
			<image style="width: 100%;height: 100%;border-radius: 100%;background: #f5f5f5;" :src="rowData.pictureUrl" mode="aspectFit"></image>
			<view v-if="rowData.isAssemble==1" class="m-pin">
				可拼团
			</view>
		</view>
		<view class="m-text">
			<view class="m-title">
				{{rowData.synopsis}}
			</view>
			<view class="m-describe">
				{{rowData.labelName}}
			</view>
			<view class="m-price">
				{{rowData.presentPrice}}
			</view>
			<view class="m-oldprice">
				非会员价{{rowData.originalPrice}}
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
@import "../common/globel.scss";
.m-groupbuy-list{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	padding:40upx 20upx 40upx 40upx;
	// border-bottom: 1px solid #ebebeb;
	&:last-of-type{
		border: 0px;
	}
	.m-img{
		flex: 0 0 150upx;
		height: 150upx;
		overflow: hidden;
		position: relative;
		.m-pin{
			background:#eb5555;
			color:#fff;
			text-align: center;
			position: absolute;
			bottom: 0;
			font-size: $fontsize-7;
			width:100upx;
			left: 50%;
			margin-left:-50upx;
			border-radius: 5upx;
		}
	}
	.m-text{
		flex:1;
		padding: 0 20upx;
		.m-title{
			font-size: $fontsize-9;
			color:#333333;
		}
		.m-describe{
			font-size:$fontsize-5;
			margin-top: 5upx;
			color:#808080;
		}
		.m-price{
			color:#ff582b;
			font-size: $fontsize-4;
			margin-top:10upx;
			font-weight: bold;
		}
		.m-oldprice{
			color:#999;
			font-size: $fontsize-6;
		}
	}
}
</style>
