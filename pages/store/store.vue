<template>
	<view class="m-store-store">
		<view class="m-store-banner">
			<view class="m-content">
				<view class="m-message">
					<view class="m-img">
						<!-- imgUrl -->
						<image style="width:100%;height: 100%;" :src="storeData.imgUrl" mode="aspectFit"></image>
					</view>
					<view class="m-body">
						<view class="m-text-box">
							<view class="m-title">
								{{storeData.name}}
							</view>
							<view class="m-text">
								{{storeData.notice}}
							</view>
							<view class="m-time">
								营业：{{storeData.businessHours}}
							</view>
						</view>
						<view class="m-phone" @tap='callPhone(storeData.tel)'>
							<image style="width: 40upx;height:40upx;margin-left: 20upx;" src="../../static/img/icon/shop_icon_phone.png" mode="aspectFit"></image>
						</view>
					</view>
					<!--  -->
				</view>
			</view>
		</view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view  scroll-y="true" class="left" >
		        <view class="row" v-for="(item,index) in storeMenu" :key="item.id" :class="[index==showCategoryIndex?'on':'']" @tap="showCategory(item.id)">
					<view class="text">
						<view class="block"></view>
						{{item.name}}
					</view>
				</view>
		    </scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view  scroll-y="true" class="right" >
			    <view class="category" v-for="(category,index) in storeMenu" :key="category.id" v-show="index==showCategoryIndex" >
					<view class="list">
						<view class="box" v-for="(box,i) in category.list" :key="i">
							<m-store-pro @touchOnGoods="touchOnGoods" :rowData="box"></m-store-pro>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	
		
		<m-footer-car  title='去结算' price="￥30.97" num="10" @handleFn="showSpec(false)" @payFn="payFn"></m-footer-car>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="m-shopcar-box">
					<view class="m-header">
						<view class="m-line">
							<view class="">
								购物车
							</view>
							<view class="m-light">
								共5件商品
							</view>
						</view>
						<view class="m-clear-car">
							清空购物车
						</view>
					</view>
					<view class="m-shopcar-item">
						<view class="m-title">
							无公害小油菜/500g
						</view>
						<view class="m-price">
							￥12.99
						</view>
						<view class="m-controne">
							<uni-number-box :min="0" :max="9"></uni-number-box>
						</view>
					</view>
					<view class="m-shopcar-item">
						<view class="m-title">
							无公害小油菜/500g
						</view>
						<view class="m-price">
							￥12.99
						</view>
						<view class="m-controne">
							<uni-number-box :min="0" :max="9"></uni-number-box>
						</view>
					</view>
				</view>
				<m-footer-car title='去结算' price="￥30.97" num="10" @handleFn="showSpec(false)" @payFn="payFn"></m-footer-car>
			</view>
		</view>
		
		  <!--小球的实现-->
	  <!-- <view class="good_box" v-show="hide_good_box"  :style="left: "+bus_x+"px; top: {{bus_y}}px;"> -->
		<view class="good_box" v-show="!hide_good_box"  :style="'left:'+bus_x+'px;top:'+bus_y+'px'"></view>
		<!-- <view class="good_box" >fewafewa{{bus_x}}	</view> -->
			
	</view>
