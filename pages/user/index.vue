<template>
  <view class="user-container">
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left"> 雨声 </view>
        <view class="uni-list-cell-db">
          <picker @change="rainPickerChange" :value="rainIndex" :range="rain" range-key="name">
            <view class="uni-input">{{ rain[rainIndex].name }}</view>
          </picker>
        </view>
      </view>
    </view>

    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left"> 背景 </view>
        <view class="uni-list-cell-db">
          <picker @change="bgmPickerChange" :value="bgmIndex" :range="bgm" range-key="name">
            <view class="uni-input">{{ bgm[bgmIndex].name }}</view>
          </picker>
        </view>
      </view>
    </view>

    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left"> 闹钟 </view>
        <view class="uni-list-cell-db">
          <picker @change="alarmPickerChange" :value="alarmIndex" :range="alarm" range-key="name">
            <view class="uni-input">{{ alarm[alarmIndex].name }}</view>
          </picker>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        rain: [],
        rainIndex: 0,
        bgm: [],
        bgmIndex: 0,
        alarm: [],
        alarmIndex: 0,
      };
    },
    onLoad() {
      this.rain = this.$store.state.rainList;
      this.rainIndex = this.$store.state.rainIndex;
      this.bgm = this.$store.state.bgmList;
      this.bgmIndex = this.$store.state.bgmIndex;
      this.alarm = this.$store.state.alarmList;
      this.alarmIndex = this.$store.state.alarmIndex;
    },
    methods: {
      rainPickerChange: function(e) {
        this.rainIndex = e.detail.value;
        this.$store.commit('changeRain', this.rainIndex);
      },
      bgmPickerChange: function(e) {
        this.bgmIndex = e.detail.value;
        this.$store.commit('changeBgm', this.bgmIndex);
      },
      alarmPickerChange: function(e) {
        this.alarmIndex = e.detail.value;
        this.$store.commit('changeAlarm', this.alarmIndex);
      },
    },
  };
</script>

<style>
  .user-container {
    width: 100vw;
    height: 100vh;
    background-color: rgb(250, 250, 250);
    overflow: hidden;
  }

  .uni-list {
    margin-top: 50rpx;
  }
</style>
