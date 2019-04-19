<template>
	<!-- 购物车 -->
	<view class="m-footer-car">
		<view @tap="handleFn" class="m-icon">
			<image style="width: 120upx;height:120upx;" src="../../static/img/icon/shop_button_buy.png" mode="aspectFit"></image>
		</view>
		<view class="m-price">
			{{num}}
		</view>
		<view class="m-but">
			选好了
		</view>
	</view>
</template>
<script>
	export default {
		name:"m-shop-car",
		props: {
            price: {
                type: String,
                default: 'iconfont'
            },
            num: {
                type: [Number, String],
                default: 30
            }
        },
// 		props:{
// 			price:{
// 				type:String,
// 				default:"111"
// 			},
// 			num:{
// 				type:String,
// 				default:""
// 			}
// 		},
		data() {
			return {
				
			};
		}
	}
// 	export default {
// 		name:"m-shop-car",
// 		export default {
// 			name:"m-home-store",
// 		props:{
// 			rowData:{
// 				type:Object,
// 				 // 对象或数组默认值必须从一个工厂函数获取
// 				default: function () {
// 					return { 
// 						price:"",
// 						num:""
// 					}
// 				}
// 			}
// 		},
// 		props:{
// 			price:{
// 				type:String,
// 				default:"111"
// 			},
// 			num:{
// 				type:String,
// 				default:""
// 			}
// 		},
// 		data() {
// 			return {
// 				
// 			};
// 		},
// 		onShow(){
// 			alert(111);
// 			console.log(this.price)
// 		}
// 	}
</script>

<style lang="scss">
// 底部
	.m-footer-car {
		position: fixed;
		bottom: 0upx;
		width: 100%;
		height: 99upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.m-but{
			background: #4eb87d;
			color:#fff;
			height: 100%;
			line-height: 99upx;
			padding: 0 30upx;
		}
		.m-icon{
			margin-left: 30upx;
			margin-bottom: 20upx;
		}
		.m-price{
			color:#333333;
			font-size: 30upx;
			text-align: left;
			flex:1;
			padding-left: 20upx;
		}
	}
</style>
<script>
	export default {
		methods:{
			handleFn(){
				this.$emit("handleFn")
			}
		}
	}
</script>