</template>
<script>
	import mFooterCar from '@/components/m-footer-car'
	import mStorePro from '@/components/m-store-pro'
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	// 抛物线计算
	function bezier (pots, amount) {
	  var pot;
	  var lines;
	  var ret = [];
	  var points;
	  for (var i = 0; i <= amount; i++) {
	    points = pots.slice(0);
	    lines = [];
	    while (pot = points.shift()) {
	      if (points.length) {
	        lines.push(pointLine([pot, points[0]], i / amount));
	      } else if (lines.length > 1) {
	        points = lines;
	        lines = [];
	      } else {
	        break;
	      }
	    }
	    ret.push(lines[0]);
	  }
	  function pointLine(points, rate) {
	    var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
	    var ret = [];
	    pointA = points[0];//点击
	    pointB = points[1];//中间
	    xDistance = pointB.x - pointA.x;
	    yDistance = pointB.y - pointA.y;
	    pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
	    tan = yDistance / xDistance;
	    radian = Math.atan(tan);
	    tmpPointDistance = pointDistance * rate;
	    ret = {
	      x: pointA.x + tmpPointDistance * Math.cos(radian),
	      y: pointA.y + tmpPointDistance * Math.sin(radian)
	    };
	    return ret;
	  }
	  return {
	    'bezier_points': ret
	  };
	}
	export default {
		components:{
			mStorePro,
			uniNumberBox,
			mFooterCar
		},
		data() {
			return {
				//商家基本信息
				storeData:{},
				
				// 购物车动画start
				 hide_good_box:true,
				 bus_x:0,
				 bus_y:0,
				 finger:{},
				 busPos:{},
				 linePos:[],
				 timer:null,
				// 购物车动画end
				carPrice:"10",
				carNum:"10",
				specClass: '',//规格弹窗css类，控制开关动画
				showCategoryIndex:0,
				//分类列表
				storeMenu:[
					{id:1,title:'家用电器',banner:'../../static/img/category/banner.jpg',list:[
						{
							name:'精品秋葵600g',
							descripe:"脆糯营养，口感好，健康绿色",
							img:'../../static/img/1.jpg',
							price:"￥9.99",
							oldprice:"￥9.99"
						}
					]}
				]
			}
		},
		
		methods:{
			//拨打电话
			callPhone(phone){
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			// 去结算
			payFn(){
				uni.navigateTo({
					url:"/pages/order/pay"
				})
			},
			halfWidth(num){
				 return num*2+'px';
			},
			// 加入购物车
			touchOnGoods(obj){
				const e = obj.elem;
				const data = obj.data;
				if(this.timer){ // 清除一下动画
					clearInterval(this.timer);
				}
				this.finger = {}; var topPoint = {};
				this.finger['x'] = e.target.x;//点击的位置
				this.finger['y'] = e.target.y;
				if (this.finger['y'] < this.busPos['y']) {
				  topPoint['y'] = this.finger['y'] - 150;
				} else {
				  topPoint['y'] = this.busPos['y'] - 150;
				}
				topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;

				if (this.finger['x'] > this.busPos['x']) {
				  topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
				} else {//
				  topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
				}
				this.linePos = bezier([this.busPos, topPoint, this.finger], 30);
				this.startAnimation(e,data);
			},
			startAnimation: function (e,data) {
				var index = 0, that = this,
				bezier_points = that.linePos['bezier_points'];
				that.hide_good_box= false
				that.bus_x=that.finger['x'];
			    that.bus_y=that.finger['y'];
				var len = bezier_points.length;
				index = len;
				that.timer = setInterval(function () {
					index--;
					that.bus_x= bezier_points[index]['x'];
					that.bus_y= bezier_points[index]['y'];
					if (index < 1) {
					  clearInterval(that.timer);
					  that.hide_good_box= true;
					  // 数据计算
					  that.addGoodSum(e,data);
					}
				}, 25);
			},
			addGoodSum(e,data){
				console.log(data);
			},
			//分类切换显示
			showCategory(index){
				this.showCategoryIndex = index;
			},
			//关闭规格弹窗
			hideSpec() {
				this.specClass = 'hide';
				//回调
			
				this.selectSpec&&this.specCallback&&this.specCallback();
				this.specCallback = false;
				setTimeout(() => {
					this.specClass = 'none';
				}, 200);
			},
			//规格弹窗
			showSpec(fun) {
				console.log('show');
				this.specClass = 'show';
				this.specCallback = fun;
			},
			specCallback(){
				return;
			},
			goDetail(pro){
				// 跳转商品详情
				uni.navigateTo({
					url:"/pages/product/product"
				})
			},
			discard(){
				
			},
			busHandle(){
				let ww = document.body.clientWidth;
				let hh = document.body.clientHeight;
				this.busPos['x'] = 45;//购物车的位置
				this.busPos['y'] = hh - 56;
			}
		},
		
		onLoad(option) {
			this.busHandle();
			// 商家基本信息
			this.mPost("/server/s/storeById",{
				id:1,//userid
			}).then(res=>{
				if(res.code=='1'){
					this.storeData=res.data;
				}
			})
			//商品分类
			this.mPost("/server/t/types",{
				// id:1,//userid
			}).then(res=>{
				if(res.code=='1'){
					console.log(res);
					this.storeMenu=res.data;
				}
			})
		}
		
		
	}
</script>
<style lang="scss">
	@import "../../common/globel.scss";
	@font-face {font-family:"HMfont-home";src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAABDkAAsAAAAAHNQAABCUAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCEOAqqPKIAATYCJAM4Cx4ABCAFhG0HgUIbsBczo8LGAQApXpzs/3DAzQnrqJVQobqjkywr6K3VnnGPu9Hok7hbbDQrMa3YYH8hMXBogoTzwQb7Cx1kafc7LoV7nPdDKXng//D1vvHHmJQxLb6PhyYHA5TjobT1Ahe8Yj0Bel0CGZ62+e/eIdwdcCPswEj8LgoVo7G/whxWfmb0JgvdWPLFRbsoNzNXdS7DRYaDbmUCvEXgheNFZKuuXTu+aEU1WZOVcF6HmhlSCYD7H5tIg0qTmVZRu7s/lUSaaoKS9pbWFqJJPkHSvAEC8qYvrtm2JxQywhzK2SfN9jDt5aDpt8kIchy0s3wRg+cEDyyL1Gjv/0BR8z+X2vyO6G5ACjPM2Jv/kxz8wNafHP0SH7XNFUltLPemCOSEuj/MFYBU5wAtGDXh5vzUTW2j/5KagmzC/t9v7y4vg+OMRLwoYBX7mqMT0LTlBLl5HwAPJnsrAWq90PqiBwuZMscZ1C9VGb1mFFGDEvWoghTgm/3nw38eYUBUSeA9ptuMzhWP6CnnWSmqHGeaRRcCLo/iyCLhBJCP+jsz/U2o4b4D1fw7hicAtNVFucyfljwd+lM9sx8fV+GEPO940Lb+jASoiKpq6hqaWtrS1Y7G/7wq2KltWPMj1qFwqECFwhWIFJ5AlcIXqFG0BeoUHYEGRVegSdETaFH0BdoUAZHuWjgQATQVCHT4be+atmrX6mUNeAWg+gE0muCtP9vhJIvE2tPS0aWD7CMMIF3Shslisx04nYhOo7FwnK5OV6peT8FmMckJTC7XkLV2OJTAz3pkMUl1XU87pJQQTOCcvpRZU4mQYa2upA2dlZXiXsMYFpZotVJSMWjs8inptH/3IVRdnVfTCSu4BEN26erEHIyVQgYQydTZpPut5IJTT8c7zVtLICfML4kL4IAySN6neVUQEGHYRWxJzy9tvvtVbt8+Hq7LLy95wyxipk2XPrlfGueR8BzXrk8uJkbH4zP3PElIY8T2xpM0xV8QJjH6dOl8LrBDVDBSg+4NWThiuyw1pg6hQ+yicS1L1JHvhOEBr5mGpWUXbFS5Rshz/DLGeg2qcy8vgln+ZkxXQytRtsvny6uMysNUI+s1FzjjHq+dSKulGvPTvPwVmoI2Toen7K7Efgc01rrMYDSU5GcvBhMIRyH2Y72RCUkgpeUh7Jn3rqySk3c1lpC5CJ0zQktsu63zHuocSwVg4ZgXHoTc9SCBeBrju2cUMDDt2ZCAwADYdQ3kMjGm/PN5fLdsdJyu0cfGxicOCM8pSecvpDGwXpDWYqUBH66TifQOImT6TKN4Buv+7WW5sFsFxTBOyY51svEoxFgAhbWC3NuzSpiYJlSdBIWjAAURRzd941tLpD2D6kLgCDEcT/sKXOEV0sKioNREw0YqHazPM2fr1dL4OM+D4hnDyLsaFNynxsCMGMmdgWf/6rvRKZN7o4kVU1l5m99ajfRIZUTnK2KBNy994FPp/WxnOiS6msJFnF3XcqJviugTy4XXdBjl/4srzMjY50JQrr1aNMWbp97D6fN+1nYjPB0NKuW6G8ZZIzlPqcw551595Ar0weMyL5/2U1cjD/MyYkPUWhE41+KuE5JVKRWGGyR6fiFhdqEaZ8ZASohSmGRcnKYwuX4l9IhUk0l9HIMHPuuUtP59MWP3epKdxHQvrImZ18/64M1+dz0Jk3t9rCHEf5T8u+gX2ajrBl5tAokz/AFTLihRgsraYThf4zK19rS8Ii9Ckd6nOtZGiO/wsxmyZnG+pkoirBl5nAQXm+XAUhDQh1YxB5qe/WepUh0P0ird8D4LmBPkFZACMmlJCAA2ISjPrkF4dMfQkuBgNCY8qI9gDuLKAJJR0G1Jy0eDFIbmnSMytrmDFpbHeGJbsKD4s5KOcQWNNxGZ5meZZUSaUU1nDy0cS/OMA2jAVb+wXnF4wxSd2XSgClRWDI9TenjWXTtQKlrSL3I2ecIO0zlUXBUYrblrj8SDK4vYVfNCT/ITRm0ZrwAlTV0cTOcbc9fElZUiVzsx7uXPp8aydaPuKBHKGc81bs7L+qlJUzC9YWy10UhUyh51z03PAZ3XFk+WF+3R3lL4QeeeMFVZ/NnaZhKJy9wAIVMAAFiF5PqSYDAOTmzJXtYOW6Vm9aSZOtUIsAyzhBpkxpBouI3V6YCh/T3eKEgaygxVmEqaQatyANDbRmr9/SDTZrK4Q9qp3+vbvXCbBcyVURxSDA1aHepHAIhLNgSKNPV8dRrUa5nWhUxk+jhdqiCBLIZ33cGMWEVt++wvwOe942lUKazTTySP6AKMHjD30DNo2LkbQTY02XJ27tWH6/fZGBMjiVjfxb+Uy7GuXrJaKsvMqNrUGABdRpb0jBSHD06EFsMmcNNQFYGkZwMCSbLLjY2fnpYxfk+C5OUhkvuCfbsECVR22awVGCiRVEDrvjOorVtBSjW5tQ3OJbnGXBLmrVqVt71wwZAjVedubasmU0BAEe1WEIwLOPpsn+cvLv47u7wpSx7ho5PjLk2zTzWZJsUzM8QZj4qECydpFk2yyikS5BQCBsLILhSoS27dZygh+Zf2DilcqvGQv8hgqoK2Y3vGPNyjoLRojgdXmVKV7ewat0S2yCFIHdSTeXJxT6jg33p49Chaj2pg1kOYosZPOBcAlYGqr2+doaWB++E+NteIy4JZS5dlQXLf84WFaGsrsERpVWRjK6wRmSeg5oYCIiOLat2/EHwNaS6CNY2tVaRFvei9raJmh9R5CKE/bpgnEtXMVBJCLyGILZFelLKExy77Xr4plGHP0qjaGNKXupr+rXEY2xW9rkhIeK7ri9mVYaRLX+2rUggJD9UO8a47HRHqiWYys4nqOrUdKSPt1OYNLzQfNxXpolby67Gc63KBjZhT0NOgj5V+DBkmVlYRlDZFVIkGdGQ6A6LHoEbuGkYy/Ewn4HdxDcPFX2ylGNPgo+dfadSgC4HdPBnHj8Nac6JutK7E234bU8Zq/33lqiWo0terdfhPWTcXf4R9tIWg8H04xb9D7CMo9442YpRPqdvUFH8UtHx0gYtq29Lhu8lwUV1bGkyHV9mrTn4anIOFi9wYKvtwxTrBt9cbnI/BVrLdoADku36wtXk6urgd1gJGEi9HkB27w9/Gz2ZMCmSHTc9FVw0uHPiO9wIM3Mc9kdrsdgncEQHXq5DasqnfDa43Din1WJ+OpP1I0cO8drRWHsmIgis1I/+h0WBBoWnqVP7qaQYxuXJfIIWVO2GVza0EWL6RXobfMR8i6EvrOw8lSdzEYtQTrmwYKUADGpVBKQNwU0WqPC2agAQ0AeIs/yyBisUuD5QU3gWS/NYOnVRiLHiIixRWHey6cGrMVdCyY5sx6RYhV5S3RoO3+3jhka1bN++ESZesEzAWvINptXXpSBpiA6b5zjQk/Y479m8PcqKcIRnX911oydrQ0rfjIQ2VLNf0erh2chWIAdEeUriOmKO0T8jl1E6tmRO4y+VtaOkaVPrfEECIBOg4o0EM0AYCR93UeYyW7RL1He07hISwVvb/NziFPbvEzCyxOGiRTjvxE1zGzil7hXTvIEF4zS/tUFT5MkAb9w7MRfL5QVfEiotFSTP7TuoVwPp6uB0F9RobxxWamihGPWGdiJRXIMOZWF7uQCrKh2ul4x0Sb/mLF/+/YYQjLNDU103KRzSaXPAdSz70nTPNP9CC4MffmeUuT4Tl5TlNKIV8liyPlcleA5CaB+B83q0HC/48PJ97iy7vw4MfROonLACLCsfO1T7LoqIxoojYFo6BS/T8GH+31h6tu3zaeULDhNdPPcZvdc7Qj3VGVT29KuguM6o06vjx/sR0DJcii9durAZOTrhOW8eVPYQOP9IULCnZnYOYjJRz21e+5HX2NhhHO9FUBw6rmB9n6a7jdL76eziU/M0YUW0/Hkd0CW2Jzt0/khCxnsSEviTnQC4WfegavUP54evnDS1zc63tvQEEkm8bZyQRfNWpEegHhdOOMxjHw0uDj3ac/HzWnskTdmR5RQbwflgEBOaOlXqzae5io5Qs1+XkqogcgxOJdGa1oCI2sS9lrmt/nq56kD9EhAIf62KaWlQc6tB6N8PONwJW7dhZBZ2iDCYu2jjbxGMlOjwMVzrrxgLmp9wP8gGsBRuQf0gOCKBfoeekjW+kI1O823co9uPHTdMRD+9IsXwZfrxGHt8TH9hN9pA7MQlwo8EH8Yv4WYVG3sg11ONyvb3VQqwJu1qDUAgf3GVbsO+OVeMUvg0b4A04hA+t0reEU0R42P+/+OW8b/ggbxD79svHYhROeck1GeyubnYGOP8BHNrAZDW1vVYOcofw1w+iIkkyKurBB/PF/PP8xQ93DqrLcCO8TG0zHncp/uob6Y/rD+5g/KN/FcD0UUqyyQbr9nXGSTaGQmfbRtsZW581PtPaeqDxgHbq6C8yJ8Tyh4xsnyBb+CMkR0Zm6WbFgQAgHz+RGIv+DfyL0uNKnUrjdumixyyufHL8dDX3OKrHa13v7r1+K8LOsCrNT2B1BTlGi5ITViuzZ8y+UusUk1ve2c4Oly74tu63lLzodIH6J3GXIpvylJELf7cD4CAJ+PRs2K4bBYc+OascxKM6QbQuwvwPDbJYg4csTnsbhV4eH7Yw+twp1rHjrFOMJYwYqo/ZlWqV+3n7cVg5BjEGXIMxAjM5B7CjUxNPJ9KOXiaX89zDGw+TpDs58zCxTxmUcAW2j7PPok0Mp9CUcpgODswcrGnH9rfv11s5E9a/5zC3b2dyOGJODgVvK7cxNnCasLZ/rIchmNdVSU3HqdjF8sKayr4v7FkILBuGZw8zH3mK3olEZg3YIfkayQWDhnGAKTkxHOUZanPBf422rCdsW6MPhl7sJywvtcIyXfE1Nqiv+nv16aZPTOiKNJLus9nHZ9O4JNfxYcprKpWD/EG80m09OsqShTJHtYQPwL5EqPWE7iHxknjQS5khUlYpusHNy20D+gRd71aJZ7aPNbAgLYy5xjxjy1Vsc9LC6MO0NLKkjUiJId4QIS07tqM6Zc/hCE7xKPyI+ShiBylzinMH2iF34SdDp4YM3oZDkNFES4y7Xk/19Pt7w7hgH5j3O+/zUGohsg+OOP/M9/DxdJcGnaeo/0GlL6WLSI1hiyrDvkBgi29m7Efn8/y6L1G+Qg3SEXTdonuT799Dm/007Uu99X/IPR89WzpsSW7mQgA2yzRoefutDc0GgM/xsD25d75uvnVBr2eX5QJJyuGuX4Abjmh+bmMrLndoTJc+QcsbjPrE56OaDZ/U7YC85oSvaDnjq+rO+aZjAX23jBQCVMg44EjtDx/0tfJR108+6RuFAWPNXb5i6g1f1Q/lm+4Q/iBb9k6Ibl8CNoI9tEegjp1RQG6d2l9odW5C0G0f+MMQqQSKNI+Wf6DDICNF3NlSxIAJvMD7z9hwnhl84BE7SQcRv80yw0qZdrysbvkGbMQ6sQft8WLq2Jm7y23s93+h1bkJnE7vF/9hiPTyoJDKEeBDdahOq9Iw7mxJCDVAWwZewDuhOH+iDDz7dSN2khpyhP1WRq5msGqqX1/G+iNI6b0Cr4YJOoPJYpMcLsXjS2t6JHc9c9cIsXs+UOPKztkqskbl5MHo0HQSYWdPA10bnQ20cfYm0DHK9uQu46BW+U5Iigz0QvRUcX9QPCBwLzP/nx7bfCjmAnymyVitAAAAAA==') format('woff2');}
	.icon {
		font-family:"HMfont-home" !important;
		font-size:60upx;
		font-style:normal;
		color:#000000;
		&.yuyin {
			&:before{content:"\e64e";}
		}
		&.tongzhi {
			&:before{content:"\e729";}
		}
		&.search {
			&:before{content:"\e628";}
		}
		&.location {
			&:before{content:"\e611";}
		}
		&.xia {
			&:before{content:"\e689";}
		}
	 }
	/*抛物线动画*/
	.good_box{
	  width: 10px;
	  height: 10px;
	  position: fixed;
	  border-radius: 50%;
	  overflow: hidden;
	  left: 50%;
	  top: 50%;
	  z-index: +99;
	  background:#ff582b;
	}
	@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-100%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}
	.m-store-store{
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		// padding:30upx;
		
	.m-store-banner{
			// height: 270upx;
			box-sizing: border-box;
			position: relative;
			padding-top: 20upx;
			background:#eee;
			background:url('../../static/img/storebanner.png');
			background-size: 100% 200upx;
			background-repeat: no-repeat;
			.m-content{
				width: 690upx;
				position: relative;
				bottom: 10upx;
				left: 30upx;
				right: 30upx;
				margin-top: 70upx;
				background:#fff;
				border-radius: 15upx;
				box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
				z-index: 100;
				.m-message{
					padding:20upx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.m-img{
						flex:0 0 140upx;
						height: 140upx;
						background:#eee;
					}
					.m-body{
						flex: 1;
						// padding: 20upx;
						padding-left: 10upx;
						padding-bottom: 0;
						display: flex;
						flex-direction: row;
						.m-text-box{
							flex: 1;
							.m-title{
								font-size: 32upx;
								color:#333333
							}
							.m-text{
								font-size: 20upx;
								color:#999999;
								line-height: 38upx;
								margin-top: 10upx;
								// white-space: nowrap;
								padding-right: 30upx;width: 100%;
							}
							.m-time{
								font-size: 20upx;
								color:#999999;
								margin-top: 10upx;
								white-space: nowrap;
							}
						}
						.m-phone{
							flex:0 1 40upx;
							text-align: right;
							font-size:22upx;
							display: flex;
							flex-direction: row;
							color:#5db964;
							align-items: flex-end;
							justify-content: flex-end;
						}
						
						
					}
					
// 					box-shadow:none;
				}
			}
			
		}
	
	.category-list{
			width: 100%;
			background-color: #fff;
			display: flex;
			position: relative;
			padding-top: 20upx;
			// padding-bottom: 99upx;
			flex: 1;
			.left,.right{
				position: absolute;
				top: 0upx;
				/*  #ifdef  APP-PLUS  */
				top: calc(100upx + var(--status-bar-height));
				/*  #endif  */
				bottom: 99upx;
			}
			.left{
				width: 24%;
				left: 0upx;
				background-color: #f6f3f3;
				
				.row{
					width: 100%;
					height: 90upx;
					display: flex;
					align-items: center;
					.text{
						width: 100%;
						position: relative;
						font-size: 28upx;
						display: flex;
						justify-content: center;
						color:#999999;
						.block{
							position: absolute;
							width: 0upx;
							left: 0;
						}
					}
					&.on{
						height: 100upx;
						background-color: #fff;
						.text{
							font-size: 30upx;
							// font-weight: 600;
							// color: #2d2d2d;
							.block{
								width: 10upx;
								height: 80%;
								top: 10%;
								// background-color: #f06c7a;
							}
						}
					}
				}
			}
			.right{
			   width: 76%;
			   left: 24%;
				.category{
	
					padding: 0upx 30upx;
					.list{
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						.box{
							width: 100%;
						}
					}
				}
			}
		}
	}
	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 300;
		display: none;
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}
		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 100%;
			padding: 0;
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			// 购物车
			.m-shopcar-box {
				width: 100%;
				// padding: 30upx 0;
				.m-header{
					padding: 30upx 30upx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.m-line{
						display: flex;
						color:#333333;
						font-size: 30upx;
						.m-light{
							color:#333333;
							font-size: 22upx;
							padding-left: 10upx;
						}
					}
					.m-clear-car{
						color:#333333;
						font-size:22upx;
					}
				}
				.m-shopcar-item{
					margin-left: 30upx;
					margin-right: 30upx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items:center;
					border-top: 1px solid #eee;
					padding: 20upx;
					&:last-of-type{
						border-bottom: 1px solid #eee;
					}
					.m-title{
						color:#4c4c4c;
						font-size: 26upx;
					}
					.m-price{
						color:#ff582b;
						font-size: $fontsize-4;
					}
					.m-controne{
						// flex: 
					}
				}
			}
			.btn {
				width: 100%;
				height: 100upx;
				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 28upx;
				}
			}
		}
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			display: block;
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		&.service {
			.row {
				margin: 30upx 0;
				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}
				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}
		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}
			.sp {
				display: flex;
				view {
					font-size: 28upx;
					padding: 5upx 20upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;
					&.on {
						padding: 3upx 18upx;
						border: solid 1upx #f47925;
					}
				}
			}
			.length{
				margin-top: 30upx;
				border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;
				.text{
					font-size: 30upx;
				}
				.number{
					display: flex;
					justify-content: center;
					align-items: center;
					.input{
						width: 80upx;
						height: 60upx;
						margin: 0 10upx;
						background-color: #f3f3f3;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
						input{
							width: 80upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
							text-align: center;
							font-size: 26upx;
						}
					}
					
					.sub ,.add{
						width: 60upx;
						height: 60upx;
						background-color: #f3f3f3;
						border-radius: 5upx;
						.icon{
							font-size: 30upx;
							width: 60upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
							
						}
					}
				}
			}
			
		}
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
		
	}

	.header{
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		
		.addr{
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;
			.icon{
				height: 60upx; 
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}
		.input-box{
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			.icon{
				display: flex;
				align-items: center;
				position: absolute;
				top:0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}
			input{
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}
		.icon-btn{
			width: 60upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			.icon{
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}
	.place{
		
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	

</style>

