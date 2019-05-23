<template>
	<view class="m-map">
		<map style="width: 100%; height: 370upx;" :controls="controls" :circles="circles"  :scale="scale" :latitude="latitude" :longitude="longitude" :markers="markers">
		</map>
		<!-- <view>{{latitude}}</view>
		<view>{{longitude}}</view>
		<view>{{userlng}}</view>
		<view>{{userlat}}</view>
		<view>{{distance}}</view> -->
	</view>
</template>

<script>
	export default {
		props:{
			latitude:{
				type:[String,Number],
				default:""
			},
			longitude:{
				type:[String,Number],
				default:""
			},
			userlng:{
				type:[String,Number],
				default:""
			},
			userlat:{
				type:[String,Number],
				default:""
			},
			distance:{
				type:[String,Number],
				default:""
			}
		},
		data() {
				return {
				scale:15,//地图层级
				markers: []
			}
		},
		onReady(){
			this.markers=[{
				latitude: this.latitude,
				longitude: this.longitude,
				iconPath: '../../static/img/icon/pay_icon_gps.png',
				label:{
					content:'距离您'+this.distance,
					bgColor:'#fff',
					textAlign:'center',
					padding:'5px',
					borderColor:"#eee",
				}
			},
			{
				latitude: this.userlat,
				longitude:this.userlng,
				iconPath: '../../static/img/icon/pay_icon_gps.png'
			}]
		}
	}
</script>

<style>

</style>
