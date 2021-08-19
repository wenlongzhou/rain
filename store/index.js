import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rainList: [{
        name: "春雨舒缓",
        src: "https://img.nazzzz.cn/rain_cysh.wav"
      },
      {
        name: "小雷雨",
        src: "https://img.nazzzz.cn/rain_xly.wav"
      },
      {
        name: "狂风暴雨",
        src: "https://img.nazzzz.cn/rain_hfby.wav"
      },
      {
        name: "暴雨哗哗哗",
        src: "https://img.nazzzz.cn/rain_byhhh.wav"
      }
    ],
    rainIndex: uni.getStorageSync('rainIndex') ? uni.getStorageSync('bgmIndex') : 0,
    bgmList: [{
        name: "Kiss The Rain",
        src: "https://img.nazzzz.cn/bgm_KissTheRain.mp3"
      },
      {
        name: "致爱丽丝",
        src: "https://img.nazzzz.cn/bgm_elise.mp3"
      }
    ],
    bgmIndex: uni.getStorageSync('bgmIndex') ? uni.getStorageSync('bgmIndex') : 0,
    alarmList: [{
        name: "滴滴",
        src: "https://img.nazzzz.cn/alarm_didi.wav"
      },
      {
        name: "布谷",
        src: "https://img.nazzzz.cn/alarm_bugu.wav"
      }
    ],
    alarmIndex: uni.getStorageSync('alarmIndex') ? uni.getStorageSync('bgmIndex') : 0,
  },
  getters: {
    rain(state) {
      return state.rainList[state.rainIndex];
    },
    bgm(state) {
      return state.bgmList[state.bgmIndex];
    },
    alarm(state) {
      return state.alarmList[state.alarmIndex];
    },
  },
  mutations: {
    changeRain(state, index) {
      state.rainIndex = index;
      uni.setStorage({
        key: 'rainIndex',
        data: index
      });
    },
    changeBgm(state, index) {
      state.bgmIndex = index;
      uni.setStorage({
        key: 'bgmIndex',
        data: index
      });
    },
    changeAlarm(state, index) {
      state.alarmIndex = index;
      uni.setStorage({
        key: 'alarmIndex',
        data: index
      });
    }
  }
});
