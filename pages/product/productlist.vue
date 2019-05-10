<template> 
	<view  class="m-product-list">
		<view  v-for="(item,index) in nearStoreList" @click="goPro(item.id)" :key="index">
			<view class="m-page-title">
				{{item.sName}}
			</view>
			<m-groupbuy-list
			:title="item.synopsis" 
			:labelName="item.labelName" 
			:img="item.pictureUrl" 
			:price="item.presentPrice" 
			:oldpric="item.originalPrice"
			:isAssemble="item.isAssemble"
			></m-groupbuy-list>
		<!-- 	title:{
				type:[String,Number],
				default:""
			},
			topbut:{
				type:[String,Number],
				default:""
			},
			img:{
				type:[String,Number],
				default:""
			},
			proname:{
				type:[String,Number],
				default:""
			},
			extrctime:{
				type:[String,Number],
				default:""
			},
			describe:{
				type:[String,Number],
				default:""
			},
			price:{
				type:[String,Number],
				default:""
			},
			num:{
				type:[String,Number],
				default:""
			} -->
		</view>
	</view>
</template>
<script>
	import mGroupbuyList from '@/components/m-groupbuy-list'
	
	export default {
		data() {
			return {
				// 附近门店
				nearStoreList:[{
					img:"../../static/img/2.jpg",
					title:"精品秋葵600g",
					describe:"特价小白菜",
					price:"￥2.99",
					oldprice:"￥100"
				},
				{
					img:"../../static/img/2.jpg",
					title:"精品秋葵600g",
					describe:"特价小白菜",
					price:"￥2.99",
					oldprice:"￥100"
				},
				{
					img:"../../static/img/2.jpg",
					title:"精品秋葵600g",
					describe:"特价小白菜",
					price:"￥2.99",
					oldprice:"￥100"
				}]
			}
		},
		
		methods:{
				//跳转到商品详情
				goPro(id){
					console.log(id);
					uni.navigateTo({
						url:"/pages/product/product?id="+id
					})
				}
		},
		onLoad(option){
			let search=option.search;
			this.mPost("/server/p/search/products",{
				start:0,
				length:20,
				name:this.search,
			}).then(res=>{
				if(res.code=='1'){
					if(res.data&&res.data.list){
						this.nearStoreList=res.data.list;
					}
				}
				console.log(res);
			})
		},
		components: {
			mGroupbuyList
		},
	}
</script>
<style lang="scss">
	@import "../../common/globel.scss";
	.m-product-list{
		// padding: 30upx;
		.m-page-title{
			margin-top: 28upx;
			// margin-bottom: 30upx;
			margin-left: 40upx;
			margin-right: 40upx;
			border-bottom: 1px solid #ebebeb;
			padding:34upx 0;
			font-size: $fontsize-2;
			color:#333333;
		}
	}
</style>
