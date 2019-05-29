<template>
	<view class="m-comment-page">
		<!-- {{productList}} -->
		<view class="m-pro" v-for="(pro,proIndex) in productList" :key="proIndex">
			<view class="m-top">
				<view class="m-title">
					<view class="img-box">
						<image style="width:80upx;height:80upx" :src="pro['pictures'][0]['pictureUrl']" mode="aspectFit"></image>
					</view>
					商品评价
				</view>
				<view class="">
					<uni-rate @change="changeStar($event,proIndex)" size="18" value="5"></uni-rate>
				</view>	
			</view>
			<view class="m-body">
				<view class="m-text">
					<view class="m-title">
						分享一下吧
					</view>
					<textarea @input="textAreaChange($event,proIndex)" class="m-textarea" placeholder-style="color:$color-2" placeholder="产品你还满意吗？有什么想对我们说的吗？让更多人知道吧"/>
				</view>
				<view class="m-img">
					<view v-for="(item,index) in imgsUrl[proIndex]" :key="index" class="m-img-item">
						<image style="width:120upx;height:120upx"  :src="item" mode="" @tap="handleImagePreview(proIndex,index)"></image>
						<view class="delete" @tap="removeImage(proIndex,index)">
							 <icon type="clear" size="26"/>
							 
						</view>
					</view>
					<view @click="chooseImg(proIndex)" class="m-img-item">
						<view class="m-img-but"></view>
					</view>
				</view>
			</view>
			<view class="m-footer">
				是否匿名 <switch type="checkbox" style="margin-left: 20upx;" @change="switchChange($event,proIndex)" />
			</view>
			<!-- <view  @tap="commentFn(pro,proIndex)" class="">
				提交评论
			</view> -->
		</view>
		
		<view @tap="commentFn" class="m-footer-but">
			提交评论
		</view>
		<view class="split-place"></view>
	</view>
</template>



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
					background:#eee;
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
					position: relative;
					.delete{
						position: absolute;
						right: 0;
						top:0;
						font-size: 14upx;
					}
					.m-img-but{
						width: 120upx;
						height: 120upx;
						border:1px solid $color-3;
						background: url("../../static/img/icon/plus_photo.jpeg");
						background-size: 100% 100%;
// 						display:flex;
// 						justify-content:center;
// 						align-items:center;
// 						font-size:60px;
// 						// line-height:1.5;
// 						box-sizing:border-box;
// 						color:#eee;
					}
				}
			}
		}
		.m-footer{
			font-size: $fontsize-4;
			color:$color-2;
			padding:20upx;
			background:#fff;
			border-top:1px solid $color-3;
		}
	}
	.m-footer-but{
		text-align: center;
		color:#fff;
		height: 99upx;
		line-height: 99upx;
		font-size: $fontsize-2;
		font-weight: bold;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		background:$color-active;
	}
}
</style>
<script>
		// import mMap from '@/components/m-map'
	// import mOrderPro from '@/components/m-order-pro'
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	export default {
		components: {
			// mMap,
			// mOrderPro,
			uniRate
		},
		data(){
			return {
				productList:[],
				// imgsFiles:[], // 图片
				imgsUrl:[],
				textAreaVals:[], // 评论内容
				levels:[],//
				anonymous:[],
				
			}
		},
		methods:{
			switchChange(e,proindex){
				 let values = e.detail.value?1:0;
				this.anonymous[proindex]=values;
			},
			// 内容
			textAreaChange(ev,index){
				let value = ev.detail.value;
				this.textAreaVals[index]=value;
			},
			chooseImg(index){
				console.log('index:'+index);
				// return false;
				uni.chooseImage({
					count:3,
					success:(res)=>{
						if(!this.imgsUrl[index]){
							this.imgsUrl[index]=[]
						}
						let images = this.imgsUrl[index].concat(res.tempFilePaths);
						this.$set(this.imgsUrl,index,this.imgsUrl[index].length<=3?images:images.slice(0, 3))
						// console.log(this.imgsUrl[index]);
						// this.imgsUrl=this.imgsUrl;
						 
						console.log(this.imgsUrl);
					},
					fail:(err)=>{
						console.log(err);
					}
				})	
			},
			changeStar(e,index){
				this.levels[index]=e.value;
			},
			//删除图片
			removeImage(proindex,index){
				this.imgsUrl[proindex].splice(index, 1)
			},
			// 预览图片
			handleImagePreview(proindex,index) {
				const idx = index;
				const images =this.imgsUrl[proindex]
				uni.previewImage({
					current: images[idx],  //当前预览的图片
					urls: images,  //所有要预览的图片
				})
				
			},
			commentFn(){
				let _this = this;
				this.productList.forEach((pro,index)=>{
					// 将选择的图片组成一个Promise数组，准备进行并行上传
					let formData={
						productId:pro.id,
						anonymous:_this.anonymous[index]||0,
						orderId:_this.orderid,
						starLevel:_this.levels[index]||5,
						commentContent:_this.textAreaVals[index],
					}
					if((!this.imgsUrl[index])||this.imgsUrl[index].length==0){
						return false;
					}
					const arr = this.imgsUrl[index].map(path => {
						let sendData = {
						  url: _this.apiurl+"/server/o/commentOn",
						  header:{
							 "Cache-Control": "no-cache",
							 Authorization :uni.getStorageSync('Authorization')
						  },
						  filePath: path,
						  formData:formData,
						  name: 'file',
						}
						return uni.uploadFile({...sendData})
					})
					Promise.all(arr).then(res => {
						  //上传成功
						  uni.showModal({
						  	title: '上传成功',
						  	content: '可在我的订单中查看详情',
						  	showCancel:false,
						  	confirmText:'查看',
						  	success: function (res) {
						  		if (res.confirm) {
						  			uni.setStorageSync('orderTab', 4);
						  			uni.switchTab({  
						  				url: '/pages/tabBar/order'  
						  			});
						  		} 
						  		else if (res.cancel) {
						  			uni.switchTab({  
						  				url: '/pages/tabBar/home'  
						  			});
						  		}
						  	}
						});
					}).catch(err=>{
						   //上传失败
						uni.showToast({
							title: "上传失败",
							icon: "none"
						});
					})
				})
			}
		},
		onLoad(option){
			let ProductUrlData=decodeURI(option.ProductUrlData);
			let productList=JSON.parse(ProductUrlData)['ProductUrlData']; // 产品列表
			let orderid = option.orderid; // 订单id
			this.productList = productList;
			this.orderid=orderid;
		}
	}
		
</script>
