<template>
  <view class="content">
    <view class="setup" blurEffect="light" v-if="setUpStatus">
      <view>定时（分）
        <slider :value="countdown" @change="timeChange" show-value block-size="12" activeColor="#0A98D5"
          backgroundColor="#acccea" block-color="#0A98D5" />
      </view>
      <view class="timeOptions">
        <radio-group @change="radioChange">
          <label class="uni-list-row uni-list-row-pd" v-for="(item, index) in timeOptions" :key="item.value">
            {{item.name}} <radio :value="item.value" :checked="index === timeCurrent" />
          </label>
        </radio-group>
      </view>

      <view class="close"><span class="iconfont" @click="closeSetUp">&#xe60d;</span></view>
    </view>

    <view class="control">
      <span class="iconfont pause" @click="pause" v-if="isPlay">&#xe616;</span>
      <span class="iconfont play" @click="play" v-if="!isPlay">&#xe615;</span>
      <span class="iconfont setup-icon" @click="openSetUp">&#xe675;</span>
      <span v-if="test"><span v-if="test1"></span></span>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        setUpStatus: false,
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
        music: null,
        isAlarm: false,
        playCurrent: 0,
      }
    },
    onLoad() {
      this.musicLoad();
    },
    onShow() {
      if (this.music.paused == true) {
        this.isPlay = false;
      }
      
      //切歌回来时
      if (!this.isAlarm && this.isPlay && this.music.src && this.music.src != this.$store.getters.music) {
        this.music.src = this.$store.getters.music;
      }
    },
    methods: {
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
                that.stop();
              } else {
                that.isPlay = true;
                that.music.src = that.$store.getters.alarm.src;
                that.isAlarm = true;
              }
            }
          }, 60000);
        }
      },

      closeSetUp() {
        this.setUpStatus = false;
      },
      openSetUp() {
        this.setUpStatus = !this.setUpStatus;
      },

      musicLoad() {
        this.music = uni.getBackgroundAudioManager();
        this.music.title = this.$store.getters.musicName;
        this.music.singer = '暂无';
        this.music.coverImgUrl = '';
        this.music.loop = true;
        this.music.onPause(function() {
          this.isPlay = false;
          if (this.isAlarm) this.stop();
        });
        this.music.onPlay(function() {
          this.isPlay = true;
          if (this.isAlarm) this.play();
        });
        this.music.onEnded(this.repeat);
      },
      pause() {
        if (this.isPlay === false) return;
        this.isPlay = false;
        this.isAlarm = false;
        this.playCurrent = this.music.currentTime;
        this.music.stop();
      },
      play() {
        if (this.isPlay === true) return;
        this.isPlay = true;
        this.musicLoad();
        this.music.src = this.$store.getters.music;
        this.music.seek(this.playCurrent); //微信小程序不支持这个
        this.music.startTime = this.playCurrent;
        this.music.play();
      },
      stop() {
        this.isPlay = false;
        this.music.stop();
      },
      repeat() {
        if (this.isAlarm) {
          this.music.src = this.$store.getters.alarm.src;
        } else {
          this.music.src = this.$store.getters.music;
        }
      },
      
      radioChange: function(evt) {
        for (let i = 0; i < this.timeOptions.length; i++) {
          if (this.timeOptions[i].value === parseInt(evt.detail.value)) {
            this.timeCurrent = i;
            break;
          }
        }
      }
    },
  }
</script>

<style scoped>
  .content {
    width: 100vw;
    height: 100vh;
    position: relative;
    background: url('https://img.nazzzz.cn/bg_rain.png');
    background-repeat: no-repeat;
    background-size: cover;
    color: rgba(250, 250, 250, .4);
  }

  .setup-icon {
    font-size: 60rpx;
    line-height: 120rpx;
  }
    
  .setup {
    width: 600rpx;
    height: 60vh;
    background-color: rgba(0, 0, 0, .5);
    border-radius: 30rpx;
    font-size: 30rpx;
    overflow: hidden;
    position: absolute;
    top: 20vh;
    left: 75rpx;
    color: rgba(250, 250, 250, 0.7);
  }
  
  .setup > view {
    width: 100%;
    margin: 60rpx auto;
    text-align: center;
  }
  
  .setup > view > slider {
    margin-left: 100rpx;
  }
  
  .setup .uni-list-row {
    width: 150rpx;
    float: left;
  }
  
  .setup radio-group {
    width: 350rpx;
    margin: 0 auto;
  }
  
  .setup>.close {
    width: 100%;
    margin: 0 !important;
    position: absolute;
    bottom: 50rpx;
  }

  .setup>.close>.iconfont {
    font-size: 70rpx;
    color: white;
    width: 100%;
    text-align: center;
    color: rgba(250, 250, 250, .4);
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
    font-size: 120rpx;
    line-height: 120rpx;
  }
</style>
