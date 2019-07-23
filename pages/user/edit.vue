<template>
	<view>
		 <view class="m-address-main">
            <form @submit="formSubmit" @reset="formReset">
                <view class="m-row">
                    <view class="m-title">姓名</view>
                    <view class="m-input">
                        <input class="uni-inpu" name="input" placeholder="l姓名" />
                    </view>
                </view>
				<view class="m-row">
				    <view class="m-title">昵称</view>
				    <view class="m-input">
				        <input class="uni-input" name="input" placeholder="昵称" />
				    </view>
				</view>
				<view class="m-row">
				    <view class="m-title">性别</view>
				    <view class="m-input">
						<radio-group @change="radioChange" class="m-sex">
							<radio value="0" checked  /><view class="m-sex-man">男</view>
							<radio value="1" /><view class="m-sex-woman">女</view>
						 </radio-group>
				    </view>
				</view>
				<view class="m-row">
				    <view class="m-title">出生年月</view>
				    <view class="m-input">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
				    </view>
				</view>
				<view class="m-row-htn">
					<button formType="submit" class="m-save">保存</button>
				</view>
            </form>
        </view>
	</view>
</template>

<script>
	export default {
		 data: function () {
			 const currentDate = this.getDate({
				format: true
			})
			return {
				title: 'picker',
				date: currentDate
			}
		},
		 computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.target.value
			},			
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			radioChange: function(evt) {
				console.log(evt.target.value);
			}
		}
	}
</script>

<style lang="scss">
@import "../../common/globel.scss";
.m-address-main{
	padding: 20px;
	display: flex;
	flex-direction: column;
	color: $color-5;
	font-size: $fontsize-3;
	.m-row{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1upx solid #CCC;
		padding:25rpx 0rpx;
		margin-top:25rpx;
		.m-title{
			width: 30%;
		}
		.m-input{
			flex-grow: 1;
		}
		.m-sex{
			display: flex;
			justify-content: flex-start;
			.m-sex-man{
				margin-left: 5upx;
				margin-right: 20upx
			}
			.m-sex-woman{
				margin-left: 5upx;
			}
		}
	}
	
	.m-row-htn{
		.m-save{
			width: 100%;
			background-color: #66cc66;
			margin-top: 25px;
			color: white;
		}
		.m-del{
			width: 100%;
			margin-top: 25px;
		}
	}
}

</style>
