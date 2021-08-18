<template>
	<view class="content">
		<view class="setup-icon"><span class="iconfont" @click="openSetUp">&#xe60c;</span></view>
		<audio style="text-align: left" :src="rain.src" :name="rain.name" :action="audioAction" controls></audio>
		<audio style="text-align: left" :src="bgm.src" :name="bgm.name" :action="audioAction" controls></audio>
		
		<view class="setup" blurEffect="light" v-if="setUpStatus">
			<view>雨声<slider value="50" @change="sliderChange" show-value block-size="12" activeColor="#0A98D5" backgroundColor="#acccea" block-color="#ffb7b8"/></view>
			<view>背景<slider value="50" @change="sliderChange" show-value block-size="12" activeColor="#0A98D5" backgroundColor="#acccea" block-color="#ffb7b8"/></view>
			<view>定时关闭<slider value="50" @change="sliderChange" show-value block-size="12" activeColor="#0A98D5" backgroundColor="#acccea" block-color="#ffb7b8"/></view>

			<view class="close"><span class="iconfont" @click="closeSetUp">&#xe60b;</span></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"volume": 20,
				"setUpStatus": false,
				"rain": {},
				"bgm": {},
				"alarm": {},
				audioAction: {
					method: 'pause'
				}
			}
		},
		onLoad() { 
			this.rain = this.$store.getters.rain;
			this.bgm = this.$store.getters.bgm;
			this.alarm = this.$store.getters.alarm;
		},
		methods: {
			sliderChange(e) {
				console.log('value 发生变化：' + e.detail.value)
			},
			closeSetUp() {
				this.setUpStatus = false;
			},
			openSetUp() {
				this.setUpStatus = !this.setUpStatus;
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.setup-icon {
		width: 100vw;
		overflow: hidden;
		text-align: right;
	}

	.setup-icon .iconfont {
		font-size: 60rpx;
	}

	.setup {
		width: 650rpx;
		height: 90vh;
		background-color: rgba(170, 170, 170, .5);
		border-radius: 20px;
		font-size: 30rpx;
		overflow: hidden;
		position: absolute;
		top: 5vh;
		left: 50rpx;
	}

	.setup > view {
		display: flex;
		justify-content: space-between;

		margin: 100rpx 30rpx;
	}

	.setup slider {
		width: 400rpx;
		margin: 0 20rpx;
	}

	.setup > .close {
		width: 100%;
		margin: 0!important;
	}

	.setup > .close > .iconfont {
		font-size: 100rpx;
		color: white;
		width: 100%;
		text-align: center;
		position: absolute;
		bottom: 10rpx;
	}

</style>
