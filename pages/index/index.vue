<template>
	<view class="content">
		<view class="setup-icon"><span class="iconfont" @click="openSetUp">&#xe60c;</span></view>
		<view class="setup" blurEffect="light" v-if="setUpStatus">
			<view>雨声<slider :value="rain_volume * 100" @changing="rainChange" show-value block-size="12" activeColor="#0A98D5" backgroundColor="#acccea" block-color="#0A98D5"/></view>
			<view>背景<slider :value="bgm_volume * 100" @changing="bgmChange" show-value block-size="12" activeColor="#0A98D5" backgroundColor="#acccea" block-color="#0A98D5"/></view>
			<view>定时关闭<slider value="0" @change="sliderChange" show-value block-size="12" activeColor="#0A98D5" backgroundColor="#acccea" block-color="#0A98D5"/></view>

			<view class="close"><span class="iconfont" @click="closeSetUp">&#xe60b;</span></view>
		</view>
		
		<view class="control" v-if="!setUpStatus">
			<span class="iconfont pause" @click="pause" v-if="isPlay">&#xe614;</span>
			<span class="iconfont play" @click="play" v-if="!isPlay">&#xe629;</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"rain_volume": 0,
				"bgm_volume": 0,
				"setUpStatus": false,
				"rain": null,
				"bgm": null,
				"alarm": null,
				"isPlay": false,
			}
		},
		onLoad() {
			let ts = this;
			
			uni.getStorage({
				key: "rain_volume",
				success: function (res) {
					ts.rain_volume = res.data;
				}
			});
			
			uni.getStorage({
				key: "bgm_volume",
				success: function (res) {
					ts.bgm_volume = res.data;
				}
			});
		},
		onShow() { 
			if (!this.rain) {
				this.rain = uni.createInnerAudioContext();
				this.rain.loop = true;
				this.bgm = uni.createInnerAudioContext();
				this.bgm.loop = true;
			}
			this.bgm.src = this.$store.getters.bgm.src;
			this.rain.src = this.$store.getters.rain.src;
		},
		methods: {
			rainChange(e) {
				this.rain.volume = this.rain_volume = e.detail.value / 100;
				uni.setStorage({key: 'rain_volume',data: this.rain_volume});
			},
			bgmChange(e) {
				this.bgm.volume = this.bgm_volume = e.detail.value / 100;
				uni.setStorage({key: 'bgm_volume',data: this.bgm_volume});
			},
			
			closeSetUp() {
				this.setUpStatus = false;
			},
			openSetUp() {
				this.setUpStatus = !this.setUpStatus;
			},
			pause() {
				this.isPlay = false;
				this.rain.pause();
				this.bgm.pause();
			},
			play() {
				this.rain.volume = this.rain_volume;
				this.bgm.volume = this.bgm_volume;
				
				this.isPlay = true;
				this.rain.play();
				this.bgm.play();
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100vw;
		height: 100vh;
		position: relative;
		background: url('https://img.nazzzz.cn/bg_rain.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		color: rgba(250, 250, 250, .8);
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
		background-color: rgba(0, 0, 0, .5);
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
		color: rgba(250, 250, 250, .7);
	}
	
	.control {
		width: 100vw;
		position: absolute;
		bottom: 0;
		text-align: center;
		margin: 0;
	}
	
	.control .play {
		font-size: 120rpx;
		line-height: 120rpx;
	}
	.control .pause {
		font-size: 100rpx;
		line-height: 120rpx;
	}

</style>
