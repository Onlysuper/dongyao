<template>
	<view class="m-centent">
		<view class="m-title">一、适用范围</view>
		<view class="m-text"> 千畦自营商品：指在商品详情页明确标识为“由千畦销售并提供售后服务”或“千畦自营”的商品。</view>
		<view class="m-title">二、退换货规则</view>
		<view class="m-text"> 千畦承诺符合以下情况，自客户签收商品次日起3日内可以退货换货。</view>
		<view class="m-title">三、退换货判断时间</view>
		<view class="m-text"> 1、千畦自提的订单：以客户实际签收商品日期为准；</view>
		<view class="m-text"> 2、千畦的订单，按照第三方物流平台显示的实际收货日期为准。如果第三方物流平台未能显示实际到货日期，则以苏宁根据配送区域、距离等因素和您人工确认实际到货日期为准。</view>
		<view class="m-title">四、申请方式</view>
		<view class="m-text"> 如果您需要办理退换货，请优先选择您原购物渠道进行反馈。</view>
		<view class="m-title">五、下述商品不支持7天无理由退货：</view>
		<view class="m-title-two">1、个人定制类商品或服务；</view>
		<view class="m-title-two">2、鲜活易腐的商品；</view>
		<view class="m-title-two">3、不完好的商品：</view>		
		<view class="m-text">(1)新鲜水果包装被损坏；</view>		
		<view class="m-text">(2)农副产品包装破损</view>		
		<view class="m-text">(3)商品受污、受损、已洗涤。</view>		
		<view class="m-title">六、其他</view>
		<view class="m-text">1、商品退货时，需扣除购买该商品所获得的积分及相应优惠券，如账户积分及优惠券已使用，则会从商品退款中相应扣除；礼品卡退货时金额退回卡内，不予兑现。退货成功后，您在购物时使用的易购券将退至原账户且有效期限不变，请注意查收；</view>		
		<view class="m-text">2、若您开具的是增值税发票，在商品退货时请与千畦客服联系，咨询增值税发票的退货注意事项，点击在线客服。 </view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
@import "../../common/globel.scss";
.m-centent{
	color: #3C3C3C;
	font-size: 26upx;
	padding: 20upx;
	.m-title{
		font-size: 34upx;
		color: black;
		font-weight: 600;
		padding: 10upx 0upx;
	}
	.m-title-two{
		color: black;
		padding: 10upx 0upx;
		font-size: 30upx;
	}
	.m-text{
		margin-top: 15upx;
	}
}
</style>
