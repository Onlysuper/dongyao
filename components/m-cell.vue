<template>
	<view class="m-cell">
		<view class="m-icon">
			<slot></slot>
		</view>
		<view @tap="handleFn" class="m-label">
			{{label}}
		</view>
		<view v-show="link" class="">
			<image style="width:8upx;height:15upx;" src="../../static/img/icon/right-icon.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-cell",
		props:{
			label:{
				type:String,
				value:"",
			},
			link:{
				type:Boolean,
				value:false,
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			handleFn(){
				if(this.link){
					this.$emit("handleFn")
				}
			}
		}
	}
</script>

<style lang="scss">
@import "../common/globel.scss";
.m-cell{
	display: flex;
	flex-direction: row;
	padding:30upx 30upx;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid $color-3;
	.m-icon{
		flex: 0 1 50upx;
	}
	.m-label{
		flex: 1;
		padding-left: 10upx;
		color:$color-2;
		font-size:32upx;
	}
}
</style>
