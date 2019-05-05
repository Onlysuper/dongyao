<template>
	<view @click="goStore" class="m-groupbuy-page">
		<view class="m-page-title">
			<image style="width:148upx;height:46upx;" src="../../static/img/icon/purchase_icon_title.png" mode="aspectFit"></image>
		</view>
		<!-- <template> -->
		<view  v-for="(item,index) in groupsellList" :key="index" class="m-list">
			<m-groupbuy-list 
			:title="item.synopsis" 
			:labelName="item.labelName" 
			:img="item.pictureUrl" 
			:price="item.presentPrice" 
			:oldpric="item.originalPrice"
			:isAssemble="item.isAssemble">
				<image style="width:164upx;height:60upx;" src="../../static/img/icon/purchase_button_buy.png" mode="aspectFit"></image>
			</m-groupbuy-list>
		</view>
		
		<!-- title:{
		 type:String,
		 default:""
		},
		labelName:{
		 type:String,
		 default:""
		},
		img:{
			type:String,
			default:""
		},
		price:{
		 type:[String,Number],
		 default:""
		},
		oldprice:{
		 type:[String,Number],
		 default:""
		},
		isAssemble:{
			type:[String,Number],
			default:0
		}
		 -->
		<!-- </template> -->
	</view>
</template>
<script>
	import mGroupbuyList from '@/components/m-groupbuy-list'
	export default {
		data() {
			return {
				page:0,//当前页数
				// 附近门店
				groupsellList:[{
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
				getGroupsellList(){
					this.mPost('/server/p/group/products',{
						start:this.page,
						length:1000
					}).then(res=>{
						if(res.code=1){
							if(res.data){
								let data = res.data;
								if(data.list){
									console.log(data.list);
									this.groupsellList = data.list;
								}
							}
						}
					}).catch(err=>{
						console.log(err);
					});
				},
				//跳转到商家
				goStore(){
					uni.navigateTo({
						url:"/pages/store/store"
					})
				}
		},
		components: {
			mGroupbuyList
		},
		onLoad(){
			this.getGroupsellList();
		}
	}
</script>
<style lang="scss">
	.m-groupbuy-page{
		// padding: 30upx;
		.m-page-title{
			margin-top: 30upx;
			margin-bottom: 30upx;
			padding-left: 40upx;
		}
		.m-list{
			border-bottom: 1px solid #ebebeb;
		}
	}
</style>
