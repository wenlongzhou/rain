<template>
  <view class="content">
    <view class="setup-icon"><span class="iconfont" @click="openSetUp">&#xe60c;</span></view>
    <view class="setup" blurEffect="light" v-if="setUpStatus">
      <view>雨声
        <slider :value="rainVolume * 100" @changing="rainChanging" @change="rainChange" show-value block-size="12"
          activeColor="#0A98D5" backgroundColor="#acccea" block-color="#0A98D5" />
      </view>
      <view>背景
        <slider :value="bgmVolume * 100" @changing="bgmChanging" @change="bgmChange" show-value block-size="12"
          activeColor="#0A98D5" backgroundColor="#acccea" block-color="#0A98D5" />
      </view>
      <view>定时
        <slider :value="countdown" @change="timeChange" show-value block-size="12" activeColor="#0A98D5"
          backgroundColor="#acccea" block-color="#0A98D5" />
      </view>
      <view class="timeOptions">时间到后
        <radio-group @change="radioChange">
          <label class="uni-list-row uni-list-row-pd" v-for="(item, index) in timeOptions" :key="item.value">
            {{item.name}} <radio :value="item.value" :checked="index === timeCurrent" />
          </label>
        </radio-group>
      </view>

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
        rainVolume: 0,
        bgmVolume: 0,
        setUpStatus: false,
        rain: null,
        bgm: null,
        alarm: null,
        isPlay: false,
        timeOptions: [
          {
            name: "关闭",
            value: 0,
          },
          {
            name: "闹钟",
            value: 1,
          },
        ],
				timeCurrent: 0,
        countdown: 0,
        countdownFun: null,
      }
    },
    onLoad() {
      this.rain = uni.createInnerAudioContext();
      this.rain.loop = true;
      this.rain.volume = this.rainVolume = uni.getStorageSync('rainVolume') ? uni.getStorageSync('rainVolume') : 0.2;
      
      this.bgm = uni.createInnerAudioContext();
      this.bgm.loop = true;
      this.bgm.volume = this.bgmVolume = uni.getStorageSync('bgmVolume') ? uni.getStorageSync('bgmVolume') : 0.2;
      
      this.alarm = uni.createInnerAudioContext();
      this.alarm.loop = true;
      this.alarm.volume = 0.2;
    },
    onShow() {
      this.rain.src = this.$store.getters.rain.src;
      this.bgm.src = this.$store.getters.bgm.src;
      this.alarm.src = this.$store.getters.alarm.src;
    },
    methods: {
      rainChange(e) {
        uni.setStorage({
          key: 'rainVolume',
          data: this.rainVolume
        });
      },
      bgmChange(e) {
        uni.setStorage({
          key: 'bgmVolume',
          data: this.bgmVolume
        });
      },
      timeChange(e) {
        this.countdown = e.detail.value;
        if (this.countdown > 0) {
          let that = this;
          clearInterval(that.countdownFun);
          this.countdownFun = setInterval(function() {
            that.countdown -= 1;
            if (that.countdown <= 0) {
              clearInterval(that.countdownFun);
              if (that.timeCurrent === 0) {
                that.pause();
              } else {
                that.isPlay = true;
                that.alarm.play();
              }
            }
          }, 1000);
        }
      },
      rainChanging(e) {
        this.rain.volume = this.rainVolume = e.detail.value / 100;
      },
      bgmChanging(e) {
        this.bgm.volume = this.bgmVolume = e.detail.value / 100;
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
        this.alarm.stop();
      },
      play() {
        this.isPlay = true;
        this.rain.play();
        this.bgm.play();
      },
      
      radioChange: function(evt) {
        for (let i = 0; i < this.timeOptions.length; i++) {
          if (this.timeOptions[i].value === parseInt(evt.detail.value)) {
            this.timeCurrent = i;
            break;
          }
        }
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

  .setup>view {
    display: flex;
    justify-content: space-between;

    margin: 100rpx 30rpx;
  }

  .setup slider {
    width: 400rpx;
    margin: 0 20rpx;
  }

  .setup>.close {
    width: 100%;
    margin: 0 !important;
  }

  .setup>.close>.iconfont {
    font-size: 100rpx;
    color: white;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 10rpx;
    color: rgba(250, 250, 250, .7);
  }
  
  .setup .uni-list-row {
    width: 150rpx;
    float: left;
  }
  
  .setup radio-group {
    width: 400rpx;
  }
  
  .setup .timeOptions {
     line-height: 24px;
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
