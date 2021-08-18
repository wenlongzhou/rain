<template>
  <view class="user-container">
    <view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left"> 雨声 </view>
        <view class="uni-list-cell-db">
          <picker
            @change="rainPickerChange"
            :value="rain_index"
            :range="rain"
            range-key="name"
          >
            <view class="uni-input">{{ rain[rain_index].name }}</view>
          </picker>
        </view>
      </view>
    </view>

		<view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left"> 背景 </view>
        <view class="uni-list-cell-db">
          <picker
            @change="bgmPickerChange"
            :value="bgm_index"
            :range="bgm"
            range-key="name"
          >
            <view class="uni-input">{{ bgm[bgm_index].name }}</view>
          </picker>
        </view>
      </view>
    </view>

		<view class="uni-list">
      <view class="uni-list-cell">
        <view class="uni-list-cell-left"> 闹钟 </view>
        <view class="uni-list-cell-db">
          <picker
            @change="alarmPickerChange"
            :value="alarm_index"
            :range="alarm"
            range-key="name"
          >
            <view class="uni-input">{{ alarm[alarm_index].name }}</view>
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
			rain_index: 0,
			bgm: [],
			bgm_index: 0,
			alarm: [],
			alarm_index: 0,
    };
  },
	onLoad() {
		this.rain = this.$store.state.rain_list;
		this.rain_index = this.$store.state.rain_index;
		this.bgm = this.$store.state.bgm_list;
		this.bgm_index = this.$store.state.bgm_index;
		this.alarm = this.$store.state.alarm_list;
		this.alarm_index = this.$store.state.alarm_index;
	},
  methods: {
    rainPickerChange: function (e) {
      this.rain_index = e.detail.value;
			this.$store.commit('changeRain', this.rain_index);
    },
		bgmPickerChange: function (e) {
      this.bgm_index = e.detail.value;
			this.$store.commit('changeBgm', this.bgm_index);
    },
		alarmPickerChange: function (e) {
      this.alarm_index = e.detail.value;
			this.$store.commit('changeAlarm', this.alarm_index);
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