<template>
	<!-- 首页门店图文 -->
	<view @tap='handleFn' class="m-store-item">
		<view class="m-img" v-if="rowData.imgUrl">
			<image style="width:100%;height: 100%;" :src="rowData.imgUrl" mode="aspectFit"></image>
		</view>
		<view class="m-text">
			<view class="m-title">
				{{rowData.name}}
			</view>
			<view class="m-discount">
				<view v-for="(item,index) in tips" :key="index" class="m-tip">
					{{item}}
				</view>
				<slot name="tip"></slot>
				{{rowData.notice}}
			</view>
			<view class="m-address">
				{{rowData.address}}
			</view>
		</view>
		<view class="m-distance" v-if="rowData.fencingRange > 0.5">
			{{rowData.fencingRange}}km
		</view>
		<view class="m-distance" v-else>
			附近
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-home-store",
		props:{
			rowData:{
				type:Object,
				 // 对象或数组默认值必须从一个工厂函数获取
				default: function () {
					return { 
						
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
		methods:{
			handleFn(){
				this.$emit('handleFn',this.rowData.id)
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
.m-store-item{
	display: flex;
	flex-direction: row;
	// width: 100%;
	justify-content: center;
	align-items: center;
	margin-bottom: 20upx;
	margin-left: 10upx;
	margin-right: 10upx;
	&:active{
		background:$color-hover
	}
	.m-img{
		flex: 0 0 120upx;
		height: 120upx;
		// background: #eee;
	}
	.m-text{
		flex:1;
		padding: 0 20upx;
		font-size: 26upx;
		.m-title{
			font-size: 32upx;
			color:#333333;
		}
		.m-discount{
			font-size: 20upx;
			color:#808080;
			margin-top: 8upx;
			display: flex;
			flex-direction: row;
			.m-tip{
				background:#ffddb9;
				color:#fe8d4e;
				padding:0 10upx;
				border-radius: 5upx;
				margin-right: 5upx;
			}
		}
		.m-address{
			font-size: 24upx;
			margin-top: 15upx;
			color:#808080;
		}
	}
	.m-distance{
		flex: 0 1 100upx;
		color:#333333;
		font-size: 22upx;
		text-align: right
	}
}
</style>
