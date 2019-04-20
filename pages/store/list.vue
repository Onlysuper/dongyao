<template>
	<view @click="goStore" class="m-store-list">
		<template v-for="(item,index) in nearStoreList">
			<m-store-list :key="index" :rowData="item"></m-store-list>
		</template>
	</view>
</template>
<script>
	import mStoreList from '@/components/m-store-list'
	
	export default {
		data() {
			return {
				// 附近门店
				nearStoreList:[{
					img:"../../static/img/2.jpg",
					title:"东尧蔬菜002号（望京店）",
					address:"北京市海淀区中关村大街15号"
				},
				{
					img:"../../static/img/2.jpg",
					title:"东尧蔬菜002号（望京店）",
					address:"北京市海淀区中关村大街15号"
				},
				{
					img:"../../static/img/2.jpg",
					title:"东尧蔬菜002号（望京店）",
					address:"北京市海淀区中关村大街15号"
				}]
			}
		},
		methods:{
				//跳转到商家
				goStore(){
					uni.navigateTo({
						url:"/pages/store/store"
					})
				}
		},
		components: {
			mStoreList
		},
	}
</script>
<style lang="scss">
	.m-store-list{
		// padding: 30upx;
	}
</style>
