<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			// uni.chooseLocation({
			//     success: function (res) {
			//         console.log('位置名称：' + res.name);
			//         console.log('详细地址：' + res.address);
			//         console.log('纬度：' + res.latitude);
			//         console.log('经度：' + res.longitude);
			//     }
			// });
			
			uni.getLocation({
			    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			    success: function (res) {
			        const latitude = res.latitude;
			        const longitude = res.longitude;
			        uni.openLocation({
			            latitude: latitude,
			            longitude: longitude,
			            success: function () {
			                console.log('success');
			            }
			        });
			    }
			});
		}
	}
</script>

<style lang="scss">

</style>
