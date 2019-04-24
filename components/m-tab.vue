<template>
	<view class="m-tab">
		<view v-for="(item,index) in rowdata"  @tap="handleFn(item)" :key="index" :class="['m-item',{actived:(item.id==tabActive)}]">
			{{item.label}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"m-tab",
		props:{
			tabActive:{
				type:[String,Number],
				default:""
			},
			rowdata:{
				type:Array,
				default:function () {
					return []
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			handleFn(item){
				this.$emit("handleFn",item)
			}
		}
	}
</script>


<style lang="scss">
.m-tab{
	display: flex;
	flex-direction: row;
	// padding: 10upx;
	text-align: center;
	justify-content: space-around;
	font-size: 32upx;
	
	color:#666666;
	
	.m-item{
		padding: 30upx;
		position: relative;
		width: 100%;
		box-sizing: border-box;
		&.actived{
			color:#4eb87d;
		}
		&:after{
			content: "";
			display: block;
			position: absolute;
			top: 50%;
			right: 0;
			width: 1px;
			height: 36upx;
			margin-top: -18upx;
			background: #e4e4e4;
		}
		&:last-of-type:after{
			display: none;
		}
	}
	
}
</style>
