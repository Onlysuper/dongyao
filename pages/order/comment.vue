<template>
	<view class="m-comment-page">
		<view class="m-pro">
			<view class="m-top">
				<view class="m-title">
					<view class="img-box">
						<image style="width:80upx;height:80upx" src="../../static/img/icon/goods_icon_Avatar.png" mode="aspectFit"></image>
					</view>
					商品评价
				</view>
				<view class="">
					<uni-rate @change="changeStar" size="18" value="5"></uni-rate>
				</view>	
			</view>
			<view class="m-body">
				<view class="m-text">
					<view class="m-title">
						分享一下吧
					</view>
					<textarea class="m-textarea" placeholder-style="color:$color-2" placeholder="产品你还满意吗？有什么想对我们说的吗？让更多人知道吧"/>
				</view>
				<view class="m-img">
					<view v-for="(item,index) in imgs" :key="index" class="m-img-item">
						<image style="width:120upx;height:120upx"  :src="item.path" mode=""></image>
					</view>
					<view @click="chooseImg" class="m-img-item">
						<view class="m-img-but">
							添加图片
						</view>
						
					</view>
				</view>
				
			</view>
		</view>
		<view class="m-pro">
			<view class="m-top">
				<view class="m-title">
					<view class="img-box">
						<image style="width:80upx;height:80upx" src="../../static/img/icon/goods_icon_Avatar.png" mode="aspectFit"></image>
					</view>
					商品评价
				</view>
				<view class="">
					<uni-rate @change="changeStar" size="18" value="5"></uni-rate>
				</view>	
			</view>
			<view class="m-body">
				<view class="m-text">
					<view class="m-title">
						分享一下吧
					</view>
					<textarea class="m-textarea" placeholder-style="color:$color-2" placeholder="产品你还满意吗？有什么想对我们说的吗？让更多人知道吧"/>
				</view>
				<view class="m-img">
					<view v-for="(item,index) in imgs" :key="index" class="m-img-item">
						<image style="width:120upx;height:120upx"  :src="item.path" mode=""></image>
					</view>
					<view @click="chooseImg" class="m-img-item">
						<view class="m-img-but">
							添加图片
						</view>
						
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import mMap from '@/components/m-map'
	import mOrderPro from '@/components/m-order-pro'
	export default {
		components:{
			mMap,
			mOrderPro
		},
		data() {
			return {
				imgs:[],
			};
		},
		methods:{},
		onLoad(options){}
	}
</script>

<style lang="scss">
@import "../../common/globel.scss";
.m-comment-page{
	.m-pro{
		margin-bottom: 20upx;
		.m-top{
			border-bottom:1px solid $color-3;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 20upx;
			background: #fff;
			.m-title{
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: $fontsize-5;
				color:$color-2;
				.img-box{
					flex:0 1 80upx;
					height: 80upx;
					border-radius: 100%;
					overflow: hidden;
					align-items: center;
					margin-right: 20upx;
				}
			}
			
		}
		.m-body{
			padding:0 20upx;
			background: #fff;
			.m-text{
				font-size: $fontsize-5;
				color:$color-5;
				.m-title{
					height: 70upx;
					line-height: 70upx;
					font-size: $fontsize-4;
					color:$color-2;
				}
			}
			.m-textarea{
				// margin-top: 20upx;
				height: 150upx;
			}
			.m-img{
				
				width: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.m-img-item{
					padding: 20upx;
					min-width: 120upx;
					min-height: 120upx;
					.m-img-but{
						width: 120upx;
						height: 120upx;
						border:1px solid $color-3;
					}
				}
			}
		}
	}
}
</style>
<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
		components: {uniRate},
		data(){
			return {
				imgs:[]
			}
		},
		methods:{
			chooseImg(){
				uni.chooseImage({
					count:3,
					success:(res)=>{
						console.log(res);
						let newImgs = res.tempFiles;
						this.imgs = this.imgs.concat(newImgs);
						console.log(this.imgs);
						
					},
					fail:(err)=>{
						console.log(err);
					}
				})	
			},
			changeStar(e){
				console.log(e);
			}
		}
	}
		
</script>
