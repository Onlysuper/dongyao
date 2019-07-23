<template>
	<view class="m-centent">
		<view class="m-title">一：会员标准设定</view>
		<view class="m-title-two"> 分级：5级</view>
		<view class="m-title-two"> 1、vip会员</view>
		<view class="m-text"> 领取条件：注册并产生消费（不限金额）</view>
		<view class="m-title-two"> 2、"千畦"同学</view>
		 <view class="m-text"> 	千畦同学（一星），千畦同学（二星），千畦同学（三星），
千畦同学（四星），千畦学霸（五星）</view>
		<view class="m-text"> 升级条件：积分分别到达相应等级</view>
		<view class="m-title-two"> 3、“千畦”班委： </view>
		<view class="m-text">畦班小组长（一道杠），畦班课代表（二道杠），畦班副班长（三道杠），畦班超级班长（四道杠），
畦班辅导员（五道杠）</view>
		<view class="m-title-two"> 4、“千畦”江湖</view>
		<view class="m-text">
		畦界少侠（一钻），畦界大侠（二钻），畦界剑客（三钻），
畦界掌门（四钻），畦界宗师（五钻），畦界盟主（六钻），
        </view>
		<view class="m-text"> 升级条件：积分分别到达相应等级</view>
		<view class="m-title">二：会员积分规则</view>
		<view class="m-title-two">1、会员积分</view>
		<view class="m-text">
			积分是”千畦“商城额外回馈给会员朋友的一种惠利与增值服务。它会随着用户购买商品和参与本商城的活动而不断增加；在特别回馈活动时，可获得更多积分；除了能记录您在本商城的消费金额以外，还能帮您累计积分。同时会员消费的实际产品金额将记录会员的信用等级，会员级别越高，享受优惠越多。
		</view>
		<view class="m-title-two">2、积分获得</view>
		<view class="m-text">(1)、购买商品送积分</view>
		<view class="m-text">购买商品可以享受与实际购物金额相等数值的积分（即消费1元=1积分）；</view>
		<view class="m-text">(2)、会员注册送积分</view>
		<view class="m-text">新会员注册获20个积分；</view>
		<view class="m-text">(3)、好评产品送积分</view>
		<view class="m-text">会员发布商品评论信息，根据评论内容的价值获得0-5个积分不等；</view>
		<view class="m-title">　特别声明：</view>
		<view class="m-text">不同账户的积分不可合并使用</view>
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
